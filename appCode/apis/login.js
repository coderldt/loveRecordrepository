import axios from './axios.js'

function login (params) {
	return axios.post(params)
}

export { login }