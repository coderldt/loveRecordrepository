

const state = {
	tabbars: [
		{
			pagePath: "/pages/home/index",
			iconPath: "home",
			selectedIconPath: "home-fill",
			text: '首页',
			customIcon: false,
		},
		{
			pagePath: "/pages/course/index",
			iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
			selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
			text: '历程',
			midButton: true,
			customIcon: false,
		},
		{
			pagePath: "/pages/my/index",
			iconPath: "account",
			selectedIconPath: "account-fill",
			text: '我的',
			customIcon: false,
		},
	],
}

const mutations = {
}

const actions = {
}


export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
