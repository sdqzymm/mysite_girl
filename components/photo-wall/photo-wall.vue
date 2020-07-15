<template>
	<view class="photo">
		<u-swiper :list="newPhotoList || vuex_user.photoList || photoList" indicator-pos="bottomRight" effect3d :title="!vuex_user.photoList"
		 height="300" @click="tapPhoto" img-mode="aspectFill"></u-swiper>
	</view>
</template>

<script>
	import debounce from 'common/debounce.js';
	export default {
		data() {
			return {
				defaultPhotoList1: [{
					image: '/static/photo/photo1.jpg',
					title: '注册后可以上传照片'
				}, {
					image: '/static/photo/photo2.jpg',
					title: '注册后体验更多功能'
				}, {
					image: '/static/photo/photo3.jpg',
					title: '注册后享受更多福利'
				}, ],
				defaultPhotoList2: [{
					image: '/static/photo/photo1.jpg',
					title: '点击可上传照片'
				}, {
					image: '/static/photo/photo2.jpg',
					title: '点击可上传照片'
				}, {
					image: '/static/photo/photo3.jpg',
					title: '点击可上传照片'
				}, ],
				newPhotoList: ''
			};
		},
		computed: {
			photoList() {
				if (this.vuex_login_type == 0 || this.vuex_login_type == 2) {
					// 提示用户注册,登录
					return this.defaultPhotoList1
				} else if (!this.vuex_user.photoList) {
					return this.defaultPhotoList2
				}
			}
		},
		methods: {
			tapPhoto(index) {
				// 本站用户点击可上传照片
				if (this.vuex_login_type == 1) {
					uni.chooseImage({
						count: 4, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (res) => {
							// 更新页面数据
							let photoList = res.tempFilePaths.map(res => {
								return {
									image: res
								}
							})
							this.newPhotoList = photoList;
							// 先本地存储上传图片请求
							let files = [];
							for (let i = 0; i < photoList.length; i++) {
								files.push({
									name: 'picture' + i,
									uri: photoList[i].image
								})
							}
							this.$u.vuex('vuex_photo_request', files);
							// 再利用防抖上传图片(避免发送大量图片请求), 成功后更改用户信息并删除本地的上传请求-> app启动检测->有上传请求, 则发送请求(因为是延时发送请求,用户有可能操作完照片墙后,还没等发送请求就下线了)
							this.changePhotoList(this, files);
						},
						fail: (err) => {
							console.log(err)
						}
					});
				} else {
					// 非本站用户点击提醒注册
					this.$u.toast('亲，注册成为本站用户才能上传照片哦！')
				}
			},
			// 发送请求到服务器, 更新用户photoList, 并本地存储
			changePhotoList: debounce((vm, files) => {
				vm.$u.api.uploadPhoto(files);
			}, 1000 * 5) // 5分钟后延时发送 
		}
	}
</script>

<style>
	.photo {
		padding: 30rpx;
	}
</style>
