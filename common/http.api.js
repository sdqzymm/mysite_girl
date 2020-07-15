let regUrl = '/api/account/v1/reg/';
let loginUrl = '/api/account/v1/login/';
let captchaUrl = '/api/account/v1/captcha/';
let profileUrl = '/api/account/v1/profile/';
let refreshTokenUrl = '/api/account/v1/refresh_token/';
let photoUrl = 'http://192.168.3.20:8000/api/account/v1/photo/';

const install = (Vue, vm) => {
	let reg = (params = {}) => vm.$u.post(regUrl, params);
	let login = (params = {}) => vm.$u.post(loginUrl, params);
	let getCaptcha = (params = {}) => vm.$u.post(captchaUrl, params);
	let editProfile = (params = {}) => vm.$u.post(profileUrl, params);
	let refreshToken = (params = {}) => vm.$u.post(refreshTokenUrl, params);
	let uploadPhoto = (files) => {
		console.log(vm.vuex_user.access_token);
		uni.uploadFile({
			url: photoUrl,
			files: files,
			fileType: 'image',
			header: {
				'Authorization': `Token ${vm.vuex_user.access_token}`
			}, 
			formData: {
				auth_type: 0,
				app_key: vm.vuex_user.app_key
			},
			success: (uploadFileRes) => {
				// 删除本地的请求
				vm.$u.vuex('vuex_photo_request', '');
				// 修改用户信息
				vm.$u.vuex('vuex_user.photoList', JSON.parse(uploadFileRes.data).data);
				console.log(uploadFileRes);
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
