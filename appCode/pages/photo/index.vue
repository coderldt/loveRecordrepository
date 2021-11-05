<template>
	<div id="photo" >
		<div class="control" >
			<div class="title" >相册</div>
			<div class="msg" >
				<div class="total">总数：807</div>
				<div>筛选</div>
			</div>
		</div>
		<div class="content" >
			<div v-for="(item,index) in list" :key="index">
				<div>{{item.createTime}}</div>
				<div class="imgs" v-for="(i,idx) in item.list" :key="idx">
					<u-image v-for="(img, id) in i.pics" :src="BASE_URL + img" width="250rpx" height="250rpx" mode="aspectFill" border-radius="10"></u-image>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getPhotoList } from '../../apis/photo.js'
	import { BASE_URL } from '../../config/index.js'
	export default {
		data() {
			return {
				BASE_URL,
				list: []
			}
		},
		methods: {
			async getList() {
				const res = await getPhotoList()
				if (res) {
					this.list = res.list
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
				font-size: 28rpx;
				color: #b1b1b1;
				
				.total {
					flex: 1;
				}
			}
		}
		.content {
			.imgs {
				display: flex;
				justify-content: flex-start;
			}
		}
	}
</style>
