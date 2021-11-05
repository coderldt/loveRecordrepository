import axios from './axios.js'

function getPhotoList (params) {
	return axios.post({ url: '/photo/list'})
}

export { getPhotoList }