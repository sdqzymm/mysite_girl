import BASE_URL from './base_url.js';

const config = {
	baseUrl: BASE_URL, // 请求的本域名
	method: 'POST',
	// 设置为json，返回后会对数据进行一次JSON.parse()
	dataType: 'json',
	showLoading: true, // 是否显示请求中的loading
	loadingText: '请求中...', // 请求loading中的文字提示
	loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	originalData: true, // 是否在拦截器中返回服务端的原始数据
	loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	// 配置请求头信息
	header: {
		'content-type': 'application/json;charset=UTF-8'
	},
}

const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig(config);

	// 请求拦截部分
	Vue.prototype.$u.http.interceptor.request = (config) => {
		try {
			let login_type = vm.vuex_login_type;
			if(login_type!=0) {
				let user = vm.vuex_user;
				let access_token = user.access_token;
				let auth_type = user.auth_type;
				let app_key = user.app_key;
				let open_id = user.open_id;
				config.header.Authorization = `Token ${access_token}`;
				config.data.auth_type = auth_type;
				config.data.app_key = app_key;
				config.data.open_id = open_id;
			}	
		} catch (e) {}
		if (config.url == ''){
			// 跳转首页
			vm.$u.route('/pages/index/index/');
		}
		// 最后将config进行return, return一个false,将会取消本次请求
		return config;
	}

	// 响应拦截部分
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.statusCode >= 200 && res.statusCode <= 299) {
			return res.data
		} else if(res.statusCode >=400 && res.statusCode <=499) {
			// 4xx错误,服务器拒绝客户端访问(目前后端仅做了用户认证,后续看情况添加权限及频率认证),在这里做处理
			let data = res.data;
			if((data.code >= 10201 && data.code <= 10219) || data.code == 10299) {
				// 无法认证登录信息
				toLogin(vm, '需要登录后才能访问，即将跳转登录');
				return false;  // return false,进入catch回调
			} else if(data.code == 10221) {
				// 账号被冻结
				toLogin(vm, '账号被冻结，请登录其他用户');
				return false;
			} else if(data.code == 10231) {
				// 本站注册用户token过期(access_token过期时间:2小时), 实现无感知刷新
				return refresh(vm, data.data.redirect_url || '');  // 为空,刷新后跳转首页
			} else if(data.code == 10232) {
				// 三方平台账号登录使用超过24小时未退出app(话说不可能的吧), 强制跳转
				toLogin(vm, `${vm.vuex_user.nickname},您已经使用三方平台账号登录了24小时,可以尝试用本站用户登录哦`)
			}
		} else {
			// 请求失败
			console.log(res);  // (这里可以对失败的结果上传服务器做一个持久化存储,便于后续查看)
			uni.showModal({
				title: '服务器正忙,请稍后访问',
				showCancel: false,
			});
			return false
		}
	}
	function refresh(vm, redirect_url) {
		console.log('开始刷新');
		let finalRes = '';
		vm.$u.api.refreshToken({
			refresh_token: vm.vuex_user.refresh_token,
			redirect_url: redirect_url 
		}).then(res=>{
			if(res.code!=10400) {
				toLogin(vm, '需要重新登录，即将跳转登录');
			}else {
				// 刷新成功, 更新用户信息, 重新发送请求
				console.log('刷新成功');
				let access_token = res.data.access_token;
				let refresh_token = res.data.refresh_token;
				vm.$u.vuex('vuex_user.access_token', access_token);
				vm.$u.vuex('vuex_user.refresh_token', refresh_token);
				vm.$u.post(redirect_url).then(res=>{
					finalRes = res;
				})
			}
		})
		return finalRes;
	}
	function toLogin(vm, msg) {
		// 跳转登录页面, 并清空用户信息
		vm.$u.toast(msg);
		vm.$u.vuex('vuex_user', {});
		vm.$u.vuex('vuex_login_type', 0);
		let that = vm;
		setTimeout(() => {
			that.$u.route('/pages/login/login')
		}, 1500)
	}
}




export default {
	install
}
