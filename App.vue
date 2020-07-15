<script>
	export default {
		onLaunch: function() {
			try {
				let lifeData = uni.getStorageSync('lifeData');
				// 清除三方登录状态
				if (lifeData.vuex_login_type == 2) {
					this.$u.vuex('vuex_user', {});
					this.$u.vuex('vuex_login_type', 0);
				}
				// 补发上次退出前未发送的必须的请求(如更新用户照片墙)
				if(lifeData.vuex_photo_request) {
					this.$u.api.uploadPhoto(lifeData.vuex_photo_request);
				}
			} catch (e) {

			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "common/iconfont.css";
</style>
