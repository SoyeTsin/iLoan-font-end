<template>
  <a-spin :spinning="spinning" class="productDetails">
    <a-row type="flex">
      <a-col :flex="3">
        <div style="padding-right: 20px;box-sizing: border-box">
          <CollapseCard :title="$t('product.product_acc')" class="my-card my-card-left">
            <a-icon slot="extra" type="down" class="extra" />
            <div :class="isEdit('ProdtStus')">{{ $t('product.product_status') }}</div>
            <div class="card-content-text">
              {{ filterProdtStatus(productDetails.ProdtStus) }}
            </div>
            <div :class="isEdit('LoanProdtNo')">{{ $t('product.product_id') }}</div>
            <div class="card-content-text">
              {{ productDetails.LoanProdtNo }}
            </div>
          </CollapseCard>
          <div
            class="click-line"
            @click="
              () => {
                this.$router.push({
                  path: '/history',
                  query: { LoanProdtNm: productDetails.LoanProdtNm }
                });
              }
            "
          >
            {{ $t('message.view_history_log_btn') }}
          </div>
        </div>
      </a-col>
      <a-col :flex="7">
        <CollapseCard :title="$t('product.basic')" class="my-card">
          <a-icon slot="extra" type="down" class="extra" />
          <a-row type="flex">
            <a-col :flex="4">
              <div :class="isEdit('LoanProdtNm')">{{ $t('product.product_name') }}</div>
              <div class="card-content-text">
                {{ productDetails.LoanProdtNm }}
              </div>
              <div :class="isEdit('LoanProdtTypCd')">{{ $t('product.product_type') }}</div>
              <div class="card-content-text">
                {{ filterLoanProdtTypCd(productDetails.LoanProdtTypCd) }}
              </div>
              <div :class="isEdit('LoanProdtClsfCd')">{{ $t('product.product_category') }}</div>
              <div class="card-content-text">
                {{ filterLoanProdtClsfCd(productDetails.LoanProdtClsfCd) }}
              </div>
            </a-col>
            <a-col :flex="4">
              <div :class="isEdit('LoanGuarManrCd')">{{ $t('message.guarantee_method') }}</div>
              <div class="card-content-text">
                {{ filterLoanGuarManrCd(productDetails.LoanGuarManrCd) }}
              </div>
              <div :class="isEdit('CurCd')">{{ $t('message.currency') }}</div>
              <div class="card-content-text">
                <div>
                  {{ showCurCd }}
                </div>
              </div>
            </a-col>
            <a-col :flex="4">
              <div :class="isEdit('ApplicationDate')">{{ $t('message.application_date') }}</div>
              <div class="card-content-text">
                {{ productDetails.ApplicationDate }}
              </div>
              <div :class="isEdit('ApprovalDate')">{{ $t('message.approval_date') }}</div>
              <div class="card-content-text">
                {{ productDetails.ApprovalDate }}
              </div>
              <div :class="isEdit('DrawdownDate')">{{ $t('message.effective_date') }}</div>
              <div class="card-content-text">
                {{ productDetails.DrawdownDate }}
              </div>
              <div :class="isEdit('MaturityDate')">{{ $t('message.expiry_date') }}</div>
              <div class="card-content-text">
                {{ productDetails.MaturityDate }}
              </div>
            </a-col>
          </a-row>
        </CollapseCard>

        <CollapseCard :title="$t('product.loan')" class="my-card">
          <a-icon slot="extra" type="down" class="extra" />
          <a-row type="flex">
            <a-col :flex="4">
              <div :class="isEdit('NumberOfApplicant')">
                {{ $t('message.number_of_applicant') }}
              </div>
              <div class="card-content-text">
                {{ filterNumberOfApplicant(productDetails.NumberOfApplicant) }}
              </div>
            </a-col>

          </a-row>
          <div class="card-content-header">
            <div>
              {{ $t("loan.repayment") }}
            </div>
          </div>
          <a-row type="flex">
            <a-col :flex="4">
              <div :class="isEdit('PmitAdvRepayFlg')">
                {{ $t('message.early_repayment_allowance') }}
              </div>
              <div class="card-content-text">
                {{ productDetails.PmitAdvRepayFlg === '1' ? $t('message.allow') : $t('message.not_allow') }}
              </div>
              <div :class="isEdit('ChrgManrCd')">
                {{ $t('message.repayment_detail') }}
              </div>
              <div class="card-content-text">
                {{ productDetails.ChrgManrCd === '01' ? $t('message.fixed_installment') : $t('message.fixed_principal') }}
              </div>
              <div :class="isEdit('MaximumGracePeriod')">
                {{ $t('product.maximum_grace_period') }}
              </div>
              <div class="card-content-text">
                {{ productDetails.MaximumGracePeriod?productDetails.MaximumGracePeriod: 0 }} {{ $t('loan.days') }}
              </div>
              <div :class="isEdit('DefaultGracePeriod')">
                {{ $t('product.default_grace_period') }}
              </div>
              <div class="card-content-text">
                {{ productDetails.DefaultGracePeriod?productDetails.DefaultGracePeriod: 0 }} {{ $t('loan.days') }}
              </div>
            </a-col>
            <a-col :flex="4">
              <div :class="isEdit('AplyLoanCeilAmt')">
                {{ $t('message.maximum_loan_amount_USD') }}
              </div>
              <div class="card-content-text">
                {{ productDetails.AplyLoanCeilAmt|formatPrice }} {{ showCurCd }}
              </div>
              <div :class="isEdit('MinInterestRate')">
                {{ $t('message.minimum_interest_rate') }}
              </div>
              <div class="card-content-text">
                {{ productDetails.MinInterestRate }}%
              </div>
              <div :class="isEdit('MaxInterestRate')">
                {{ $t('message.maximum_interest_rate') }}
              </div>
              <div class="card-content-text">
                {{ productDetails.MaxInterestRate }}%
              </div>
            </a-col>
            <a-col :flex="4">
              <!-- <div :class="isEdit('ChrgManrCd')">{{ $t('message.repayment_detail') }}</div>
              <div class="card-content-text">
                {{ filterChrgManrCd(productDetails.ChrgManrCd) }}
              </div>
              <div :class="isEdit('PmitAdvRepayFlg')">
                {{ $t('message.early_repayment_allowance') }}
              </div>
              <div class="card-content-text">
                {{ filterPmitAdvRepayFlg(productDetails.PmitAdvRepayFlg) }}
              </div> -->
              <div :class="isEdit('ChrgManrCd')">{{ $t('product.default_application_fees') }}</div>
              <div class="card-content-text">
                {{ productDetails.DefaultAppFee }} {{ productDetails.AppFeeCalcMethod === '01' ? showCurCd : loanSelector[productDetails.AppFeeCalcMethod] }}
              </div>
              <div :class="isEdit('ChrgManrCd')">{{ $t('product.default_processing_origination_fees') }}</div>
              <div class="card-content-text">
                {{ productDetails.DefaultProcFee }} {{ productDetails.ProcFeeCalcMethod === '01' ? showCurCd : loanSelector[productDetails.ProcFeeCalcMethod] }}
              </div>
              <div :class="isEdit('ChrgManrCd')">{{ $t('product.default_overdue_fees') }}</div>
              <div class="card-content-text">
                {{ productDetails.DefaultOverFee }} {{ productDetails.OverFeeCalcMethod === '01' ? showCurCd : loanSelector[productDetails.OverFeeCalcMethod] }}
              </div>
              <div :class="isEdit('ChrgManrCd')">{{ $t('product.default_anticipated_repayment_fees') }}</div>
              <div class="card-content-text">
                {{ productDetails.DefaultAdvRepayFee }} {{ productDetails.AdvRepayFeeCalcMethod === '01' ? showCurCd : loanSelector[productDetails.AdvRepayFeeCalcMethod] }}
              </div>
              <div :class="isEdit('ChrgManrCd')">{{ $t('product.default_extension_fees') }}</div>
              <div class="card-content-text">
                {{ productDetails.DefaultExtsnFee }} {{ productDetails.ExtsnFeeCalcMethod === '01' ? showCurCd : loanSelector[productDetails.ExtsnFeeCalcMethod] }}
              </div>
              <div :class="isEdit('ChrgManrCd')">{{ $t('product.default_repayment_plan_adjustment_fees') }}</div>
              <div class="card-content-text">
                {{ productDetails.DefaultRepayPlanFee }} {{ productDetails.RepayPlanFeeCalcMethod === '01' ? showCurCd :loanSelector[productDetails.RepayPlanFeeCalcMethod] }}
              </div>
              <div :class="isEdit('ChrgManrCd')">{{ $t('product.default_tax_fees') }}</div>
              <div class="card-content-text">
                {{ productDetails.DefaultTax }} {{ productDetails.TaxCalcMethod === '01' ? showCurCd :loanSelector[productDetails.TaxCalcMethod] }}
              </div>

            </a-col>
          </a-row>
        </CollapseCard>

        <CollapseCard :title="$t('product.maker')" class="my-card">
          <a-icon slot="extra" type="down" class="extra" />
          <div
            v-if="!(productDetails.OprorEmpnbr || productDetails.OperRplshInfo)"
            class="no-information"
          >
            {{ $t('product.no_information') }}
          </div>
          <a-row
            v-if="productDetails.OprorEmpnbr || productDetails.OperRplshInfo"
            type="flex"
          >
            <a-col :flex="1">
              <div :class="isEdit('OprorEmpnbr')">{{ $t('message.user_id') }}</div>
              <div class="card-content-text">
                {{ productDetails.OprorEmpnbr }}
              </div>
            </a-col>
            <a-col :flex="1">
              <div :class="isEdit('OperRplshInfo')">{{ $t('message.maker_comment') }}</div>
              <div class="card-content-text">
                {{ productDetails.OperRplshInfo }}
              </div>
            </a-col>
          </a-row>
        </CollapseCard>

        <CollapseCard :title="$t('product.checker')" class="my-card">
          <a-icon slot="extra" type="down" class="extra" />
          <div
            v-if="
              !(
                productDetails.CheckEmpnbr ||
                productDetails.ExmnvrfyStusCd ||
                productDetails.CheckRplshInfo
              )
            "
            class="no-information"
          >
            {{ $t('product.no_information') }}
          </div>
          <a-row
            v-if="
              productDetails.CheckEmpnbr ||
                productDetails.ExmnvrfyStusCd ||
                productDetails.CheckRplshInfo
            "
            type="flex"
          >
            <a-col :flex="1">
              <div :class="isEdit('CheckEmpnbr')">{{ $t('message.user_id') }}</div>
              <div class="card-content-text">
                {{ productDetails.CheckEmpnbr }}
              </div>
            </a-col>
            <a-col :flex="1">
              <div :class="isEdit('ExmnvrfyStusCd')">{{ $t('message.review') }}</div>
              <div
                v-if="productDetails.ExmnvrfyStusCd === '1'"
                class="card-content-text"
                style="color: #3dbd7d"
              >
                {{ filterExmnvrfyStusCd(productDetails.ExmnvrfyStusCd) }}
              </div>
              <div
                v-if="productDetails.ExmnvrfyStusCd === '2'"
                class="card-content-text"
                style="color: #faad14"
              >
                {{ filterExmnvrfyStusCd(productDetails.ExmnvrfyStusCd) }}
              </div>
              <div
                v-if="productDetails.ExmnvrfyStusCd === '3'"
                class="card-content-text"
                style="color: #7a7a7a"
              >
                {{ filterExmnvrfyStusCd(productDetails.ExmnvrfyStusCd) }}
              </div>
              <div
                v-if="productDetails.ExmnvrfyStusCd === '10'"
                class="card-content-text"
                style="color: #f5222d"
              >
                {{ filterExmnvrfyStusCd(productDetails.ExmnvrfyStusCd) }}
              </div>
              <div
                v-if="productDetails.ExmnvrfyStusCd === '9'"
                class="card-content-text"
                style="color: #0052ba"
              >
                {{ filterExmnvrfyStusCd(productDetails.ExmnvrfyStusCd) }}
              </div>
            </a-col>
            <a-col :flex="1">
              <div :class="isEdit('CheckRplshInfo')">{{ $t('message.checker_comment') }}</div>
              <div class="card-content-text">
                {{ productDetails.CheckRplshInfo }}
              </div>
            </a-col>
          </a-row>
        </CollapseCard>
      </a-col>
    </a-row>
  </a-spin>
