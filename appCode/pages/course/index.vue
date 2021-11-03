<template>
	<div>
		2
		<u-tabbar :list="tabbars" :mid-button="true"></u-tabbar>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState('tabbar', ['tabbars'])
		},
		methods: {
		}
	}
</script>

<style>
</style>
