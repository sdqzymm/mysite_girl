let regUrl = '/api/account/v1/reg/';
let loginUrl = '/api/account/v1/login/';
let captchaUrl = '/api/account/v1/captcha/';
let profileUrl = '/api/account/v1/profile/';

const install = (Vue, vm) => {
	let reg = (params = {}) => vm.$u.post(regUrl, params)
	let login = (params = {}) => vm.$u.post(loginUrl, params)
	let getCaptcha = (params = {}) => vm.$u.post(captchaUrl, params)



	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		reg,
		login,
		getCaptcha,
	};
}

export default {
	install
}
