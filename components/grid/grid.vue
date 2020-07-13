<template>
	<u-grid :col="3" :border="false">
		<block v-for="(item, index) in gridList" :key="item.id">
			<u-grid-item :index="index" @click="tapGrid">
				<u-badge v-if="item.num>0" :count="item.num" :offset="[20, item.num>99 ? 50 : 55]"></u-badge>
				<u-icon :name="item.icon" :size="46" :color="item.color"></u-icon>
				<view class="grid-text">{{item.title}}</view>
			</u-grid-item>
		</block>
	</u-grid>
</template>

<script>
	export default { 
		data() {
			return {
				index: 0,
				gridList: [{
						id: 1,
						title: '浏览历史',
						type: 'navigateTo',
						url: '',
						icon: 'eye',
						color: '#e54d42'
					},
					{
						id: 2,
						title: '账号',
						type: 'navigateTo',
						url: '',
						icon: 'account',
						color: '#f37b1d',
						num: '99'
					},
					{
						id: 3,
						title: '编辑',
						type: 'navigateTo',
						url: '',
						icon: 'edit-pen',
						color: '#fbbd08',
						num: '9'
					},
					{
						id: 4,
						title: '消息通知',
						type: 'navigateTo',
						url: '',
						icon: 'info',
						color: '#8dc63f',
						num: '999'
					},
					{
						id: 5,
						title: '意见反馈',
						type: 'navigateTo',
						url: '',
						icon: 'error',
						color: '#1cbbb4'
					},
					{
						id: 6,
						title: '照片',
						type: 'navigateTo',
						url: '',
						icon: 'photo',
						color: '#0081ff'
					},
				],
			};
		},
		mounted() {
			
		},
		methods: {
			tapGrid(index) {
				// 跳转this.gridList[index].url
				this.$u.toast(this.gridList[index].title)
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 10rpx;
		color: $u-type-info;
	}
</style>
