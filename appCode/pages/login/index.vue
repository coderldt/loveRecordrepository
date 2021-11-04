<template>
	<view id="login">
		<div class="content">
			<h2>欢迎登录繁付愿</h2>
			<div class="login-form">
				<!-- <div class="login-name login-input">
					<input type="text" ref="username" name="username" v-model="login.username" autocomplete="off" />
					<span class="placeholder" :class="{fixed: login.username != '' && login.username != null}">用户名</span>
				</div> -->
				<!-- <div class="login-password login-input">
					<input type="password" name="password" v-model="login.password" @keyup.enter="submit"
						autocomplete="off" />
					<span class="placeholder" :class="{fixed: login.password != '' && login.password != null}">密码</span>
				</div> -->
				<u-input v-model="login.username" focus placeholder="请输入用户名"/>
				<u-input v-model="login.password" type="password" password-icon placeholder="请输入密码"/>
				<u-button :type="isInput" size="default" plain @click="onsubmit" hair-line>登录</u-button>
				<span class="quickLogin" @click="onQuickLogin" >快捷登录</span>
			</div>
		</div>
		<div :class="['notice', isShake ? 'isFouce' : '']">
			<u-checkbox v-model="noticeStatus"></u-checkbox>登录代表同意遵循繁夫愿予一切规则，一切解释权归繁夫愿予所有。
		</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { login } from '../../apis/login.js'
	export default {
		data() {
			return {
				login: {
					username: 'admin',
					password: '123456'
				},
				noticeStatus: true,
				isShake: false
			}
		},
		methods: {
			async onsubmit() {
				const status = this.loginVali()
				if (status) {
					try{
						const res = await login(this.login)
						const { id, phone, username, token } = res
						uni.setStorageSync('userInfo', JSON.stringify({ id, phone, username }));
						uni.setStorageSync('token', token)
						
						this.$refs.uToast.show({
							title: '登录成功',
							type: 'success',
							duration: 2000,
							isTab: true,
							url: '/pages/home/index'
						})
					}catch(e){
						console.log(e);
						this.$refs.uToast.show({
							title: '登录失败',
							type: 'error',
							duration: 2000,
						})
					}
					
				}
			},
			loginVali() {
				if (!this.login.username || !this.login.password) {
					this.$refs.uToast.show({
						title: '请先输入用户名或密码',
						type: 'warning',
						duration: 2000
					})
					return false
				}
				
				if (!this.noticeStatus) {
					this.$refs.uToast.show({
						title: '请认证阅读并勾选最下方的规则提示。',
						type: 'warning',
						duration: 2000
					})
					
					setTimeout(() => {
						this.isShake = true
					}, 2000)
					setTimeout(() => {
						this.isShake = false
					}, 5000)
					return false
				}
				
				return true
			},
			onQuickLogin () {
				this.$refs.uToast.show({
					title: '程序员小哥正在努力开发中，请稍等',
					type: 'primary',
					duration: 1500
				})
			},
		},
		computed: {
			isInput() {
				return this.login.username ? 'success' : ''
			}
		}
	}
</script>

<style lang="scss">
	#login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 50rpx;
		width: 100vw;
		height: 100vh;
		
		.content {
			flex: 1;
			width: 90%;
			margin: 0 auto;
			
			h2 {
				font-size: 42rpx;
				font-weight: 600;
				padding: 6vh 0 4vh;
			}
			
			.u-input {
				margin-bottom: .5em;
				border-bottom: 1px solid #ebebeb;
			}
			
			.u-btn {
				margin: 2em 0 1em;
			}
			
			.quickLogin {
				margin-top: .2em;
				float: right;
			}
		}
		
		.notice {
			position: relative;
			
			font-size: 24rpx;
			line-height: 24rpx;
			.u-checkbox {
				margin-bottom: 12rpx;
			}
			.u-checkbox__label {
				margin-left: 0;
			}
			
			&.isFouce {
				animation: 1s linear 0s infinite  move;
			}
		}
		
		@keyframes move
		{
			0%{ 
				left: 0px;
			}
			20% {  
				left: -3px;
			}
			40% {  
				left: 0px;
			}
			60% {  
				left: 3px;
			}
			80% {  
				left: -3px;
			}
			100% {  
				left: 0px;
			}
		}
	}
</style>
