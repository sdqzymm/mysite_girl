<template>  
	<view class="profile">
		<!-- 照片墙 -->
		<photo-wall></photo-wall>
		<!-- 用户头像信息 -->
		<user-info class="user_info"></user-info>
		<!-- 数据 -->
		<view class="data">
			<block v-for="(item, index) in datalist" :key="item.id">
				<view class="data-item">
					<text class="item-num">{{item.num}}</text>
					<text class="item-title">{{item.title}}</text>
				</view>
			</block>
		</view> 
		<!-- 宫格 -->
		<grid class="grid"></grid>
		<!-- 广告位 -->
		<view class="ad">广告位</view>
		<template v-if="vuex_login_type==0">
			<u-button @click="tapLogin" type="success" :custom-style="btnStyle">登录</u-button>
			<u-button @click="tapReg" type="error" :custom-style="btnStyle">注册</u-button>
		</template>
		<template v-else-if="vuex_login_type==1">
			<u-button @click="tapLogout" type="warning" :custom-style="btnStyle">注销</u-button>
		</template>
		<template v-else>
			<u-button @click="tapLogout" type="warning" :custom-style="btnStyle">注销</u-button>
			<u-button @click="tapReg" type="error" :custom-style="btnStyle">注册</u-button>
		</template>
	</view>
</template>

<script>
	import debounce from 'common/debounce.js';
	export default {
		data() {
			return {
				datalist: [{
						id: 0,
						title: '关注',
						num: 6
					},
					{
						id: 1,
						title: '粉丝',
						num: 6
					},
					{
						id: 2,
						title: '评论',
						num: 6
					},
					{
						id: 3,
						title: '收藏',
						num: 6
					},
				],
				btnStyle: {
					width: '200rpx',
					margin: '30rpx auto'
				}
			}
		},
		methods: {
			tapLogin() {
				this.$u.route({
					url: '/pages/login/login'
				})
			},
			tapLogout() {
				this.$u.vuex('vuex_user', {});
				this.$u.vuex('vuex_login_type', 0)
			},
			tapReg() {
				this.$u.route({
					url: '/pages/reg/reg'
				})
			}
		}
	}
</script>

<style scoped>
	.profile {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 750rpx;
		text-align: center;
	}

	.profile-title {
		margin-top: 10rpx;
		font-size: 16px;
	}

	.icon-jinru {
		color: #999999;
		font-size: 10px;
	}

	.data {
		padding: 30rpx 0;
		background-color: rgba(0, 170, 255, 0.6);
		display: flex;
		justify-content: space-evenly;
		height: 150rpx;
	}

	.data-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.item-num {
		font-size: 14px;
		line-height: 14px;
	}

	.item-title {
		color: #999999;
	}

	.logout,
	.login {
		width: 100rpx;
	}

	.grid {
		padding: 30rpx 0;
	}

	.ad {
		flex: 1 0 150rpx;
		background-color: rgba(7, 249, 197, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
