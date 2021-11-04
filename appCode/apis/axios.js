import { BASE_URL } from '../config/index.js'

const hanlderResponse = (res) => {
	const { status, data, msg } =  res.data
	let response = null
	switch(status) {
		case 200:
			return data
		case 401:
			 uni.showToast({
				title: msg,
				duration: 1500,
				icon: "none",
				success() {
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/index",
						})
					}, 2000)
				}
			});
			return
		default :
			return data
	}
}

const ajax = {
	get: function (params) {
		const { url, data = {} } = params
		let query = ''
		Object.entries(data).forEach(([key, values]) => {
			query += `${key}=${values}&`
		})
		
		let finallyUrl = url
		if (query) {
			finallyUrl += `${query.slice(0, -1)}`
		}
		return this.ajax({ url: finallyUrl })
	},
	post: function (params) {
		const { url, data } = params
		return this.ajax({ url, data, method: 'POST' })
	},
	ajax({ url, method = 'GET', data = {}, header = {} }) {
		return new Promise((resolve, reject) => {
			let token = null
			try{
				token = uni.getStorageSync('token')
			}catch(e){
				reject(false)
			}
			token && (header.token = token)
			console.log({
				method,
				url: `${BASE_URL}${url}`,
				data,
				header,
			});
			uni.request({
				method,
				url: `${BASE_URL}${url}`,
				data,
				header,
				success: (res) => {
					resolve(hanlderResponse(res))
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
}

export default ajax