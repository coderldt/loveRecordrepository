<template>
	<div id="photo" >
		<div class="control" >
			<div class="title" >相册</div>
			<div class="msg" >
				<div class="total">总数：807</div>
				<div @click="showFilter = !showFilter">筛选</div>
			</div>
		</div>
		<div class="content" >
			<div class="item" v-for="(item,index) in list" :key="index">
				<div class="time">{{item.createTime}}</div>
				<div class="pics" >
					<u-image class="pic" v-for="(img, id) in item.pics" :key="id" @click="view({ pics: item.pics, index: id })" :src="BASE_URL + img" width="230rpx" height="230rpx" mode="aspectFill" border-radius="10"></u-image>
				</div>
			</div>
			<u-loadmore :status="status" />
		</div>
		<div class="addItem" >
			<u-image class="addIcon" :src="BASE_URL + addPath" @click="switchAddItem" width="90rpx" height="90rpx"></u-image>
		</div>
		<u-action-sheet :list="getSheetList" v-model="showFilter" @click="onSheetClick"></u-action-sheet>
		<SortPopup :show="sortFilterStatus" @clone="sortFilterStatus = false" @onSortChange="onSortChange"></SortPopup>
		<u-calendar v-model="timeRangeStatus" mode="range" @change="onTimeRangeChange"></u-calendar>
	</div>
</template>

<script>
	import { getPhotoList } from '../../apis/photo.js'
	import { BASE_URL } from '../../config/index.js'
	import SortPopup from './sortPopup.vue'
	export default {
		data() {
			return {
				BASE_URL,
				form: {
					pageSize: 5,
					page: 1,
					timeSort: 'desc',
					time: {
						start: '',
						end: ''
					}
				},
				list: [],
				maxPage: null,
				status: 'loadmore',
				showFilter: false,
				sortFilterStatus: false,
				timeRangeStatus: false,
				addPath: '/upload/img/2021-11-06/add.png'
			}
		},
		components: {
			SortPopup
		},
		computed: {
			getSheetList() {
				let time = ''
				if (this.form.time.start) {
					time += `（${this.form.time.start} - `
				}
				if (this.form.time.end) {
					time += `${this.form.time.end}`
				}
				this.form.time.start && (time += ' ）')
				return [
					{
						text: `排序 ${this.form.timeSort === 'desc' ? '（降序）' : '（升序）'}`
					}, 
					{
						text: `时间段 ${ time }`
					}
				]
			}
		},
		methods: {
			async getList() {
				this.status = 'loading'
				const res = await getPhotoList(this.form)
				if (res) {
					
					let finallyList = []
					res.list.forEach(item => {
						let pics = []
						item.list.forEach(i => {
							pics.push(...i.pics)
						})
						finallyList.push({
							createTime: item.createTime,
							pics
						})
					})
					this.maxPage = Math.ceil(res.total / this.form.pageSize)
					this.form.page += 1
					setTimeout(() => {
						this.list.push(...finallyList)
						
						this.status = "loadmore"
					}, 1000)
				} else {
					this.status = "loadmore"
				}
			},
			view ({ pics, index }) {
				uni.previewImage({
					current: index,
					urls: pics.map(i => this.BASE_URL + i),
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			onSheetClick(index) {
				if (index == 0) {
					this.sortFilterStatus = true
				} else if (index == 1) {
					this.timeRangeStatus = true
				}
			},
			onSortChange(value) {
				this.reset()
				this.form.timeSort = value
				this.getList()
			},
			onTimeRangeChange(value) {
				this.reset()
				const { startDate, endDate } = value
				this.form.time.start = startDate
				this.form.time.end = endDate
				this.getList()
			},
			switchAddItem() {
				uni.navigateTo({
					url: '/pages/photo/addPhotoItem'
				})
			},
			reset() {
				this.form.page = 1
				this.form.pageSize = 5
				this.maxPage = null
				this.list = []
			}
		},
		onReachBottom() {
			if (this.form.page > this.maxPage) {
				this.status = "nomore"
			} else {
				this.getList()
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
			position: fixed;
			width: 750rpx;
			top: 0;
			padding: 50rpx;
			box-shadow: 0 1px 3px #eaeaea;
			background-color: #fff;
			z-index: 99;
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
			margin-top: 210rpx;
			padding: 35rpx 25rpx;
			.time {
				margin: 20rpx 0;
				font-size: 30rpx;
				font-weight: 700;
			}
			.pics {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
			}
			
			.pic {
				margin-bottom: 20rpx;
			}
		}
		.addItem {
			position: fixed;
			right: 40rpx;
			bottom: 40rpx;
			background-color: #3498db;
			border-radius: 50%;
			padding: 20rpx;
		}
	}
</style>
