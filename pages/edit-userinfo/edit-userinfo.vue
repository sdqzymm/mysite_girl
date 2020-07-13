<template>
	<view class="edit">
		<view class="avatar">
			<view class="avatar-img" :style="[{backgroundImage:avatar?'url(' + avatar + ')':'url(' + '/static/avatar/photo1.jpg' + ')'}]"
			 @tap="handleAvatar"></view>
			<view class="tap-avatar" @tap="handleAvatar">点击修改头像</view>
		</view>

		<u-form :model="form" ref="uForm">
			<u-form-item label="昵称" prop="nickname">
				<u-input v-model="form.nickname" type="text" confirm-type="next" confirm-hold @confirm="goName" :placeholder="vuex_user.nickname || '请输入昵称'" />
			</u-form-item>

			<u-form-item label="姓名" prop="name">
				<u-input v-model="form.name" confirm-type="next" :focus="nameFocus" @confirm="goBirthday" :placeholder="vuex_user.name || '请输入姓名'" />
			</u-form-item>

			<u-form-item label="生日">
				<birthday-calendar @handleBirthday="handleBirthday" ref="birthday"></birthday-calendar>
			</u-form-item>

			<u-form-item label="性别">
				<u-radio-group v-model="gender">
					<u-radio v-for="(item, index) in genderList" :key="index" :name="item.name" :disabled="item.disabled"
					 :active-color="item.color">
						{{ item.value }}
					</u-radio>
				</u-radio-group>
			</u-form-item>

			<u-form-item label="个性签名" prop="signature" label-width="150">
				<u-input type="textarea" :placeholder="vuex_user.signature || '请填写个性签名，最多32个字'" v-model="form.signature" height="30" />
			</u-form-item>
		</u-form>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					nickname: '',
					signature: ''
				},
				rules: {
					nickname: [{
						max: 11,
						message: '昵称不能多于11个字',
						trigger: 'change'
					}],
					name: [{
						max: 5,
						message: '姓名不能多于5个字',
						trigger: 'change'
					}],
					signature: [{
						max: 32,
						message: '个性签名不能多于32个字',
						trigger: 'change'
					}]
				},
				gender: '',
				genderList: [{
					name: 1,
					value: '男',
					disabled: false,
					color: '#0081ff'
				}, {
					name: 0,
					value: '女',
					disabled: false,
					color: '#e54d42'
				}, {
					name: 2,
					value: '保密',
					disabled: true,
					color: 'grey'
				}, ],
				avatar: '',
				birthday: '',
				nameFocus: false
			}
		},
		onReady() {
			// form表单提交验证规则
			this.$refs.uForm.setRules(this.rules);
			this.nowYear = new Date().getFullYear();
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				// 发送请求, 修改用户信息, 请求成功更新本地信息
				this.submit()
			}
		},
		methods: {
			// 提交保存
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let formData = {
							name: this.form.name,
							nickname: this.form.nickname,
							signature: this.form.signature,
							birthday: this.birthday,
							gender: this.gender,
							auth_type: 0,
							app_key: this.vuex_user.app_key
						}
						let lifeData = uni.getStorageSync('lifeData');
						console.log(lifeData, typeof lifeData, lifeData.vuex_user);
						let access_token = lifeData.vuex_user.access_token;
						uni.uploadFile({
							'url': 'http://192.168.3.20:8000/api/account/v1/profile/',
							'fileType': 'image',
							name: 'avatar',
							header: {
								'Authorization': `Token ${access_token}`
							},
							filePath: this.avatar,
							formData: formData,
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
							},
							fail:(err)=>{
								console.log(err)
							}
						})
						
					} else {
						console.log('验证失败');
					}
				});
			},
			// 处理头像
			handleAvatar() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.avatar = res.tempFilePaths[0];
					}
				})
			},
			// 处理生日
			handleBirthday(birthday) {
				this.birthday = birthday;
			},
			// nickname确认跳转name
			goName() {
				this.nameFocus = true;
			},
			// name确认跳转生日
			goBirthday() {
				uni.hideKeyboard();
				this.$refs.birthday.show = true;
			}
		}
	}
</script>

<style>
	.edit {
		margin: 0 30rpx;
	}

	.avatar {
		height: 250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tap-avatar {
		margin-top: 30rpx;
		color: #ff7a4e;
	}

	.avatar-img {
		width: 150rpx;
		height: 150rpx;
		background-size: cover;
		background-position: center;
		border-radius: 50%;
	}
</style>
