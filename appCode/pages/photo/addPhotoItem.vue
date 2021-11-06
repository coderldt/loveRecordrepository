<template>
	<div id="addPototItem">
		<u-notice-bar mode="horizontal" :list="list"></u-notice-bar>
		<div class="form">
			<u-form :model="form" ref="uForm">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="left " label="标题" prop="title">
					<u-input :border="border" placeholder="请输入标题, 必填" v-model="form.title" type="text"></u-input>
				</u-form-item>
				<u-form-item label-position="left" label="描述" label-width="120" prop="desc">
					<u-input type="textarea" :border="border" placeholder="请填写描述, 选填" v-model="form.desc" />
				</u-form-item>
				<u-form-item label-position="left" label="上传图片" label-width="120">
					<u-upload ref="uUpload" width="160" height="160" :action="action" :auto-upload="false" @on-uploaded="successUpload"></u-upload>
				</u-form-item>
				<div class="btn" >
					<u-button class="upload" @click="upload">上传</u-button>
					<u-button @click="submit" >提交</u-button>
				</div>
			</u-form>
		</div>
		<u-toast ref="uToast" />
	</div>
</template>

<script>
	import { BASE_URL } from '../../config/index.js'
	import { addPhotoItem } from '../../apis/photo.js'
	export default {
		data() {
			return {
				form: {
					title: '',
					desc: '',
					pics: []
				},
				rules: {
					title: [
						{
							required: true,
							message: '请输入标题',
							trigger: 'blur' ,
						}
					]
				},
				action: BASE_URL + '/upload',
				list: ['标题和图片是必填；请先选择图片，点击上传，最后点击提交。']
			}
		},
		methods: {
			upload() {
				this.$refs.uUpload.upload();
			},
			async submit() {
				this.form.pics = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				}).map(i => i.response.data[0])
				
				const valid = await this.$refs.uForm.validate()
				if (!valid) return
				if (!this.form.pics.length) {
					return this.$refs.uToast.show({
						title: '请填写必填项',
						type: `warning`,
					})
				}
				
				const res = await addPhotoItem(this.form)
				if (res) {
					this.$refs.uToast.show({
						title: '添加成功',
						type: `success`,
						url: '/pages/photo/index'
					})
				}
			},
			successUpload(e) {
				const errorList = e.filter(item => item.progress !== 100)
				
				this.$refs.uToast.show({
					title: `${ !errorList.length ? '上传成功' : '上传失败' + errorList.length + '张' }`,
					type: `${ errorList.length ? 'error' : 'success' }`,
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		padding: 30rpx;
		
		.btn {
			display: flex;
			justify-content: flex-end;
			padding: 20rpx;
		}
		.upload {
			margin-right: 20rpx;
		}
	}
</style>
