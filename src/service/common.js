import ajax from "../lib/ajax";
const CM = {
	// il登录
	auth(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/il/DAIL/IL001061', param).then(res => {
				resolve(res.data || {})
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 选项列表查询
	// getOptionList(pareClsId) {
	// 	return new Promise((resolve, reject) => {
	// 		ajax.post('/il/DAIL/IL001058', { isOldBody: true, FormID: 'IL001058' }).then(res => {
	// 			if (pareClsId) {
	// 				resolve(res[pareClsId] || {})
	// 			} else {
	// 				resolve(res || {})
	// 			}
	// 		}).catch(error => {
	// 			reject(error)
	// 		})
	// 	})
	// },
	getOptionList(param = {}) {
		return new Promise((resolve, reject) => {
			let langIdentify = 'en-US'
			if (localStorage.getItem('language') === 'th') {
				langIdentify = 'th-TH'
			}
			if (localStorage.getItem('language') === 'en') {
				langIdentify = 'en-US';
			}
			if (localStorage.getItem('language') === 'zh') {
				langIdentify = 'zh-CN'
			}
			if (localStorage.getItem('language') === 'sp') {
				langIdentify = 'sp-SP'
			}
			if (localStorage.getItem('language') === 'fr') {
				langIdentify = 'fr-FR'
			}

			// param.LangIdentify = langIdentify;
			ajax.post('/il/DAIL/IL001058', { isOldBody: true, FormID: 'IL001058', body: { LangIdentify: langIdentify }}).then(res => {
				if (param.PareClsId) {
					resolve(res[param.PareClsId] || {})
				} else {
					resolve(res || {})
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 文件上传
	upFile(param) {
		return new Promise((resolve, reject) => {
			ajax.post('/cm/CM090002', param, { type: 'file' }).then(res => {
				resolve(res.data || {})
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 文件下载
	downloadFile(fileId) {
		return new Promise((resolve, reject) => {
			if (fileId) {
				ajax.post('/cm/CM090003', { FileId: fileId }).then(res => {
					resolve(res.data || {})
				}).catch(error => {
					reject(error)
				})
			}
		})
	}
}
export default CM
