<template>
	<div id="home" :style="{ 'background-image': `url(${bacgGround})` }">
		<div class="content">
			<div class="baseMsg" >
				<div class="img" v-if="userList.length !== 0">
					<u-image class="man" :src="userList[0].avatar" width="120rpx" height="120rpx" mode="aspectFill" border-radius="10"></u-image>
					<u-image class="woman" :src="userList[1].avatar" width="120rpx" height="120rpx" mode="aspectFill"  border-radius="10"></u-image>
				</div>
				<div class="time" >
					始于：{{ detail.startTime || '' }}
				</div>
				<div class="afterDay" >已经 {{ dayCount }} 天</div>
			</div>
			<div class="module" >
				<div class="moduleItem" v-for="(item,index) in modulesList" :key="index" :style="{ background: item.back }">
					<u-image class="icon" v-if="item.img" :src="item.img" width="90rpx" height="90rpx"></u-image>
					<div class="msg u-flex-1" >
						<div class="title u-line-1">{{item.title}}</div>
						<div class="desc u-line-1">{{item.desc}}</div>
					</div>
				</div>
			</div>
		</div>
		<u-tabbar :list="tabbars" :mid-button="true" activeColor="#5098ff"></u-tabbar>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { getDetail } from '../../apis/home.js'
	export default {
		data() {
			return {
				userList: [],
				detail: {},
				dayCount: '',
				img: '', 
				modulesList: [
					{ img: 'http://180.76.173.85/upload/img/2021-11-04/memorandum.png', title: "备忘录", desc: "代办事项", path: '', back: '#1ad06b' },
					{ img: 'http://180.76.173.85/upload/img/2021-11-04/pics.png', title: "相册", desc: "记录每一点", path: '', back: '#2b9ce1' },
					{ img: 'http://180.76.173.85/upload/img/2021-11-04/hert.png', title: "心情", desc: "记录每日心情记录每日心情", path: '', back: "#334961" },
					{ img: '', title: "", desc: "", path: '', back: "#a258bb" },
					{ img: '', title: "", desc: "", path: '', back: "#f0c101" },
					{ img: '', title: "", desc: "", path: '', back: "#94a3a2" },
				],
				bacgGround: 'http://180.76.173.85/upload/img/2021-11-04/backgroung.png'
			}
		},
		computed: {
			...mapState('tabbar', ['tabbars'])
		},
		methods: {
			async getData() {
				const res = await getDetail()
				if (res) {
					this.userList = res.user
					this.img = res.user[0].avatar
					this.detail = res.detail
					this.dayCount = res.dayCount
				}
			},
		},
		created() {
			this.getData()
		}
	}
</script>

<style lang="scss">
	#home {
		height: 100vh;
		color: #fff;
		background-color: #d5d0cc;
		background-repeat: no-repeat;
		background-origin: right;
		background-size: 100% calc(100%-50px);
		
		.content {
			padding: 50rpx;
			font-size: 32rpx;
			line-height: 2em;
			
			.img {
				display: flex;
				margin: 2em 0 1em;
				
				.man {
					margin-right: 2em;
				}
			}
		}
		
		.module {
			position: absolute;
			bottom: 50px;
			left: 30rpx;
			right: 30rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			line-height: 1em;
			
			.moduleItem {
				width: calc(50% - 15rpx);
				display: flex;
				align-items: center;
				padding: 30rpx;
				margin-bottom: 30rpx;
				border-radius: 15rpx;
				min-height: 62px;
				overflow: hidden;
				.msg {
					overflow: hidden;
				}
				.icon {
					margin-right: 30rpx;
				}
				
				.title {
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}
				
				.desc {
					font-size: 24rpx;
					
				}
			}
		}
	}
</style>
