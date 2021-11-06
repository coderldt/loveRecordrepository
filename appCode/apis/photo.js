import axios from './axios.js'

function getPhotoList (params) {
	return axios.post({ url: '/photo/list', data: params})
}

function addPhotoItem (data) {
	return axios.post({ url: '/photo/create', data})
}

export { getPhotoList, addPhotoItem }