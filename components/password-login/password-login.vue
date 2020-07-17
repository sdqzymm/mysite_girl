<template>
	<view class="login">
		<view class="login-item">
			<u-icon name="account" class="account" size="32"></u-icon>
			<input class="input" :placeholder="identifyPlaceholder" v-model="identify" @focus="identifyFocus" :placeholder-style="identifyPlaceholderStyle"></input>
		</view>
		<view class="login-item">
			<u-icon name="lock" class="password" size="32"></u-icon>
			<input class="input" :placeholder="passwordPlaceholder" :password="is_password" v-model="password" @focus="passwordFocus" :placeholder-style="passwordPlaceholderStyle" @blur="passwordBlur"></input>
		</view> 

		<view class="mybtn">
			<u-button type="primary" :ripple="true" ripple-bg-color="#5b5e99" @click="tapReg" :custom-style="btn">注册</u-button>
			<u-button type="success" :ripple="true" ripple-bg-color="#659969" :custom-style="btn" @click="submit">登录</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				identify: '',
				password: '',
				btn: {
					flex: 1,
					margin: '0 20rpx'
				},
				is_password: true,
				identifyPlaceholder: '请输入手机号/用户名/邮箱',
				passwordPlaceholder: '请输入密码',
				identifyPlaceholderStyle: {},
				passwordPlaceholderStyle: {}
			}
		},
		mounted() {
			this.auth_type = -1;
		},

		methods: {
			submit() {
				this.is_submit = true;
				let username = '';
				let mobile = '';
				let email = '';
				// 校验账号
				if (!this.identify) {
					this.getIdentifyError('账号不能为空');
				} else {
					if (this.$u.test.mobile(this.identify)) {
						this.auth_type = 0;
						mobile = this.identify;
					} else if (this.$u.test.email(this.identify)) {
						this.auth_type = 2;
						email = this.identify;
					} else if (/^(?!\d|_)(?!\d+$)(?![a-zA-Z]+$)(?!_+$)[a-zA-Z0-9_]{6,30}$/.test(this.identify)) {
						this.auth_type = 1;
						username = this.identify;
					} else {
						this.getIdentifyError('请输入正确的账号');
					}
				}
				// 校验密码
				if (!this.password) {
					this.getPasswordError('密码不能为空');
				} else {
					if (!/^(?!_)(?!_+$)[a-zA-Z0-9_]{6,}$/.test(this.password)) {
						this.getPasswordError('请输入正确的密码');
					}
				}
								
				if (!this.is_submit) {
					return
				}
				// 校验通过, 发送登录请求
				this.$u.api.login({
					auth_type: this.auth_type,
					username: username,
					mobile: mobile,
					email: email,
					password: this.password
				}).then(res => {
					if(res.code == 10100){
						// 本站用户登录成功, 存储用户信息,登录状态,返回之前页面
						let userinfo = res.data;
						this.$u.vuex('vuex_user', userinfo);
						this.$u.vuex('vuex_user.auth_type', this.auth_type);
						this.$u.vuex('vuex_login_type', 1);
						this.$u.route({
							type: 'navigateBack'
						})
					} else {
						this.$refs.uToast.show({
							title: `服务器校验失败：${res.msg}`,
							type: 'error',
							icon: false,
							position: 'top'
						})
					}
				}).catch(err => {
					console.log(err)
				})

			},
			getIdentifyError(msg) {
				this.is_submit = false;
				this.identifyPlaceholder = msg;
				this.identify = '';
				this.identifyPlaceholderStyle['color'] = this.$u.color['error'];
			},
			getPasswordError(msg) {
				this.is_submit = false;
				this.passwordPlaceholder = msg;
				this.passwordPlaceholderStyle['color'] = this.$u.color['error'];
				this.is_password = false;
				this.password = '';
			},
			identifyFocus() {
				this.identifyPlaceholder = '请输入手机号/用户名/邮箱';
				this.identifyPlaceholderStyle = {};
			},
			passwordFocus() {
				this.passwordPlaceholder = '请输入密码';
				this.passwordPlaceholderStyle = {};	
			},
			passwordBlur() {
				if(!this.is_password) {
					this.is_password = true;
				}	
			},
			tapReg() {
				this.$u.route({
					url: '/pages/reg/reg'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.login {
		display: flex;
		flex-direction: column;
		width: 550rpx;
		margin: 0 100rpx;
		text-align: start;
	}

	.login-item {
		display: flex;
		margin-bottom: 30rpx;
	}

	.input {
		flex: 1;
		border: 1px solid black;
		height: 60rpx;
		margin-left: 30rpx;
	}

	.mybtn {
		display: flex;
		padding-left: 60rpx;
	}

	.btn {
		flex: 1
	}
	.input-placeholder{
		color: $u-type-info-disabled;
		padding-left: 10rpx;
		font-size: 26rpx;
	}
</style>
