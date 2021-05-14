<template>
  <div id="LoanRepayment">
    <a-form :form="form" @submit="save">
      <CollapseCard
        :title="$t('loan.title_transaction_amount')"
        class="my-card my-card-left"
      >
        <a-row type="flex" justify="space-between">
          <a-col :span="7">
            <a-form-item :label="$t('loan.repayment_status')">
              <a-radio-group
                v-decorator="[
                  'LoanStatus',
                  {
                    initialValue: '02',
                    rules: [
                      {
                        required: true,
                        message: $t('loan.please_select_repayment_status')
                      }
                    ]
                  }
                ]"
                class="my-radio"
                @change="changeStatus"
              >
                <a-radio value="01">
                  {{ $t("loan.total") }}
                </a-radio>
                <a-radio value="02">
                  {{ $t("loan.partial") }}
                </a-radio>
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
                        },
                        checkAmt()
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                  :disabled="LoanStatus==='01'"
                  @blur="blurAmt"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.repayment_amount_avaliable')">
              <div>
                <span>{{ $route.query.InstallmentAmount | formatPrice }}</span> {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.principal_amount')">
              <div>
                <number-input
                  v-decorator="['PrincipalAmount']"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                  :disabled="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.interest_amount')">
              <div>
                <number-input
                  v-decorator="['InterestAmount']"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                  :disabled="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item :label="$t('loan.optional_application_fees')">
              <div>
                <number-input
                  v-decorator="[
                    'AppFee',
                    {
                      rules: [
                        {
                          required: false
                        }
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                /> {{ Currency }}
              </div></a-form-item>
            <a-form-item :label="$t('loan.optional_processing_origination_fees')">
              <div>
                <number-input
                  v-decorator="[
                    'ProcFee',
                    {
                      rules: [
                        {
                          required: false
                        }
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.optional_overdue_fees')">
              <div>
                <number-input
                  v-decorator="[
                    'OverFee',
                    {
                      rules: [
                        {
                          required: false
                        }
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.optional_anticipated_repayment_fees')">
              <div>
                <number-input
                  v-decorator="[
                    'AdvRepayFee',
                    {
                      rules: [
                        {
                          required: false
                        }
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.optional_extension_fees')">
              <div>
                <number-input
                  v-decorator="[
                    'ExtsnFee',
                    {
                      rules: [
                        {
                          required: false
                        }
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.optional_repayment_plan_adjustment_fees')">
              <div>
                <number-input
                  v-decorator="[
                    'RepayPlanFee',
                    {
                      rules: [
                        {
                          required: false
                        }
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
            <a-form-item :label="$t('loan.optional_tax_fees')">
              <div>
                <number-input
                  v-decorator="[
                    'Tax',
                    {
                      rules: [
                        {
                          required: false
                        }
                      ]
                    }
                  ]"
                  style="width: 50%"
                  :max-length="12"
                  :formatter="true"
                  :decimal="true"
                />
                {{ Currency }}
              </div>
            </a-form-item>
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
                  'TranDate',
                  {
                    rules: [
                      {
                        required: true,
                        message: this.$t('loan.please_select_transaction_date')
                      }
                    ]
                  }
                ]"
                style="width: 100%"
                @change="onChangeDate"
              />
            </a-form-item>
            <a-form-item :label="$t('loan.transaction_time')">
              <a-time-picker
                v-decorator="[
                  'TranTime',
                  {
                    rules: [
                      {
                        required: true,
                        message: this.$t('loan.please_select_transaction_time')
                      }
                    ]
                  }
                ]"
                style="width: 100%"
                :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                @change="onChangeTime"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item style="marginbottom: 0px" :label="$t('loan.repayment_channel')">
              <a-radio-group
                v-decorator="[
                  'LoanChannel',
                  {
                    initialValue: '01',
                    rules: [
                      {
                        required: false,
                        message: this.$t('loan.please_select_repayment_channel')
                      }
                    ]
                  }
                ]"
                class="my-radio"
                style="width: 100%"
                @change="handleChange"
              >
                <a-radio value="01"> {{ $t("loan.bank") }} </a-radio>
                <a-form-item :label="$t('message.bank_name')">
                  <a-select
                    v-decorator="['BankNm', { rules: [{ required: false }] }]"
                    style="width: 100%"
                    :placeholder="$t('placeholder.select_bank_name')"
                    :disabled="ChannelDisabled"
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
                    :disabled="!ChannelDisabled"
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
                    rules: [
                      {
                        required: false
                      }
                    ]
                  }
                ]"
                style="width: 100%"
                :max-length="30"
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
                :before-upload="beforeUpload"
                :accept="'.jpg, .jpeg, .png'"
                @change="fileListChange"
                @preview="previewProofOfRepayment"
              >
                <a-button>
                  <a-icon type="upload" />
                  {{ $t("message.upload_btn") }}
                </a-button>
              </a-upload>
              <a-input
                v-decorator="[
                  'Uploaded',
                  {
                    rules: [
                      {
                        required: false
                      }
                    ]
                  }
                ]"
                style="display: none"
              />
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
              <a-input v-model="MakerId" :disabled="true" :max-length="12" />
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
                  { rules: [{ required: false }] }
                ]"
                class="form-radio"
                :disabled="true"
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
                :disabled="true"
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
import NumberInput from "../components/NumberInput.vue";
export default {
  components: { NumberInput },
  data() {
    return {
      form: this.$form.createForm(this),
      fileList: [],
      proofOfIdentity: {
        show: false,
        base64: ""
      },
      MakerId: this.global.userInfo.name,
      ChannelDisabled: false,
      LoanStatus: '02',
      Currency: this.$route.query.Currency
    };
  },
  methods: {
    moment,
    blurAmt() {
      this.form.validateFields(['TranAmt'], (err, values) => {
        if (!err) {
          this.calaAmt(values.TranAmt)
        }
      })
    },
    changeStatus(e) {
      if (e.target.value === '01') {
        this.form.setFieldsValue({ TranAmt: this.$route.query.InstallmentAmount })
        this.calaAmt(this.$route.query.InstallmentAmount)
      } else {
        this.form.setFieldsValue({ TranAmt: '', PrincipalAmount: '', InterestAmount: '' })
      }
      this.LoanStatus = e.target.value
    },
    calaAmt(RepayTotlAmt) {
      Loan.RepayAmountTrial({
        CustNo: this.$route.query.CustNo,
        LoanDubilNo: this.$route.query.LoanDubilNo,
        RepayTotlAmt: Number(RepayTotlAmt)
      }).then((res) => {
        if (res) {
          this.form.setFieldsValue({ PrincipalAmount: res.RepayPrin, InterestAmount: res.RepayIntr })
        }
      });
    },
    checkAmt() {
      const amt = Number(this.$route.query.InstallmentAmount);
      const message = this.$t("loan.check_repayment_amt");
      return {
        validator(rule, value, callback) {
          if (!value) callback();
          if (Number(value) > amt) {
            callback(message);
          }
          callback();
        }
      };
    },
    onChangeDate(date, dateString) {
      this.TranDt = dateString;
    },
    onChangeTime(date, dateString) {
      this.TranTm = dateString;
    },
    handleChange(e) {
      if (e.target.value === "01") {
        this.ChannelDisabled = false;
      } else if (e.target.value === "02") {
        this.ChannelDisabled = true;
      }
    },
    resetForm() {
      this.form.resetFields();
      this.ChannelDisabled = false;
      this.fileList = [];
    },
    save(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // const Records = [];
          this.upFile().then((fileKey) => {
            if (fileKey) {
              const File = fileKey.join("___");
              // fileKey.map((item) => Records.push({ File: item }));
              const param = {
                ...this.$route.query,
                ...values,
                TranDt: this.TranDt,
                TranTm: this.TranTm,
                File: File,
                MakerId: this.global.userInfo.name,
                TranAmt: Number(values.TranAmt),
                AppFee: Number(values.AppFee),
                ProcFee: Number(values.ProcFee),
                OverFee: Number(values.OverFee),
                AdvRepayFee: Number(values.AdvRepayFee),
                ExtsnFee: Number(values.ExtsnFee),
                RepayPlanFee: Number(values.RepayPlanFee),
                Tax: Number(values.Tax),
                TranType: "03"
              };
              Loan.ManualRepaymentApply(param).then((res) => {
                if (res.Status === "ok") {
                  this.$message.success(
                    this.$t("loan.apply_repayment_success")
                  );
                  this.$router.push({
                    path: "/loan/loanDetails",
                    query: { ...this.$route.query }
                  });
                }
              });
            }
          });
        }
      });
    },
    upFile() {
      return new Promise((resolve, reject) => {
        const params = [];
        const getAllBase = [];
        this.fileList.forEach((file, index) => {
          params.push({
            Key: file.name + "__" + index,
            Buf: ""
          });
          getAllBase.push(this.getBase(file));
        });
        Promise.all(getAllBase)
          .then((base64List) => {
            base64List.forEach((base64, index) => {
              params[index].Buf = base64;
            });
            CM.upFile({
              Flag: "2",
              DosFileBase64: params
            })
              .then((res) => {
                console.log(res);
                console.log("上传完成");
                resolve(res.Key);
              })
              .catch((error) => {
                reject(error);
                console.log("上传失败");
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fileListChange(info) {
      if (info.file.status === "removed") {
        this.fileList = info.fileList;
      }
      if (info.fileList?.length > 0) {
        this.form.setFieldsValue({
          Uploaded: "Y"
        });
      } else {
        this.form.resetFields(["Uploaded"]);
      }
    },
    beforeUpload(e) {
      const typeArr = e.name.split(".");
      const type = typeArr[typeArr.length - 1];
      const outoflimit = e.size / 1024 > 500; // 500kb以内
      if (this.fileList.length >= 5) {
        this.$message.error(this.$t("loan.number_of_files_selected_exceeds"));
        return false;
      } else if (typeArr[0].length > 50) {
        this.$message.error(this.$t("loan.file_name_is_too_long"));
        return false;
      } else if (type !== "png" && type !== "jpg" && type !== "jpeg") {
        this.$message.error(this.$t("loan.select_file_format"));
        return false;
      } else if (outoflimit) {
        // this.form.setFields({ 'proofOfIdentity': { errors: [new Error('Image must smaller than 500kb!')] }})
        this.$message.error(this.$t("loan.image_size"));
        return false;
      } else {
        console.log("....");
        this.fileList.push(e);
      }
      return false;
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
    async previewProofOfRepayment(file) {
      if (file.status !== "done") {
        if (!file.blob && !file.preview) {
          file.preview = await this.getBase(file);
          file.blob = this.getBlob(file.preview);
        }
        this.proofOfIdentity.base64 = file.blob || file.preview;
      }
      this.proofOfIdentity.base64 = file.base64 || file.preview;
      this.proofOfIdentity.show = true;
    }
  }
};
</script>
<style lang="less">
#LoanRepayment {
  .ant-upload-list-item-info {
    cursor: pointer;
  }
  .submit-content {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
}
</style>
