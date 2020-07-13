const config = {
	baseUrl: 'http://192.168.3.20:8000', // 请求的本域名
	method: 'POST',
	// 设置为json，返回后会对数据进行一次JSON.parse()
	dataType: 'json',
	showLoading: true, // 是否显示请求中的loading
	loadingText: '请求中...', // 请求loading中的文字提示
	loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	originalData: false, // 是否在拦截器中返回服务端的原始数据
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
			let lifeData = uni.getStorageSync('lifeData');
			let access_token = lifeData.vuex_user.access_token;
			config.header.Authorization = `Token ${access_token}`;
		} catch(e) {}
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if (config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
}

export default {
	install
}
