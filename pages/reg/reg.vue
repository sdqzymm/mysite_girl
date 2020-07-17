<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册小乔舞蹈</view>
			<input class="u-border-bottom" type="number" v-model="mobile" placeholder="请输入手机号" placeholder-style="font-size:24rpx"/>
			<input class="u-border-bottom" type="text" v-model="password" placeholder="请输入密码：6位以上的大小写字母、数字、下划线" password placeholder-style="font-size:24rpx"/>
			<input class="u-border-bottom" type="text" v-model="password_again" placeholder="请确认密码：6位以上的大小写字母、数字、下划线" password placeholder-style="font-size:24rpx"/>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">{{captchaMessage}}</button>
		</view>
		<view class="buttom">
			<view class="hint">
				注册代表同意
				<text class="link" @tap="toUserAgreement">用户协议、隐私政策，</text>
				并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				password_again: '',
				captchaMessage: '获取验证码'
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.mobile.length == 11 && this.password == this.password_again && this.password.length >= 6) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		onReady() {
			this.timer = null
		},
		methods: {
			submit() {
				if (!/^(?!_)(?!_+$)[a-zA-Z0-9_]{6,}$/.test(this.password)) {
					this.$u.toast('请输入正确的密码,密码由6位以上的大小写字母、数字、下划线组成，不能以下划线开头');
					return
				}
				if (!/^(?!_)(?!_+$)[a-zA-Z0-9_]{6,}$/.test(this.password_again)) {
					this.$u.toast('请输入正确的密码,密码由6位以上的大小写字母、数字、下划线组成，不能以下划线开头');
					return
				}
				if(this.password != this.password_again) {
					this.$u.toast('两次密码不相等');
					return
				}
				if (this.$u.test.mobile(this.mobile)) {
					if (this.timer) {
						return
					}

					this.$u.api.getCaptcha({
						mobile: this.mobile,
					}).then(res => {
						if (res.code == 10700) {
							// 发送短信验证码成功, 倒计时重新获取验证码
							let start = 60;
							this.timer = setInterval(() => {
								if (start <= 0) {
									this.captchaMessage = '获取验证码';
									clearInterval(this.timer);
									this.timer = null;
								}
								this.captchaMessage = `${start}秒后重新获取验证码`;
								start--;
							}, 1000);
							// 跳转输入验证码页面
							this.$u.route({
								url: 'pages/reg/code',
								params: {
									start: start,
									mobile: this.mobile,
									password: this.password
								}
							})
						} else {
							this.$u.toast(res.msg)
						}
					}).catch(err => {

					})
				} else {
					this.$u.toast('请输入正确的手机号')
				}
			},
			toUserAgreement() {
				this.$u.toast('文明上网，遵纪守法')
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
