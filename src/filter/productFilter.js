const filterActive = {
    filterProdtStatus(e, text) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = text
                break;
            case `02`:
                resString = text
                break;
            case `03`:
                resString = text
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterLoanGuarManrCd(e) {
        let resString = 'Not Guarantee'
        switch (e) {
            case `01`:
                resString = `Not Guarantee`
                break;
            case `02`:
                resString = `Guarantor`
                break;
            default:
                resString = `Not Guarantee`
        }
        return resString
    },
    filterLoanProdtTypCd(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Personal`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterLoanProdtClsfCd(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Micro Loan`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterNumberOfApplicant(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Single customer`
                break;
            case `02`:
                resString = `Not single customer`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterChrgManrCd(e) {
        let resString = '-'
        switch (e) {
            case `02`:
                resString = `Fixed principal`
                break;
            case `01`:
                resString = `Fixed installment`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterPmitAdvRepayFlg(e) {
        let resString = 'Not Allow'
        switch (e) {
            case `1`:
                resString = `Allow`
                break;
            case `0`:
                resString = `Not Allow`
                break;
            default:
                resString = `Not Allow`
        }
        return resString
    },
    filterApproval(e, text) {
        let resString = '-'
        switch (e) {
            case `1`:
                resString = text
                break;
            case `2`:
                resString = text
                break;
            case `3`:
                resString = `-`
                break;
            case `9`:
                resString = `-`
                break;
            case `10`:
                resString = text
                break;
            default:
                resString = `-`
                break;
        }
        return resString
    },
    filterExmnvrfyStusCd(e) {
        let resString = '-'
        switch (e) {
            case `1`:
                resString = `Agreed`
                break;
            case `2`:
                resString = `Pending`
                break;
            case `3`:
                resString = `-`
                break;
            case `9`:
                resString = `-`
                break;
            case `10`:
                resString = `Return`
                break;
            default:
                resString = `-`
                break;
        }
        return resString
    },
    filterAplyLoanAmtCeilVal(e) {
        return e + ''
    }
}
export default filterActive
