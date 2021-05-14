const formValidate = {
	// Basic
	ProdtStus: [
		'ProdtStus',
		{
			rules: [{ required: true, message: 'Please input Product Name!' }]
		}
	],
	LoanProdtNm: [
		'LoanProdtNm',
		{
			rules: [{
				pattern: new RegExp(
					"^[0-9a-zA-Z-&.(),'\\s-\-\/]+$"
				),
				type: 'string', message: 'Only literals and numbers can be entered！'
			}, { required: true, message: 'Please input Product Name!' }]
		}
	],
	LoanProdtTypCd: [
		'LoanProdtTypCd',
		{
			initialValue: `01`,
			rules: [
				{
					required: true,
					max: 20,
					message: 'Please input correct information'
				}
			]
		}
	],
	LoanProdtClsfCd: [
		'LoanProdtClsfCd',
		{
			initialValue: `01`,
			rules: [
				{
					required: true,
					max: 20,
					message: 'Please input correct information'
				}
			]
		}
	],
	LoanGuarManrCd: [
		'LoanGuarManrCd',
		{
			initialValue: `01`,
			rules: [{
				required: true,
				message: 'Please input correct information'
			}]
		}
	],
	CurCd: [
		'CurCd',
		{
			rules: [
				{
					required: true,
					max: 3,
					message: 'Please input correct information'
				}
			]
		}
	],
	ApplicationDate: [
		'ApplicationDate',
		{
			rules: [
				// { type: 'object', message: 'Please select time!' }
			]
		}
	],
	ApprovalDate: [
		'ApprovalDate',
		{
			rules: [
				// { type: 'object', message: 'Please select time!' }
			]
		}
	],
	DrawdownDate: [
		'DrawdownDate',
		{
			rules: [
				// { type: 'object' }
			]
		}
	],
	MaturityDate: [
		'MaturityDate',
		{
			rules: [
				// { type: 'object' }
			]
		}
	],
	// Loan
	NumberOfApplicant: [
		'NumberOfApplicant',
		{
			initialValue: `01`,
			rules: [
				{
					required: true,
					message: 'Please input correct information'
				}
			]
		}
	],
	AplyLoanCeilAmt: [
		'AplyLoanCeilAmt',
		{
			rules: [
				{
					required: true
				}
			]
		}
	],
	MinInterestRate: [
		'MinInterestRate',
		{
			rules: [
				{
					required: true
				}
			]
		}
	],
	MaxInterestRate: [
		'MaxInterestRate',
		{
			rules: [
				{
					required: true
				}
			]
		}
	],
	ChrgManrCd: [
		'ChrgManrCd',
		{
			initialValue: '01',
			rules: [
				{
					required: true,
					message: 'Please input correct information'
				}
			]
		}
	],
	PmitAdvRepayFlg: [
		'PmitAdvRepayFlg',
		{
			initialValue: '1',
			rules: [
				{
					required: true,
					max: 1,
					message: 'Please input correct information'
				}
			]
		}
	],
	// Maker
	OprorEmpnbr: [
		'OprorEmpnbr',
		{
			rules: [
				{
					required: true,
					max: 1,
					message: 'Please input correct information'
				}
			]
		}
	],
	OperRplshInfo: [
		'OperRplshInfo',
		{
			rules: [
				{
					pattern: new RegExp(
						"^[0-9a-zA-Z-&.(),'\\s-\-\/]+$"
					),
					message: 'Please input correct information'
				}
			]
		}
	],
	ApprvSugstnCd: [
		'ApprvSugstnCd',
		{
			initialValue: '1',
			rules: [
				{
					required: true,
					message: 'Please input correct information'
				}
			]
		}
	],
	CheckRplshInfo: [
		'CheckRplshInfo',
		{
			rules: [
				{
					pattern: new RegExp(
						"^[0-9a-zA-Z-&.(),'\\s-\-\/]+$"
					),
					message: 'Please input correct information'
				}
			]
		}
	],
	// Grace Period
	MaximumGracePeriod: [
		"MaximumGracePeriod",
		{
		rules: [
			{ required: false }
		]
		}
	],
	DefaultGracePeriod: [
		"DefaultGracePeriod",
		{
		rules: [
			{ required: false }
		]
		}
	]
};
export default formValidate
