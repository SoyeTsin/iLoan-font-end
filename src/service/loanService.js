import ajax from "../lib/ajax";

const Loan = {
    // 贷款列表
    getLoanList(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL0TCDLE', { isOldBody: true, FormID: 'IL0TCDLE', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 贷款详情
    getLoanDetails(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1MLQ01', { isOldBody: true, FormID: 'IL1MLQ01', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 交易记录
    getLoanTransactionHistory(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL111004', { isOldBody: true, FormID: 'IL111004', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 贷款新增
    loanApplication(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL166682', { isOldBody: true, FormID: 'IL166682', body: param }).then(res => {
                resolve(res)
                console.log('loanApplication(param) = ', res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 修改审批
    editLoan(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL078901', { isOldBody: true, FormID: 'IL078901', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取修改值
    getEditDetails(LoanDubilNo) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL078902', { isOldBody: true, FormID: 'IL078902', body: { LoanDubilNo: LoanDubilNo }}).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 放款审批
    loanApproval(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL111005', { isOldBody: true, FormID: 'IL111005', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // ManualDisbursementApply
    ManualDisbursementApply(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1QS032', { isOldBody: true, FormID: 'IL1QS032', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // ManualDisbursementApproval
    ManualDisbursementApproval(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1QS033', { isOldBody: true, FormID: 'IL1QS033', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // Detailed inquiry of loan transaction flow
    getLoanHistDetail(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/il099002', { isOldBody: true, FormID: 'IL099002', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // Loan transaction flow deleted (Updated)
    deleteLoanHist(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/il099001', { isOldBody: true, FormID: 'IL099001', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 贷款pdf生成
    loanPDF(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL120801', { isOldBody: true, FormID: 'IL120801', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 贷款email发送
    loanSetEmail(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL020800', { isOldBody: true, FormID: 'IL020800', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // ManualRepaymentApply
    ManualRepaymentApply(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1QS034', { isOldBody: true, FormID: 'IL1QS034', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // ManualRepaymentApproval
    ManualRepaymentApproval(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1QS035', { isOldBody: true, FormID: 'IL1QS035', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 还款计划查询
    repaymentPlanEnquire(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1XF038', { isOldBody: true, FormID: 'IL1XF038', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 还款计划试用计算
    repaymentPlanTrialCalculation(param) {
        // param.PageRecCount = 9999;
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1XF039', { isOldBody: true, FormID: 'IL1XF039', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    RepayAmountTrial(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL1XF042', { isOldBody: true, FormID: 'IL1XF042', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    CollectionSummaryInfo(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL0TBD08', { isOldBody: true, FormID: 'IL0TBD08I', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getTotalOverdueAmount(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/IL0TBD07', { isOldBody: true, FormID: 'IL0TBD07', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    collectionListQuery(param) {
        return new Promise((resolve, reject) => {
            ajax.post('/il/DAIL/IL001035', { isOldBody: true, FormID: 'IL001035', body: param }).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default Loan
