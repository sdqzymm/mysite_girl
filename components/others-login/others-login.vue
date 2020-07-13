<template>
	<view>
		<scroll-view scroll-x="true" class="others">
			<block v-for="(item, index) in providerList" :key="index">
				<u-icon class="login" :name="item.icon" :custom-style="{backgroundColor: item.bgColor}" @tap="tologin(item)"></u-icon>
			</block>
		</scroll-view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: []
			};
		},
		mounted() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let icon = '';
						let bgColor = '';
						switch (value) {
							case 'weixin':
								providerName = '微信登录';
								icon = 'weixin-fill';
								bgColor = 'rgb(42, 209, 155)';
								break;
							case 'qq':
								providerName = 'QQ登录';
								icon = 'qq-fill';
								bgColor = 'rgb(82, 128, 206)';
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录';
								icon = 'weibo';
								bgColor = 'rgb(238, 94, 94)';
								break;
						}
						return {
							name: providerName,
							icon: icon,
							bgColor: bgColor,
							id: value
						}
					});

				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		methods: {
			tologin(provider) {
				uni.login({
					provider: provider.id,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型
					// #endif
					success: (res) => {
						let auth_type = ''
						switch (res.id) {
							case 'weixin':
								auth_type = 3;
								break;
							case 'qq':
								auth_type = 4;
								break;
							case 'sinaweibo':
								auth_type = 5;
								break;
						}
						// 获取三方账号用户信息
						let user = {};
						uni.getUserInfo({
							provider: provider.id,
							success: (infoRes) => {
								let userinfo = infoRes.userInfo;
								userinfo = {
									open_id: userinfo.openId,
									avatar: userinfo.avatarUrl,
									nickname: userinfo.nickName,
									gender: userinfo.gender,
									city: userinfo.city,
									province: userinfo.province,
								}
								// 向本站服务器发送登录请求
								this.$u.api.login({
									auth_type: 4,
									open_id: res.authResult.openid
								}).then(res => {
									if (res.code == 10110) {
										// 三方账号登录成功, 存储三方账号信息, 保存登录状态, 返回之前页面	
										Object.assign(user, res.data, userinfo);
										this.$u.vuex('vuex_login_type', 2)
										this.$u.vuex('vuex_user', user);
										this.$u.route({
											type: 'navigateBack'
										})
									} else {
										this.$refs.uToast.show({
											title: res.msg,
											type: 'error',
											icon: false,
											position: 'top'
										})
									}
								}).catch(err => {
									console.log(err)
								})
							}
						})
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});

			},
		}
	}
</script>

<style scoped>
	.others {
		width: 594rpx;
		white-space: nowrap;
		margin: 0 78rpx;
	}

	.login {
		margin: 0 39rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background-color: rgb(42, 209, 155);
		color: white;
		font-size: 60rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
