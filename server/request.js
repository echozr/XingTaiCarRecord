   export default {
	//全局配置
	common: {
		baseUrl: "http://60.6.237.50:9010/XingTaiCarRecord",
		/* baseUrl: "http://60.6.237.50:9010/XingTaiCarRecordTest", */
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {},
		method: 'POST',
		dataType: 'json'
	},
	//请求返回promise
	request(options = {}) {
		//设置请求参数
		options.url = this.common.baseUrl + options.url
		options.header = options.header || this.common.header
		options.data = options.data || this.common.data
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		return new Promise((res, rej) => {
			//添加拦截器
			//发起请求
			uni.request({
				...options,
				success: (result) => {
					//判断状态码
					if (result.statusCode === 200) {
						if (result.data.status === 0) {
							return res(result.data)
						} else if (result.data.status === 20) {
							return this.doLogin();
						} else {
							return rej(result.data.msg)
						}
					} else { //请求失败
						return rej(result.errMsg)
					}
				},
				fail: (error) => {
					console.log("请求失败")
					return rej(error.msg)
				}
			});
		})
	},
	//get请求
	get(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	//post请求
	post(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	doLogin() {
		uni.navigateTo({
			url: '/pages/login/login',
		});
	}
}