</template>
<script>
import ProductService from "@/service/productService";
import CM from "@/service/common";
// import filterActive from "@/filter/productFilter";

export default {
  name: "ProductDetails",
  components: {},
  // filters: filterActive,
  data() {
    return {
      currencyList: [],
      showCurCd: "",
      productDetails: {},
      currentcyResult: [],
      spinning: true,
      loanSelector: { '01': this.$t('product.same_as_currency'), '02': this.$t('product.percent_loan_amount') },
      currencySpinning: false
    };
  },
  mounted() {
    this.getProductDetails();
    if (this.$route.query.ProdtStus === '03') {
      this.$emit("disabledBreadcrumbEditButton", true);
    } else {
      this.$EventBus.$on('breadcrumbEdit', () => {
        this.intoEdit()
      })
    }
  },
  destroyed() {
    if (this.$route.query.ProdtStus !== '03') {
      this.$EventBus.$off("breadcrumbEdit")
    }
  },
  methods: {
    intoEdit() {
      this.$router.push({
        path: "/product/productDetails/productDetailsEdit",
        query: { ...this.$route.query }
      });
    },
       filterProdtStatus(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = this.$t('message.inactive')
                break;
            case `02`:
                resString = this.$t('message.active')
                break;
            case `03`:
                resString = this.$t('message.cancelled')
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterLoanGuarManrCd(e) {
        let resString = this.$t('message.not_guarantee')
        switch (e) {
            case `01`:
                resString = this.$t('message.not_guarantee')
                break;
            case `02`:
                resString = this.$t('message.guarantor')
                break;
            default:
                resString = this.$t('message.not_guarantee')
        }
        return resString
    },
    filterLoanProdtTypCd(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = this.$t('message.personal')
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterLoanProdtClsfCd(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = this.$t('product.micro_loan')
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterNumberOfApplicant(e) {
        let resString = '-'
        switch (e) {
            case `01`:
                resString = this.$t('message.single_customer')
                break;
            case `02`:
                resString = this.$t('message.not_single_customer')
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterChrgManrCd(e) {
        let resString = '-'
        switch (e) {
            case `02`:
                resString = this.$t('message.fixed_principal')
                break;
            case `01`:
                resString = this.$t('message.fixed_installment')
                break;
            default:
                resString = `-`
        }
        return resString
    },
    filterPmitAdvRepayFlg(e) {
        let resString = this.$t('message.not_allow')
        switch (e) {
            case `1`:
                resString = this.$t('message.allow')
                break;
            case `0`:
                resString = this.$t('message.not_allow')
                break;
            default:
                resString = this.$t('message.not_allow')
        }
        return resString
    },
    filterApproval(e) {
        let resString = '-'
        switch (e) {
            case `1`:
                resString = this.$t('message.agreed')
                break;
            case `2`:
                resString = this.$t('message.pending')
                break;
            case `3`:
                resString = `-`
                break;
            case `9`:
                resString = `-`
                break;
            case `10`:
                resString = this.$t('message.return')
                break;
            default:
                resString = `-`
                break;
        }
        return resString
    },
    filterExmnvrfyStusCd(e) {
        let resString = '-'
        switch (e) {
            case `1`:
                resString = this.$t('message.agreed')
                break;
            case `2`:
                resString = this.$t('message.pending')
                break;
            case `3`:
                resString = `-`
                break;
            case `9`:
                resString = `-`
                break;
            case `10`:
                resString = this.$t('message.return')
                break;
            default:
                resString = `-`
                break;
        }
        return resString
    },
    filterAplyLoanAmtCeilVal(e) {
        return e + ''
},
    isEdit(e) {
      let className = "card-content-title";
      if (
        this.productDetails[`Old${e}`] &&
        this.productDetails[`Old${e}`] !== this.productDetails[`${e}`]
      ) {
        className = "card-content-title red";
      }
      return className;
    },
     async getCurrencyList() {
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
            // console.log("productDetails.CurCd = ", this.productDetails.CurCd)

        this.currencyList.forEach(item => {
          if (item.value === this.productDetails.CurCd) {
            this.showCurCd = item.name;
          }
        });
        this.currencySpinning = false;
    },
    getProductDetails() {
      const param = {
        LoanProdtNo: this.$route.query.LoanProdtNo || null,
        LoanProdtVersNo: this.$route.query.LoanProdtVersNo || null
      };
      ProductService.getProductDetails(param).then(res => {
        console.log('getProductDetails res = ', res)
        this.productDetails = res;
        this.productDetails.MaxInterestRate = (res.MaxInterestRate * 100).toFixed(2)
        this.productDetails.OldMaxInterestRate = (res.OldMaxInterestRate * 100).toFixed(2)
        this.productDetails.MinInterestRate = (res.MinInterestRate * 100).toFixed(2)
        this.productDetails.OldMinInterestRate = (res.OldMinInterestRate * 100).toFixed(2)
        this.spinning = false;
        this.currencySpinning = true;
        this.$emit(`disabledBreadcrumbEditButton`, res.ProdtStus === "");
        this.getCurrencyList();
      });
    }
  }
};
</script>

<style scoped lang="less">
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

  &.red {
    color: #f5222d;
  }
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
</style>
