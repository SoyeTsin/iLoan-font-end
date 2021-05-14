import ajax from "@/lib/ajax";
import config from "@/lib/config";

const Customer = {
	// 获取用户统计信息
	getStatistics() {
		return new Promise((resolve, reject) => {
			ajax.post('/cu/cu020001', { isOldBody: true, FormID: 'cu020001' }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 查询用户列表
	getCustomerList(param) {
		param.PageRecCount = config.pageSize;
		return new Promise((resolve, reject) => {
			ajax.post('/il/DAIL/IL001034', { isOldBody: true, FormID: 'IL001034', body: param }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 获取客户详情
	getCustomerDetails(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL1XT012', { isOldBody: true, FormID: 'IL1XT012', body: param }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 创建客户
	createCustomer(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL1XT008', { isOldBody: true, FormID: 'IL1XT008', body: param }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 客户审计
	customerReview(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/cu/cu020002', { isOldBody: true, FormID: 'cu020002', body: param }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 修改客户
	editCustomer(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL1XT001', { isOldBody: true, FormID: 'IL1XT001', body: param }).then(res => {
				resolve(res || {})
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 下载pdf
	downloadPDF(CustId, type) {
		type = type || 'pdf';
		const param = {
			CustId: CustId
		}
		if (type === 'email') {
			param.IsSendEmail = 'Y'
		}
		return new Promise((resolve, reject) => {
			ajax.post('/cu/cu1pdf01', { isOldBody: true, FormID: 'cu1pdf01', body: param }).then(res => {
				resolve(res || {})
			}).catch(error => {
				reject(error)
			})
		})
	}
}
export default Customer
