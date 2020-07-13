<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 +{{mobileDisplay}}</view>
			<u-message-input :focus="true" :value="captcha" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text :class="{ error: error }">{{errMessage}}</text>
			<view class="captcha">
				<!-- <text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text> -->
				<text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
			</view>
		</view>
	</view> 
</template>

<script>
export default {
	data() {
		return {
			maxlength: 6,
			captcha: '',
			mobileDisplay: '',
			second: 60,
			show: false,
			error: false,
			errMessage: '',
		};
	},
	computed: {},
	onLoad(e) {
		// 初始化数据
		this.second = e.start || 60;
		this.mobile = e.mobile;
		this.password = e.passwrod;
		this.mobileDisplay = this.mobile.slice(0,3) + '****' + this.mobile.slice(-4);
		// 1分钟未输入提示用户重新获取验证码
		let interval = setInterval(() => {
			this.second--;
			if (this.second <= 0) {
				this.show = true;
				if (this.captcha.lenth != 6) {
					this.errMessage = '请输入6位验证码';
					this.error = true;	
				}
				clearInterval(interval);
			}
		}, 1000);
	},
	methods: {
		// 收不到验证码选择时的选择
		// noCaptcha() {
		// 	uni.showActionSheet({
		// 		itemList: ['重新获取验证码'],
		// 		success: function(res) {
		// 			console.log(res)
		// 		},
		// 		fail: function(res) {
					
		// 		}
		// 	});
		// },
		// change事件侦听
		change(captcha) {
			// console.log('change', captcha);
		},
		// 输入完验证码最后一位执行
		finish(captcha) {
			this.$u.api.reg({
				mobile: this.mobile,
				password: this.password,
				captcha: this.captcha,
				auth_type: 9
			}).then((res)=>{
				if(res.code==10000) {
					// 注册成功, 更新用户信息, 跳转我的页面
					this.$u.vuex('vuex_user', res.data);
					this.$u.vuex('vuex_login_type', 1);
					this.$u.route({
						url: '/pages/profile/profile',
						type: 'switchTap'
					})
				} else {
					// 验证码问题提示用户重新输入, 其余问题跳转注册页面(响应拦截)
					this.$u.toast(res.msg)
				}
			}).catch((err)=>{
				
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 80rpx;
}
.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}
.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}
.title {
	font-size: 50rpx;
	color: #333;
}
.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>