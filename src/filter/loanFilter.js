const filterActive = {
    filterCustomerStatus(e) {
        let resString = '-'
        switch (e) {
            case `0`:
                resString = `Regular`
                break;
            case `2`:
                resString = `Black List`
                break;
            case `4`:
                resString = `inactive`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterGuarantorMethod(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `No Guarantee`
                break;
            case `02`:
                resString = `Guarantor`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterLoanStatus(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Request`
                break;
            case `02`:
                resString = `Approved`
                break;
            case `03`:
                resString = `Denied`
                break;
            case `10`:
                resString = `Closed`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterDisbursementStatus(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Total`
                break;
            case `02`:
                resString = `Partial`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterCheckerReview(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `agree`
                break;
            case `02`:
                resString = `return`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterAutoRepayActivation(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Auto-repay`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterTxTypCd(e) {
        let resString = '-'
        switch (e) {
            case `03`:
                resString = `RPYM`
                break;
            case `04`:
                resString = `DISB`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterDisbursementChannel(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Bank`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterTxTypDetail(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Repayment`
                break;
            case `02`:
                resString = `Disbursement`
                break;
            default:
                resString = `-`
        }
        return resString
    }
}
export default filterActive
