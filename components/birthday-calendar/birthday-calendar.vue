<template>
	<view>
		<u-calendar v-model="show" mode="date" @change="handleBirthday"
		month-arrow-color="#aaffff" year-arrow-color="#00aaff" color="#ff00ff"
		btn-type="error" toolTip="请选择生日" :max-year="nowYear"
		></u-calendar>
		<u-input v-model="birthday" :placeholder="vuex_user.birthday || '点此选择生日'" :disabled="true" @click="show=true"></u-input>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				nowYear: '',
				birthday: ''
			};
		},
		methods: {
			handleBirthday(e) {
				this.birthday = e.result;
				this.$emit('handleBirthday', this.birthday);
			}
			
		}
	}
</script>

<style>
	/deep/ .u-calendar__content{
		height: 700rpx;
	}
</style>
