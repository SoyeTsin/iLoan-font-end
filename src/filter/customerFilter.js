const filterActive = {
    filterEmergencyContactRelationship(e) {
        let resString = '-'
        switch (e) {
            case `201`:
                resString = `Spouse`
                break;
            case `202`:
                resString = `Children`
                break;
            case `203`:
                resString = `Parents`
                break;
            case `205`:
                resString = `Self`
                break;
            case `206`:
                resString = `brother and sister`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterCustomerStatus(e) {
        let resString = '-'
        switch (e) {
            case `1`:
                resString = `Individual`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterGender(e) {
        let resString = '-'
        switch (e) {
            case `0`:
                resString = `Male`
                break;
            case `1`:
                resString = `Female`
                break;
            case `2`:
                resString = `Other`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterIDType(e) {
        let resString = '-'
        switch (e) {
            case `101`:
                resString = `Citizen ID`
                break;
            case `104`:
                resString = `Passport`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterMaritalStatus(e) {
        let resString = '-'
        switch (e) {
            case `10`:
                resString = `Unmarried`
                break;
            case `20`:
                resString = `Married`
                break;
            case `99`:
                resString = `UnKnown`
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterHighestEducationLevel(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = `Under Bachelor`
                break;
            case `02`:
                resString = `Bachelor`
                break;
            case `03`:
                resString = `Master`
                break;
            case `04`:
                resString = `Doctor`
                break;
            default:
                resString = `-`
        }
        return resString
    }
}
export default filterActive
