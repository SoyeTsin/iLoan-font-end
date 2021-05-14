<template>
  <div>
    <collapse-card title="User Task" class="form-card form-card-left">
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item label="Task Status">
            <a-col :span="1">
              <a-radio-group class="form-radio">
                <a-radio value="0">Awaiting</a-radio>
                <a-radio value="1">Done</a-radio>
                <a-radio value="2">Cancelled</a-radio>
              </a-radio-group>
            </a-col>
          </a-form-item>
          <a-form-item :label="$t('message.user_id')">
            <a-select
              value="32312321321"
              :placeholder="$t('placeholder.select_bank_name')"
              style="width: 100%"
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
            <a-input value="XXX XXX" style="width: 100%" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.task_number')">
            <a-input value="DFE3243254392340321" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.task_date')">
            <a-date-picker
              style="width: 100%"
              :placeholder="$t('placeholder.select_date')"
              data-cy="bday"
              @change="dateChange($event, 'birthdate')"
            />
          </a-form-item>
          <a-form-item :label="$t('loan.task_time') + ' (optional)'">
            <a-time-picker
              style="width: 100%"
              :default-open-value="moment('00:00:00', 'HH:mm:ss')"
              @change="onChange"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </collapse-card>
    <collapse-card title="Contact History Detail" class="my-card my-card-right">
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item label="Task Status">
            <a-col :span="1">
              <a-radio-group class="form-radio" disabled>
                <a-radio value="0">Automatic</a-radio>
                <a-radio value="1">Default</a-radio>
                <a-radio value="2">On Demand</a-radio>
              </a-radio-group>
            </a-col>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item label="Contacted Channel">
            <a-select
              value="Phone"
              :placeholder="$t('placeholder.select_bank_name')"
              style="width: 100%"
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
          <a-form-item label="Contacted Person">
            <a-select
              value="Borrower"
              :placeholder="$t('placeholder.select_bank_name')"
              style="width: 100%"
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
            <a-input value="XXX XXX" style="width: 100%" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item label="Contacted Outcome">
            <a-col :span="1">
              <a-radio-group class="form-radio">
                <a-radio value="0">No Response</a-radio>
                <a-radio value="1">Promise-to-pay</a-radio>
                <a-radio value="2">Paid</a-radio>
              </a-radio-group>
            </a-col>
          </a-form-item>
          <a-form-item label="Contacted Notes (optional)">
            <a-textarea
              type="textarea"
              class="validate-addr"
              :max-length="200"
              :min-length="1"
              :placeholder="$t('placeholder.input_regist_street_addr')"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </collapse-card>
    <collapse-card title="Promise-to-pay" class="my-card my-card-right">
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item label="Current Due Date">
            <a-date-picker
              style="width: 100%"
              disabled
              :default-value="moment('2015/01/01', dateFormat)"
              :placeholder="$t('placeholder.select_date')"
              data-cy="bday"
              @change="dateChange($event, 'birthdate')"
            />
          </a-form-item>
          <a-form-item label="Grace Period">
            <number-input
              :placeholder="$t('placeholder.input_grace_period')"
              :formatter="true"
              disabled
              value="22"
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
          <a-form-item label="Promist-to-pay Amount">
            <number-input
              :placeholder="$t('placeholder.input_grace_period')"
              :formatter="true"
              :decimal="false"
              disabled
              :max-length="3"
              style="width: 60%"
              :min="0"
              @change="getMaximumGracePeriod($event)"
            />
            <span class="currency">
              USD
            </span>
          </a-form-item>
          <a-form-item label="Promise-to-pay Date">
            <a-date-picker
              style="width: 100%"
              disabled
              placeholder="YYYY-MM-DD"
              data-cy="bday"
              @change="dateChange($event, 'birthdate')"
            />
          </a-form-item>
        </a-col>
        <a-col :span="7" />
      </a-row>
    </collapse-card>
    <collapse-card
      :title="$t('loan.title_transaction_amount')"
      class="my-card my-card-left"
    >
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item :label="$t('loan.disbursement_status')">
            <a-radio-group
              class="my-radio"
              @change="radioChange($event, 'DisbursementStatus')"
            >
              <a-radio value="01">{{ $t("loan.total") }}</a-radio>
              <a-radio value="02">{{ $t("loan.partial") }}</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.title_transaction_amount')">
            <number-input
              :formatter="true"
              :decimal="true"
              :max-length="12"
              :disabled="true"
            />
            <span class="currency">
              <a-spin :spinning="currencySpinning">
                USD
              </a-spin>
            </span>
          </a-form-item>
          <a-form-item :label="$t('loan.repayment_amount_avaliable')">
            <span disabled class="currency">
              <a-spin :spinning="currencySpinning">
                1,004.5
              </a-spin>
            </span>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.application_fees')">
            <number-input
              :placeholder="$t('placeholder.input_application_fees')"
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
          <a-form-item :label="$t('loan.processing_fees')">
            <number-input
              :placeholder="$t('placeholder.input_processing_orgination_fees')"
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
          <a-form-item :label="$t('loan.overdue_fees')">
            <number-input
              :placeholder="$t('placeholder.input_overdue_fees')"
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
          <a-form-item :label="$t('loan.anticipated_fees')">
            <number-input
              :placeholder="$t('placeholder.input_anticipated_repayment_fees')"
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
          <a-form-item :label="$t('loan.extension_fees')">
            <number-input
              :placeholder="$t('placeholder.input_extension_fees')"
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
          <a-form-item :label="$t('loan.repayment_plan_fees')">
            <number-input
              :placeholder="
                $t('placeholder.input_repayment_plan_adjustment_fees')
              "
              :formatter="true"
              :decimal="true"
              :max-length="12"
            />
            <span class="currency">
              <a-spin :spinning="currencySpinning">
                {{ currencyUse }}
              </a-spin>
            </span>
          </a-form-item>
          <a-form-item :label="$t('loan.Tax_fees')">
            <number-input
              :placeholder="$t('placeholder.input_tax_fees')"
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
      </a-row>
    </collapse-card>
    <collapse-card
      :title="$t('loan.transaction_record')"
      class="form-card form-card-left"
    >
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item :label="$t('loan.transaction_date')">
            <a-date-picker
              style="width: 100%"
              :placeholder="$t('placeholder.select_date')"
              data-cy="bday"
              @change="dateChange($event, 'birthdate')"
            />
          </a-form-item>
          <a-form-item :label="$t('loan.transaction_time')">
            <a-time-picker
              style="width: 100%"
              :default-open-value="moment('00:00:00', 'HH:mm:ss')"
              @change="onChange"
            />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.repayment_channel')">
            <a-radio-group v-model="bValue" class="form-radio">
              <a-radio :value="0">Bank</a-radio>
            </a-radio-group>
            <a-form-item :label="$t('message.bank_name')">
              <a-select
                style="width: 100%;"
                :placeholder="$t('placeholder.select_bank_name')"
                :disabled="isReview"
                value="Citigroup"
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
            <a-radio-group class="form-radio">
              <a-radio :value="0">Non-bank</a-radio>
            </a-radio-group>
            <a-form-item :label="$t('loan.channel_name')">
              <a-select
                style="width: 100%;"
                :placeholder="$t('placeholder.select_bank_name')"
                disabled
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
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.optional_transaction_number')">
            <a-input value="DFE3243254392340321" />
          </a-form-item>
          <a-form-item
            ref="ProofId"
            :label="$t('loan.optional_proof_of_payment')"
            :extra="$t('loan.select_file_format')"
          >
            <a-upload
              :disabled="isReview"
              :multiple="false"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :accept="'.jpg, .jpeg, .png'"
              @change="fileListChange"
              @preview="previewProofOfIdentity"
            >
              <a-button :disabled="isReview">
                <a-icon type="upload" />
                {{ $t("message.upload_btn") }}
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
    </collapse-card>
    <collapse-card
      :title="$t('customer.maker')"
      class="form-card form-card-left"
    >
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item :label="$t('message.user_id')">
            <a-input :max-length="12" :value="makerId" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('message.maker_comment')">
            <a-textarea
              :max-length="200"
              :min-length="1"
              :placeholder="$t('placeholder.input_maker_comment')"
              :disabled="isReview"
              :auto-size="{ minRows: 2 }"
            />
          </a-form-item>
        </a-col>
        <a-col :span="7" />
      </a-row>
    </collapse-card>

    <!--v-if="pageType === 'customerReview'"-->
    <collapse-card
      :title="$t('customer.checker')"
      class="form-card form-card-left"
    >
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item :label="$t('message.user_id')">
            <a-input :max-length="12" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('message.review')">
            <a-radio-group
              style="width: 40%"
              class="form-radio"
            >
              <a-radio value="1">
                {{ $t("message.approve") }}
              </a-radio>
              <a-radio value="5">
                {{ $t("message.reject") }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('message.checker_comment')">
            <a-textarea
              :min-lenth="1"
              :placeholder="$t('placeholder.input_checker_comment')"
              :max-length="200"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </collapse-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      bValue: 0,
      currencySpinning: false,
      pageType: this.$route.name
    };
  },
  created() {
    console.log('router', this.$route)
  },
  methods: {
    moment,
    onChange(time, timeString) {
      console.log(time, timeString);
    }
  }
};
</script>
<style scoped lang="less">
.item-text {
  margin-bottom: 20px;

  h6 {
    font-size: 15px;
    margin-bottom: 0;
    color: #333;
  }

  span {
    font-size: 14px;
    color: #a0a0a0;
    margin-top: 5px;
    display: block;
  }
}
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
