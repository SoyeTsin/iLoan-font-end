<template>
  <div>
    <div v-if="!showSuccess" class="customer-details-edit">
      <a-form :form="form" :self-update="true">
        <collapse-card :title="$t('customer.customer')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.cif')">
                <a-input :value="info.CustNo" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('customer.customer_name')">
                <a-input :value="info.CustName" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('message.guarantor')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.guarantee_method')">
                <a-radio-group class="radio" :value="info.GuarMethod" disabled>
                  <a-radio value="01">{{ $t('message.no_guarantee') }}</a-radio>
                  <a-radio value="02">{{ $t('message.guarantor') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.guarantor_name')">
                <a-input :value="info.GuarNm" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.guarantor_id_type')">
                <a-select :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}" disabled :placeholder="$t('placeholder.select_guarantor_passport_country')" :value="info.GuarIDTp">
                  <a-select-option value="101">{{ $t('message.citizen_id') }}</a-select-option>
                  <a-select-option value="104">{{ $t('message.passport') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('message.guarantor_certificate_id')">
                <a-input :value="info.GuarIdNo" disabled />
              </a-form-item>
              <a-form-item :label="$t('message.guarantor_passport_country')">
                <a-select :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}" disabled :placeholder="$t('placeholder.select_guarantor_passport_country')" :value="info.GuarPassCountry">
                  <a-select-option v-for="item in countryCode" :key="item.key" :value="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('customer.bank_accounts')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('loan.linked_bank_acc') }}
                </div>
              </div>
              <a-form-item ref="RelaAcctOpnAcctBnkBnkName" :label="$t('message.bank_name')">
                <a-select
                  v-decorator="['bankName',{initialValue:info.RelaAcctOpnAcctBnkBnkName,rules: [
                    {
                      required: true,
                      message: $t('Utils.isRequired')
                    }
                  ]}]"
                  :placeholder="$t('placeholder.select_bank_name')"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  @change="editItemChange($event,'RelaAcctOpnAcctBnkBnkName','6')"
                >
                  <a-select-option value="Citigroup">{{ $t('message.citigroup') }}</a-select-option>
                  <a-select-option value="ICBC">{{ $t('message.icbc') }}</a-select-option>
                  <a-select-option value="Mizuho FG">{{ $t('message.mizuho_FG') }}</a-select-option>
                  <a-select-option value="Wells fargo">{{ $t('message.wells_fargo') }}</a-select-option>
                  <a-select-option value="HSBC">{{ $t('message.hsbc') }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="BIC" :label="$t('message.bic')">
                <a-input v-model="reveal.bankBIC" :placeholder="$t('placeholder.select_bank_name')" disabled />
              </a-form-item>
              <a-form-item ref="RelaAcctNo" :label="$t('message.bank_acc_number')">
                <a-input
                  v-decorator="['bankAccountNumber',{initialValue:info.RelaAcctNo,rules: [
                    {
                      required: true,
                      message: $t('Utils.isRequired')
                    }
                  ]}]"
                  class="inputNumberOnly"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  :placeholder="$t('placeholder.input_bank_acc_number')"
                  :min-length="1"
                  :max-length="30"
                  style="width: 100%"
                  @change="editItemChange($event,'RelaAcctNo','6')"
                />
              </a-form-item>
              <a-form-item ref="RelaAcctName" :label="$t('message.bank_acc_name')">
                <a-input
                  v-decorator="['bankAccountName',{initialValue:info.RelaAcctName,rules: [
                    {
                      required: true,
                      message: $t('Utils.isRequired')
                    }
                  ]}]"
                  class="bank-name"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  :max-length="80"
                  :placeholder="$t('placeholder.input_bank_acc_name')"
                  @change="editItemChange($event,'RelaAcctName','6')"
                />
              </a-form-item>
            </a-col>

            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t('loan.linked_credit_card') }}
                </div>
              </div>
              <a-form-item ref="CreitNm" :label="$t('customer.credit_card_number')">
                <a-input
                  v-decorator="['creitNm',{initialValue:info.CreitNm}]"
                  :max-length="30"
                  :min-length="1"
                  class="inputNumberOnly"
                  :placeholder="$t('placeholder.input_credit_card_number')"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  @change="editItemChange($event,'CreitNm','6')"
                />
              </a-form-item>
              <a-form-item ref="CardHdNm" :label="$t('customer.cardholder_name')">
                <a-input
                  v-decorator="['cardHolderName',{initialValue:info.CardHdNm}]"
                  :max-length="80"
                  :min-length="1"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_credit_card_name')"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  @change="editItemChange($event,'CardHdNm','6')"
                />
              </a-form-item>
              <a-form-item ref="ExpiryMonth" :label="$t('customer.expiry_month')">
                <a-select
                  v-decorator="['expiryMonth',{initialValue:info.ExpiryMonth?info.ExpiryMonth:undefined, rules: [{message: $t('message.select_correct_information') }]}]"
                  :placeholder="$t('placeholder.input_expiry_month')"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                  @change="editItemChange($event,'ExpiryMonth','6')"
                >
                  <a-select-option v-for="n in ExpiryMonth " :key="n" :value="n">{{ n }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="ExpiryYear" :label="$t('customer.expiry_year')">
                <a-select
                  v-decorator="['expiryYear',{initialValue:info.ExpiryYear?info.ExpiryYear:undefined, rules: [{message: $t('message.select_correct_information') }]}]"
                  :placeholder="$t('placeholder.input_expiry_year')"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                  @change="editItemChange($event,'ExpiryYear','6')"
                >
                  <a-select-option v-for="y in ExpiryYear" :key="y" :value="y">{{ y }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="SecurityCd" :label="$t('customer.security_code')">
                <a-input
                  v-decorator="['securityCode',{initialValue:info.SecurityCd}]"
                  :max-length="3"
                  :min-length="1"
                  class="inputNumberOnly"
                  :placeholder="$t('placeholder.input_security_code')"
                  :disabled="isReview || !!LoanElement && LoanElement!=='6'"
                  @change="editItemChange($event,'SecurityCd','6')"
                />
              </a-form-item>

            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('loan.loan_acc')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('loan.loan_status')">
                <a-radio-group v-decorator="['LoanStatus',{initialValue:option.LoanStatus === '01'?'02':option.LoanStatus,rules: [{required: true}]}]" class="radio" @change="radioChange($event,'LoanStatus')">
                  <a-radio
                    :disabled="option.LoanStatus !== '01' || pageType === 'LoanEdit'"
                    value="01"
                  >{{ $t('loan.request') }}</a-radio>
                  <a-radio
                    :disabled="option.LoanStatus !== '01' && option.LoanStatus !== '02' || pageType === 'LoanEdit'"
                    value="02"
                  >{{ $t('loan.approved') }}</a-radio>
                  <a-radio
                    :disabled="option.LoanStatus !== '01' && option.LoanStatus !== '02' || pageType === 'LoanEdit'"
                    value="03"
                  >{{ $t('loan.denied') }}</a-radio>
                  <a-radio disabled value="10">{{ $t('loan.closed') }}</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item :label="$t('loan.application_number')">
                <a-input disabled :value="info.MakelnAplySn" />
              </a-form-item>
              <a-form-item :label="$t('loan.loan_reference_number')">
                <a-input disabled :value="info.LoanDubilNo" />
              </a-form-item>
              <a-form-item :label="$t('product.product_id')">
                <a-select :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}" :placeholder="$t('placeholder.select_guarantor_passport_country')" value="0" disabled>
                  <a-select-option value="0">{{ info.LoanProdtNo }}</a-select-option>
                </a-select>
                <a-input :value="info.LoanProdtNm" disabled />
              </a-form-item>
              <a-form-item :label="$t('loan.arrangement_purpose')">
                <a-input :value="ArrangementPurposeList[info.ArrangementPurpose]" disabled />
              </a-form-item>

            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('loan.amount')">
                <a-input-number
                  :value="info.CreditAmt"
                  disabled
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  class="input-number"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item ref="Intr" :label="$t('loan.interest_rate')">
                <number-input
                  v-decorator="['InterestRate',{initialValue:$lib.calcNum(info.Intr*100),rules: [{required: true}]}]"
                  :disabled="isReview || !!LoanElement && LoanElement!=='1'"
                  :formatter="true"
                  :placeholder="$t('placeholder.input_interest_rate')"
                  :max-length="3"
                  :max="100"
                  :min="0"
                  :decimal="interestRateDecimal"
                  @change="editItemChange($event,'Intr','1')"
                />
                %
              </a-form-item>
              <a-form-item :label="$t('loan.credit_usage')">
                <a-input-number
                  :value="info.LoanAmt"
                  disabled
                  class="input-number"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('loan.tenor')">
                <a-input-number
                  :value="info.LoanDeadl"
                  disabled
                  style="width: 174px"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
              </a-form-item>
              <a-form-item :label="$t('loan.loan_application_date')">
                <a-date-picker disabled :value="info.AplyMakelnDt" />
              </a-form-item>
              <a-form-item :label="$t('loan.drawdown_date')">
                <a-date-picker disabled :value="info.ActlMakelnDt || null" />
              </a-form-item>
              <a-form-item ref="MatrDt" :label="$t('loan.maturity_date')">
                <a-date-picker
                  v-decorator="['MaturityDate',{initialValue:info.MatrDt,rules: [{required: true}]}]"
                  :disabled="isReview || !!LoanElement && LoanElement!=='2'"
                  :disabled-date="disabledEndDate"
                  @change="editItemChange($event,'MatrDt','3')"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('loan.transaction_Info')" class="my-card my-card-left">
          <a-icon slot="extra" type="down" class="extra" />
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <div class="card-content-header">
                <div>{{ $t("loan.disbursement") }}</div>
              </div>
              <a-form-item :label="$t('loan.disbursement_status')">
                <a-radio-group disabled class="radio" :value="info.DisbursementStatus">
                  <a-radio value="01">{{ $t('loan.total') }}</a-radio>
                  <a-radio value="02">{{ $t('loan.partial') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <div class="card-content-header">
                <div>{{ $t("loan.previous_disbursement") }}</div>
              </div>
              <a-form-item :label="$t('loan.previous_disbursement_amount')">
                <a-input-number
                  :value="info.LoanAmt"
                  disabled
                  class="input-number"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <div class="card-content-header">
                <div>{{ $t("loan.next_disbursement") }}</div>
              </div>
              <a-form-item ref="NextDsbDate" :label="$t('loan.next_disbursement_date')">
                <a-date-picker
                  v-decorator="['NextDsbDate', { initialValue: info.NextDsbDate,rules: [
                    {required: false},
                  ]
                  }]"
                  style="width: 100%"
                  :disabled-date="disabledEndDate"
                  :disabled="isReview || info.DisbursementStatus !=='02' || !!LoanElement && LoanElement!=='5'"
                  @change="editItemChange($event,'NextDsbDate','5')"
                />
              </a-form-item>
              <a-form-item :label="$t('loan.disbursement_amount_available')">
                <number-input
                  :value="info.AvailableQuota"
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :disabled="true"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item ref="NextDsbAmt" :label="$t('loan.next_disbursement_amount')">
                <number-input
                  v-decorator="['NextDsbAmt', { initialValue: info.NextDsbAmt,rules: [
                    {required: false},checkAmt()
                  ]
                  }]"
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :disabled="isReview || info.DisbursementStatus !=='02' || !!LoanElement && LoanElement!=='5'"
                  @change="editItemChange($event,'NextDsbAmt','5')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.disbursement_channel')">
                <a-radio-group disabled class="radio" :value="info.LoanChannel">
                  <a-radio value="01">{{ $t('loan.bank') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <div class="card-content-header">
            <div>
              {{ $t('loan.repayment') }}
            </div>
          </div>
          <a-row type="flex" justify="space-between">
            <a-col :span="6">
              <a-form-item ref="LoanDeadlUnitCd" :label="$t('loan.repayment_frequency')">
                <a-select
                  v-decorator="['RepaymentFrequency',{initialValue:info.LoanDeadlUnitCd,rules: [{required: true}]}]"
                  :disabled="isReview || !!LoanElement && LoanElement!=='2'"
                  :placeholder="$t('placeholder.select_guarantor_passport_country')"
                  @change="editItemChange($event,'LoanDeadlUnitCd','2')"
                >
                  <a-select-option v-for="(item,index) in repaymentFrequencyList" :key="index" :value="index">{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('loan.auto_repay_activation')">
                <a-radio-group class="radio" disabled :value="info.AuotoRepyFlag">
                  <a-radio value="01">{{ $t('loan.auto_repay') }}</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item ref="RepayDay" :label="$t('loan.repayment_date')">
                <a-select
                  v-decorator="['RepaymentDate', {initialValue: info.RepayDay || ''}]"
                  :get-popup-container="triggerNode => {return triggerNode.parentNode || document.body}"
                  :disabled="!isMonthly || (isReview || !!LoanElement && LoanElement!=='2')"
                  :placeholder="$t('placeholder.select_guarantor_passport_country')"
                  @change="editItemChange($event,'RepayDay','2')"
                >
                  <a-select-option v-for="day in 31" :key="day" :value="day">{{ day }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="NextRepayDay" :label="$t('loan.repayment_date_for_next_period_only')">
                <a-date-picker
                  v-decorator="['NextRepayDay',{initialValue:info.NextRepayDay,rules: [{required: false}]}]"
                  :disabled="isReview"
                  style="width: 100%"
                  :disabled-date="disabledDate"
                  @change="editItemChange($event,'NextRepayDay','4')"
                />
              </a-form-item>
              <a-form-item ref="GracePeriod" :label="$t('loan.grace_period')">
                <number-input
                  v-decorator="['GracePeriod', {initialValue:info.GracePeriod}]"
                  :placeholder="$t('placeholder.input_grace_period')"
                  :formatter="true"
                  :decimal="false"
                  :disabled="isReview || !!LoanElement && LoanElement!=='7'"
                  :max-length="3"
                  style="width: 60%"
                  :min="0"
                  @change="editItemChange($event,'GracePeriod','7')"
                />
                <span class="currency">
                  {{ $t('loan.days') }}
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('loan.outstanding_balance')">
                <a-input-number
                  :value="info.OutstandingBalance"
                  disabled
                  class="input-number"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.installment')">
                <a-input-number
                  :value="info.InstallmentAmount"
                  disabled
                  class="input-number"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.principal')">
                <a-input-number
                  class="input-number"
                  :value="info.Principal"
                  disabled
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.interest_rate')">
                <a-input-number
                  class="input-number"
                  :value="info.Interest"
                  disabled
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.overdue_amount')">
                <a-input-number
                  class="input-number"
                  :value="info.OverDueamt"
                  disabled
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item :label="$t('product.default_application_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultAppFee']"
                    style="width: 60%;"
                    :disabled="pageType === 'LoanReview'"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-spin :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('product.default_processing_origination_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultProcFee']"
                    style="width: 60%;"
                    :disabled="pageType === 'LoanReview'"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-spin :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('product.default_overdue_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultOverFee']"
                    style="width: 60%;"
                    :disabled="pageType === 'LoanReview'"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-spin :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('product.default_anticipated_repayment_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultAdvRepayFee']"
                    style="width: 60%;"
                    :disabled="pageType === 'LoanReview'"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-spin :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('product.default_extension_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultExtsnFee']"
                    style="width: 60%;"
                    :disabled="pageType === 'LoanReview'"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-spin :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('product.default_repayment_plan_adjustment_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultRepayPlanFee']"
                    style="width: 60%;"
                    :disabled="pageType === 'LoanReview'"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-spin :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('product.default_tax_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultTax']"
                    style="width: 60%;"
                    :disabled="pageType === 'LoanReview'"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-spin :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('message.maker')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input v-if="pageType === 'LoanReview'" :value="info.MakelnEmpnbr" disabled />
                <a-input v-else :value="userId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.maker_comment')">
                <a-textarea v-decorator="['MakerComment',{initialValue:info.MakelnComnt}]" :disabled="pageType === 'LoanReview'" :placeholder="$t('placeholder.input_maker_comment')" />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('message.checker')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input :value="checker.userId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.review')">
                <a-radio-group v-model="checker.review" class="form-radio" :disabled="pageType !== 'LoanReview'">
                  <a-radio value="1" style="margin-bottom: 10px">{{ $t('message.agree') }}</a-radio><br>
                  <a-radio value="2">{{ $t('message.return') }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.checker_comment')">
                <a-textarea v-decorator="['checkerComment', { rules: [{ max: 200 }] }]" :placeholder="$t('placeholder.input_checker_comment')" :disabled="pageType !== 'LoanReview'" />
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>
        <!--放款审批-->
        <div v-if="option.ApprovalStatus === '06' && option.LoanStatus === '01'" v-auth="$buttonConfig.Loan.EditNewLoanDetail" class="submit-content">
          <a-button @click="resetFields">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" :loading="loading.save" @click="save">{{ $t('message.save_btn') }}</a-button>
        </div>
        <!--修改审批-->
        <div v-if="option.ApprovalStatus === '06' && option.LoanStatus === '02'" v-auth="$buttonConfig.Loan.EditLoanRequested" class="submit-content">
          <a-button @click="resetFields">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" :loading="loading.save" @click="save">{{ $t('message.save_btn') }}</a-button>
        </div>
        <!--修改-->
        <div v-if="option.ApprovalStatus === '01'" v-auth="$buttonConfig.Loan.EditLoanAgreed" class="submit-content">
          <a-button @click="resetFields">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" :loading="loading.save" @click="save">{{ $t('message.save_btn') }}</a-button>
        </div>
      </a-form>
    </div>
    <div v-if="showSuccess" class="success-msg">
      <div class="msg">{{ $t('loan.loan_save_successfully') }}</div>
      <div>
        <div v-if="LoanStatus === '02' && pageType==='LoanReview'" class="product-id">{{ $t('loan.application_number') }}: {{ LoanContNo }}</div>
        <div v-else class="product-id">{{ $t('loan.application_number') }}: {{ info.MakelnAplySn }}</div>
      </div>
      <a-button type="dashed" style="margin-bottom: 12px" @click="$router.push({ path: '/loan' })"> {{ $t('loan.loan_list_btn') }}
      </a-button>
      <a-button
        v-auth="$buttonConfig.Loan.NewLoan"
        type="primary"
        style="margin-bottom: 26px"
        icon="plus"
        @click="$router.push({ path: '/loan/loanCreate' })"
      > {{ $t('loan.new_loan') }}
      </a-button>
    </div>
  </div>
</template>

<script>
import Loan from "@/service/loanService";
import config from "@/lib/config";
import CollapseCard from "@/components/CollapseCard";
import ProductService from "@/service/productService";
import CM from "@/service/common";
import inputValidate from "@/lib/input-validate";

export default {
    name: 'ProductDetails',
    components: { CollapseCard },
    data() {
        return {
            pageType: this.$route.name,
            option: this.$route.query,
            nextRepayDay: '',
            normFile: [],
          loanSelector: [
            { name: this.$t('product.same_as_currency'), value: '01' },
            { name: this.$t('product.percent_loan_amount'), value: '02' }
          ],
            showSuccess: false,
            interestRateDecimal: true,
            countryCode: config.countryCode,
            info: {
                AplyMakelnDt: '',
                ActlMakelnDt: null,
                MatrDt: null
            },
            LoanStatus: '',
            LoanContNo: '',
            loanStatusValue: '',
            productDetails: {},
            planInfo: {},
            currentcyResult: [],
            currencyList: [],
            currencySpinning: false,
            currencyUse: '',
            loading: {
                save: false
            },
            userId: this.global.userInfo.name,
            checker: {
                review: '1',
                userId: this.global.userInfo.name
            },
            // repaymentFrequencyList: {},
            config: {
                rules: [{
                    type: 'object', required: true,
                    message: 'Please select time!'
                }]
            },
            isReview: this.$route.name === 'LoanReview',
            ExpiryYear: [],
            reveal: {
                bankBIC: '',
                age: '',
                userId: this.global.userInfo.name
            },
            ExpiryMonth: [],
            obj6: { RelaAcctOpnAcctBnkBnkName: '',
                    RelaAcctNo: '',
                    RelaAcctName: '',
                    CreitNm: '',
                    CardHdNm: '',
                    ExpiryMonth: '',
                    ExpiryYear: '',
                    SecurityCd: '' },
            obj5: { NextDsbAmt: '', NextDsbDate: '' },
            obj2: { LoanDeadlUnitCd: '', RepayDay: '' },
            LoanElement: '',
            MaximumGracePeriod: 0,
            isMonthly: true

        };
    },
    computed: {
        ArrangementPurposeList() {
            return this.$store.state.enumeration['IL0010'] || {}
        },
        repaymentFrequencyList() {
            return this.$store.state.enumeration['IL0011'] || {}
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'validate_other' });
    },
    mounted() {
        for (let i = new Date().getFullYear();
            i <= (new Date().getFullYear() + 25);
            i++) {
            this.ExpiryYear.push(i + '')
        }
        for (let i = 1; i <= 12; i++) {
          this.ExpiryMonth.push(('0' + i).slice(-2) + '')
        }
        if (this.option.LoanStatus === '01') {
            this.checker.review = '2'
        }
        if (this.pageType !== 'LoanReview') {
          this.checker.review = ''
            this.checker.userId = ''
        }
        // this.getArrangementList();
        this.getLoanDetails()
        this.initPage()
        // this.getArrangementPurposeList()
    },
    methods: {
      disabledEndDate(endValue) {
        console.log('end', endValue);
        return new Date().valueOf() >= endValue.valueOf();
      },
      disabledDate(current) {
      return this.$moment(this.form.getFieldValue('NextRepayDay')) && current < this.$moment(this.form.getFieldValue('MaturityDate'));
    },

      selectChange(e, type) {
        if (type === 'bankName') {
            const BIC = {
                'Citigroup': 'CITICNSX',
                'ICBC': 'ICBKCNBJ',
                'Mizuho FG': 'MHCBJPJT',
                'Wells fargo': 'WFBIUS63',
                'HSBC': 'HSBCCNSH'
            }
            this.reveal.bankBIC = BIC[e]
        }
      },

      initPage() {
      // Allow alphabets, space, and symbol & /. ( ) - , '
      inputValidate(document.querySelectorAll(".bank-name"), {
        noLetter: false,
        noNumber: true,
        noSymbol: true,
        ignoreSymbol: ["&", ",", "-", "/", "(", ")", "."]
      });
      inputValidate(document.querySelectorAll('.inputNumberOnly'), { noNeg: true, noLetter: true, noSymbol: true, noSpace: true, ignoreSymbol: ['-'] })
    },
      checkAmt() {
      const amt = this.info.CreditAmt - this.info.LoanAmt
      const message = this.$t('loan.check_disbursement_amt');
      return {
        validator(rule, value, callback) {
          if (!value) callback();
          if (value && !amt || Number(value) > amt) {
            callback(message);
          }
          callback();
        }
      };
    },
      async getCurrencyList() {
      await CM.getOptionList().then(res => {
        this.currentcyResult = res["CM0001"]
      }).catch(err => {
        this.$message.error(err.RetMessage);
      })
      for (const i in this.currentcyResult) {
        this.currencyList.push({ name: this.currentcyResult[i], value: i });
      }
    },
    async getProductCurrency() {
      console.log('getProductCurrency info = ', this.info)
       const param = {
          LoanProdtNo: this.info.LoanProdtNo,
          LoanProdtVersNo: "00001"
        }
        await ProductService.getProductDetails(param).then(res => {
        console.log('getProductDetails res = ', res)

        this.MaximumGracePeriod = res.MaximumGracePeriod
        this.productDetails["CurCd"] = res.CurCd;
        this.currencyList.forEach(item => {
          if (item.value === this.productDetails.CurCd) {
            this.currencyUse = item.name;
          }
        });
        }).catch(err => {
          this.$message.error(err.RetMessage);
        });
        this.currencySpinning = false;
    },
       getLoanDetails() {
            const param = {
                MakelnAplySn: this.option.MakelnAplySn,
                CustNo: this.option.CustNo,
                LoanStatus: this.option.LoanStatus
            }
            this.getCurrencyList();
            Loan.getLoanDetails(param).then(res => {
              this.info = res;
              console.log('getLoanDetails res = ', res)
              this.form.setFieldsValue({
                DefaultAppFee: parseFloat(res.AppFee),
                DefaultProcFee: parseFloat(res.ProcFee),
                DefaultOverFee: parseFloat(res.OverFee),
                DefaultAdvRepayFee: parseFloat(res.AdvRepayFee),
                DefaultExtsnFee: parseFloat(res.ExtsnFee),
                DefaultRepayPlanFee: parseFloat(res.RepayPlanAdjFee),
                DefaultTax: parseFloat(res.Tax),

                AppFeeCalcMethod: res.AppFeeCalcMethod,
                ProcFeeCalcMethod: res.ProcFeeCalcMethod,
                OverFeeCalcMethod: res.OverFeeCalcMethod,
                AdvRepayFeeCalcMethod: res.AdvRepayFeeCalcMethod,
                ExtsnFeeCalcMethod: res.ExtsnFeeCalcMethod,
                RepayPlanFeeCalcMethod: res.RepayPlanFeeCalcMethod,
                TaxCalcMethod: res.TaxCalcMethod
              })
              if (this.info.LoanDeadlUnitCd === '04') {
                this.isMonthly = true
                this.info.RepayDay = this.info.RepayDay ? this.info.RepayDay.replace(/^0+/, '') : '1'
              } else {
                this.isMonthly = false
                this.form.setFieldsValue({ RepayDay: '' });
                this.info.RepayDay = ''
              }
              if ((res.LoanDubilNo && this.pageType === 'LoanReview') || this.pageType === 'LoanEdit') {
                this.info = res;
                console.log('getEditDetails LoanReview res = ', this.info)
                this.getEditDetails(res)
              } else {
                this.info = res;
                for (const key in this.obj5) {
                  this.obj5[key] = this.info[key]
                }
                for (const key in this.obj6) {
                  this.obj6[key] = this.info[key]
                }
                for (const key in this.obj2) {
                  this.obj2[key] = this.info[key]
                }
                this.reveal.bankBIC = res.BIC;
                this.LoanStatus = this.form.getFieldValue('LoanStatus');
              }
                this.getProductCurrency();
            }).catch(err => {
              this.$message.error(err.RetMessage);
            })
        },
        getEditDetails(info) {
            Loan.getEditDetails(info.LoanDubilNo).then(res => {
                if (res.LoanElement) {
                  const Arr = []
                  let k = ''
                  switch (res.LoanElement) {
                    case '1':
                      k = 'Intr'
                      break;
                    case '3':
                      k = 'MatrDt'
                      break;
                    case '4':
                      k = 'NextRepayDay'
                      break;
                    case '7':
                      k = 'GracePeriod'
                      break;
                    default:
                      break;
                  }
                  if (k) {
                    if (res.ElementNewValue !== res.ElementOldValue) {
                      this.info[k] = res.ElementNewValue
                      Arr.push(k);
                    }
                    this.nextRepayDay = this.info.NextRepayDay;
                  } else if (res.LoanElement === '5') {
                    const oldlist = res.ElementOldValue.split(',')
                    const newlist = res.ElementNewValue.split(',')
                    Object.keys(this.obj5).forEach((val, index, arr) => {
                      console.log(val, index, arr)
                      if (oldlist[index] !== newlist[index]) {
                        this.info[val] = newlist[index]
                        Arr.push(val)
                      }
                    })
                  } else if (res.LoanElement === '6') {
                    const oldlist = res.ElementOldValue.split(',')
                    const newlist = res.ElementNewValue.split(',')
                    Object.keys(this.obj6).forEach((val, index) => {
                      if (oldlist[index] !== newlist[index]) {
                        this.info[val] = newlist[index]
                        Arr.push(val)
                      }
                    })
                  } else if (res.LoanElement === '2') {
                    const oldlist = res.ElementOldValue.split(',')
                    const newlist = res.ElementNewValue.split(',')
                    Object.keys(this.obj2).forEach((val, index) => {
                      if (oldlist[index] !== newlist[index]) {
                        this.info[val] = newlist[index]
                        Arr.push(val)
                      }
                  })
                  }
                  if (Arr.length > 0) {
                    Arr.forEach(item => {
                    try {
                        this.$refs[item].$el.querySelector('.ant-form-item-label label').style.color = '#ff0000'
                    } catch (e) {
                        console.log(e)
                    }
                  })
                  }
                }
            }).catch(err => {
              this.$message.error(err.RetMessage);
            })
        },
        getArrangementList() {
            const res = this.$store.state.enumeration
            this.repaymentFrequencyList = res['IL0011']
        },
        getArrangementPurposeList() {
            const res = this.$store.state.enumeration
            this.ArrangementPurposeList = res['IL0010']
        },
        editItemChange(e, k, type) {
          console.log("🚀 ~ file: LoanEdit.vue ~ line 1038 ~ editItemChange ~ type", type)
          console.log("🚀 ~ file: LoanEdit.vue ~ line 1038 ~ editItemChange ~ k", k)
          console.log("🚀 ~ file: LoanEdit.vue ~ line 1038 ~ editItemChange ~ e", e)
          let value
          if (k === 'LoanDeadlUnitCd') {
              console.log('LoanDeadlUnitCd value = ', e)
              if (e === '04') {
                this.form.setFieldsValue({ RepaymentDate: '1' });
                this.isMonthly = true
              } else {
                this.form.setFieldsValue({ RepaymentDate: '' });
                this.isMonthly = false
              }
          }
          if (type === '3') {
            const date = e
                   if (date.format('YYYY-MM-DD') > this.nextRepayDay) {
            // console.log('nextRepayDay', e.add(1, 'days').format('YYYY-MM-DD'))

              this.$nextTick(() => this.form.setFieldsValue({ NextRepayDay: date.add(1, 'days').format('YYYY-MM-DD') }));
            }
          }
          if (type === '7') {
            if (e > this.MaximumGracePeriod) {
              this.$nextTick(() => this.form.setFieldsValue({ GracePeriod: this.MaximumGracePeriod }));
              e = this.MaximumGracePeriod
            }
          }
          if (e) {
            if (e.target) {
              value = e.target.value
            } else if (typeof (e) === 'object') {
              value = e.format('YYYY-MM-DD')
            } else {
              value = e
            }
          }
          if (type === '1') value = value / 100
          else if (type === '7' && value) value = Number(value)
          if (value !== this.info[k]) {
            if (type === '5') {
              this.obj5[k] = value
            } else if (type === '6') {
               this.obj6[k] = value
            } else if (type === '2') {
               this.obj2[k] = value
            }
            this.LoanElement = type
          } else {
            if (type === '6' && this.LoanElement === '6') {
              this.obj6[k] = value
              let flag = false
              for (const key in this.obj6) {
                if (this.obj6[key] !== this.info[key]) {
                  flag = true
                }
              }
              if (!flag) this.LoanElement = ''
            } else if (this.LoanElement === '5' && type === '5') {
              this.obj5[k] = value
              let flag = false
              for (const key in this.obj5) {
                if (this.obj5[key] !== this.info[key]) {
                  flag = true
                }
              }
              if (!flag) this.LoanElement = ''
            } else if (type === '2' && this.LoanElement === '2') {
              this.obj2[k] = value
              let flag = false
              for (const key in this.obj2) {
                if (this.obj2[key] !== this.info[key]) {
                  flag = true
                }
              }
              if (!flag) this.LoanElement = ''
            } else {
              this.LoanElement = ''
            }
          }
          if (this.LoanElement) {
            this.ElementNewVlaue = value
          }
        },
        radioChange(e, type) {
            if (type === 'LoanStatus') {
                if (e.target.value === '01') {
                    this.checker.review = '2'
                } else {
                    this.checker.review = '1'
                }
            }
        },

        save(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
              console.log('validateFields = ', values)
                /*
                * editLoan
                *   修改审批 editLoan
                *   修改退回   --- 修改页面(重新修改) --- 查详情 editLoan edit /Loan Status--Approved
                * loanReview
                *       放款审批 loanReview
                * */
                values.RepaymentDate = (values.RepaymentDate === undefined || '') ? "" : values.RepaymentDate;
                if (!err) {
                    this.loading.save = true;
                    if (this.pageType === 'LoanReview' && this.option.LoanStatus === '01') {
                        // 放款审批
                        this.loanReview(values)
                    } else {
                        let type = 'review'
                        console.log(this.pageType)
                        if (this.pageType === 'LoanEdit') {
                            type = 'edit'
                        }
                        // console.log(type === 'edit' ? '开始调用修改' : '开始调用修改审批')
                        this.editLoan(values, type);
                    }
                }
            })
        },
        editLoan(values, type) {
            const param = {
                LoanDubilNo: this.info.LoanDubilNo,
                UserId: this.userId
            };
            if (type === 'edit') {
                param.LoanElement = this.LoanElement;
                if (this.LoanElement === '5') {
                    param.ElementNewVlaue = this.obj5.NextDsbAmt + ',' + this.obj5.NextDsbDate
                } else if (this.LoanElement === '6') {
                  param.ElementNewVlaue = ''
                  for (const key in this.obj6) {
                    param.ElementNewVlaue += this.obj6[key] + ','
                  }
                  param.ElementNewVlaue = param.ElementNewVlaue.substring(0, param.ElementNewVlaue.length - 1)
                } else if (this.LoanElement === '2') {
                    param.ElementNewVlaue = this.obj2.LoanDeadlUnitCd + ',' + this.obj2.RepayDay
                } else {
                  param.ElementNewVlaue = String(this.ElementNewVlaue)
                }
                param.TxTypCd = '11';
                param.RoleId = 'Maker';
            } else {
                param.TxTypCd = '12';
                param.ApprvSugstnCd = this.checker.review;
                param.RoleId = 'Checker';
            }
            param.MakerComment = values.MakerComment;
            param.CheckerComment = values.checkerComment;
            param.LoanStatus = values.LoanStatus
            Loan.editLoan(param).then(res => {
              console.log('editLoan param = ', param)
                this.showSuccess = true;
            }).finally(() => {
                this.loading.save = false;
            }).catch(err => {
              this.$message.error(err.RetMessage);
            })
        },
        loanReview(values) {
            console.log('loanReview values = ', values)
            const param = JSON.parse(JSON.stringify(this.option))
            param.ApproveUserId = this.userId;
            param.ApproveView = this.checker.review;
            param.ApproveComment = values.checkerComment;
            param.CustNo = this.option.CustId;
            param.LoanStatus = values.LoanStatus;
            // param.ApprovalStatus = '01'
            delete param.CustId;
            Loan.loanApproval(param).then(res => {
                this.LoanContNo = res.MakelnAplySn;
                this.showSuccess = true;
            }).finally(() => {
                this.loading.save = false
            }).catch(err => {
              this.$message.error(err.RetMessage);
            })
        },
        // 还款计划试算
        calcPlan(value) {
            value = value || {};
            const param = {
                "CustNo": this.option.CustId,
                "LoanProdtNo": this.info.LoanProdtNo,
                "LoanAmt": Number(this.info.LoanAmt),
                "LoanDeadl": this.info.LoanDeadl,
                "LoanDeadlCd": value.RepaymentFrequency || this.info.LoanDeadlUnitCd,
                // "RepayManrCd": "1",
                "LoanIntrt": Number(value.InterestRate) || this.info.Intr,
                // "RgtsintNo": "1",
                "IntCalcBgnDate": this.info.ActlMakelnDt,
                "IntCalcEndDate": new Date(value.MaturityDate).format('yyyy-MM-dd') || this.info.MatrDt,
                "RepayDay": value.RepaymentDate + '' || this.info.RepayDay + ''
            }
            Loan.repaymentPlanTrialCalculation(param).then(res => {
                // this.planInfo = res.Records[0]
                const planInfo = res.Records.filter(item => item.Pridnum === 1)[0];
                this.$set(this.reveal, 'tenor', res.PageTotCount - 1)
                this.info = Object.assign(this.info, planInfo);
                // this.$nextTick(() => {
                //     this.info = info;
                // })
            }).catch(err => {
              this.$message.error(err.RetMessage);
            })
            console.log('calcPlan param = ', param);
        },
        resetFields() {
            this.form.resetFields()
            this.reveal.bankBIC = ''
            this.LoanElement = ''
        }
    }
};
</script>

<style scoped lang="less">
.currency {
  position: absolute;
  margin-left: 5px;
}
.customer-details-edit {
    .submit-content {
        display: flex;
        justify-content: center;

        > button {
            margin: 12px;
        }
    }

    /deep/ .ant-form-item-no-colon {
        width: 100%;
        height: 22px;
        font-family: PingFangSC;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        color: #000;
    }

    /deep/ .ant-form-item {
        margin-bottom: 6px;
    }

    .radio {
        display: flex;
        flex-direction: column;

        > label {
            margin-bottom: 6px;
        }
    }

    .product {
        background-color: #fff;
        min-height: 240px;
        padding: 26px 32px;
        box-sizing: border-box;
    }

    .extra {
        cursor: pointer;
    }

    .card-content-title {
        width: 100%;
        height: 22px;
        font-family: PingFangSC;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        color: #000;
    }

    .card-content-text {
        height: 18px;
        font-family: PingFangSC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: normal;
        color: #737373;
        margin-bottom: 13px;
    }

    .click-line {
        border: 1px solid #e8e8e8;
        background-color: #fff;
        border-radius: 2px;
        height: 70px;
        line-height: 70px;
        cursor: pointer;
        font-family: PingFangSC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #1890ff;
        text-align: center;
        align-content: center;
    }

    .no-information {
        height: 20px;
        font-family: PingFangSC;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: rgba(0, 0, 0, 0.25);
    }

    .my-card {
        margin-bottom: 24px;
    }

    .card-content-header {
        height: 36px;
        line-height: 36px;
        padding-right: 12px;
        box-sizing: border-box;
        font-family: HelveticaNeue;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: center;
        color: #001529;
        margin-bottom: 12px;

        > div {
            border-radius: 4px;
            background-color: #f0f2f5;
        }
    }
}

.success-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 272px;
    width: 100%;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #e8e8e8;

    .msg {
        height: 25px;
        font-family: PingFangSC;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
        margin-bottom: 20px;
    }

    .product-id {
        height: 25px;
        font-family: PingFangSC;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #1890ff;
        margin-bottom: 30px;
    }
}
.input-number{
  width: 50%;
}
</style>
