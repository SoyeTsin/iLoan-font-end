<template>
  <div id="LoanDisbursementEdit">
    <a-form :form="form" @submit="save">
      <CollapseCard
        :title="$t('loan.title_transaction_amount')"
        class="my-card my-card-left"
      >
        <a-row type="flex" justify="space-between">
          <a-col :span="7">
            <a-form-item :label="$t('loan.disbursement_status')">
              <a-radio-group
                v-decorator="[
                  'LoanStatus',
                  {
                    initialValue: '01',
                    rules: [
                      {
                        required: true,
                        message: $t('loan.please_select_disbursement_status')
                      }
                    ]
                  }
                ]"
                :disabled="isEdit"
                class="my-radio"
              >
                <a-radio value="01"> {{ $t('loan.total') }} </a-radio>
                <a-radio value="02"> {{ $t('loan.partial') }} </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item :label="$t('loan.title_transaction_amount')">
              <div>
                <number-input
                  v-decorator="[
                    'TranAmt',
                    {
                      rules: [
                        {
                          required: true,
                          message: $t('loan.please_input_transaction_amount')
                        }
                      ]
                    }
                  ]"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                  :disabled="isEdit"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.disbursement_amount_avaliable')">
              <div>
                <span>{{ $route.query.AvailableQuota }}</span> <span>{{ Currency }}</span>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <!-- <a-form-item :label="$t('loan.principal_amount')">
              <div>
                <number-input
                  v-decorator="[
                    'PrincipalAmount',
                    {
                      rules: [
                        {
                          required: false,
                        },
                      ]
                    }
                  ]"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                  :disabled="true"
                />
                {{ Currency }}
              </div>
            </a-form-item> -->
          </a-col>
        </a-row>
      </CollapseCard>

      <CollapseCard
        style="margintop: 15px"
        :title="$t('loan.transaction_record')"
        class="my-card my-card-left"
      >
        <a-row type="flex" justify="space-between">
          <a-col :span="7">
            <a-form-item :label="$t('loan.transaction_date')">
              <a-date-picker
                v-decorator="[
                  'TranDt',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('loan.please_select_transaction_date')
                      }
                    ]
                  }
                ]"
                style="width: 100%"
                :disabled="isEdit"
              />
            </a-form-item>
            <a-form-item :label="$t('loan.transaction_time')">
              <a-time-picker
                v-decorator="[
                  'TranTm',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('loan.please_select_transaction_time')
                      }
                    ]
                  }
                ]"
                style="width: 100%"
                :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                :disabled="isEdit"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item style="marginbottom: 0px" :label="$t('loan.disbursement_channel')">
              <a-radio-group
                v-decorator="[
                  'LoanChannel',
                  {
                    initialValue: '01',
                    rules: [
                      {
                        required: false,
                        message: $t('loan.please_select_loan_channel')
                      }
                    ]
                  }
                ]"
                class="my-radio"
                style="width: 100%"
                :disabled="isEdit"
              >
                <a-radio value="01">
                  {{ $t("loan.bank") }}
                </a-radio>
                <a-form-item :label="$t('message.bank_name')">
                  <a-select
                    v-decorator="['BankNm', { rules: [{ required: false }] }]"
                    style="width: 100%"
                    :placeholder="$t('placeholder.select_bank_name')"
                    :disabled="isEdit || ChannelDisabled"
                  >
                    <a-select-option key="1" value="01">
                      {{ $t("message.citigroup") }}
                    </a-select-option>
                    <a-select-option key="2" value="02">
                      {{ $t("message.icbc") }}
                    </a-select-option>
                    <a-select-option key="3" value="03">
                      {{ $t("message.mizuho_FG") }}
                    </a-select-option>
                    <a-select-option key="4" value="04">
                      {{ $t("message.wells_fargo") }}
                    </a-select-option>
                    <a-select-option key="5" value="05">
                      {{ $t("message.hsbc") }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-radio value="02">
                  {{ $t("loan.non_bank") }}
                </a-radio>
                <a-form-item :label="$t('loan.channel_name')">
                  <a-select
                    v-decorator="[
                      'ChannelNm',
                      { rules: [{ required: false }] }
                    ]"
                    style="width: 100%"
                    :placeholder="$t('placeholder.select_channel_name')"
                    :disabled="isEdit || !ChannelDisabled"
                  >
                    <a-select-option key="1" value="01">
                      {{ $t("loan.seven_eleven") }}
                    </a-select-option>
                    <a-select-option key="2" value="02">
                      {{ $t("loan.lotus") }}
                    </a-select-option>
                    <a-select-option key="3" value="03">
                      {{ $t("loan.bigc") }}
                    </a-select-option>
                    <a-select-option key="4" value="04">
                      {{ $t("loan.family_mart") }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item :label="$t('loan.optional_transaction_number')">
              <a-input
                v-decorator="[
                  'TranNum',
                  {
                    rules: [{ required: false }]
                  }
                ]"
                style="width: 100%"
                :max-length="30"
                :disabled="isEdit"
              />
            </a-form-item>
            <a-form-item
              ref="ProofId"
              :label="$t('loan.optional_proof_of_payment')"
              extra="Support format：.png .jpg .jpeg"
            >
              <a-upload
                :multiple="false"
                :file-list="fileList"
                :accept="'.jpg, .jpeg, .png'"
                :disabled="isEdit"
                @preview="previewProofOfDisbursement"
              >
                <a-button>
                  <a-icon type="upload" />
                  {{ $t("message.upload_btn") }}
                </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </CollapseCard>
      <collapse-card
        style="margintop: 15px"
        :title="$t('message.maker')"
        class="form-card form-card-left"
      >
        <a-row type="flex" justify="space-between">
          <a-col :span="7">
            <a-form-item :label="$t('message.user_id')">
              <a-input
                v-decorator="['MakerId', { rules: [{ required: false }] }]"
                :disabled="true"
                :max-length="12"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item :label="$t('message.maker_comment')">
              <a-textarea
                v-decorator="['MakelnComnt', { rules: [{ required: false }] }]"
                :max-length="200"
                :min-length="1"
                :placeholder="$t('placeholder.input_maker_comment')"
                :auto-size="{ minRows: 2 }"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7" />
        </a-row>
      </collapse-card>
      <collapse-card
        style="margintop: 15px"
        :title="$t('message.checker')"
        class="form-card form-card-left"
      >
        <a-row type="flex" justify="space-between">
          <a-col :span="7">
            <a-form-item :label="$t('message.user_id')">
              <a-input
                v-decorator="[
                  'CheckerEmpnbr',
                  { rules: [{ required: false }] }
                ]"
                :max-length="12"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item :label="$t('message.review')">
              <a-radio-group
                v-decorator="[
                  'CheckerReview',
                  {
                    rules: [{ required: true, message: $t('loan.please_select_review') }]
                  }
                ]"
                class="form-radio"
                :disabled="loanDetail.ApplyStatus !== '01'"
              >
                <a-radio value="01"> {{ $t("message.agree") }} </a-radio>
                <a-radio value="02"> {{ $t("message.return") }} </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item :label="$t('message.checker_comment')">
              <a-textarea
                v-decorator="['CheckerComnt', { rules: [{ required: false }] }]"
                :placeholder="$t('placeholder.input_checker_comment')"
                :min-lenth="1"
                :max-length="200"
                :disabled="loanDetail.ApplyStatus !== '01'"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </collapse-card>
      <div class="submit-content">
        <a-button style="margin-right: 16px" @click="resetForm">{{
          $t("Utils.reset")
        }}</a-button>
        <a-button
          type="primary"
          html-type="submit"
        >{{ $t("message.save_btn") }}
        </a-button>
      </div>
    </a-form>
    <a-modal
      :title="$t('loan.optional_proof_of_payment')"
      class="preview-modal"
      :visible="proofOfIdentity.show"
      :footer="null"
      width="700px"
      @cancel="proofOfIdentity.show = false"
    >
      <img style="width: 100%" :src="proofOfIdentity.base64">
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import Loan from "@/service/loanService";
import CM from "@/service/common";

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      fileList: [],
      loanDetail: {},
      proofOfIdentity: {
        show: false,
        base64: ""
      },
      ChannelDisabled: false,
      isEdit: true,
      Currency: this.$route.query.Currency
    };
  },
  mounted() {
    this.getLoanHistDetail();
  },
  methods: {
    moment,
    getLoanHistDetail() {
      Loan.getLoanHistDetail({ ...this.$route.query }).then((res) => {
        this.loanDetail = JSON.parse(JSON.stringify(res));
        res.TranTm = this.$moment(res.TranTm, "h:mm:ss");
        this.form.setFieldsValue({
          ...res,
          CheckerEmpnbr: this.global.userInfo.name
        });
        if (this.loanDetail.File) {
          const FileList = this.loanDetail.File.split("___");
          FileList.forEach((item) => {
            this.downloadFile(item, FileList.length);
          });
        }
      });
    },
    resetForm() {
      this.form.setFields({
        CheckerReview: "",
        CheckerComnt: ""
      });
    },
    save(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const param = {
            ...this.loanDetail,
            CheckerReview: values.CheckerReview,
            CheckerComnt: values.CheckerComnt,
            CheckerEmpnbr: values.CheckerEmpnbr
          };
          Loan.ManualDisbursementApproval(param).then((res) => {
            if (res.Status === "ok") {
              this.$message.success(this.$t('loan.approval_disbursement_success'));
              this.$router.push({
                path: "/loan/loanDetails",
                query: { ...this.$route.query }
              });
            }
          });
        }
      });
    },
    getBase(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    getBlob(base64) {
      const arr = base64.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return URL.createObjectURL(new Blob([u8arr], { type: mime }));
    },
    async previewProofOfDisbursement(file) {
      if (file.status !== "done") {
        if (!file.blob && !file.preview) {
          file.preview = await this.getBase(file);
          file.blob = this.getBlob(file.preview);
        }
        this.proofOfIdentity.base64 = file.blob || file.preview;
      }
      this.proofOfIdentity.base64 = file.base64 || file.preview;
      this.proofOfIdentity.show = true;
    },
    downloadFile(fileId, length) {
      return new Promise((resolve, reject) => {
        CM.downloadFile(fileId)
          .then((res) => {
            const fileName = fileId.split("__") || [fileId];
            this.fileList.push({
              uid: fileId,
              name: fileName[0],
              status: "done",
              url: "javascript:;",
              base64: res.Buf
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
};
</script>
<style lang="less">
#LoanDisbursementEdit {
  .ant-upload-list-item-info {
    cursor: pointer;
  }
  .submit-content {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
  .ant-upload-disabled button {
    background-color: #f5f5f5;
    pointer-events: none;
  }
}
</style>
