<template>
	<view>
		<button @click="test">测试无感知刷新</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			test() {
				this.$u.post('/api/account/v1/test/').then(res=>{
					console.log(5);
					console.log(res);
				})
			}
		},
		
		
	}
</script>

<style>

</style>
