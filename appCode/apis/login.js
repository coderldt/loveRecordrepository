import axios from './axios.js'

function login (data) {
	return axios.post({ url: '/api/login', data})
}

export { login }