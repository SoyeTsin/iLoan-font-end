const filterActive = {
    prodFilter(e) {
        let resString = ''
        switch (e) {
            case `ProdtStus`:
                resString = `Product Status`
                break;
            case `LoanProdtNo`:
                resString = `Product ID`
                break;
            case `LoanProdtNm`:
                resString = `Product Name`
                break;
            case `LoanProdtTypCd`:
                resString = `Product Type`
                break;
            case `LoanProdtClsfCd`:
                resString = `Product Category`
                break;
            case `LoanGuarManrCd`:
                resString = `Guarantee Method`
                break;
            case `CurCd`:
                resString = `Currency`
                break;
            case `ApplicationDate`:
                resString = `Application Date`
                break;
            case `ApprovalDate`:
                resString = `Approval Date`
                break;
            case `DrawdownDate`:
                resString = `Effective Date`
                break;
            case `MaturityDate`:
                resString = `Expiry Date`
                break;
            case `NumberOfApplicant`:
                resString = `Number of Applicant`
                break;
            case `AplyLoanAmtCeilVal`:
                resString = `Maximum Loan Amount USD`
                break;
            case `MinInterestRate`:
                resString = `Minimum Interest Rate`
                break;
            case `MaxInterestRate`:
                resString = `Maximum Interest Rate`
                break;
            case `ChrgManrCd`:
                resString = `Repayment Detail`
                break;
            case `PmitAdvRepayFlg`:
                resString = `Early Repayment Allowance`
                break;
            case `OprorEmpnbr`:
                resString = `Maker User ID`
                break;
            case `OperRplshInfo`:
                resString = `Maker Comment`
                break;
            case `CheckEmpnbr`:
                resString = `Check User ID`
                break;
            case `ExmnvrfyStusCd`:
                resString = `Review`
                break;
            case `CheckRplshInfo`:
                resString = `Checker Comment`
                break;
            default:
                resString = e
        }
        return resString
    },
    custFilter(e) {
        let resString = ''
        switch (e) {
            case `Status`:
                resString = `Customer Status`
                break;
            case `CustId`:
                resString = `CIF`
                break;
            case `CustType`:
                resString = `Customer Type`
                break;
            case `OtherBankName`:
                resString = `Bank Name`
                break;
            case `SwiftCode`:
                resString = `BIC`
                break;
            case `AcctNo`:
                resString = `Bank Account Number`
                break;
            case `AcctName`:
                resString = `Bank Account Name`
                break;
            case `Title`:
                resString = `Title`
                break;
            case `FirstName`:
                resString = `FirstName`
                break;
            case `LastName`:
                resString = `LastName`
                break;
            case `Birthday`:
                resString = `Birthdate`
                break;
            case `age`:
                resString = `Age`
                break;
            case `Gender`:
                resString = `Gender`
                break;
            case `IdType`:
                resString = `ID Type`
                break;
            case `IdNo`:
                resString = `Certificate ID`
                break;
            case `IdCountry`:
                resString = `Passport Country`
                break;
            case `Country`:
                resString = `Nationality`
                break;
            case `ProofId`:
                resString = `Proof of Identity`
                break;
            case `HouseHoldRgstNumber`:
                resString = `Household Registration Number`
                break;
            case `Addr`:
                resString = `Registration Street Address`
                break;
            case `AddrCity`:
                resString = `Registration Suburb/District`
                break;
            case `AddrProvinceState`:
                resString = `Registration State/Province`
                break;
            case `AddrCountry`:
                resString = `Registration Country`
                break;
            case `ZipCode`:
                resString = `Registration Zipcode/Postcode`
                break;
            case `ContractNo`:
                resString = `Customer Phone Number`
                break;
            case `WorkPhoneNo`:
                resString = `Work Phone Number`
                break;
            case `Email`:
                resString = `Email`
                break;
            case `EmergencyName`:
                resString = `Emergency Contact Name`
                break;
            case `EmergencyContactRelationship`:
                resString = `Emergency Contact Relationship`
                break;
            case `EmergencyContactNo`:
                resString = `Emergency Contact Phone Number`
                break;
            case `EmergencyAddr`:
                resString = `Emergency Contact Address`
                break;
            case `Education`:
                resString = `Highest Education Level`
                break;
            case `ShoolName`:
                resString = `Institution`
                break;
            case `Major`:
                resString = `Major`
                break;
            case `MaxDegrGradDate`:
                resString = `Year of Graduation`
                break;
            case `Job`:
                resString = `Occupation`
                break;
            case `JobStatus`:
                resString = `Occupation Note`
                break;
            case `CompanyName`:
                resString = `Employer Name`
                break;
            case `CompanyAddr`:
                resString = `Employer Address`
                break;
            case `MthIncomAmt`:
                resString = `Monthly Income USD`
                break;
            case `MaritalStatus`:
                resString = `Marital Status`
                break;
            case `SpouseName`:
                resString = `Spouse Name`
                break;
            case `SpouseIdType`:
                resString = `Spouse ID Type`
                break;
            case `SpouseIdNo`:
                resString = `Spouse Certificate ID`
                break;
            case `SpouseIdCountry`:
                resString = `Spouse Passport Country`
                break;
            case `SpousTelNum`:
                resString = `Spouse Phone Number`
                break;
            case `SpouseCompany`:
                resString = `Spouse Employer Name`
                break;
            case `SpouseIncom`:
                resString = `Spouse Monthly Income USD`
                break;
            case `FosterNumber`:
                resString = `Number of Children`
                break;
            case `ChgTeller`:
                resString = `Maker User ID`
                break;
            case `NewComment`:
                resString = `Maker Comment`
                break;
            case `ApprvTeller`:
                resString = `Checker User ID`
                break;
            case `ApprvSugstnComnt`:
                resString = `Checker Comment`
                break;
            default:
                resString = e
        }
        return resString
    },
    loanFilter(e) {
        let resString = ''
        switch (e) {
            case `GuarMethod`:
                resString = `Guarantee Method`
                break;
            case `GuarNm`:
                resString = `Guarantor Name`
                break;
            case `GuarIDTp`:
                resString = `Guarantor ID Type`
                break;
            case `GuarIdNo`:
                resString = `Guarantor Certificate ID`
                break;
            case `GuarPassCountry`:
                resString = `Guarantor Passport Country`
                break;
            case `RelaAcctName`:
                resString = `Bank Name`
                break;
            case `BIC`:
                resString = `BIC`
                break;
            case `RelaAcctNo`:
                resString = `Bank Account Number`
                break;
            case `Status`:
                resString = `Customer`
                break;
            case `RelaAcctOpnAcctBnkBnkName`:
                resString = `RelaAcctOpnAcctBnkBnkName`
                break;
            case `LoanStatus`:
                resString = `Loan Status`
                break;
            case `LoanDubilNo`:
                resString = `Loan Reference Number`
                break;
            case `LoanProdtNo`:
                resString = `Product ID`
                break;
            case `productName`:
                resString = `Product Name`
                break;
            case `ArrangementPurpose`:
                resString = `Arrangement Purpose`
                break;
            case `CreditAmt`:
                resString = `Amount USD`
                break;
            case `Intr`:
                resString = `Interest Rate`
                break;
            case `UseLimit`:
                resString = `Credit Usage USD`
                break;
            case `LoanDeadl`:
                resString = `Tenor Months`
                break;
            case `AplyMakelnDt`:
                resString = `Application Date`
                break;
            case `ActlMakelnDt`:
                resString = `Drawdown Date`
                break;
            case `MatrDt`:
                resString = `Maturity Date`
                break;
            case `DisbursementStatus`:
                resString = `DisbursementStatus`
                break;
            case `LoanAmt`:
                resString = `Disbursement Amount USD`
                break;
            case `LoanChannel`:
                resString = `Disbursement Channel`
                break;
            case `LoanDeadlUnitCd`:
                resString = `Repayment Frequency`
                break;
            case `AuotoRepyFlag`:
                resString = `Auto-repay Activation`
                break;
            case `RepayDay`:
                resString = `Repayment Date`
                break;
            case `InstallmentAmount`:
                resString = `InstallmentAmount`
                break;
            case `OutstandingBalance`:
                resString = `Outstanding Balance`
                break;
            case `Principal`:
                resString = `Principal`
                break;
            case `Interest`:
                resString = `Interest`
                break;
            case `OverDueamt`:
                resString = `Overdue Amount`
                break;
            case `AppFee`:
                resString = `Application Fees`
                break;
            case `ProcFee`:
                resString = `Processing/Origination Fees`
                break;
            case `OverFee`:
                resString = `Overdue Fees`
                break;
            case `AdvRepayFee`:
                resString = `Anticipated Repayment Fees`
                break;
            case `ExtsnFee`:
                resString = `Extension Fees`
                break;
            case `RepayPlanFee`:
                resString = `Repayment Plan Adjustment Fees`
                break;
            case `Tax`:
                resString = `Tax Fees`
                break;
            case `MakelnEmpnbr`:
                resString = `Maker User ID`
                break;
            case `MakelnComnt`:
                resString = `Maker Comment`
                break;
            case `CheckerEmpnbr`:
                resString = `User ID`
                break;
            case `CheckerReview`:
                resString = `Review`
                break;
            case `CheckerComnt`:
                resString = `Checker Comment`
                break;
            default:
                resString = e
        }
        return resString
    }
}
export default filterActive
