import BASE_URL from './api/base_url.js';


// 照片墙上传及用户信息编辑
const uploadFile = (vm, file, opt) => {
	// 先发送空请求(token过期时能自动刷新)
	vm.$u.post('/api/account/v1/blank/').then(res => {
		if(res.code == 10800) {
			opt = opt || {};
			opt.url = BASE_URL + opt.url;
			opt.fileType = opt.fileType || 'image';
			opt.header = {
				'Authorization': `Token ${vm.vuex_user.access_token}`
			},
			opt.formData = opt.formData || {};
			opt.formData.auth_type = 0;
			opt.formData.app_key = vm.vuex_user.app_key;
			opt.name = opt.name || 'photo';
			if(typeof file != 'string') {
				// 上传多张照片, 为了兼容小程序, 每次只能上传1个文件
				for(let i=0; i<file.length; i++) {
					opt.formData.index = i;
					opt.filePath = file[i].uri;
					uni.uploadFile(opt)
				}
			} else {
				// 上传头像及用户信息
				uni.uploadFile(opt)
			}	
		}		
	})
}

export default uploadFile;
