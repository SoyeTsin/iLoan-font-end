import ajax from "../lib/ajax";

const Service = {
    // 产品修改历史
    getProductHistoryList(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/PD130002', { isOldBody: true, FormID: 'IL001081', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 客户操作历史
    getCustomerHistoryList(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/CU130002', { isOldBody: true, FormID: 'IL001081', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 贷款操作历史
    getLoanHistoryList(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL130002', { isOldBody: true, FormID: 'IL001081', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default Service
