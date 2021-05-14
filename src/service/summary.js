import ajax from "@/lib/ajax";

const Summary = {
	// Loan Balance Statistics
	getBalance() {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL001104', { isOldBody: true, FormID: 'IL001104' }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	},
	// Loan Customer Statistics
	getCustomer() {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL001103', { isOldBody: true, FormID: 'IL001103' }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	},
	// Loan Risk Statistics
	getRisk() {
		return new Promise((resolve, reject) => {
			ajax.post('/il/IL107703', { isOldBody: true, FormID: 'IL107703' }).then(res => {
				resolve(res || [])
			}).catch(error => {
				reject(error)
			})
		})
	}
}
export default Summary
