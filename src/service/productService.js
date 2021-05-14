import ajax from "../lib/ajax";

const Service = {
	// 产品列表
	getProductList(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL001081', { isOldBody: true, FormID: 'IL001081', body: param }).then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 产品修改
	editProduct(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL001083', { isOldBody: true, FormID: 'IL001083', body: param }).then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 产品新增
	createProduct(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL001082', { isOldBody: true, FormID: 'IL001082', body: param }).then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 产品详情
	getProductDetails(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL001080', { isOldBody: true, FormID: 'IL001080', body: param }).then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 产品审核
	reviewProduct(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL001084', { isOldBody: true, FormID: 'IL107703', body: param }).then(res => {
				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	}
}
export default Service
