<template>
	<view class="login">
		<view class="login_box">
			<!-- 密码登录 -->  
			<password-login v-if="is_user_login"></password-login>
			<!-- 第三方登录 -->
			<others-login v-else></others-login>	
		</view>	
		<view class="toggle-login" @tap="toggleLogin">{{ is_user_login ? '三方登录' : '密码登录'}}<u-icon name="arrow-right"></u-icon></view> 
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				is_user_login: true, // true:本站用户登录方式, false: 三方登录方式
			}
		},
		methods: {
			toggleLogin(){
				this.is_user_login = !this.is_user_login;
			}	
		}
	}
</script>

<style>
	.login{
		text-align: center;
	}
	.login_box{
		display: flex;
		align-items: center;
		height: 300rpx;
		margin: 80rpx 0;
	}
	.toggle-login{
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40rpx;
		color: #82848a;
	}
</style>
