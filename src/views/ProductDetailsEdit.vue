<template>
  <a-spin :spinning="spinning">
    <div v-if="!createSuccess" class="product-details-edit">
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <CollapseCard
          v-if="pageType==='edit'"
          :title="$t('product.product_acc')"
          class="my-card my-card-left"
        >
          <a-row>
            <a-col :span="10">
              <a-form-item :label="$t('product.product_status')">
                <a-radio-group
                  v-decorator="formValidate.ProdtStus"
                  class="my-radio"
                  disabled
                >
                  <a-radio value="01">
                    {{ $t('message.inactive') }}
                  </a-radio>
                  <a-radio value="02">
                    {{ $t('message.active') }}
                  </a-radio>
                  <a-radio value="03">
                    {{ $t('message.cancelled') }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="14">
              <a-form-item :label="$t('product.product_id')">
                <a-input
                  v-model="productDetails.LoanProdtNo"
                  disabled
                  style="max-width: 348px"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </CollapseCard>
        <CollapseCard
          :title="$t('product.basic')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('product.product_name')">
                <a-input
                  v-decorator="formValidate.LoanProdtNm"
                  :disabled="editType"
                  :placeholder="$t('placeholder.input_product_name')"
                  :max-length="50"
                />
              </a-form-item>
              <a-form-item :label="$t('product.product_type')">
                <a-select
                  v-decorator="formValidate.LoanProdtTypCd"
                  placeholder="Please select a country"
                  :disabled="editType"
                >
                  <a-select-option value="01">
                    {{ $t('message.personal') }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('product.product_category')">
                <a-select
                  v-decorator="formValidate.LoanProdtClsfCd"
                  :disabled="editType"
                  placeholder="Please select a country"
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
                  :disabled="editType"
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
                    :disabled="editType"
                    :placeholder="$t('placeholder.select_guarantor_passport_country')"
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
                <a-date-picker v-decorator="formValidate.ApplicationDate" disabled />
              </a-form-item>
              <a-form-item :label="$t('message.approval_date')">
                <a-date-picker v-decorator="formValidate.ApprovalDate" disabled />
              </a-form-item>
              <a-form-item :label="$t('message.effective_date')">
                <a-date-picker
                  v-decorator="formValidate.DrawdownDate"
                  :disabled="editEffectiveDate()"
                  :disabled-date="disabledStartDate"
                />
              </a-form-item>
              <a-form-item :label="$t('message.expiry_date')">
                <a-date-picker
                  v-decorator="formValidate.MaturityDate"
                  :disabled="editType"
                  :disabled-date="disabledEndDate"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </CollapseCard>

        <CollapseCard
          :title="$t('product.loan')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.number_of_applicant')">
                <a-radio-group
                  v-decorator="formValidate.NumberOfApplicant"
                  class="my-radio"
                  :disabled="editType"
                >
                  <a-radio value="01">
                    {{ $t('message.single_customer') }}
                  </a-radio>
                  <!--                  <a-radio value="02" disabled>-->
                  <!--                    Not single customer-->
                  <!--                  </a-radio>-->
                </a-radio-group>
              </a-form-item>
              <a-form-item :label="$t('message.repayment_detail')">
                <a-radio-group
                  v-decorator="formValidate.ChrgManrCd"
                  class="my-radio"
                  :disabled="editType"
                >
                  <a-radio value="02">
                    {{ $t('message.fixed_principal') }}
                  </a-radio>
                  <a-radio value="01">
                    {{ $t('message.fixed_installment') }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item :label="$t('message.early_repayment_allowance')">
                <a-radio-group
                  v-decorator="formValidate.PmitAdvRepayFlg"
                  :disabled="editType"
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
              <a-form-item :label="$t('product.maximum_grace_period')">
                <number-input
                  v-decorator="formValidate.MaximumGracePeriod"
                  style="width: 60%;"
                  :placeholder="$t('placeholder.input_maximum_grace_period')"
                  :formatter="true"
                  :decimal="false"
                  :max-length="3"
                  :min="0"
                  :disabled="editType"
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
                  :disabled="editType"
                />
                <span class="currency">
                  {{ $t('loan.days') }}
                </span>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :label="$t('message.maximum_loan_amount_USD')">
                <div style="display: flex;justify-content: flex-start; width: 100%">
                  <a-input v-decorator="formValidate.AplyLoanCeilAmt" :placeholder="$t('placeholder.input_maximum_loan_amount')" :disabled="editType" :max-length="15" style="width: 50%" />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      :disabled="true"
                      :value="currencyCheck.name"
                      :placeholder="$t('placeholder.select_currency')"
                    />
                  </div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('message.minimum_interest_rate')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="formValidate.MinInterestRate"
                    :disabled="editType"
                    :placeholder="$t('placeholder.input_minimum_interest_rate')"
                    style="width: 100%"
                    :formatter="true"
                    :decimal="true"
                    :min="0"
                    :max-length="2"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 30px">%</div>
                </div>
              </a-form-item>
              <a-form-item :label="$t('message.maximum_interest_rate')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="formValidate.MaxInterestRate"
                    :disabled="editType"
                    :placeholder="$t('placeholder.input_maximum_interest_rate')"
                    style="width: 100%"
                    :formatter="true"
                    :decimal="true"
                    :max-length="2"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 30px">%</div>
                </div>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item :label="$t('product.default_application_fees')">
                <div style="display: flex;justify-content: flex-start">
                  <number-input
                    v-decorator="['DefaultAppFee']"
                    style="width: 60%;"
                    :disabled="editType"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-decorator="['AppFeeCalcMethod']"
                      :disabled="editType"
                      :placeholder="$t('placeholder.select_currency')"
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
                    v-decorator="['DefaultProcFee']"
                    :disabled="editType"
                    style="width: 60%;"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-decorator="['ProcFeeCalcMethod']"
                      :disabled="editType"
                      :placeholder="$t('placeholder.select_currency')"
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
                    v-decorator="['DefaultOverFee']"
                    :disabled="editType"
                    style="width: 60%;"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-decorator="['OverFeeCalcMethod']"
                      :disabled="editType"
                      :placeholder="$t('placeholder.select_currency')"
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
                    v-decorator="['DefaultAdvRepayFee']"
                    style="width: 60%;"
                    :disabled="editType"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-decorator="['AdvRepayFeeCalcMethod']"
                      :disabled="editType"
                      :placeholder="$t('placeholder.select_currency')"
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
                    v-decorator="['DefaultExtsnFee']"
                    style="width: 60%;"
                    :disabled="editType"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-decorator="['ExtsnFeeCalcMethod']"
                      :disabled="editType"
                      :placeholder="$t('placeholder.select_currency')"
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
                    v-decorator="['DefaultRepayPlanFee']"
                    style="width: 60%;"
                    :disabled="editType"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-decorator="['RepayPlanFeeCalcMethod']"
                      :placeholder="$t('placeholder.select_currency')"
                      :disabled="editType"
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
                    v-decorator="['DefaultTax']"
                    :disabled="editType"
                    style="width: 60%;"
                    :placeholder="$t('placeholder.input_maximum_loan_amount')"
                    :formatter="true"
                    :decimal="true"
                    :max-length="12"
                    :min="0"
                  />
                  <div style="line-height: 30px;margin-left: 10px;width: 50%">
                    <a-select
                      v-decorator="['TaxCalcMethod',{initialValue:TaxCalcMethod}]"
                      :placeholder="$t('placeholder.select_currency')"
                      :disabled="editType"
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
        </CollapseCard>

        <CollapseCard
          :title="$t('product.maker')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input v-model="MakerUserId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.maker_comment')">
                <a-textarea v-decorator="formValidate.OperRplshInfo" :placeholder="$t('placeholder.input_maker_comment')" :disabled="editType" :max-length="200" />
              </a-form-item>
            </a-col>
            <a-col :span="7" />
          </a-row>
        </CollapseCard>

        <CollapseCard
          :title="$t('product.checker')"
          class="my-card my-card-left"
        >
          <a-row type="flex" justify="space-between">
            <a-col :span="7">
              <a-form-item :label="$t('message.user_id')">
                <a-input v-model="CheckerUserId" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item :label="$t('message.review')">
                <a-radio-group
                  v-decorator="formValidate.ApprvSugstnCd"
                  class="my-radio"
                  :disabled="!editType"
                >
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
                <a-textarea v-decorator="formValidate.CheckRplshInfo" :placeholder="$t('placeholder.input_checker_comment')" :disabled="!editType" :max-length="200" />
              </a-form-item>
            </a-col>
          </a-row>
        </CollapseCard>
        <div class="submit-content">
          <a-button @click="resetForm">{{ $t('message.reset_btn') }}</a-button>
          <a-button
            v-if="!editType"
            v-auth="$buttonConfig.Product.EditProductRequested"
            type="primary"
            html-type="submit"
          >{{ $t('message.save_btn') }}
          </a-button>
          <a-button
            v-if="editType&&ApprvSugstnCdStates==='1'"
            type="primary"
            html-type="submit"
            :disabled="!(buttons.indexOf($buttonConfig.Product.EditProductAgreed) >= 0)"
          >{{ $t('message.save_btn') }}
          </a-button>
          <a-button
            v-if="editType&&ApprvSugstnCdStates==='2'"
            type="primary"
            html-type="submit"
            :disabled="!(buttons.indexOf($buttonConfig.Product.EditProductReturned) >= 0)"
          >{{ $t('message.save_btn') }}
          </a-button>
        </div>
      </a-form>
    </div>
    <div v-if="createSuccess" class="success-msg">
      <div class="msg">{{ editType ? $t('product.review_successfully') : $t('product.update_successfully') }}.</div>
      <div class="product-id">{{ $t('product.product_id') }}: {{ LoanProdtNo }}</div>
      <a-button type="dashed" style="margin-bottom: 12px" @click="()=>{this.$router.push('/product')}">
        {{ $t('product.product_list_btn') }}
      </a-button>
      <a-button
        type="primary"
        style="margin-bottom: 26px"
        icon="plus"
        @click="()=>{this.$router.replace('/product/productDetails/productDetailsCreate')}"
      >{{ $t('product.new_product_btn') }}
      </a-button>
    </div>
  </a-spin>
</template>

<script>
import formValidate from '@/verification/ProductDetailsEdit'
import ProductService from "@/service/productService";
import CM from "@/service/common";

export default {
  name: 'ProductDetails',
  components: {},
  data() {
    return {
      buttons: sessionStorage.getItem('authBtns'),
      pageType: 'edit',
      createSuccess: false,
      LoanProdtNo: '',
      productDetails: {},
      currencyList: [],
      currentcyResult: [],
        loanSelector: [
        { name: this.$t('product.same_as_currency'), value: '01' },
        { name: this.$t('product.percent_loan_amount'), value: '02' }
      ],
      ExmnvrfyStusCd: 2,
      formValidate,
      MakerUserId: '',
      CheckerUserId: '',
      currencyCheck: '',
      spinning: true,
      ApprvSugstnCdStates: '1',
      currencySpinning: false,
      userId: this.global.userInfo.name,
      MaximumGracePeriod: '',
      DefaultGracePeriod: '',
      DefaultAppFee: '',
      DefaultProcFee: '',
      DefaultOverFee: '',
      DefaultAdvRepayFee: '',
      DefaultExtsnFee: '',
      DefaultRepayPlanFee: '',
      DefaultTax: '',
      AppFeeCalcMethod: '',
      ProcFeeCalcMethod: '',
      OverFeeCalcMethod: '',
      AdvRepayFeeCalcMethod: '',
      ExtsnFeeCalcMethod: '',
      RepayPlanFeeCalcMethod: '',
      TaxCalcMethod: '',
      ChrgManrCd: '',
      PmitAdvRepayFlg: ''
    };
  },
  computed: {
    editType() {
      return !(this.productDetails.ExmnvrfyStusCd === '10' || this.productDetails.ExmnvrfyStusCd === '1') // 状态为1和10可以修改
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      onValuesChange: (_, changedFields) => {
        this.$emit('change', changedFields);
      }
    });
  },
  mounted() {
    this.$on('change', res => this.onValuesChange(res))
    this.getProductDetails()

    if (this.editType) {
      this.CheckerUserId = this.userId
    }
  },
  methods: {
    currCheck(e) {
    this.currencyCheck = this.currencyList.find(curr => curr.value === e.toString())
    },
    onValuesChange(res) {
      if (res?.ApprvSugstnCd) {
        this.ApprvSugstnCdStates = res.ApprvSugstnCd
      }
    },
    disabledStartDate(startValue) {
      const endValue = this.$moment(this.$moment().format('yyyy-MM-DD'), 'yyyy-MM-DD');
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() < endValue.valueOf();
    },
    disabledEndDate(startValue) {
      const endValue = this.$moment(this.$moment().format('yyyy-MM-DD'), 'yyyy-MM-DD');
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() < endValue.valueOf();
    },
    customRule() {
      // 自定义校验规则
      // https://fsdi.atlassian.net/browse/IL-343 规则在这

      // MaxInterestRate
      this.formValidate.MaxInterestRate[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        const { getFieldValue } = this.form;
        if (!value && value !== 0) {
          callback(this.$t('message.please_correct_information'))
        } else if (value < getFieldValue('MinInterestRate')) {
          callback(this.$t('message.please_correct_information'));
        }
        callback();
      };
      // MinInterestRate
      this.formValidate.MinInterestRate[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        const { getFieldValue } = this.form;
        if (!value && value !== 0) {
          callback(this.$t('message.please_correct_information'))
        } else if (isNaN(value)) {
          callback(this.$t('message.please_input_number'))
        } else if (value > getFieldValue('MaxInterestRate')) {
          callback(this.$t('message.please_correct_information'));
        }
        callback();
      };

      // MaximumGracePeriod
      this.formValidate.MaximumGracePeriod[1].rules[0].validator = (rule, value, callback) => {
        const { getFieldValue } = this.form
        if (!value && value !== 0) {
          callback(this.$t('message.please_correct_information'))
        } else if (Number(value) < Number(getFieldValue('DefaultGracePeriod'))) {
          callback('Maximum Grace Period cannot less than Default Grace Period')
        }
        callback()
      }
      // DefaultGracePeriod
      this.formValidate.DefaultGracePeriod[1].rules[0].validator = (rule, value, callback) => {
        const { getFieldValue } = this.form
        if (!value && value !== 0) {
          callback(this.$t('message.please_correct_information'))
        } else if (Number(value) > Number(getFieldValue('MaximumGracePeriod'))) {
          callback('Default Grace Period cannot exceed Maximum Grace Period')
        }
        callback()
      }
    },
    editProduct(values) {
      console.log('editProduct values', values)
      const param = {
        LoanProdtNo: this.productDetails.LoanProdtNo,
        LoanProdtVersNo: this.productDetails.LoanProdtVersNo,
        ...values
      }
      param.OprorEmpnbr = this.MakerUserId
      param.AplyLoanCeilAmt = values.AplyLoanCeilAmt * 1
      param.ApplicationDate = this.$moment(param.ApplicationDate).format('yyyy-MM-DD')
      param.ApprovalDate = this.$moment(param.ApprovalDate).format('yyyy-MM-DD')
      param.DrawdownDate = this.$moment(param.DrawdownDate).format('yyyy-MM-DD')
      param.MaturityDate = this.$moment(param.MaturityDate).format('yyyy-MM-DD')
      param.MinInterestRate = this.$math.divide(param.MinInterestRate, 100) * 1
      param.MaxInterestRate = this.$math.divide(param.MaxInterestRate, 100) * 1
      param.DefaultGracePeriod = Number(values.DefaultGracePeriod);
      param.MaximumGracePeriod = Number(values.MaximumGracePeriod);
      param.DefaultAppFee = Number(values.DefaultAppFee);
      param.DefaultProcFee = Number(values.DefaultProcFee);
      param.DefaultOverFee = Number(values.DefaultOverFee);
      param.DefaultAdvRepayFee = Number(values.DefaultAdvRepayFee);
      param.DefaultExtsnFee = Number(values.DefaultExtsnFee);
      param.DefaultRepayPlanFee = Number(values.DefaultRepayPlanFee);
      param.DefaultTax = Number(values.DefaultTax)

      param.AppFeeCalcMethod = values.AppFeeCalcMethod;
      param.ProcFeeCalcMethod = values.ProcFeeCalcMethod
      param.OverFeeCalcMethod = values.OverFeeCalcMethod
      param.AdvRepayFeeCalcMethod = values.AdvRepayFeeCalcMethod
      param.ExtsnFeeCalcMethod = values.ExtsnFeeCalcMethod
      param.RepayPlanFeeCalcMethod = values.RepayPlanFeeCalcMethod
      param.TaxCalcMethod = values.TaxCalcMethod

      param.ChrgManrCd = values.ChrgManrCd
      param.PmitAdvRepayFlg = values.PmitAdvRepayFlg
      console.log('editProduct param', param)
      ProductService.editProduct(param).then(res => {
        if (res.LoanProdtNo) {
          this.createSuccess = true
          this.LoanProdtNo = res.LoanProdtNo
        }
      })
    },
    reviewProduct(values) {
      const param = {
        LoanProdtNo: this.productDetails.LoanProdtNo,
        LoanProdtVersNo: this.productDetails.LoanProdtVersNo,
        ApprvSugstnCd: values.ApprvSugstnCd,
        CheckEmpnbr: this.userId + '',
        CheckRplshInfo: values.CheckRplshInfo,
        DefaultGracePeriod: Number(values.DefaultGracePeriod),
        MaximumGracePeriod: Number(values.MaximumGracePeriod)
      }
      ProductService.reviewProduct(param).then(res => {
        if (res.LoanProdtNo) {
          this.createSuccess = true
          this.LoanProdtNo = res.LoanProdtNo
        }
      })
    },
    async getCurrencyList(CurCd) {
      this.currencySpinning = true
      this.currencyList = []
      await CM.getOptionList().then(res => {
        this.currentcyResult = res["CM0001"]
      })
        for (const i in this.currentcyResult) {
          this.currencyList.push({ name: this.currentcyResult[i], value: i })
        }
        this.currencyList.sort((s1, s2) => {
          const x1 = s1.name.toUpperCase();
          const x2 = s2.name.toUpperCase();
          if (x1 < x2) return -1;
          if (x1 > x2) return 1;
          return 0;
        })
        this.form.setFieldsValue({
          CurCd: CurCd
        })
        this.currCheck(CurCd)
        this.currencySpinning = false
    },
    getProductDetails() {
      const param = {
        LoanProdtNo: this.$route.query.LoanProdtNo || null,
        LoanProdtVersNo: this.$route.query.LoanProdtVersNo || null
      }
      ProductService.getProductDetails(param).then(res => {
        this.productDetails = res
        this.MakerUserId = this.productDetails.OprorEmpnbr
        this.CheckerUserId = this.productDetails.CheckEmpnbr ? this.productDetails.CheckEmpnbr : this.CheckerUserId
        this.initObj = JSON.parse(JSON.stringify(this.productDetails))
        this.initField(this.productDetails)
        this.spinning = false
        if (!this.editType) {
          this.customRule()
        }
        this.getCurrencyList(this.productDetails.CurCd)
      })
    },
    initField(obj) {
      if (obj) {
        this.form.setFieldsValue({
          ...obj,
          MinInterestRate: (obj.MinInterestRate * 100).toFixed(2),
          MaxInterestRate: (obj.MaxInterestRate * 100).toFixed(2)
          // ProdtStus: obj.ProdtStus,
          // LoanProdtNm: obj.LoanProdtNm,
          // LoanProdtTypCd: obj.LoanProdtTypCd,
          // LoanProdtClsfCd: obj.LoanProdtClsfCd,
          // LoanGuarManrCd: obj.LoanGuarManrCd,
          // ApplicationDate: this.$moment(obj.ApplicationDate, 'yyyy-MM-DD'),
          // ApprovalDate: this.$moment(obj.ApprovalDate, 'yyyy-MM-DD'),
          // DrawdownDate: this.$moment(obj.DrawdownDate, 'yyyy-MM-DD'),
          // MaturityDate: this.$moment(obj.MaturityDate, 'yyyy-MM-DD'),
          // NumberOfApplicant: obj.NumberOfApplicant,
          // AplyLoanCeilAmt: obj.AplyLoanCeilAmt,
          // MinInterestRate: (obj.MinInterestRate * 100).toFixed(2),
          // MaxInterestRate: (obj.MaxInterestRate * 100).toFixed(2),
          // ChrgManrCd: obj.ChrgManrCd,
          // PmitAdvRepayFlg: obj.PmitAdvRepayFlg,
          // OperRplshInfo: obj.OperRplshInfo,
          // CheckRplshInfo: obj.CheckRplshInfo,
          // DefaultGracePeriod: Number(obj.DefaultGracePeriod),
          // MaximumGracePeriod: Number(obj.MaximumGracePeriod),
          // DefaultAppFee: parseFloat(obj.DefaultAppFee),
          // DefaultProcFee: parseFloat(obj.DefaultProcFee),
          // DefaultOverFee: parseFloat(obj.DefaultOverFee),
          // DefaultAdvRepayFee: parseFloat(obj.DefaultAdvRepayFee),
          // DefaultExtsnFee: parseFloat(obj.DefaultExtsnFee),
          // DefaultRepayPlanFee: parseFloat(obj.DefaultRepayPlanFee),
          // DefaultTax: parseFloat(obj.DefaultTax),
          // AppFeeCalcMethod: obj.AppFeeCalcMethod,
          // ProcFeeCalcMethod: obj.ProcFeeCalcMethod,
          // OverFeeCalcMethod: obj.OverFeeCalcMethod,
          // AdvRepayFeeCalcMethod: obj.AdvRepayFeeCalcMethod,
          // ExtsnFeeCalcMethod: obj.ExtsnFeeCalcMethod,
          // RepayPlanFeeCalcMethod: obj.RepayPlanFeeCalcMethod,
          // TaxCalcMethod: obj.TaxCalcMethod
        });
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          if (this.editType) {
            this.reviewProduct(values)
          } else {
            this.editProduct(values)
          }
        } else {
        console.log(err)
        }
      });
    },
    resetForm() {
      this.form.resetFields()
      this.initField(this.initObj)
    },
    editEffectiveDate(action) {
      if (this.productDetails.ProdtStus === '02' || this.editType) {
        return true
      }
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
