<template>
  <div>
    <div v-if="!showSuccess" class="customer-details-edit">
      <a-form :form="form" :self-update="true">
        <collapse-card
          :title="$t('customer.customer')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.cif')">
                <a-input
                  v-decorator="
                    formValidate('CIF', { initialValue: info.CustNo, rules: [
                      { required: true,
                        message: $t('message.please_correct_information')
                      }
                    ]})
                  "
                  :placeholder="$t('placeholder.input_cif')"
                  class="CIF"
                  :max-length="15"
                  @change="inputChange($event, 'CIF', cifPattern)"
                />
              </a-form-item>
            </a-col>

            <a-col :span="7">
              <a-form-item :label="$t('customer.customer_name')">
                <a-input
                  :placeholder="$t('placeholder.input_cust_name')"
                  :value="info.CustName?info.CustName:reveal.customerName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>

        <collapse-card
          :title="$t('message.guarantor')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.guarantee_method')">
                <a-radio-group
                  v-decorator="
                    formValidate('GuaranteeMethod', {
                      initialValue: info.GuarMethod || '01'
                    })
                  "
                  :placeholder="$t('Utils.isRequired')"
                  class="my-radio"
                  @change="radioChange($event, 'Guarantee')"
                >
                  <a-radio value="01">{{ $t("message.no_guarantee") }}</a-radio>
                  <a-radio value="02">{{ $t("message.guarantor") }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.guarantor_name')">
                <a-input
                  v-decorator="
                    formValidate('GuaranteeName', {
                      initialValue: info.GuarNm,
                      rules: [
                        {
                          required: reveal.GuaranteeType === '02',
                          message: $t('message.please_correct_information')
                        }
                      ]
                    })
                  "
                  :placeholder="$t('placeholder.input_guarantor_name')"
                  class="guarantor"
                  :disabled="reveal.GuaranteeType !== '02'"
                  :max-length="80"
                  :min-length="1"
                />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.guarantor_id_type')">
                <a-select
                  v-decorator="
                    formValidate('GuaranteeIDType', {
                      initialValue: info.GuarIDTp,
                      rules: [{ required: reveal.GuaranteeType === '02',
                                message: $t('message.please_correct_information') }]
                    })
                  "
                  :placeholder="$t('placeholder.select_guarantor_id_type')"
                  :disabled="reveal.GuaranteeType !== '02'"
                  :get-popup-container="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                  @change="selectChange($event, 'GuaranteeIDType')"
                >
                  <a-select-option value="101">{{
                    $t("message.citizen_id")
                  }}</a-select-option>
                  <a-select-option value="104">{{
                    $t("message.passport")
                  }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('message.guarantor_certificate_id')">
                <a-input
                  v-decorator="
                    formValidate('GuaranteeCertificateID', {
                      initialValue: info.GuarIdNo,
                      rules: [
                        {
                          required: reveal.GuaranteeType === '02',
                          message: $t('message.please_correct_information'),
                          max: reveal.GuaranteeIDType === '101' ? 13 : 10
                        }
                      ]
                    })
                  "
                  :placeholder="$t('placeholder.input_guarantor_cert_id')"
                  class="guarantor"
                  :disabled="reveal.GuaranteeType !== '02'"
                  :max-length="reveal.GuaranteeIDType === '101' ? 13 : 10"
                  :min-length="1"
                />
              </a-form-item>
              <a-form-item :label="$t('message.guarantor_passport_country')">
                <a-select
                  v-decorator="
                    formValidate('GuaranteePassportCountry', {
                      initialValue: info.GuarPassCountry,
                      rules: [{ required: reveal.GuaranteeIDType === '104' || reveal.GuaranteeType === '02',
                                message: $t('message.please_correct_information'),}]
                    })
                  "
                  :placeholder="
                    $t('placeholder.select_guarantor_passport_country')
                  "
                  :disabled="reveal.GuaranteeType !== '02'"
                  show-search
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :get-popup-container="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                >
                  <a-select-option
                    v-for="item in countryCode"
                    :key="item.key"
                    :value="item.key"
                  >
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card
          :title="$t('customer.bank_accounts')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t("loan.linked_bank_acc") }}
                </div>
              </div>
              <a-form-item ref="BankNm" :label="$t('message.bank_name')">
                <a-select
                  v-decorator="
                    formValidate('bankName', { initialValue: info.RelaAcctOpnAcctBnkBnkName})
                  "
                  :placeholder="$t('placeholder.select_bank_name')"
                  :disabled="isReview"
                  @change="selectChange($event, 'bankName')"
                >
                  <a-select-option value="Citigroup">{{
                    $t("message.citigroup")
                  }}</a-select-option>
                  <a-select-option value="ICBC">{{
                    $t("message.icbc")
                  }}</a-select-option>
                  <a-select-option value="Mizuho FG">{{
                    $t("message.mizuho_FG")
                  }}</a-select-option>
                  <a-select-option value="Wells fargo">{{
                    $t("message.wells_fargo")
                  }}</a-select-option>
                  <a-select-option value="HSBC">{{
                    $t("message.hsbc")
                  }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="BIC" :label="$t('message.bic')">
                <a-input
                  v-decorator="['Bic',{ initialValue: info.BIC }]"
                  :placeholder="$t('placeholder.select_bank_name')"
                  disabled
                />
              </a-form-item>
              <a-form-item
                ref="BankAccNm"
                :label="$t('message.bank_acc_number')"
              >
                <a-input
                  v-decorator="
                    formValidate('bankAccountNumber', {
                      initialValue: info.RelaAcctNo
                    })
                  "
                  class="inputNumberOnly"
                  :disabled="isReview"
                  :placeholder="$t('placeholder.input_bank_acc_number')"
                  :min-length="1"
                  :max-length="30"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item
                ref="BankAccName"
                :label="$t('message.bank_acc_name')"
              >
                <a-input
                  v-decorator="
                    formValidate('bankAccountName', {
                      initialValue: info.RelaAcctName
                    })

                  "
                  class="bank-name"
                  :disabled="isReview"
                  :max-length="80"
                  :placeholder="$t('placeholder.input_bank_acc_name')"
                />
              </a-form-item>
            </a-col>

            <a-col :span="7">
              <div class="card-content-header">
                <div>
                  {{ $t("loan.linked_credit_card") }}
                </div>
              </div>

              <a-form-item
                ref="CreitNm"
                :label="$t('customer.credit_card_number')"
              >
                <a-input
                  v-decorator="
                    formValidate('creitNm', { initialValue: info.CreitNm})
                  "
                  :max-length="30"
                  :min-length="1"
                  class="inputNumberOnly"
                  :placeholder="$t('placeholder.input_credit_card_number')"
                  :disabled="isReview"
                />
              </a-form-item>
              <a-form-item
                ref="CardHdNm"
                :label="$t('customer.cardholder_name')"
              >
                <a-input
                  v-decorator="
                    formValidate('cardHolderName', {
                      initialValue: info.CardHdNm
                    })
                  "
                  :max-length="80"
                  :min-length="1"
                  class="bank-name"
                  :placeholder="$t('placeholder.input_credit_card_name')"
                  :disabled="isReview"
                />
              </a-form-item>
              <a-form-item
                ref="ExpiryMonth"
                :label="$t('customer.expiry_month')"
              >
                <a-select
                  v-decorator="
                    formValidate('expiryMonth', {
                      initialValue: info.ExpiryMonth?info.ExpiryMonth:undefined
                    })
                  "
                  :placeholder="$t('placeholder.input_expiry_month')"
                  :disabled="isReview"
                  :get-popup-container="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                >
                  <a-select-option
                    v-for="n in ExpiryMonth"
                    :key="n"
                    :value="n"
                  >{{ n }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="ExpiryYear" :label="$t('customer.expiry_year')">
                <a-select
                  v-decorator="
                    formValidate('expiryYear', {
                      initialValue: info.ExpiryYear?info.ExpiryYear:undefined
                    })
                  "
                  :placeholder="$t('placeholder.input_expiry_year')"
                  :disabled="isReview"
                  :get-popup-container="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                >
                  <a-select-option
                    v-for="y in ExpiryYear"
                    :key="y"
                    :value="y"
                  >{{ y }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                ref="SecurityCd"
                :label="$t('customer.security_code')"
              >
                <a-input
                  v-decorator="formValidate('securityCode', {initialValue: info.SecurityCd})"
                  :max-length="3"
                  :min-length="1"
                  class="inputNumberOnly"
                  :placeholder="$t('placeholder.input_security_code')"
                  :disabled="isReview"
                />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>

        <collapse-card
          :title="$t('loan.loan_acc')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('loan.loan_status')">
                <a-radio-group class="my-radio" value="01">
                  <a-radio value="01">{{ $t("loan.request") }}</a-radio>
                  <a-radio disabled value="02">{{
                    $t("loan.approved")
                  }}</a-radio>
                  <a-radio disabled value="03">{{ $t("loan.denied") }}</a-radio>
                  <a-radio disabled value="10">{{ $t("loan.closed") }}</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item :label="$t('loan.application_number')">
                <a-input
                  v-decorator="
                    formValidate('ApplicationNumber', {
                      initialValue: info.MakelnAplySn
                    })
                  "
                  disabled
                  :min-length="1"
                  :max-length="28"
                />
              </a-form-item>
              <a-form-item :label="$t('loan.loan_reference_number')">
                <a-input
                  v-decorator="
                    formValidate('LoanReferenceNumber', {
                      initialValue: info.LoanDubilNo
                    })
                  "
                  disabled
                />
              </a-form-item>
              <a-form-item :label="$t('product.product_id')">
                <a-spin :spinning="productSpinning">
                  <a-select
                    v-decorator="
                      formValidate('ProductID', {
                        initialValue: info.LoanProdtNo,
                        rules: [
                          { required: true, message: $t('message.select_correct_information') }
                        ]
                      })
                    "
                    :placeholder="$t('placeholder.select_product_id')"
                    :get-popup-container="
                      (triggerNode) => {
                        return triggerNode.parentNode || document.body;
                      }
                    "
                    @change="selectChange($event, 'ProductID')"
                  >
                    <a-select-option
                      v-for="(item, index) in productList"
                      :key="index"
                    >
                      {{ item.LoanProdtNo }}
                    </a-select-option>
                  </a-select></a-spin>
                <a-input
                  :placeholder="$t('placeholder.select_product_id')"
                  :value="reveal.productName"
                  disabled
                />
              </a-form-item>
              <a-form-item :label="$t('loan.arrangement_purpose')">
                <a-select
                  v-decorator="
                    formValidate('ArrangementPurpose', {
                      initialValue: info.ArrangementPurpose,
                      rules: [
                        { required: true, message: $t('message.select_correct_information') }
                      ]
                    })
                  "
                  :placeholder="$t('placeholder.input_arrangement_purpose')"
                  :get-popup-container="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                >
                  <a-select-option
                    v-for="(value, key) in $store.state.enumeration['IL0010']"
                    :key="key"
                  >
                    <a
                      href="javascript:;"
                      :title="value"
                      style="color: rgba(0, 0, 0, 0.65)"
                    >{{ value }}</a>
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('loan.amount')">
                <number-input
                  v-decorator="
                    formValidate('Amount', { initialValue: info.CreditAmt,
                                             rules: [
                                               { required: true, message: $t('message.select_correct_information') }
                                             ]
                    })
                  "
                  :placeholder="$t('placeholder.input_amount')"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                  @change="inputChange($event, 'Amount')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.interest_rate')">
                <number-input
                  v-decorator="
                    formValidate('InterestRate', {
                      initialValue: $lib.calcNum(info.Intr * 100),
                      rules: [
                        { required: true, message: $t('message.select_correct_information') }
                      ]
                    })
                  "
                  :placeholder="$t('placeholder.input_interest_rate')"
                  :max-length="2"
                  :min="0"
                  :decimal="interestRateDecimal"
                  @change="inputChange($event, 'InterestRate')"
                />
                %
              </a-form-item>
              <a-form-item :label="$t('loan.credit_usage')">
                <number-input
                  :placeholder="$t('placeholder.input_credit_usage')"
                  :value="info.LoanAmt || info.CreditAmt || 0"
                  :max-length="12"
                  :decimal="true"
                  :formatter="true"
                  disabled
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
                <a-input
                  :value="reveal.tenor"
                  :placeholder="$t('placeholder.input_tenor_waiting')"
                  disabled
                  :max-length="3"
                  :min-length="1"
                  style="width: 171px"
                />
              </a-form-item>
              <a-form-item :label="$t('loan.loan_application_date')">
                <a-date-picker
                  v-decorator="
                    formValidate('ApplicationDate', {
                      initialValue: $moment(new Date(), 'YYYY-MM-DD')
                    })
                  "
                  :placeholder="$t('Utils.isRequired')"
                  disabled
                />
              </a-form-item>
              <a-form-item :label="$t('loan.drawdown_date')">
                <a-date-picker
                  v-decorator="
                    formValidate('DrawdownDate', {
                      initialValue: info.ActlMakelnDt,
                      rules: [
                        { required: true, message: $t('message.select_correct_information') }
                      ]
                    })
                  "
                  :placeholder="$t('placeholder.select_drawdown_date')"
                  :disabled-date="disabledDrawdownDate"
                  @change="calcChange($event, 'DrawdownDate')"
                />
              </a-form-item>
              <a-form-item :label="$t('loan.maturity_date')">
                <a-date-picker
                  v-decorator="
                    formValidate('MaturityDate', { initialValue: info.MatrDt,
                                                   rules: [
                                                     { required: true, message: $t('message.select_correct_information') }
                                                   ]
                    })
                  "
                  :placeholder="$t('placeholder.select_maturity_date')"
                  :disabled-date="disabledMaturityDate"
                  @change="dateChange($event, 'MaturityDate')"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card
          :title="$t('loan.transaction_Info')"
          class="my-card my-card-left"
        >
          <a-icon slot="extra" type="down" class="extra" />

          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <div class="card-content-header">
                <div>{{ $t("loan.disbursement") }}</div>
              </div>
              <a-form-item :label="$t('loan.disbursement_status')">
                <a-radio-group
                  v-decorator="
                    formValidate('DisbursementStatus', {
                      initialValue: reveal.DisbursementStatus
                    })
                  "
                  class="my-radio"
                  @change="radioChange($event, 'DisbursementStatus')"
                >
                  <a-radio value="01">{{ $t("loan.total") }}</a-radio>
                  <a-radio value="02">{{ $t("loan.partial") }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <div class="card-content-header">
                <div>{{ $t("loan.previous_disbursement") }}</div>
              </div>
              <a-form-item :label="$t('loan.previous_disbursement_amount')">
                <number-input
                  :value="info.LoanAmt || 0"
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
            </a-col>
            <a-col :span="7">
              <div class="card-content-header">
                <div>{{ $t("loan.next_disbursement") }}</div>
              </div>
              <a-form-item :label="$t('loan.next_disbursement_date')">
                <a-date-picker
                  v-decorator="[
                    'NextDsbDate',
                    { initialValue: info.NextDsbDate }
                  ]"
                  :disabled="true"
                  style="width: 100%"
                />
              </a-form-item>
              <a-form-item :label="$t('loan.disbursement_amount_available')">
                <number-input
                  :value="
                    info.AvailableQuota
                      ? info.AvailableQuota
                      : reveal.Amount
                  "
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
              <a-form-item :label="$t('loan.next_disbursement_amount')">
                <number-input
                  v-decorator="[
                    'DisbursementAmount',
                    {
                      initialValue: info.NextDsbAmt,
                      rules: [
                        {
                          required: true,
                          message: $t(
                            'loan.please_input_next_disbursement_amount'
                          )
                        },
                        checkAmt()
                      ]
                    }
                  ]"
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :disabled="reveal.DisbursementStatus !== '02'"
                  @change="inputChange($event, 'DisbursementAmount')"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.disbursement_channel')">
                <a-radio-group
                  v-decorator="
                    formValidate('DisbursementChannel', {
                      initialValue: info.LoanChannel || '01'
                    })
                  "
                  class="my-radio"
                >
                  <a-radio value="01">{{ $t("loan.bank") }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <div class="card-content-header">
            <div>{{ $t("loan.repayment") }}</div>
          </div>
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('loan.repayment_frequency')">
                <a-select
                  v-decorator="
                    formValidate('RepaymentFrequency', {
                      initialValue: info.LoanDeadlUnitCd || '04'
                    })
                  "
                  :get-popup-container="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                  :placeholder="$t('placeholder.select_repayment_freq')"
                  @change="selectChange($event, 'RepaymentFrequency')"
                >
                  <a-select-option
                    v-for="(item, index) in $store.state.enumeration['IL0011']"
                    :key="index"
                    :value="index"
                  >{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('loan.auto_repay_activation')">
                <a-radio-group
                  v-decorator="
                    formValidate('AutoRepayActivation', {
                      initialValue: info.AuotoRepyFlag || '01'
                    })
                  "
                  class="my-radio"
                >
                  <a-radio value="01">{{ $t("loan.auto_repay") }}</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item :label="$t('loan.repayment_date')">
                <a-select
                  v-decorator="
                    formValidate('RepaymentDate', {
                      initialValue: info.RepayDay
                    })
                  "
                  :placeholder="$t('placeholder.select_repayment_date')"
                  :disabled="!isMonthly"
                  :get-popup-container="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                  @change="selectChange($event, 'RepaymentDate')"
                >
                  <a-select-option
                    v-for="day in 31"
                    :key="day"
                    :value="day"
                  >{{ day }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item ref="GracePeriod" :label="$t('loan.grace_period')">
                <number-input
                  v-decorator="formValidate('GracePeriod', {initialValue:info.GracePeriod?info.GracePeriod:reveal.GracePeriod})"
                  :placeholder="$t('placeholder.input_grace_period')"
                  :formatter="true"
                  :decimal="false"
                  :max-length="3"
                  style="width: 60%"
                  :min="0"
                  @change="getMaximumGracePeriod($event)"
                />
                <span class="currency">
                  {{ $t("loan.days") }}
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('loan.outstanding_balance')">
                <number-input
                  :value="info.OutstandingBalance"
                  disabled
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :min="0"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.installment')">
                <number-input
                  :value="info.InstallmentAmount"
                  disabled
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :min="0"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.principal')">
                <number-input
                  :value="info.Principal"
                  disabled
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :min="0"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.interest_rate')">
                <number-input
                  :value="info.Interest"
                  disabled
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :min="0"
                />
                <span class="currency">
                  <a-spin :spinning="currencySpinning">
                    {{ currencyUse }}
                  </a-spin>
                </span>
              </a-form-item>
              <a-form-item :label="$t('loan.overdue_amount')">
                <number-input
                  :value="info.OverDueamt || 0"
                  disabled
                  :formatter="true"
                  :decimal="true"
                  :max-length="12"
                  :min="0"
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
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-if="pageType !== 'LoanReject'"
                      v-decorator="['AppFeeCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                    >
                      <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                    <a-spin v-else :spinning="currencySpinning">
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
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-if="pageType !== 'LoanReject'"
                      v-decorator="['ProcFeeCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                    >
                      <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                    <a-spin v-else :spinning="currencySpinning">
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
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-if="pageType !== 'LoanReject'"
                      v-decorator="['OverFeeCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                    >
                      <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                    <a-spin v-else :spinning="currencySpinning">
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
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-if="pageType !== 'LoanReject'"
                      v-decorator="['AdvRepayFeeCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                    >
                      <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                    <a-spin v-else :spinning="currencySpinning">
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
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-if="pageType !== 'LoanReject'"
                      v-decorator="['ExtsnFeeCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                    >
                      <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                    <a-spin v-else :spinning="currencySpinning">
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
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-if="pageType !== 'LoanReject'"
                      v-decorator="['RepayPlanFeeCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                    >
                      <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                    <a-spin v-else :spinning="currencySpinning">
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
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-if="pageType !== 'LoanReject'"
                      v-decorator="['TaxCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                    >
                      <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                    <a-spin v-else :spinning="currencySpinning">
                      {{ currencyUse }}
                    </a-spin>
                  </div>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card
          :title="$t('message.maker')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input :value="reveal.userId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.maker_comment')">
                <a-textarea
                  v-decorator="
                    formValidate('MakerComment', {
                      initialValue: info.MakelnComnt,
                      rules: [
                        {
                          required: true,
                          message: $t('message.select_correct_information')
                        }
                      ]
                    })
                  "
                  :placeholder="$t('placeholder.input_maker_comment')"
                  :max-length="200"
                  :min-length="1"
                  class="guarantor"
                />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </collapse-card>
        <collapse-card
          :title="$t('message.checker')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input value="" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.review')">
                <a-radio-group class="form-radio" disabled>
                  <a-radio value="01" style="margin-bottom: 10px">{{
                    $t("message.approve")
                  }}</a-radio><br>
                  <a-radio value="02">{{ $t("message.reject") }}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.checker_comment')">
                <a-textarea
                  disabled
                  class="guarantor"
                  :placeholder="$t('placeholder.input_checker_comment')"
                  :min-length="1"
                  :max-length="200"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </collapse-card>
        <!--新增-->
        <div
          v-if="pageType !== 'LoanReject'"
          v-auth="$buttonConfig.Loan.NewLoan"
          class="submit-content"
        >
          <a-button @click="resetForm">{{ $t("message.reset_btn") }}</a-button>
          <a-button type="primary" :loading="loading.save" @click="save">{{
            $t("message.save_btn")
          }}</a-button>
        </div>
        <!--退回-->
        <div
          v-if="
            pageType === 'LoanReject' &&
              (option.ApprovalStatus === '02' || option.ApprovalStatus === '01')
          "
          v-auth="$buttonConfig.Loan.EditLoanReturned"
          class="submit-content"
        >
          <a-button @click="resetForm">{{ $t("message.reset_btn") }}</a-button>
          <a-button type="primary" :loading="loading.save" @click="save">{{
            $t("message.save_btn")
          }}</a-button>
        </div>
      </a-form>
    </div>
    <div v-if="showSuccess" class="success-msg">
      <div class="msg">{{ $t("loan.loan_create_successfully") }}</div>
      <div class="product-id">
        {{ $t("loan.application_number") }}: {{ reveal.MakelnAplySn }}
      </div>
      <a-button
        type="dashed"
        style="margin-bottom: 12px"
        @click="$router.push({ path: '/loan' })"
      >{{ $t("loan.loan_list_btn") }}
      </a-button>
      <a-button
        v-auth="$buttonConfig.Loan.NewLoan"
        type="primary"
        style="margin-bottom: 26px"
        icon="plus"
        @click="goLoanCreate"
      >
        {{ $t("loan.new_loan") }}
      </a-button>
    </div>
  </div>
</template>

<script>
import getFormValidate from "@/verification/LoanCreate";
import config from "@/lib/config";
import Customer from "@/service/customer";
import ProductService from "@/service/productService";
import Loan from "@/service/loanService";
import CM from "@/service/common";
import inputValidate from "@/lib/input-validate";
import CollapseCard from "@/components/CollapseCard";

export default {
  name: "ProductDetails",
  components: { CollapseCard },
  data() {
    return {
      pageType: this.$route.name,
      option: this.$route.query,
      normFile: [],
      isMonthly: true,
      currencySpinning: false,
      productSpinning: false,
      paramDetails: {},
      loanSelector: [
        { name: this.$t('product.same_as_currency'), value: '01' },
        { name: this.$t('product.percent_loan_amount'), value: '02' }
      ],
      config: {
        rules: [
          {
            type: "object",
            required: true,
            message: this.$t("message.select_time")
          }
        ]
      },
      cifPattern: "___-___-___-___",
      citizenPattern: "_-___-_____-__-_",
      interestRateDecimal: true,
      countryCode: config.countryCode,
      getCustomerNameimer: null,
      info: {},
      reveal: {
        userId: this.global.userInfo.name,
        LoanProdtNo: "",
        DisbursementStatus: "02",
        CIF: "",
        bankBIC: ""
      },
      loading: {
        customerName: false,
        save: false
      },
      placeholder: {
        customerName: this.$t("placeholder.input_cif")
      },
      productList: [],
      arrangementList: [],
      productDetails: {},
      currentcyResult: [],
      currencyUse: "",
      currencyList: [],
      showSuccess: false,
      calcPlanTimer: null,
      repaymentFrequencyList: {},
      isReview: false,
      ExpiryYear: [],
      ExpiryMonth: [],
      SignInfo: [],
      MaximumGracePeriod: 0,
      DefaultAppFee: '',
      DefaultProcFee: '',
      DefaultOverFee: '',
      DefaultAdvRepayFee: '',
      DefaultExtsnFee: '',
      DefaultRepayPlanFee: '',
      DefaultTax: '',
      feeLoading: false,
      AppFeeCalcMethod: '',
      ProcFeeCalcMethod: '',
      OverFeeCalcMethod: '',
      AdvRepayFeeCalcMethod: '',
      ExtsnFeeCalcMethod: '',
      RepayPlanFeeCalcMethod: '',
      TaxCalcMethod: '',
      loanAmount: 0
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "validate_other" });
  },
  mounted() {
    for (let i = new Date().getFullYear(); i <= new Date().getFullYear() + 25; i++) {
      this.ExpiryYear.push(i + "");
    }
    for (let i = 1; i <= 12; i++) {
      this.ExpiryMonth.push(("0" + i).slice(-2) + "");
    }
    if (this.pageType === "LoanReject") {
      this.getLoanDetails();
    } else {
      this.getProductList();
      this.getCurrencyList();
    }
    this.getArrangementList();
    this.initPage();
  },
  methods: {
    loanSelectChange(e) {
      // console.log("🚀 ~ file: ProductDetailsCreate.vue ~ line 523 ~ loanSelectChange ~ e", e)
    },
    checkAmt() {
      const amt = this.info.AvailableQuota
                      ? this.info.AvailableQuota
                      : this.reveal.Amount
      const message = this.$t("loan.check_next_disbursement_amt");
      return {
        validator(rule, value, callback) {
          if (!value) callback();
          if ((value && !amt) || Number(value) > amt) {
            callback(message);
          }
          callback();
        }
      };
    },

    save(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        values.RepaymentDate =
          values.RepaymentDate === undefined ? "" : values.RepaymentDate;
        if (!err) {
          this.loading.save = true;
          if (!this.reveal.tenor) {
            // console.log("没获取到tenor,正在获取...");
            this.calcPlan()
              .then((res) => {
                // console.log("获取成功,开始调用放款申请");
                this.loanApplication(values);
              })
              .finally(() => {
                this.loading.save = false;
              });
          } else {
            // console.log("已经获取到tenor,直接调用放款申请");
            this.loanApplication(values);
          }
        }
      });
    },
    initPage() {
      inputValidate(document.querySelectorAll(".no-symbol-number"), {
        noSymbol: true,
        noNumber: true
      });
      inputValidate(document.querySelectorAll(".no-symbol-letter"), {
        noSymbol: true,
        noLetter: true
      });
      // ""Allow alphabets, space,and symbol & /. ( ) - , '""
      inputValidate(document.querySelectorAll(".guarantor"), {
        noSymbol: true,
        noNumber: false,
        noLetter: false,
        ignoreSymbol: ["&", "/", ".", "(", ")", "-", ",", "'"]
      });
      // Allow alphabets and INT Not allow negative number
      inputValidate(
        document.querySelectorAll(".no-symbol-neg-have-letter-number"),
        { noNeg: true, noSymbol: true, noLetter: false, noNumber: false }
      );
      inputValidate(document.querySelectorAll(".no-symbol"), {
        noSymbol: true
      });
      inputValidate(document.querySelectorAll(".spouse-certificate-id"), {
        noSymbol: true,
        noLetter: true,
        noNumber: false
      });
      // Allow alphabets and space
      inputValidate(document.querySelectorAll(".institution"), {
        noSymbol: true,
        noLetter: false
      });
      // "Allow alphabets, INT, space and symbol -"
      inputValidate(document.querySelectorAll(".zipcode"), {
        noLetter: false,
        noSymbol: true,
        ignoreSymbol: ["-"]
      });
      // "INT, space and symbol + - ( ) #"
      inputValidate(document.querySelectorAll(".phone"), {
        noSymbol: true,
        noNumber: false,
        ignoreSymbol: ["+", "-", "(", ")", "#"]
      });
      // "Allow alphabets, INT, space,and symbol - , . : ; ' ° & / ( ) #"
      inputValidate(document.querySelectorAll(".validate-addr"), {
        noSymbol: true,
        noLetter: false,
        noNumber: false,
        ignoreSymbol: [
          "&",
          ",",
          "-",
          "/",
          "(",
          ")",
          ".",
          "#",
          ":",
          ";",
          "°",
          "'"
        ]
      });
      // Allow alphabets and INT
      inputValidate(document.querySelectorAll(".no-hrn"), {
        noSymbol: true,
        noLetter: false,
        noNumber: false
      });
      // Allow alphabets and full stop (.)
      inputValidate(document.querySelectorAll(".full-stop"), {
        noLetter: false,
        noSymbol: true,
        ignoreSymbol: ["."]
      });
      inputValidate(document.querySelectorAll(".email"), {
        noSymbol: true,
        ignoreSymbol: ["_", "-", "@", "."]
      });
      // Allow alphabets, space, and symbol & /. ( ) - , '
      inputValidate(document.querySelectorAll(".bank-name"), {
        noLetter: false,
        noNumber: true,
        noSymbol: true,
        ignoreSymbol: ["&", ",", "-", "/", "(", ")", "."]
      });
      inputValidate(document.querySelectorAll(".inputNumberOnly"), {
        noNeg: true,
        noLetter: true,
        noSymbol: true,
        noSpace: true,
        ignoreSymbol: ["-"]
      });
    },
    loanApplication(values) {
      const param = {
        LoanProdtNo: this.reveal.LoanProdtNo,
        CustNo: values.CIF,
        LoanAmt: Number(values.DisbursementAmount),
        PeriodNum: this.reveal.tenor,
        // "PeriodType": "1",
        CustName: this.info.CustName ? this.info.CustName : this.reveal.customerName,
        GuarMethod: values.GuaranteeMethod,
        GuarName: values.GuaranteeName,
        GuarIdType: values.GuaranteeIDType,
        GuarIdNo: values.GuaranteeCertificateID,
        GuarPassCountry: values.GuaranteePassportCountry,
        ProdName: this.reveal.productName,
        LoanPur: values.ArrangementPurpose,
        IntRate: Number(values.InterestRate),
        CreditLimit: Number(values.Amount),
        CreditUsage: Number(values.Amount),
        AppDt: new Date(values.ApplicationDate).format("yyyy-MM-dd"),
        DrawDt: new Date(values.DrawdownDate).format("yyyy-MM-dd"),
        MaturDt: new Date(values.MaturityDate).format("yyyy-MM-dd"),
        RepayDay: values.RepaymentDate + "",
        DisburStatus: values.DisbursementStatus,
        TransferChannel: values.DisbursementChannel,
        RepayFreq: values.RepaymentFrequency,
        AuotoRepyFlag: values.AutoRepayActivation,
        // "RepaymentDt": '',
        // AppFee: Number(values.ApplicationFees),
        // ProcFee: Number(values.ProcessingAndOriginationFees),
        // OverFee: Number(values.OverdueFees),
        // AnticipatedFee: Number(values.AnticipatedRepaymentFees),
        // ExtensionFee: Number(values.ExtensionFees),
        // RepayPlanFee: Number(values.RepaymentPlanAdjustmentFees),
        // Tax: Number(values.TaxFees),
        Maker: this.reveal.userId,
        MakerComment: values.MakerComment,
        // Bank info
        BankNm: values.bankName,
        BIC: values.Bic,
        BankAccNm: values.bankAccountNumber,
        BankAccName: values.bankAccountName,

        CreitNm: values.creitNm,
        CardHdNm: values.cardHolderName,
        ExpiryMonth: values.expiryMonth,
        ExpiryYear: values.expiryYear,
        SecurityCd: values.securityCode,

        // Grace Period
        GracePeriod: Number(values.GracePeriod),
        // Fees improve
        AppFee: Number(values.DefaultAppFee),
        ProcFee: Number(values.DefaultProcFee),
        OverFee: Number(values.DefaultOverFee),
        AnticipatedFee: Number(values.DefaultAdvRepayFee),
        ExtensionFee: Number(values.DefaultExtsnFee),
        RepayPlanFee: Number(values.DefaultRepayPlanFee),
        Tax: Number(values.DefaultTax),

        AppFeeCalcMethod: values.AppFeeCalcMethod,
        ProcFeeCalcMethod: values.ProcFeeCalcMethod,
        OverFeeCalcMethod: values.OverFeeCalcMethod,
        AdvRepayFeeCalcMethod: values.AdvRepayFeeCalcMethod,
        ExtsnFeeCalcMethod: values.ExtsnFeeCalcMethod,
        RepayPlanFeeCalcMethod: values.RepayPlanFeeCalcMethod,
        TaxCalcMethod: values.TaxCalcMethod

      };
      if (values.ApplicationNumber) {
        param.MakelnAplySn = values.ApplicationNumber;
      }
      console.log("param = ", param);
      Loan.loanApplication(param)
        .then((res) => {
          console.log("loanApplication res = ", res);
          this.showSuccess = true;
          this.reveal.MakelnAplySn = res.MakelnAplySn;
        })
        .finally(() => {
          this.loading.save = false;
        }).catch(err => {
          console.log('eer', err)
        this.$message.error(err.RetMessage);
      });
    },
    getLoanDetails() {
      const param = {
        MakelnAplySn: this.option.MakelnAplySn,
        CustNo: this.option.CustNo,
        LoanStatus: this.option.LoanStatus
      };
      this.getCurrencyList();
      Loan.getLoanDetails(param).then((res) => {
        // console.log('loan detail = ', res)
        this.info = res;
        console.log('res reject:', res)
        this.form.setFieldsValue({
          DefaultAppFee: parseFloat(res.AppFee),
          DefaultProcFee: parseFloat(res.ProcFee),
          DefaultOverFee: parseFloat(res.OverFee),
          DefaultAdvRepayFee: parseFloat(res.AdvRepayFee),
          DefaultExtsnFee: parseFloat(res.ExtsnFee),
          DefaultRepayPlanFee: parseFloat(res.RepayPlanAdjFee),
          DefaultTax: parseFloat(res.Tax),
          GracePeriod: res.GracePeriod,

          AppFeeCalcMethod: res.AppFeeCalcMethod,
          ProcFeeCalcMethod: res.ProcFeeCalcMethod,
          OverFeeCalcMethod: res.OverFeeCalcMethod,
          AdvRepayFeeCalcMethod: res.AdvRepayFeeCalcMethod,
          ExtsnFeeCalcMethod: res.ExtsnFeeCalcMethod,
          RepayPlanFeeCalcMethod: res.RepayPlanFeeCalcMethod,
          TaxCalcMethod: res.TaxCalcMethod
        })
        if (this.info.LoanDeadlUnitCd === '04') {
          this.info.RepayDay = this.info.RepayDay ? this.info.RepayDay.replace(/^0+/, '') : '1'
          this.isMonthly = true
        } else {
          this.isMonthly = false
          this.form.setFieldsValue({ RepayDay: '' });
          this.info.RepayDay = ''
        }
        this.getProductList();
      }).catch(err => {
        this.$message.error(err.RetMessage);
      });
    },
    inputChange(e, type, patternz) {
      if (type === "CIF") {
        this.$set(this.reveal, "customerName", "");
        if (this.getCustomerNameimer) {
          clearTimeout(this.getCustomerNameimer);
        }
        const value = e.target.value;
        this.placeholder.customerName = value
          ? "Loading..."
          : this.$t("placeholder.input_cif");
        this.getCustomerNameimer = setTimeout(() => {
          if (value) {
            this.getCustomerName(value);
            this.calcChange(e, type);
          }
        }, 2000);
      }
      if (type === "Amount") {
        this.$set(this.reveal, "Amount", e);
        this.loanAmount = e;
        this.form.validateFields((_, values) => {
          console.log('values', values)
          this.form.setFieldsValue({
            ...values,
             DefaultAppFee: values.AppFeeCalcMethod === '01' ? parseFloat(values.DefaultAppFee) : parseFloat(this.DefaultAppFee / 100 * e).toFixed(2),
             DefaultProcFee: values.ProcFeeCalcMethod === '01' ? parseFloat(values.DefaultProcFee) : parseFloat(this.DefaultProcFee / 100 * e).toFixed(2),
             DefaultOverFee: values.OverFeeCalcMethod === '01' ? parseFloat(values.DefaultOverFee) : parseFloat(this.DefaultOverFee / 100 * e).toFixed(2),
             DefaultAdvRepayFee: values.AdvRepayFeeCalcMethod === '01' ? parseFloat(values.DefaultAdvRepayFee) : parseFloat(this.DefaultAdvRepayFee / 100 * e).toFixed(2),
             DefaultExtsnFee: values.ExtsnFeeCalcMethod === '01' ? parseFloat(values.DefaultExtsnFee) : parseFloat(this.DefaultExtsnFee / 100 * e).toFixed(2),
             DefaultRepayPlanFee: values.RepayPlanFeeCalcMethod === '01' ? parseFloat(values.DefaultRepayPlanFee) : parseFloat(this.DefaultRepayPlanFee / 100 * e).toFixed(2),
             DefaultTax: values.TaxCalcMethod === '01' ? parseFloat(values.DefaultTax) : parseFloat(this.DefaultTax / 100 * e).toFixed(2)
          })
        })
        this.form.setFieldsValue({
          DisbAmtAva: e
        });
        if (this.reveal.DisbursementStatus === "01") {
          this.form.setFieldsValue({
            DisbursementAmount: e
          });
        }
      }
      if (type === "DisbursementAmount" && e && this.reveal.Amount) {
        this.$set(this.reveal, "DisbursementAmount", e);
      }
      if (type === "InterestRate") {
        // this.interestRateDecimal = e !== '100';
      }
      if (
        type === "InterestRate" ||
        type === "DisbursementAmount" ||
        type === "Amount"
      ) {
        this.calcChange(e, type);
      }
    },
    radioChange(e, type) {
      if (type === "Guarantee") {
        // this.reveal.GuaranteeType = e.target.value;
        this.$set(this.reveal, "GuaranteeType", e.target.value);
        // console.log(this.reveal.GuaranteeType);
        if (e.target.value !== "1") {
          this.form.resetFields([
            "GuaranteeName",
            "GuaranteeIDType",
            "GuaranteeCertificateID",
            "GuaranteePassportCountry"
          ]);
        }
      }
      if (type === "DisbursementStatus") {
        this.$set(this.reveal, "DisbursementStatus", e.target.value);
        if (e.target.value === "01") {
          this.form.setFieldsValue({
            DisbursementAmount: this.reveal.Amount
          });
        } else {
          this.form.resetFields(["DisbursementAmount"]);
        }
      }
    },
    dateChange(e, type) {
      if (type === "MaturityDate") {
        this.calcChange(e, type);
      }
    },
    async getCurrencyList() {
      await CM.getOptionList().then((res) => {
        this.currentcyResult = res["CM0001"];
      });
      for (const i in this.currentcyResult) {
        this.currencyList.push({ name: this.currentcyResult[i], value: i });
      }
    },
    async selectChange(e, type) {
      if (type === "bankName") {
        const BIC = {
          Citigroup: "CITICNSX",
          ICBC: "ICBKCNBJ",
          "Mizuho FG": "MHCBJPJT",
          "Wells fargo": "WFBIUS63",
          HSBC: "HSBCCNSH"
        };
        this.reveal.bankBIC = BIC[e];
      }
      if (type === "ProductID") {
        const param = {
          LoanProdtNo: this.productList[e].LoanProdtNo || null,
          LoanProdtVersNo: this.productList[e].LoanProdtVersNo || null
        };
        this.currencySpinning = true;
        // this.MaximumGracePeriod = null
        this.form.resetFields(["GracePeriod"]);
        await ProductService.getProductDetails(param).then((res) => {
          console.log('getProductDetails = ', res)
          // Grace Period
          this.MaximumGracePeriod = res.MaximumGracePeriod
          if (Number(this.form.getFieldsValue(['GracePeriod'])) > this.MaximumGracePeriod) {
            this.form.setFieldsValue({ 'GracePeriod': this.MaximumGracePeriod })
        }
          this.$set(this.reveal, "GracePeriod", res.DefaultGracePeriod);
          this.productDetails["CurCd"] = res.CurCd;
          this.DefaultAppFee = res.DefaultAppFee;
          this.DefaultProcFee = res.DefaultProcFee;
          this.DefaultOverFee = res.DefaultOverFee;
          this.DefaultAdvRepayFee = res.DefaultAdvRepayFee;
          this.DefaultExtsnFee = res.DefaultExtsnFee;
          this.DefaultRepayPlanFee = res.DefaultRepayPlanFee;
          this.DefaultTax = res.DefaultTax;
          this.form.resetFields(["Amount"])
          this.form.setFieldsValue({
            DefaultAppFee: res.AppFeeCalcMethod === '01' ? parseFloat(res.DefaultAppFee) : 'Waiting for filled Loan amount',
            DefaultProcFee: res.ProcFeeCalcMethod === '01' ? parseFloat(res.DefaultProcFee) : 'Waiting for filled Loan amount',
            DefaultOverFee: res.OverFeeCalcMethod === '01' ? parseFloat(res.DefaultOverFee) : 'Waiting for filled Loan amount',
            DefaultAdvRepayFee: res.AdvRepayFeeCalcMethod === '01' ? parseFloat(res.DefaultAdvRepayFee) : 'Waiting for filled Loan amount',
            DefaultExtsnFee: res.ExtsnFeeCalcMethod === '01' ? parseFloat(res.DefaultExtsnFee) : 'Waiting for filled Loan amount',
            DefaultRepayPlanFee: res.RepayPlanFeeCalcMethod === '01' ? parseFloat(res.DefaultRepayPlanFee) : 'Waiting for filled Loan amount',
            DefaultTax: res.TaxCalcMethod === '01' ? parseFloat(res.DefaultTax) : 'Waiting for filled Loan amount',

            AppFeeCalcMethod: res.AppFeeCalcMethod,
            ProcFeeCalcMethod: res.ProcFeeCalcMethod,
            OverFeeCalcMethod: res.OverFeeCalcMethod,
            AdvRepayFeeCalcMethod: res.AdvRepayFeeCalcMethod,
            ExtsnFeeCalcMethod: res.ExtsnFeeCalcMethod,
            RepayPlanFeeCalcMethod: res.RepayPlanFeeCalcMethod,
            TaxCalcMethod: res.TaxCalcMethod
          })
          this.currencyList.forEach((item) => {
            if (item.value === this.productDetails.CurCd) {
              this.currencyUse = item.name;
            }
          });
        });
        this.currencySpinning = false;
        this.$set(this.reveal, "LoanProdtNo", this.productList[e].LoanProdtNo);
        console.log('DefaultAppFee', this.DefaultAppFee)
        this.$set(this.reveal, "productName", this.productList[e].LoanProdtNm);
      }
      if (type === "GuaranteeIDType") {
        this.$set(this.reveal, "GuaranteeIDType", e);
      }

      if (type === "RepaymentFrequency") {
        // console.log("RepaymentFrequency = ", e);
        if (e !== "04") {
          this.form.setFieldsValue({ RepaymentDate: '' });
          this.isMonthly = false;
          // console.log('this.isMonthly = ', this.isMonthly)
          // console.log('RepaymentDate = ', this.form.getFieldValue('RepaymentDate'))
        } else if (e === "04") {
          this.form.setFieldsValue({ RepaymentDate: '1' });
          this.isMonthly = true;
        }
        const MaturityDate = this.form.getFieldValue("MaturityDate");
        if (MaturityDate) {
          const MaturityDateTime = new Date(MaturityDate).getTime();
          console.log("MaturityDate = ", MaturityDateTime);
          this.calcChange(e, type);
        }
      }
      if (type === "RepaymentDate" || type === "ProductID") {
        this.calcChange(e, type);
      }
    },
    getMaximumGracePeriod(value) {
      if (value > this.MaximumGracePeriod) {
          this.$nextTick(() => this.form.setFieldsValue({ GracePeriod: this.MaximumGracePeriod }));
      }
    },
    getCustomerName(CIF) {
      if (!CIF) {
        return false;
      }
      this.reveal.initCIF = CIF;
      this.reveal.CIF = CIF;
      Customer.getCustomerList({ CustId: CIF, PageNo: 1, PageRecCount: 1 })
        .then((res) => {
          this.$set(
            this.reveal,
            "customerName",
            res.Records[0].CustName || "No Found"
          );
          Customer.getCustomerDetails({ CustId: CIF }).then((res) => {
            if (res.SignInfo) {
              this.$nextTick(() =>
                this.form.setFieldsValue({
                  bankName: res.SignInfo[0].OtherBankName,
                  Bic: res.SignInfo[0].SwiftCode,
                  bankAccountNumber: res.SignInfo[0].AcctNo,
                  bankAccountName: res.SignInfo[0].AcctName,
                  creitNm: res.SignInfo[0].CreitNm,
                  cardHolderName: res.SignInfo[0].CardHdNm,
                  expiryMonth: res.SignInfo[0].ExpiryMonth,
                  expiryYear: res.SignInfo[0].ExpiryYear,
                  securityCode: res.SignInfo[0].SecurityCd
                }))
            }
          });
        })
        .catch(() => {
          this.reveal.customerName = "No Found";
        });
    },
    getProductList() {
      const param = {
        ProdtStus: "02",
        PageNo: 1,
        PageRecCount: 999
      };
      this.productSpinning = true;
      ProductService.getProductList(param).then((res) => {
        this.productList = res.Records;
        if (this.pageType === "LoanReject") {
          const product =
            this.productList.filter(
              (item) => item.LoanProdtNo === this.info.LoanProdtNo
            )[0] || {};
          this.paramDetails["LoanProdtNo"] = product.LoanProdtNo;
          this.paramDetails["LoanProdtVersNo"] = product.LoanProdtVersNo;
          this.$set(this.reveal, "LoanProdtNo", product.LoanProdtNo);
          this.$set(this.reveal, "productName", product.LoanProdtNm);
          this.calcPlan();
          this.form.resetFields(["GracePeriod"]);
          ProductService.getProductDetails(this.paramDetails).then((res) => {
          // Grace Period
          this.MaximumGracePeriod = res.MaximumGracePeriod
          if (this.pageType !== "LoanReject") {
          this.form.setFieldsValue({ 'GracePeriod': res.GracePeriod })
          this.$set(this.reveal, "GracePeriod", res.GracePeriod);
          }
            this.productDetails["CurCd"] = res.CurCd;
            this.currencyList.forEach((item) => {
              if (item.value === this.productDetails.CurCd) {
                this.currencyUse = item.name;
              }
            });
          });
        }
        this.productSpinning = false;
      });
    },
    getArrangementList() {
      const res = this.$store.state.enumeration;
      this.arrangementList = res["IL0010"];
      this.repaymentFrequencyList = res["IL0011"];
    },
    calcChange(e, type) {
      if (type === "DrawdownDate") {
        this.form.setFieldsValue({ NextDsbDate: e });
      }
      if (this.calcPlanTimer) {
        clearTimeout(this.calcPlanTimer);
      }
      this.calcPlanTimer = setTimeout(this.calcPlan, 2000);
    },
    // 还款计划试算
    calcPlan() {
      return new Promise((resolve, reject) => {
        const keyList = [
          "DisbursementAmount",
          "RepaymentFrequency",
          "InterestRate",
          "DrawdownDate",
          "MaturityDate"
        ];
        const formData = this.form.getFieldsValue(keyList);
        let isQuery = true;
        for (const key in formData) {
          if (!formData[key] && formData[key] !== 0) {
            isQuery = false;
          }
        }
        if (isQuery && this.reveal.LoanProdtNo) {
          const param = {
            // "CustNo": this.reveal.CIF,
            LoanProdtNo: this.reveal.LoanProdtNo,
            LoanAmt: Number(formData.DisbursementAmount),
            // "LoanDeadl": '',
            LoanDeadlCd: formData.RepaymentFrequency,
            LoanIntrt: Number(formData.InterestRate),
            IntCalcBgnDate: new Date(formData.DrawdownDate).format(
              "yyyy-MM-dd"
            ),
            IntCalcEndDate: new Date(formData.MaturityDate).format(
              "yyyy-MM-dd"
            ),
            RepayDay: formData.RepaymentDate
          };
          param.RepayDay = param.RepayDay + "";
          if (this.isMonthly) {
            param.RepayDay = "1";
          }

          Loan.repaymentPlanTrialCalculation(param)
            .then((res) => {
              const Records = res.Records || [];
              const planInfo = Records.filter((item) => item.Pridnum === 1)[0];
              this.$set(this.reveal, "tenor", res.PageTotCount - 1);
              const info = {
                InstallmentAmount: planInfo.PlanRepayTotlAmt,
                Principal: planInfo.PlanRepayPrin,
                Interest: planInfo.PlanRepayIntr,
                OutstandingBalance: formData.DisbursementAmount
              };
              this.info = Object.assign(this.info, info);
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    },
    disabledDrawdownDate(date) {
      const MaturityDate = this.form.getFieldValue("MaturityDate");
      if (!date) {
        return false;
      }
      if (MaturityDate) {
        return (
          new Date(MaturityDate).getTime() < date.valueOf() ||
          new Date().getTime() + 1 > date.valueOf()
        );
      } else {
        return new Date().getTime() + 1 > date.valueOf();
      }
    },
    disabledMaturityDate(date) {
      const DrawdownDate = this.form.getFieldValue("DrawdownDate");
      if (!date) {
        return false;
      }
      if (DrawdownDate) {
        return (
          new Date(DrawdownDate).getTime() > date.valueOf() ||
          new Date().getTime() + 1 > date.valueOf()
        );
      } else {
        return new Date().getTime() + 1 > date.valueOf();
      }
    },
    formValidate(key, option) {
      return getFormValidate(key, option);
    },
    resetForm() {
      this.reveal = null;
      this.reveal = {
        userId: this.global.userInfo.name,
        DisbursementStatus: "01"
      };
      this.info = {};
      this.placeholder.customerName = this.$t("placeholder.input_cif");
      this.form.resetFields();
      this.reveal.bankBIC = "";
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    goLoanCreate() {
      this.resetForm();
      this.showSuccess = false;
      this.initPage();
      if (this.pageType !== "LoanCreate") {
        this.$router.push("/loan/loanCreate");
      }
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

  .my-radio {
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
</style>
