import uploadFile from '../upload.js';

let regUrl = '/api/account/v1/reg/';
let loginUrl = '/api/account/v1/login/';
let captchaUrl = '/api/account/v1/captcha/';
let profileUrl = '/api/account/v1/profile/';
let refreshTokenUrl = '/api/account/v1/refresh_token/';
let photoUrl = '/api/account/v1/photo/';

const install = (Vue, vm) => {
	let reg = (params = {}) => vm.$u.post(regUrl, params);
	let login = (params = {}) => vm.$u.post(loginUrl, params);
	let getCaptcha = (params = {}) => vm.$u.post(captchaUrl, params);
	let refreshToken = (params = {}) => vm.$u.post(refreshTokenUrl, params);
	let uploadPhoto = (files) => {
		uploadFile(vm, files, {
			url: photoUrl,
			name: 'photo',
			success: (uploadFileRes) => {
				let data = JSON.parse(uploadFileRes.data);
				if(data.code == 10620) {
					// 删除本地的请求
					vm.$u.vuex('vuex_user.photoRequest', '');
					// 修改用户信息
					let total = files.length;
					let photo = data.data;
					let photoList = vm.vuex_user.photoList || [];
					photoList[photo.index] = {'image': photo.image};
					vm.$u.vuex('vuex_user.photoList', photoList.slice(0, total));
				}		
			},
			fail: (err)=>{
				console.log(err);
			}
		});
	};
	let editProfile = (avatar, params = {}) => {
		uploadFile(vm, avatar, {
			url: profileUrl,
			name: 'avatar',
			filePath: avatar,
			formData: params,
			success: (uploadFileRes) => {
				let data = JSON.parse(uploadFileRes.data);		
				if(data.code == 10600) {
					// 修改用户信息 
					let user = data.data;  
					user.access_token = vm.vuex_user.access_token;  // 注意保存登录信息
					user.refresh_token = vm.vuex_user.refresh_token;
					user.auth_type = vm.vuex_user.auth_type;
					vm.$u.vuex('vuex_user', user);
				}			
			},
			fail: (err)=>{
				console.log(err);
			}
		});
	};
	


	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		reg,
		login,
		getCaptcha,
		editProfile,
		refreshToken,
		uploadPhoto,
	};
}

export default {
	install
}
