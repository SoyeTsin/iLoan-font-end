<template>
  <div id="product">
    <div v-if="!createSuccess" class="product-details-edit">
      <a-form :form="productCreateForm" @submit="handleSubmit">
        <CollapseCard :title="$t('product.basic')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('product.product_name')">
                <a-input
                  v-decorator="formValidate.LoanProdtNm"
                  :max-length="50"
                  :placeholder="$t('placeholder.input_product_name')"
                />
              </a-form-item>
              <a-form-item :label="$t('product.product_type')">
                <a-select
                  v-decorator="formValidate.LoanProdtTypCd"
                  :placeholder="$t('placeholder.select_guarantor_passport_country')"
                >
                  <a-select-option value="01">
                    {{ $t('message.personal') }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('product.product_category')">
                <a-select
                  v-decorator="formValidate.LoanProdtClsfCd"
                  :placeholder="$t('placeholder.select_guarantor_passport_country')"
                >
                  <a-select-option value="01">
                    {{ $t('product.micro_loan') }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.guarantee_method')">
                <a-radio-group
                  v-decorator="formValidate.LoanGuarManrCd"
                  class="my-radio"
                >
                  <a-radio value="01">
                    {{ $t('message.no_guarantee') }}
                  </a-radio>
                  <a-radio value="02">
                    {{ $t('message.guarantor') }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item :label="$t('message.currency')">
                <a-spin :spinning="currencySpinning">
                  <a-select
                    v-decorator="formValidate.CurCd"
                    :placeholder="$t('placeholder.select_currency')"
                    @change="currCheck"
                  >
                    <a-select-option v-for="item of currencyList" :key="item.value">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-spin>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.application_date')">
                <a-date-picker
                  v-decorator="formValidate.ApplicationDate"
                  :placeholder="$t('placeholder.select_date')"
                  disabled
                />
              </a-form-item>
              <a-form-item :label="$t('message.approval_date')">
                <a-date-picker disabled />
              </a-form-item>
              <a-form-item :label="$t('message.effective_date')">
                <a-date-picker
                  v-decorator="formValidate.DrawdownDate"
                  :placeholder="$t('placeholder.select_date')"
                  :disabled-date="disabledStartDate"
                />
              </a-form-item>
              <a-form-item :label="$t('message.expiry_date')">
                <a-date-picker
                  v-decorator="formValidate.MaturityDate"
                  :placeholder="$t('placeholder.select_date')"
                  :disabled-date="disabledEndDate"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </CollapseCard>

        <CollapseCard :title="$t('product.loan')" class="my-card my-card-left">
          <a-row style="width: 20%">
            <a-form-item :label="$t('message.number_of_applicant')">
              <a-select v-decorator="formValidate.NumberOfApplicant" class="my-radio">
                <a-select-option value="01">{{ $t('message.single_customer') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-row>
          <div class="card-content-header">
            <a-row type="flex" justify="space-between">
              <a-col :span="5">
                <a-form-item :label="$t('message.early_repayment_allowance')">
                  <a-radio-group
                    v-decorator="formValidate.PmitAdvRepayFlg"
                    class="my-radio"
                  >
                    <a-radio value="1">
                      {{ $t('message.allow') }}
                    </a-radio>
                    <a-radio value="0">
                      {{ $t('message.not_allow') }}
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label="$t('message.repayment_detail')">
                  <a-radio-group
                    v-decorator="formValidate.ChrgManrCd"
                    class="my-radio"
                  >
                    <a-radio value="01">
                      {{ $t('message.fixed_installment') }}
                    </a-radio>
                    <a-radio value="02">
                      {{ $t('message.fixed_principal') }}
                    </a-radio>
                  </a-radio-group>
                </a-form-item>

                <a-form-item :label="$t('product.maximum_grace_period')">
                  <number-input
                    v-decorator="formValidate.MaximumGracePeriod"
                    style="width: 60%;"
                    :placeholder="$t('placeholder.input_maximum_grace_period')"
                    :formatter="true"
                    :decimal="false"
                    :max-length="3"
                    :min="0"
                  />
                  <span class="currency">
                    {{ $t('loan.days') }}
                  </span>
                </a-form-item>
                <a-form-item :label="$t('product.default_grace_period')">
                  <number-input
                    v-decorator="formValidate.DefaultGracePeriod"
                    style="width: 60%;"
                    :placeholder="$t('placeholder.input_default_grace_period')"
                    :formatter="true"
                    :decimal="false"
                    :max-length="3"
                    :min="0"
                  />
                  <span class="currency">
                    {{ $t('loan.days') }}
                  </span>
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :label="$t('message.maximum_loan_amount_USD')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.AplyLoanCeilAmt"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        default-value="currencyCheck.name"
                        :disabled="true"
                        :value="currencyCheck.name"
                        :placeholder="$t('placeholder.select_currency')"
                      />
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('message.minimum_interest_rate')">
                  <div style="display: flex;justify-content: flex-start;">
                    <number-input
                      v-decorator="formValidate.MinInterestRate"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_minimum_interest_rate')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="2"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 30px;">
                      %
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('message.maximum_interest_rate')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.MaxInterestRate"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_interest_rate')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="2"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 30px">
                      %
                    </div>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item :label="$t('product.default_application_fees')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.DefaultAppFee"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        v-decorator="formValidate.AppFeeCalcMethod"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="loanSelectChange"
                      >
                        <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('product.default_processing_origination_fees')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.DefaultProcFee"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        v-decorator="formValidate.ProcFeeCalcMethod"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="loanSelectChange"
                      >
                        <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('product.default_overdue_fees')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.DefaultOverFee"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        v-decorator="formValidate.OverFeeCalcMethod"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="loanSelectChange"
                      >
                        <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('product.default_anticipated_repayment_fees')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.DefaultAdvRepayFee"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        v-decorator="formValidate.AdvRepayFeeCalcMethod"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="loanSelectChange"
                      >
                        <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('product.default_extension_fees')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.DefaultExtsnFee"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        v-decorator="formValidate.ExtsnFeeCalcMethod"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="loanSelectChange"
                      >
                        <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('product.default_repayment_plan_adjustment_fees')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.DefaultRepayPlanFee"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        v-decorator="formValidate.RepayPlanFeeCalcMethod"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="loanSelectChange"
                      >
                        <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </a-form-item>
                <a-form-item :label="$t('product.default_tax_fees')">
                  <div style="display: flex;justify-content: flex-start">
                    <number-input
                      v-decorator="formValidate.DefaultTax"
                      style="width: 60%;"
                      :placeholder="$t('placeholder.input_maximum_loan_amount')"
                      :formatter="true"
                      :decimal="true"
                      :max-length="12"
                      :min="0"
                    />
                    <div style="line-height: 30px;margin-left: 10px;width: 50%">
                      <a-select
                        v-decorator="formValidate.TaxCalcMethod"
                        :placeholder="$t('placeholder.select_currency')"
                        @change="loanSelectChange"
                      >
                        <a-select-option v-for="item of loanSelector" :key="item.value" :value="item.value">
                          {{ item.name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </CollapseCard>

        <CollapseCard :title="$t('product.maker')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input v-model="userId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.maker_comment')">
                <a-textarea
                  v-decorator="formValidate.OperRplshInfo"
                  :placeholder="$t('placeholder.input_maker_comment')"
                  :max-length="200"
                />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </CollapseCard>

        <CollapseCard :title="$t('product.checker')" class="my-card my-card-left">
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.review')">
                <a-radio-group class="my-radio" disabled>
                  <a-radio value="1">
                    {{ $t('message.agree') }}
                  </a-radio>
                  <a-radio value="2">
                    {{ $t('message.return') }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.checker_comment')">
                <a-textarea
                  v-decorator="formValidate.OperRplshInfoC"
                  :placeholder="$t('placeholder.input_checker_comment')"
                  :max-length="200"
                  :disabled="true"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </CollapseCard>
        <div class="submit-content">
          <a-button @click="newCreate">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" html-type="submit">{{ $t('message.save_btn') }}</a-button>
        </div>
      </a-form>
    </div>
    <div v-if="createSuccess" class="success-msg">
      <div class="msg">{{ $t('product.created_successfully') }}</div>
      <div class="product-id">{{ $t('product.product_id') }}: {{ LoanProdtNo }}</div>
      <a-button
        type="dashed"
        style="margin-bottom: 12px"
        @click="
          () => {
            this.$router.push('/product');
          }
        "
      >
        {{ $t('product.product_list_btn') }}
      </a-button>
      <a-button
        type="primary"
        style="margin-bottom: 26px"
        icon="plus"
        @click="newCreate"
      >
        {{ $t('product.new_product_btn') }}
      </a-button>
    </div>
  </div>
</template>

<script>
import ProductService from "@/service/productService";
import formValidate from "@/verification/ProductDetailsCreate";
import CM from "@/service/common";
import inputValidate from "@/lib/input-validate";

export default {
  name: "ProductDetails",
  components: {},
  data() {
    return {
      productCreateForm: this.$form.createForm(this, {
        name: "productCreateForm"
      }),
      createSuccess: false,
      currencyList: [],
      loanSelector: [
        { name: this.$t('product.same_as_currency'), value: '01' },
        { name: this.$t('product.percent_loan_amount'), value: '02' }
      ],
      currencyCheck: 0,
      currentcyResult: [],
      formValidate,
      currencySpinning: false,
      LoanProdtNo: "",
      userId: this.global.userInfo.name
    };
  },
  mounted() {
    this.getCurrencyList();
    this.productCreateForm.setFieldsValue({ ApplicationDate: this.$moment() });
    this.customRule();
    this.initPage()
  },
  methods: {
    initPage() {
      inputValidate(document.querySelectorAll('.inputNumberOnly'), { noNeg: true, noLetter: true, noSymbol: true, noSpace: true, ignoreSymbol: ['-'] })
    },
    currCheck(e) {
    this.currencyCheck = this.currencyList.find(curr => curr.value === e.toString())
    // console.log("🚀 ~ file: ProductDetailsCreate.vue ~ line 315 ~ currCheck ~ this.currencyCheck", this.currencyCheck["name"])
    // console.log("🚀 ~ file: ProductDetailsCreate.vue ~ line 304 ~ currCheck ~ e", e)
    },
    disabledStartDate(startValue) {
      const endValue = this.$moment(
        this.$moment().format("yyyy-MM-DD"),
        "yyyy-MM-DD"
      ).add(1, 'days');
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() < endValue.valueOf();
    },
    disabledEndDate(startValue) {
      const endValue = this.$moment(
        this.$moment().format("yyyy-MM-DD"),
        "yyyy-MM-DD"
      );
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() < endValue.valueOf();
    },
    loanSelectChange(e) {
    // console.log("🚀 ~ file: ProductDetailsCreate.vue ~ line 523 ~ loanSelectChange ~ e", e)
    },
    customRule() {
      this.formValidate.LoanProdtNm[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
      //  const { getFieldValue } = this.productCreateForm;
        if (!value) {
          callback(this.$t('message.please_correct_information'));
        } else if (!value.match("^[0-9a-zA-Z-&.(),'\\s-\-\/]+$")) {
            callback(this.$t("message.input_only_alphabet_number"));
          } else {
             callback()
           }
      }
      // https://fsdi.atlassian.net/browse/IL-343
      this.formValidate.AplyLoanCeilAmt[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        // console.log("value", value);
        if (!value) {
          callback(this.$t('message.please_correct_information'));
        } else if ((value + "").length > 15) {
          callback(this.$t('message.up_to_15_digits'));
        } else if (isNaN(value)) {
          callback(this.$t('message.please_input_number'));
        } else if (value < 0) {
          callback(this.$t('message.please_input_positive_number'));
        } else if (
          (value + "").indexOf(".") > -1 &&
          (value + "").toString().split(".")[1].length > 2
        ) {
          callback(this.$t('message.up_to_two_decimal'));
        }
        callback();
      };
      this.formValidate.CurCd[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        // console.log('valueee', this.formValidate)
      //  const { getFieldValue } = this.productCreateForm;
        if (!value) {
          callback(this.$t('message.please_correct_information'));
        }
           callback();
      }
      // MaxInterestRate
      this.formValidate.MaxInterestRate[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        const { getFieldValue } = this.productCreateForm;
        if (value > getFieldValue("MaxInterestRate") || !value) {
          callback(this.$t('message.please_correct_information'));
        } else if ((value + "").length > 10) {
          callback(this.$t('message.up_to_ten_digits'));
        } else if (isNaN(value)) {
          callback(this.$t('message.please_input_number'));
        } else if (value < 0) {
          callback(this.$t('message.please_input_positive_number'));
        } else if (
          (value + "").indexOf(".") > -1 &&
          (value + "").toString().split(".")[1].length > 2
        ) {
          callback(this.$t('message.up_to_two_decimal'));
        }
        callback();
        this.productCreateForm.validateFields(["MaxInterestRate"]);
      };
      // MinInterestRate
      this.formValidate.MinInterestRate[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        // console.log(value);
        const { getFieldValue } = this.productCreateForm;
        if (value < getFieldValue("MinInterestRate") || !value) {
          callback(this.$t('message.please_correct_information'));
        } else if ((value + "").length > 10) {
          callback(this.$t('message.up_to_ten_digits'));
        } else if (isNaN(value)) {
          callback(this.$t('message.please_input_number'));
        } else if (value < 0) {
          callback(this.$t('message.please_input_positive_number'));
        } else if (
          (value + "").indexOf(".") > -1 &&
          (value + "").toString().split(".")[1].length > 2
        ) {
          callback(this.$t('message.up_to_two_decimal'));
        }
        callback();
        this.productCreateForm.validateFields(["MinInterestRate"]);
      };
      // MaturityDate
      this.formValidate.MaturityDate[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        // console.log(value);
        const { getFieldValue } = this.productCreateForm;
        if (value < getFieldValue("DrawdownDate") || !value) {
          callback(this.$t('message.please_correct_information'));
        }
        callback();
        this.productCreateForm.validateFields(["DrawdownDate"]);
      };
      // DrawdownDate
      this.formValidate.DrawdownDate[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        // console.log(value);
        const { getFieldValue } = this.productCreateForm;
        if (value > getFieldValue("MaturityDate") || !value) {
          callback(this.$t('message.please_correct_information'));
        }
        callback();
        this.productCreateForm.validateFields(["MaturityDate"]);
      };
      this.formValidate.AplyLoanCeilAmt[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        // console.log('AplyLoanCeilAmt = ', this.formValidate)
      //  const { getFieldValue } = this.productCreateForm;
        if (!value) {
          callback(this.$t('message.please_correct_information'));
        } else {
             callback()
           }
      }
      //   this.formValidate.MinInterestRate[1].rules[0].validator = (
      //   rule,
      //   value,
      //   callback
      // ) => {
      //   // console.log('MinInterestRate = ', this.formValidate)
      // //  const { getFieldValue } = this.productCreateForm;
      //   if (!value) {
      //     callback(this.$t('message.please_correct_information'));
      //   } else {
      //        callback()
      //      }
      // }
      //   this.formValidate.MaxInterestRate[1].rules[0].validator = (
      //   rule,
      //   value,
      //   callback
      // ) => {
      //   // console.log('MaxInterestRate = ', this.formValidate)
      // //  const { getFieldValue } = this.productCreateForm;
      //   if (!value) {
      //     callback(this.$t('message.please_correct_information'));
      //   } else {
      //        callback()
      //      }
      // }
       this.formValidate.LoanProdtClsfCd[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        // console.log('LoanProdtClsfCd = ', this.formValidate)
      //  const { getFieldValue } = this.productCreateForm;
        if (!value) {
          callback(this.$t('message.please_correct_information'));
        } else {
             callback()
           }
      }
      // Maximum Grace Period
      this.formValidate.MaximumGracePeriod[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        console.log('MaximumGracePeriod = ', this.formValidate)
        if (!value || !value && value !== 0) {
          callback(this.$t('message.please_correct_information'));
        } else {
             callback()
             this.productCreateForm.validateFields(['MaximumGracePeriod']);
           }
      }
      // Default Grace Period
      this.formValidate.DefaultGracePeriod[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        const { getFieldValue } = this.productCreateForm;
        if (!value && value !== 0) {
          callback(this.$t('message.please_correct_information'));
        } else if (isNaN(value)) {
          callback(this.$t('message.please_input_number'))
        } else if (Number(value) > Number(getFieldValue('MaximumGracePeriod'))) {
          this.productCreateForm.setFieldsValue({ 'DefaultGracePeriod': getFieldValue('MaximumGracePeriod') })
        } else {
        callback()
        this.productCreateForm.validateFields(['DefaultGracePeriod']);
        }
      }
    },
    createProduct(values) {
      console.log('createProduct value = ', values)
      const param = { ...values };
      param.OprorEmpnbr = this.userId;
      param.DrawdownDate = this.$moment(param.DrawdownDate).format(
        "yyyy-MM-DD"
      );
      param.MaturityDate = this.$moment(param.MaturityDate).format(
        "yyyy-MM-DD"
      );
      param.AplyLoanCeilAmt = values.AplyLoanCeilAmt * 1;
      param.MinInterestRate =
        this.$math.divide(param.MinInterestRate, 100) * 1;
      param.MaxInterestRate =
        this.$math.divide(param.MaxInterestRate, 100) * 1;
      // Grace Period
      param.DefaultGracePeriod = Number(values.DefaultGracePeriod);
      param.MaximumGracePeriod = Number(values.MaximumGracePeriod);
      param["DefaultAppFee"] = Number(values.DefaultAppFee);
      param["DefaultProcFee"] = Number(values.DefaultProcFee);
      param["DefaultOverFee"] = Number(values.DefaultOverFee);
      param["DefaultAdvRepayFee"] = Number(values.DefaultAdvRepayFee);
      param["DefaultExtsnFee"] = Number(values.DefaultExtsnFee);
      param["DefaultRepayPlanFee"] = Number(values.DefaultRepayPlanFee);
      param["DefaultTax"] = Number(values.DefaultTax);

      param["AppFeeCalcMethod"] = values.AppFeeCalcMethod;
      param["ProcFeeCalcMethod"] = values.ProcFeeCalcMethod
      param["OverFeeCalcMethod"] = values.OverFeeCalcMethod
      param["AdvRepayFeeCalcMethod"] = values.AdvRepayFeeCalcMethod
      param["ExtsnFeeCalcMethod"] = values.ExtsnFeeCalcMethod
      param["RepayPlanFeeCalcMethod"] = values.RepayPlanFeeCalcMethod
      param["TaxCalcMethod"] = values.TaxCalcMethod

      param["ChrgManrCd"] = values.ChrgManrCd
      param["PmitAdvRepayFlg"] = values.PmitAdvRepayFlg

      console.log('createProduct param', param)

      ProductService.createProduct(param).then((res) => {
        if (res.LoanProdtNo) {
          this.createSuccess = true;
          this.LoanProdtNo = res.LoanProdtNo;
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
       this.customRule();
      this.productCreateForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.createProduct(values);
        }
      });
    },
    newCreate() {
      this.createSuccess = false;
      this.LoanProdtNo = "";
      this.productCreateForm.resetFields();
    },
   async getCurrencyList() {
     this.currencySpinning = true
      this.currencyList = [];
      await CM.getOptionList().then(res => {
        this.currentcyResult = res["CM0001"]
      })
        for (const i in this.currentcyResult) {
          this.currencyList.push({ name: this.currentcyResult[i], value: i });
        }
        this.currencyList.sort((s1, s2) => {
          const x1 = s1.name.toUpperCase();
          const x2 = s2.name.toUpperCase();
          if (x1 < x2) return -1;
          if (x1 > x2) return 1;
          return 0;
        });
         this.currencySpinning = false
    }
  }
};
</script>

<style scoped lang="less">
.product-details-edit {
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
    color: #000000;
  }

  .my-radio {
    display: flex;
    flex-direction: column;

    > label {
      margin-bottom: 6px;
    }
  }

  .product {
    background-color: #ffffff;
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
    color: #000000;
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
    background-color: #ffffff;
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
}

.success-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 272px;
  width: 100%;
  background-color: #ffffff;
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
