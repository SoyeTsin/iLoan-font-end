<template>
  <div id="LoanDisbursementDetail">
    <CollapseCard
      :title="$t('loan.title_transaction_amount')"
      class="my-card my-card-left"
    >
      <a-row type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item :label="$t('loan.disbursement_status')">
            <div>
              <span>
                {{
                  loanDetail.LoanStatus === "01"
                    ? $t("loan.total")
                    : $t("loan.partial")
                }}
              </span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.title_transaction_amount')">
            <div>
              <span>{{ loanDetail.TranAmt | formatPrice }}</span> <span>{{ Currency }}</span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <!-- <a-form-item :label="$t('loan.principal_amount')">
            <div>
              <span>{{ loanDetail.PrincipalAmount | formatPrice }}</span> <span>{{ Currency }}</span>
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
          <a-form-item :label="$t('loan.TRC_code')">
            <div>
              <span>{{ $t('loan.disb') }}</span>
            </div>
          </a-form-item>
          <a-form-item :label="$t('loan.TRC_detail')">
            <div>
              <span>{{ $t('loan.disbursement') }}</span>
            </div>
          </a-form-item>
          <a-form-item :label="$t('loan.transaction_date')">
            <div>
              <span>{{ loanDetail.TranDt }}</span>
            </div>
          </a-form-item>
          <a-form-item :label="$t('loan.transaction_time')">
            <div>
              <span>{{ loanDetail.TranTm }}</span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item style="marginbottom: 0px" :label="$t('loan.disbursement_channel')">
            <div>
              <span>
                {{
                  loanDetail.LoanChannel === "01"
                    ? $t("loan.bank")
                    : $t("loan.non_bank")
                }}
              </span>
            </div>
          </a-form-item>
          <a-form-item :label="$t('message.bank_name')">
            <div>
              <span>{{ BankNmObj[loanDetail.BankNm] }}</span>
            </div>
          </a-form-item>
          <a-form-item :label="$t('loan.channel_name')">
            <div>
              <span>{{ ChannelNmObj[loanDetail.ChannelNm] }}</span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('loan.optional_transaction_number')">
            <div>
              <span>{{ loanDetail.TranNum }}</span>
            </div>
          </a-form-item>
          <a-form-item
            ref="ProofId"
            :label="$t('loan.optional_proof_of_payment')"
          >
            <span
              v-for="file in fileList"
              :key="file.uid"
              style="display: block;overflow:hidden;warp-space:nowarp;text-overflow:ellipsis;"
            ><a
              :title="file.name"
              href="javascript:;"
              @click="previewProofOfDisbursement(file)"
            >{{ file.name }}</a></span>
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
            <div>
              <span>{{ loanDetail.MakerId }}</span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('message.maker_comment')">
            <div>
              <span>{{ loanDetail.MakelnComnt }}</span>
            </div>
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
      <a-row v-if="loanDetail.CheckerEmpnbr" type="flex" justify="space-between">
        <a-col :span="7">
          <a-form-item :label="$t('message.user_id')">
            <div>
              <span>{{ loanDetail.CheckerEmpnbr }}</span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('message.review')">
            <div>
              <span v-if="loanDetail.CheckerReview">
                {{
                  loanDetail.CheckerReview === "01"
                    ? $t("message.agree")
                    : $t("message.return")
                }}
              </span>
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item :label="$t('message.checker_comment')">
            <div>
              <span>{{ loanDetail.CheckerComnt }}</span>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-else class="no-information">
        {{ $t("message.no_information") }}
      </div>
    </collapse-card>
    <div class="submit-content">
      <a-button @click="back">{{ $t("message.back_btn") }} </a-button>
    </div>
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
      fileList: [],
      loanDetail: {},
      proofOfIdentity: {
        show: false,
        base64: ""
      },
      BankNmObj: {
        "01": this.$t("message.citigroup"),
        "02": this.$t("message.icbc"),
        "03": this.$t("message.mizuho_FG"),
        "04": this.$t("message.wells_fargo"),
        "05": this.$t("message.hsbc")
      },
      ChannelNmObj: {
        "01": this.$t("loan.seven_eleven"),
        "02": this.$t("loan.lotus"),
        "03": this.$t("loan.bigc"),
        "04": this.$t("loan.family_mart")
      },
      Currency: this.$route.query.Currency
    };
  },
  mounted() {
    this.getLoanHistDetail();
    this.$EventBus.$on('breadcrumbEdit', () => {
      this.intoEdit()
    })
  },
  destroyed() {
    this.$EventBus.$off("breadcrumbEdit")
  },
  methods: {
    moment,
    intoEdit() {
      this.$router.push({
        path: "/loan/loanDisbursement/edit",
        query: { ...this.$route.query }
      });
    },
    back() {
      this.$router.push({
        path: "/loan/loanDetails",
        query: { ...this.$route.query }
      });
    },
    getLoanHistDetail() {
      Loan.getLoanHistDetail({ ...this.$route.query }).then((res) => {
        this.loanDetail = res;
        if (this.loanDetail.File) {
          const FileList = this.loanDetail.File.split("___");
          FileList.forEach((item) => {
            this.downloadFile(item, FileList.length);
          });
        }
        this.$emit("disabledBreadcrumbEditButton", this.loanDetail.ApplyStatus !== '01')
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
#LoanDisbursementDetail {
  .ant-upload-list-item-info {
    cursor: pointer;
  }
  .submit-content {
    display: flex;
    justify-content: center;
    margin: 20px;
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
  /deep/.ant-col.ant-form-item-label {
    font-size: 15px;
    margin-bottom: 0;
    color: #333;
  }
  span {
    font-size: 14px;
    color: #a0a0a0;
  }
}
</style>
