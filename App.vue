<script>
	export default {
		onLaunch: function() {
			// 清除三方登录状态
			try {
				let lifeData = uni.getStorageSync('lifeData');
				if (lifeData.vuex_login_type==2) {
					this.$u.vuex('vuex_user', {});
					this.$u.vuex('vuex_login_type', 0);
				}
			} catch(e) {
				
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
  