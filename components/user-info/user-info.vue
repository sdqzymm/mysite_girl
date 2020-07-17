<template>
	<view class="user" @tap="handleEdit">
		<view class="avatar">
			<!-- <u-avatar :src="vuex_user.avatar_ || '/static/avatar/photo1.jpg'" size="large"></u-avatar> -->
			<view class="avatar-img" :style="[{backgroundImage:vuex_user.avatar_?'url(' + vuex_user.avatar_ + ')':'url(' + '/static/avatar/photo1.jpg' + ')'}]"></view>
			<view class="iconfont" :class="[vuex_user.gender ? 'icon-nan' : 'icon-nv']"></view>
		</view> 
		<view class="info">
			<view class="u-line-1 nickname">{{vuex_user.nickname || '亲'}} <u-icon name="edit-pen" size="32" class="edit_pen"></u-icon> </view>
			<view class="u-line-2 signature">{{vuex_user.signature || '个性签名'}}</view>
		</view>
	</view>  
</template>
 
<script>
	export default {
		data() {
			return {
				nickname: '',
				signature: '',
			};
		},
		methods: {
			handleEdit() {
				// 本站用户才能跳转编辑页面
				if(this.vuex_login_type == 1) {
					this.$u.route({
						url: 'pages/edit-userinfo/edit-userinfo'
					})
				} else {
					this.$u.toast('注册成为本站用户享受更多功能')
				}				
			}		
		}
	}
</script>

<style lang="scss">
	.user {
		padding: 30rpx 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: rgba(238, 94, 94, 0.7); 
		height: 150rpx;
	}
	.avatar{
		position: relative;
	}
	
	.info {
		margin: 0 30rpx 0 60rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 150rpx
	}
	.nickname{
		margin: 15rpx 0 10rpx 0; 
		font-size: 40rpx;
		display: flex;
		align-items: center;
		color: $u-main-color; 
	}
	.edit_pen{
		margin-left: 10rpx;
		color: $u-content-color;
	}
	.signature{
		color: $u-tips-color;
		text-align: start;
	}
	.icon-nan,
	.icon-nv {
		color: white;
		font-size: 20rpx;
		background-color: rgb(68, 179, 255);
		border-radius: 50%;
		position: absolute;
		padding: 6rpx;
		top: 5rpx;
		right: 5rpx;
	}
	.icon-nv{
		background-color: rgb(255, 66, 148);
	}
	
	.avatar-img {
		width: 120rpx;
		height: 120rpx;
		background-size: cover;
		background-position: center;
		border-radius: 50%;
	}
</style>
