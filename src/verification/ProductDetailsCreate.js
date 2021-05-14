const formValidate = {
  // Basic
  LoanProdtNm: [
    "LoanProdtNm",
    {
      rules: [
        {
          required: true
        }
      ]
    }
  ],
  LoanProdtTypCd: [
    "LoanProdtTypCd",
    {
      initialValue: `01`,
      rules: [
        {
          required: true,
          max: 20
        }
      ]
    }
  ],
  DefaultApplicationSelector: [
    "DefaultApplicationSelector",
    {
      rules: [
        {
          required: true,
          max: 3
        }
      ]
    }
  ],
  LoanProdtClsfCd: [
    "LoanProdtClsfCd",
    {
      initialValue: `01`,
      rules: [
        {
        }
      ]
    }
  ],
  LoanGuarManrCd: [
    "LoanGuarManrCd",
    {
      initialValue: `01`,
      rules: [
        {
          required: true,
          message: "Please input correct information"
        }
      ]
    }
  ],
  CurCd: [
    "CurCd",
    {
      rules: [
        {
          required: true,
          max: 3
        }
      ]
    }
  ],
  ApplicationDate: [
    "ApplicationDate",
    {
      rules: [{ type: "object", message: "Please select time!" }]
    }
  ],
  DrawdownDate: [
    "DrawdownDate",
    {
      rules: [{ type: "object", required: true }]
    }
  ],
  MaturityDate: [
    "MaturityDate",
    {
      rules: [{ type: "object", required: true }]
    }
  ],
  // Loan
  NumberOfApplicant: [
    "NumberOfApplicant",
    {
      initialValue: `01`,
      rules: [
        {
          required: true,
          message: "Please input correct information"
        }
      ]
    }
  ],
  AplyLoanCeilAmt: [
    "AplyLoanCeilAmt",
    {
      rules: [
        { }
      ]
    }
  ],
  MinInterestRate: [
    "MinInterestRate",
    {
      rules: [
        { }
      ]
    }
  ],
  MaxInterestRate: [
    "MaxInterestRate",
    {
      rules: [
        { }
      ]
    }
  ],
  AppFeeCalcMethod: [
    "AppFeeCalcMethod",
    {
      rules: [
        { }
      ]
    }
  ],
  ProcFeeCalcMethod: [
    "ProcFeeCalcMethod",
    {
      rules: [
        { }
      ]
    }
  ],
  OverFeeCalcMethod: [
    "OverFeeCalcMethod",
    {
      rules: [
        { }
      ]
    }
  ],
  AdvRepayFeeCalcMethod: [
    "AdvRepayFeeCalcMethod",
    {
      rules: [
        { }
      ]
    }
  ],
  ExtsnFeeCalcMethod: [
    "ExtsnFeeCalcMethod",
    {
      rules: [
        { }
      ]
    }
  ],
  RepayPlanFeeCalcMethod: [
    "RepayPlanFeeCalcMethod",
    {
      rules: [
        { }
      ]
    }
  ],
  TaxCalcMethod: [
    "TaxCalcMethod",
    {
      rules: [
        { }
      ]
    }
  ],
  DefaultAppFee: [
    "DefaultAppFee",
    {
      rules: [
        { }
      ]
    }
  ],
  DefaultProcFee: [
    "DefaultProcFee",
    {
      rules: [
        { }
      ]
    }
  ],
  DefaultOverFee: [
    "DefaultOverFee",
    {
      rules: [
        { }
      ]
    }
  ],

  DefaultAdvRepayFee: [
    "DefaultAdvRepayFee",
    {
      rules: [
        { }
      ]
    }
  ],
  DefaultExtsnFee: [
    "DefaultExtsnFee",
    {
      rules: [
        { }
      ]
    }
  ],
  DefaultRepayPlanFee: [
    "DefaultRepayPlanFee",
    {
      rules: [
        { }
      ]
    }
  ],
  DefaultTax: [
    "DefaultTax",
    {
      rules: [
        { }
      ]
    }
  ],
  ChrgManrCd: [
    "ChrgManrCd",
    {
      initialValue: "01",
      rules: [
        {
          required: true,
          message: "Please input correct information"
        }
      ]
    }
  ],
  PmitAdvRepayFlg: [
    "PmitAdvRepayFlg",
    {
      initialValue: "1",
      rules: [
        {
          required: true,
          max: 1,
          message: "Please input correct information"
        }
      ]
    }
  ],
  // Maker
  OprorEmpnbr: [
    "OprorEmpnbr",
    {
      rules: [
        {
          required: true,
          max: 1,
          message: "Please input correct information"
        }
      ]
    }
  ],
  OperRplshInfo: [
    "OperRplshInfo",
    {
      rules: [
        {
          pattern: new RegExp(
            "^[0-9a-zA-Z-&.(),'\\s-\-\/]+$"
          ),
          message: "Please input correct information"
        }
      ]
    }
  ],
  OperRplshInfoC: [
    "OperRplshInfoC",
    {
      rules: [
        {
          pattern: new RegExp(
            "^[0-9a-zA-Z-&.(),'\\s-\-\/]+$"
          ),
          message: "Please input correct information"
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
export default formValidate;
