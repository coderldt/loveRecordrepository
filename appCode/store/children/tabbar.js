

const state = {
	tabbars: [
		{
			pagePath: "/pages/home/index",
			iconPath: "http://180.76.173.85/upload/img/tabbar/home.png",
			selectedIconPath: "http://180.76.173.85/upload/img/tabbar/home_active.png",
			text: '首页',
			customIcon: false,
		},
		{
			pagePath: "/pages/course/index",
			iconPath: "http://180.76.173.85/upload/img/tabbar/record.png",
			selectedIconPath: "http://180.76.173.85/upload/img/tabbar/record_active.png",
			text: '历程',
			midButton: true,
			customIcon: false,
		},
		{
			pagePath: "/pages/my/index",
			iconPath: "http://180.76.173.85/upload/img/tabbar/my.png",
			selectedIconPath: "http://180.76.173.85/upload/img/tabbar/my_active.png",
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
