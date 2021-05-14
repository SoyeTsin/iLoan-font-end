import ajax from "../lib/ajax";

const Notification = {
    // 消息通知-邮件模板新增
    addNotification(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/cm/cm050001', { isOldBody: true, FormID: 'CM050001', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 消息通知-邮件模板更新
    updateNotification(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/cm/cm050002', { isOldBody: true, FormID: 'CM050002', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 消息通知-邮件发送模板查询
    queryNotification(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/cm/cm050003', { isOldBody: true, FormID: 'CM050003', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 消息通知-产品参数列表查询
    queryNotificationProduct(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/cm/cm050006', { isOldBody: true, FormID: 'CM050006', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 消息通知-邮件模板与产品关联新增
    addNotificationValidate(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/cm/cm050004', { isOldBody: true, FormID: 'CM050004', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 消息通知-邮件模板删除
    deleteNotification(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/cm/cm050005', { isOldBody: true, FormID: 'CM050005', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }

}
export default Notification
