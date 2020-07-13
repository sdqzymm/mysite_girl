<template>
	<view class="photo">
		<u-swiper :list="photoList" indicator-pos="bottomRight" effect3d :title="!vuex_user.photoList" height="300" @click="tapPhoto" img-mode="aspectFill"></u-swiper>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				defaultPhotoList1: [
					{
						image: '/static/photo/photo1.jpg',
						title: '注册后可以上传照片'
					},{
						image: '/static/photo/photo2.jpg',
						title: '注册后体验更多功能'
					},{
						image: '/static/photo/photo3.jpg',
						title: '注册后享受更多福利'
					},
				],
				defaultPhotoList2: [
					{
						image: '/static/photo/photo1.jpg',
						title: '点击可上传照片'
					},{
						image: '/static/photo/photo2.jpg',
						title: '点击可上传照片'
					},{
						image: '/static/photo/photo3.jpg',
						title: '点击可上传照片'
					},
				],
			};
		},
		computed: {
			photoList(){
				if(this.vuex_login_type==0 || this.vuex_login_type==2) {
					// 提示用户注册,登录
					return this.defaultPhotoList1
				} else if(!this.vuex_user.photoList) {
					return this.defaultPhotoList2
				}
			}
		},
		methods: {
			tapPhoto(index) {
				console.log(index);
				// 本站用户点击可上传照片
				if(this.vuex_login_type == 1) {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (res) => {
							// if (this.imgList.length != 0) {
							// 	this.imgList = this.imgList.concat(res.tempFilePaths)
							// } else {
							// 	this.imgList = res.tempFilePaths
							// }
							
							// 如果用户上传了照片, 则赋值
							this.photoList[index].image = res.tempFilePaths[0];
							this.photoList[index].title = '';
						},
						fail: (err) => {
							console.log(err)
						}
					});
				} else {
					// 非本站用户点击提醒注册
					this.$u.toast('亲，注册后才能上传照片哦！')
				}
				
			}
		}
	}
</script>

<style>
	.photo{
		padding: 30rpx;
	}
</style>
