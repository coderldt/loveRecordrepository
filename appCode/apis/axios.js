const BASE_URL = 'http://180.76.173.85' // 服务器
// const BASE_URL = 'http://localhost:3000' // 开发

const hanlderResponse = (response) => {
	return response
}

const ajax = {
	get: function (params) {
		const { url, data } = params
		let query = ''
		Object.entries(data).forEach(([key, values]) => {
			query += `${key}=${values}&`
		})
		return this.ajax({ url: `${url}?${query.slice(0, -1)}` })
	},
	post: function (params) {
		const { url, data } = params
		return this.ajax({ url, data, method: 'POST' })
	},
	ajax({ url, method = 'GET', data, header = {} }) {
		return new Promise((resolve, reject) => {
			let token = null
			try{
				token = uni.getStorageSync('token')
			}catch(e){
				reject(false)
			}
			token && (header.token = token)
			
			uni.request({
				method,
				url: `${BASE_URL}${url}`,
				data,
				header,
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
}

export default ajax