const inputMsg = 'Please input correct information';
const formValidate = {
	CIF: [
		'CIF',
		{
			rules: [{
				required: true,
				max: 30,
				message: inputMsg
			}]
		}
	],
	GuaranteeName: [
		'GuaranteeName',
		{
			rules: [{
				required: true,
				max: 30,
				message: inputMsg
			}]
		}
	],
	GuaranteeIDType: [
		'GuaranteeIDType',
		{
			initialValue: '101',
			rules: [{
				required: true,
				max: 30,
				message: inputMsg
			}]
		}
	],
	GuaranteeCertificateID: [
		'GuaranteeCertificateID',
		{
			rules: [{
				required: true,
				max: 30,
				message: inputMsg
			}]
		}
	],
	GuaranteePassportCountry: [
		'GuaranteePassportCountry',
		{
			rules: [{
				max: 20
			}]
		}
	],
	GuaranteeMethod: [
		'GuaranteeMethod',
		{
			initialValue: '01',
			rules: [{
				required: true,
				max: 30,
				message: inputMsg
			}]
		}
	],
	ApplicationNumber: [
		'ApplicationNumber',
		{
			rules: [{
				message: inputMsg
			}]
		}
	],
	LoanReferenceNumber: [
		'LoanReferenceNumber',
		{
			rules: [{
				message: inputMsg
			}]
		}
	],
	ProductID: [
		'ProductID',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	ArrangementPurpose: [
		'ArrangementPurpose',
		{
			rules: [{
				required: true,
				max: 30,
				message: inputMsg
			}]
		}
	],
	Amount: [
		'Amount',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	InterestRate: [
		'InterestRate',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	CreditUsage: [
		'CreditUsage',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	ApplicationDate: [
		'ApplicationDate',
		{
			rules: [{
				type: 'date',
				required: true,
				message: inputMsg
			}]
		}
	],
	DrawdownDate: [
		'DrawdownDate',
		{
			rules: [{
				type: 'date',
				required: true,
				message: inputMsg
			}]
		}
	],
	MaturityDate: [
		'MaturityDate',
		{
			rules: [{
				type: 'date',
				required: true,
				message: inputMsg
			}]
		}
	],
	DisbursementStatus: [
		'DisbursementStatus',
		{
			initialValue: '01',
			rules: [{
				required: true,
				max: 30,
				message: inputMsg
			}]
		}
	],
	DisbursementAmount: [
		'DisbursementAmount',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	DisbursementChannel: [
		'DisbursementChannel',
		{
			initialValue: '01',
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	RepaymentFrequency: [
		'RepaymentFrequency',
		{
			initialValue: '04',
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	AutoRepayActivation: [
		'AutoRepayActivation',
		{
			initialValue: '01',
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	RepaymentDate: [
		'RepaymentDate',
		{}
	],
	ApplicationFees: [
		'ApplicationFees',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	ProcessingAndOriginationFees: [
		'ProcessingAndOriginationFees',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	OverdueFees: [
		'OverdueFees',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	AnticipatedRepaymentFees: [
		'AnticipatedRepaymentFees',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	ExtensionFees: [
		'ExtensionFees',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	RepaymentPlanAdjustmentFees: [
		'RepaymentPlanAdjustmentFees',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	TaxFees: [
		'TaxFees',
		{
			rules: [{
				required: true,
				message: inputMsg
			}]
		}
	],
	Review: [
		'Review',
		{
			rules: [
				{
					required: true,
					max: 1,
					message: inputMsg
				}
			]
		}
	],
	MakerComment: [
		'MakerComment',
		{
			rules: [
				{
					required: true,
					message: inputMsg
				}
			]
		}
	],
	bankName: ['bankName', { rules: [{ required: true, message: inputMsg }] }],
	bankAccountNumber: ['bankAccountNumber', { rules: [{ required: true, message: inputMsg }] }],
	bankAccountName: ['bankAccountName', { rules: [{ required: true, message: inputMsg }] }],
	creitNm: ['creitNm', { rules: [{ required: false }] }],
	cardHolderName: ['cardHolderName', { rules: [{ required: false }] }],
	expiryMonth: ['expiryMonth', { rules: [{ required: false }] }],
	expiryYear: ['expiryYear', { rules: [{ required: false }] }],
	securityCode: ['securityCode', { rules: [{ required: false }] }],
	// Grace Period
	GracePeriod: ['GracePeriod', { rules: [{ required: false }] }]
};
function getFormValidate(key, option) {
	formValidate[key][1] = Object.assign(formValidate[key][1], option);
	return formValidate[key]
}
export default getFormValidate
