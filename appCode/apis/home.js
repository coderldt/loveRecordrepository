import axios from './axios.js'

function getDetail (data) {
	return axios.get({ url: '/detail'})
}

export { getDetail }