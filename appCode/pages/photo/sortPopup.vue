<template>
	<u-modal class="sortModel" v-model="getStatus" show-cancel-button title="排序" @confirm="confirm">
		<view class="slot-content">
			<u-radio-group class="selectModel" v-model="value">
				<u-radio 
					v-for="(item, index) in list" :key="index" 
					:name="item.key"
					:disabled="item.disabled"
				>
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</view>
	</u-modal>
</template>

<script>
	export default {
		props: ["show"],
		data() {
			return {
				list: [
					{
						name: '升序',
						key: 'asc'
					},
					{
						name: '降序',
						key: 'desc'
					},
				],
				value: 'desc',
			}
		},
		computed: {
			getStatus: {
				get() {
					setTimeout(() => {
					}, 10)
					return this.show
				},
				set(val) {
					if (!val) {
						this.$emit('clone')
					}
				}
			}
		},
		methods: {
			confirm() {
				this.$emit('onSortChange', this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selectModel {
		display: flex;
		justify-content: center;
		margin: 30rpx 0;
	}
</style>
