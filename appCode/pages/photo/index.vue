<template>
	<div id="photo" >
		<div class="control" >
			<div class="title" >相册</div>
			<div class="msg" >
				<div class="total">总数：807</div>
				<div>筛选</div>
			</div>
		</div>
		<div class="content" ></div>
	</div>
</template>

<script>
	import { getPhotoList } from '../../apis/photo.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async getList() {
				const res = await getPhotoList()
				if (res) {
					console.log(res);
				}
			}
		},
		onLoad() {
			this.getList()
		}
	}
</script>

<style lang="scss">
	#photo {
		.control {
			padding: 50rpx;
			box-shadow: 0 1px 3px #eaeaea;
			.title {
				margin-bottom: 30rpx;
				font-size: 50rpx;
				font-weight: 700;
			}
			.msg {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				color: #b1b1b1;
				
				.total {
					flex: 1;
				}
			}
		}
	}
</style>
