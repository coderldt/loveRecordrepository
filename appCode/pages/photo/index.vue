<template>
	<div id="photo" >
		<div class="control" >
			<div class="title" >相册</div>
			<div class="msg" >
				<div class="total">总数：{{ totalPic }}</div>
				<text class="iconfont" v-if="!isDel" @click="showFilter = !showFilter">&#xe714;</text>
				<text class="iconfont" :style="{ color: isDel ? 'blue' : '#b8b8b8' }" @click="isDel = !isDel">&#xe608;</text>
			</div>
		</div>
		<div class="content" >
			<div class="item" v-for="(item,index) in list" :key="index">
				<div class="time">{{item.createTime}}</div>
				<u-row gutter="16">
					<u-col span="4" v-for="(img, id) in item.pics" :key="id">
						<div class="u-rela" @click="onImgClick({ pics: item.pics, index: id })" >
							<u-image class="pic" :src="BASE_URL + img.img" width="230rpx" height="230rpx" mode="aspectFill" border-radius="10"></u-image>
							<text class="delStatus iconfont" v-if="isDel && delList.find(i => i.img === img.img && i.id === img.id)" >&#xe661;</text>
						</div>
					</u-col>
				</u-row>
			</div>
			<u-loadmore :status="status" />
		</div>
		<div class="addItem" :style="{ background: isDel ? '#fff' : '#3498db'}" >
			<!-- 删除 -->
			<text class="iconfont del" @click="delPics" v-if="isDel" :style="{ color: isDel ? '#ca5700' : '#fff', 'font-size': '60rpx' }">&#xe613;</text>
			<!-- 添加 -->
			<text class="iconfont" v-else @click="switchAddItem" style="font-size: 60rpx; color: #fff;">&#xe643;</text>
		</div>
		<u-action-sheet :list="getSheetList" v-model="showFilter" @click="onSheetClick"></u-action-sheet>
		<SortPopup :show="sortFilterStatus" @clone="sortFilterStatus = false" @onSortChange="onSortChange"></SortPopup>
		<u-calendar v-model="timeRangeStatus" mode="range" @change="onTimeRangeChange"></u-calendar>
		<u-toast ref="uToast" />
	</div>
</template>

<script>
	import { getPhotoList, removePhotoPics } from '../../apis/photo.js'
	import { BASE_URL } from '../../config/index.js'
	import SortPopup from './sortPopup.vue'
	import filterTool from '../../assets/img/svg/filter.svg'
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
				totalPic: 0,
				list: [],
				maxPage: null,
				status: 'loadmore',
				showFilter: false,
				isDel: false,
				delList: [],
				sortFilterStatus: false,
				timeRangeStatus: false,
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
					this.totalPic = res.totalPic
					let finallyList = []
					res.list.forEach(item => {
						let pics = []
						item.list.forEach(i => {
							i.pics.forEach(img => {
								pics.push({ img, id: i._id })
							})
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
			onImgClick ({ pics, index }) {
				if (this.isDel) {
					const { img, id } = pics[index]
					if (this.delList.find(i => i.img === img && i.id === id)) {
						this.delList = this.delList.filter(i => i.img !== img || i.id !== id)
					} else {
						this.delList.push(pics[index])
					}
				} else {
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
				}
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
			async delPics() {
				const res = await removePhotoPics({ list: this.delList })
				// 有点特殊，返回个空
				if (!res) {
					this.$refs.uToast.show({
						title: '删除成功',
						type: `success`,
					})
					this.reset()
					this.getList()
					this.delList = []
					this.isDel = false
				}
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
			.iconfont {
				font-size: 35rpx;
			}
			.iconfont + .iconfont {
				margin-left: 20rpx;
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
			
			.pic {	
				display: inline-block;
				margin-bottom: 20rpx;
			}
			
			.delStatus {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				font-size: 234rpx;
				color: #ff767588;
			}
		}
		.addItem {
			position: fixed;
			right: 40rpx;
			bottom: 40rpx;
			border-radius: 50%;
			padding: 20rpx;
		}
	}
</style>
