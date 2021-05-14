<template>
  <div id="LoanDetails">
    <a-row type="flex">
      <a-col span="6">
        <div style="padding-right: 20px; box-sizing: border-box">
          <collapse-card
            :title="$t('customer.customer')"
            class="my-card my-card-left"
          >
            <div ref="CustStatus" class="item-text">
              <h6>{{ $t("customer.customer_status") }}</h6>
              <span>{{ customerStatus[loanDetails.CustStatus] }}</span>
            </div>
            <div ref="CustNo" class="item-text">
              <h6>{{ $t("message.cif") }}</h6>
              <a
                href="javascript:;"
                class="click-line-text"
                @click="
                  $router.push({
                    path: '/customer/customerDetails',
                    query: { id: loanDetails.CustNo }
                  })
                "
              >{{ idFormat(loanDetails.CustNo, "cif") }}
              </a>
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("customer.customer_name") }}</h6>
              <span>{{ loanDetails.CustName?loanDetails.CustName:'-' }}</span>
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("message.age") }}</h6>
              <span>{{ info.age }}</span>
            </div>
            <div ref="CustName" class="item-text">
              <h6>{{ $t("message.gender") }}</h6>
              <span>{{ Gender[info.Gender] }}</span>
            </div>
          </collapse-card>

          <collapse-card
            :title="$t('message.guarantor')"
            class="my-card my-card-left"
          >
            <div ref="GuarMethod" class="item-text">
              <h6>{{ $t("message.guarantee_method") }}</h6>
              <span>{{ GuarantorMethod[loanDetails.GuarMethod] }}</span>
            </div>

            <div ref="GuarNm" class="item-text">
              <h6>{{ $t("message.guarantor_name") }}</h6>
              <span>{{ loanDetails.GuarNm }}</span>
            </div>

            <div ref="GuarIDTp" class="item-text">
              <h6>{{ $t("message.guarantor_id_type") }}</h6>
              <span>{{ GuarantorIdTypeCheck(loanDetails) }}</span>
            </div>

            <div ref="GuarIdNo" class="item-text">
              <h6>{{ $t("message.guarantor_certificate_id") }}</h6>
              <span v-if="loanDetails.GuarIdNo">{{
                loanDetails.GuarIdNo.replace(
                  /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/,
                  "$1-$2-$3-$4-$5"
                )
              }}</span>
            </div>

            <div ref="GuarPassCountry" class="item-text">
              <h6>{{ $t("message.guarantor_passport_country") }}</h6>
              <span>{{ Country[loanDetails.GuarPassCountry] }}</span>
            </div>
            <div ref="GuarPassCountry" class="item-text">
              <h6>{{ $t("message.guarantor_phone_number") }}</h6>
              <span>-</span>
            </div>
          </collapse-card>

          <collapse-card
            :title="$t('customer.contact')"
            class="my-card my-card-left"
          >
            <div ref="GuarMethod" class="item-text">
              <h6>{{ $t("customer.customer_phone_mumber") }}</h6>
              <span>-</span>
            </div>

            <div ref="GuarNm" class="item-text">
              <h6>{{ $t("message.work_phone_number") }}</h6>
              <span>-</span>
            </div>

            <div ref="GuarIDTp" class="item-text">
              <h6>{{ $t("customer.mailling_add") }}</h6>
              <span>-</span>
            </div>

            <div ref="GuarIdNo" class="item-text">
              <h6>{{ $t("message.email") }}</h6>
              <span>-</span>
            </div>

            <div class="card-content-header">
              <div>
                {{ $t('message.spouse') }}
              </div>
            </div>
            <div ref="GuarIDTp" class="item-text">
              <h6>{{ $t("message.spouse_name") }}</h6>
              <span>-</span>
            </div>

            <div ref="GuarIdNo" class="item-text">
              <h6>{{ $t("message.spouse_phone_number") }}</h6>
              <span>-</span>
            </div>

            <div class="card-content-header">
              <div>
                {{ $t('customer.emergency_contact') }}
              </div>
            </div>
            <div ref="GuarIDTp" class="item-text">
              <h6>{{ $t("message.emergency_contact_name") }}</h6>
              <span>-</span>
            </div>

            <div ref="GuarIdNo" class="item-text">
              <h6>{{ $t("message.emergency_contact_phone_number") }}</h6>
              <span>-</span>
            </div>

            <div class="card-content-header">
              <div>
                {{ $t('message.guarantor') }}
              </div>
            </div>
            <div ref="GuarNm" class="item-text">
              <h6>{{ $t("message.guarantor_name") }}</h6>
              <span>{{ loanDetails.GuarNm?loanDetails.GuarNm:'-' }}</span>
            </div>

            <div ref="GuarPassCountry" class="item-text">
              <h6>{{ $t("message.guarantor_phone_number") }}</h6>
              <span>-</span>
            </div>

          </collapse-card>
          <collapse-card
            :title="$t('customer.bank_accounts')"
            class="my-card my-card-left"
          >
            <a-icon slot="extra" type="down" class="extra" />
            <div class="card-content-header">
              <div>
                {{ $t('loan.linked_bank_acc') }}
              </div>
            </div>
            <div ref="RelaAcctOpnAcctBnkBnkName" class="item-text">
              <h6>{{ $t("message.bank_name") }}</h6>
              <span>{{ getBankName(loanDetails.RelaAcctOpnAcctBnkBnkName) }}</span>
            </div>
            <div ref="BIC" class="item-text">
              <h6>{{ $t("message.bic") }}</h6>
              <span>
                {{ loanDetails.BIC }}
              </span>
            </div>
            <div ref="RelaAcctNo" class="item-text">
              <h6>{{ $t("message.bank_acc_number") }}</h6>
              <span>{{ loanDetails.RelaAcctNo }}</span>
            </div>
            <div ref="RelaAcctName" class="item-text">
              <h6>{{ $t("message.bank_acc_name") }}</h6>
              <span>{{ loanDetails.RelaAcctName?loanDetails.RelaAcctName:'-' }}</span>
            </div>
            <div class="card-content-header">
              <div>
                {{ $t('loan.linked_credit_card') }}
              </div>
            </div>
            <div ref="CreitNm" class="item-text">
              <h6>{{ $t("customer.credit_card_number_view") }}</h6>
              <span>{{ creditCardFormat(loanDetails.CreitNm) }}</span>
            </div>
          </collapse-card>

          <div class="click-line" @click="jumpLoanRepaymentPlan()">
            {{ $t("loan.view_repayment_plan_btn") }}
          </div>

          <div
            class="click-line"
            @click="
              $router.push({
                path: '/history',
                query: { LoanProdtNm: loanDetails.LoanProdtNm }
              })
            "
          >
            {{ $t("message.view_history_log_btn") }}
          </div>
        </div>
      </a-col>
      <a-col span="18">
        <collapse-card :title="$t('loan.loan_acc')" class="my-card">
          <a-row type="flex">
            <a-col :flex="4">
              <div ref="LoanStatus" class="item-text">
                <h6>{{ $t("loan.loan_status") }}</h6>
                <span>{{ LoanStatus[loanDetails.LoanStatus] }}</span>
              </div>
              <div ref="MakelnAplySn" class="item-text">
                <h6>{{ $t("loan.application_number") }}</h6>
                <span>{{ loanDetails.MakelnAplySn }}</span>
              </div>
              <div ref="LoanDubilNo" class="item-text">
                <h6>{{ $t("loan.loan_reference_number") }}</h6>
                <span>{{ loanDetails.LoanDubilNo }}</span>
              </div>
              <div ref="LoanProdtNo" class="item-text">
                <h6>{{ $t("product.product_id") }}</h6>
                <span>{{ loanDetails.LoanProdtNo }}</span>
              </div>
              <div ref="loanProdtNm" class="item-text">
                <h6>{{ $t("product.product_name") }}</h6>
                <span>{{ reveal.productName }}</span>
              </div>
              <div ref="ArrangementPurpose" class="item-text">
                <h6>{{ $t("loan.arrangement_purpose") }}</h6>
                <span>
                  {{ arrangementList[loanDetails.ArrangementPurpose] }}
                </span>
              </div>
            </a-col>
            <a-col :flex="4">
              <div ref="CreditAmt" class="item-text">
                <h6>{{ $t("loan.loan_amount_USD") }}</h6>
                <span>{{
                  loanDetails.CreditAmt|formatPrice
                }} {{ currencyUse }}</span>
              </div>
              <div ref="Intr" class="item-text">
                <h6>{{ $t("loan.interest_rate") }}</h6>
                <span v-if="loanDetails.Intr">{{ $lib.calcNum(loanDetails.Intr * 100).toFixed(2) }}%</span>
              </div>
              <div ref="AvailableQuota" class="item-text">
                <h6>{{ $t("loan.credit_usage_USD") }}</h6>
                <span>{{
                  loanDetails.UseLimit|formatPrice
                }} {{ currencyUse }}</span>
              </div>
            </a-col>
            <a-col :flex="4">
              <div ref="LoanDeadl" class="item-text">
                <h6>{{ $t("loan.tenor") }}</h6>
                <span>{{ loanDetails.LoanDeadl }}</span>
              </div>
              <div ref="AplyMakelnDt" class="item-text">
                <h6>{{ $t("loan.loan_application_date") }}</h6>
                <span>{{ loanDetails.AplyMakelnDt }}</span>
              </div>
              <div ref="ActlMakelnDt" class="item-text">
                <h6>{{ $t("loan.drawdown_date") }}</h6>
                <span>{{ loanDetails.ActlMakelnDt }}</span>
              </div>
              <div ref="MatrDt" class="item-text">
                <h6>{{ $t("loan.maturity_date") }}</h6>
                <span>{{ loanDetails.MatrDt }}</span>
              </div>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('loan.transaction_Info')" class="my-card">

          <a-row type="flex">
            <a-col :flex="4">
              <div class="card-content-header">
                <div>
                  {{ $t("loan.disbursement") }}
                </div>
              </div>
              <div ref="DisbursementStatus" class="item-text">
                <h6>{{ $t("loan.disbursement_status") }}</h6>
                <span>{{
                  DisbursementStatus[loanDetails.DisbursementStatus]
                }}</span>
              </div>
            </a-col>
            <a-col :flex="4">
              <div class="card-content-header">
                <div>{{ $t("loan.previous_disbursement") }}</div>
              </div>
              <div ref="LoanAmt" class="item-text">
                <h6>{{ $t("loan.previous_disbursement_amount") }}</h6>
                <span>{{ loanDetails.LoanAmt|formatPrice }} {{ currencyUse }}</span>
              </div>
            </a-col>
            <a-col :flex="4">
              <div class="card-content-header">
                <div>{{ $t("loan.next_disbursement") }}</div>
              </div>
              <div ref="NextDsbDate" class="item-text">
                <h6>{{ $t("loan.next_disbursement_date") }}</h6>
                <span>{{ loanDetails.NextDsbDate }}</span>
              </div>
              <div ref="NextDsbAmt" class="item-text">
                <h6>{{ $t("loan.next_disbursement_amount") }}</h6>
                <span>{{ loanDetails.NextDsbAmt|formatPrice }} {{ currencyUse }}</span>
              </div>
              <div ref="LoanChannel" class="item-text">
                <h6>{{ $t("loan.disbursement_channel") }}</h6>
                <span>{{ DisbursementChannel[loanDetails.LoanChannel] }}</span>
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
              <div ref="LoanDeadlUnitCd" class="item-text">
                <h6>{{ $t("loan.repayment_frequency") }}</h6>
                <span>{{
                  repaymentFrequencyList[loanDetails.LoanDeadlUnitCd]
                }}</span>
              </div>
              <div ref="AuotoRepyFlag" class="item-text">
                <h6>{{ $t("loan.auto_repay_activation") }}</h6>
                <span>{{
                  AutoRepayActivation[loanDetails.AuotoRepyFlag]
                }}</span>
              </div>
              <div ref="RepayDay" class="item-text">
                <h6>{{ $t("loan.repayment_date") }}</h6>
                <span v-if="loanDetails.LoanDeadlUnitCd === '04'">
                  {{ loanDetails.RepayDay }}{{ $t("loan.th_month") }}
                </span>
                <span v-if="loanDetails.LoanDeadlUnitCd !== '04'">
                  -
                </span>
              </div>
              <div ref="NextRepayDay" class="item-text">
                <h6>{{ $t("loan.repayment_date_for_next_period_only") }}</h6>
                <span>{{ loanDetails.NextRepayDay?loanDetails.NextRepayDay:'-' }}</span>
                <!-- <span>{{ $t("loan.th_next_month") }}</span> -->
              </div>
              <div ref="GracePeriod" class="item-text">
                <h6>{{ $t("loan.grace_period") }}</h6>
                <span>{{ loanDetails.GracePeriod?loanDetails.GracePeriod:0 }} {{ $t("loan.days") }}</span>
              </div>
            </a-col>
            <a-col :flex="4">
              <div ref="RepayTotlAmt" class="item-text">
                <h6>{{ $t("loan.installment") }}</h6>
                <span>{{ loanDetails.InstallmentAmount }} {{ currencyUse }}</span>
              </div>
              <div ref="RemainPrin" class="item-text">
                <h6>{{ $t("loan.outstanding_balance") }}</h6>
                <span>{{ loanDetails.OutstandingBalance |formatPrice }} {{ currencyUse }}</span>
              </div>
              <div ref="RepayPrin" class="item-text">
                <h6>{{ $t("loan.principal") }}</h6>
                <span>{{ loanDetails.Principal|formatPrice }} {{ currencyUse }}</span>
              </div>
              <div ref="RepayIntr" class="item-text">
                <h6>{{ $t("loan.interest_rate") }}</h6>
                <span>{{ loanDetails.Interest }} {{ currencyUse }}</span>
              </div>
              <div ref="OverDueamt" class="item-text">
                <h6>{{ $t("loan.overdue_amount") }}</h6>
                <span>{{ loanDetails.OverDueamt |formatPrice }} {{ currencyUse }}</span>
              </div>
            </a-col>
            <a-col :flex="4">
              <div ref="AppFee" class="item-text">
                <h6>{{ $t("loan.application_fees") }} </h6>
                <span>{{
                  loanDetails.AppFee|formatPrice
                }} {{ currencyUse }}</span>
              </div>
              <div ref="ProcFee" class="item-text">
                <h6>
                  {{ $t("loan.processing_fees") }}
                </h6>
                <span>{{
                  loanDetails.ProcFee|formatPrice
                }} {{ currencyUse }}</span>
              </div>
              <div ref="OverFee" class="item-text">
                <h6>{{ $t("loan.overdue_fees") }}</h6>
                <span>{{
                  loanDetails.OverFee|formatPrice
                }} {{ currencyUse }}</span>
              </div>
              <div ref="AdvRepayFee" class="item-text">
                <h6>
                  {{ $t("loan.anticipated_fees") }}
                </h6>
                <span>{{
                  loanDetails.AdvRepayFee|formatPrice
                }} {{ currencyUse }}</span>
              </div>
              <div ref="ExtsnFee" class="item-text">
                <h6>
                  {{ $t("loan.extension_fees") }}
                </h6>
                <span>{{
                  loanDetails.ExtsnFee|formatPrice
                }} {{ currencyUse }}</span>
              </div>
              <div ref="RepayPlanAdjFee" class="item-text">
                <h6>
                  {{ $t("loan.repayment_plan_fees") }}
                </h6>
                <span>{{
                  loanDetails.RepayPlanAdjFee|formatPrice
                }} {{ currencyUse }}</span>
              </div>
              <div ref="Tax" class="item-text">
                <h6>{{ $t("loan.Tax_fees") }}</h6>
                <span>{{
                  loanDetails.Tax|formatPrice
                }} {{ currencyUse }}</span>
              </div>
            </a-col>
          </a-row>
        </collapse-card>

        <collapse-card :title="$t('loan.transaction_history')" class="my-card">
          <a-dropdown slot="setting">
            <a-icon type="setting" style="margin-right: 16px" @click.stop="" />
            <a-menu slot="overlay">
              <a-menu-item :key="1">
                <div
                  @click.stop="addDisbursement"
                >
                  {{ $t('loan.new_disbursment_record') }}
                </div>
              </a-menu-item>
              <a-menu-item :key="2">
                <div
                  @click.stop="addRepayment"
                >
                  {{ $t('loan.new_repayment_record') }}
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div ref="myTable">
            <div>
              <!-- v-if="showTable" :style="{width:`${myTableWidth}px`}"-->
              <a-table
                :columns="columns"
                :data-source="transactionHistoryList"
                :pagination="pagination"
                :row-key="(item, index) => index"
              >
                <div slot="Date" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else class="date">{{ value }}</span>
                </div>
                <div slot="Time" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="TRC" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ TxTypCd[value] }}</span>
                  <span v-else>{{ TxTypCd[value] }}</span>
                </div>
                <div slot="Amount" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Principal" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Interest" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Fee" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Balance" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div
                  slot="Action"
                  slot-scope="custId, record"
                >

                  <div
                    v-if="record.DisbuType === '02'"
                    class="table-action"
                  >
                    <a-button
                      type="link"
                      class="table-button-line"
                      @click="jump(record)"
                    >{{ $t("message.view_btn") }}
                    </a-button>
                    <div class="edit-button">
                      <div class="table-action-line" />
                      <a-button
                        type="link"
                        class="table-button-line"
                        :disabled="record.ApplyStatus !== '01'"
                        @click="jump(record, 'edit')"
                      >{{ $t("message.edit_btn") }}
                      </a-button>
                    </div>

                    <div class="edit-button">
                      <div class="table-action-line" />
                      <a-button
                        type="link"
                        class="table-button-line"
                        @click="showDelete(record)"
                      >{{ $t("Utils.delete") }}
                      </a-button>
                    </div>
                  </div>
                </div>

              </a-table>
            </div>
          </div>
        </collapse-card>
        <collapse-card :title="$t('loan.contact_history')" class="my-card">
          <a-dropdown slot="setting">
            <a-icon type="setting" style="margin-right: 16px" @click.stop="" />
            <a-menu slot="overlay">
              <a-menu-item :key="1">
                <div
                  @click.stop="newContactRecPage"
                >
                  {{ $t('loan.new_contact_history_record') }}
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div ref="myTable">
            <div>
              <!-- v-if="showTable" :style="{width:`${myTableWidth}px`}"-->
              <a-table
                :columns="contactColumns"
                :data-source="transactionHistoryList"
                :pagination="pagination"
                :row-key="(item, index) => index"
              >
                <div slot="Date" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else class="date">{{ value }}</span>
                </div>
                <div slot="Time" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="TRC" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ TxTypCd[value] }}</span>
                  <span v-else>{{ TxTypCd[value] }}</span>
                </div>
                <div slot="Amount" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Principal" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Interest" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Fee" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div slot="Balance" slot-scope="value, item">
                  <span v-if="item.ApplyStatus==='01'" class="redtext">{{ value }}</span>
                  <span v-else>{{ value }}</span>
                </div>
                <div
                  slot="Action"
                  slot-scope="custId, record"
                >
                  <div
                    v-if="record.DisbuType === '02'"
                    class="table-action"
                  >
                    <a-button
                      type="link"
                      class="table-button-line"
                      @click="contactHistoryRoute(record)"
                    >{{ $t("message.view_btn") }}
                    </a-button>
                    <div class="edit-button">
                      <div class="table-action-line" />
                      <a-button
                        type="link"
                        class="table-button-line"
                        @click="contactHistoryRoute(record, 'edit')"
                      >{{ $t("message.edit_btn") }}
                      </a-button>
                    </div>

                    <div class="edit-button">
                      <div class="table-action-line" />
                      <a-button
                        type="link"
                        class="table-button-line"
                        @click="showDelete(record)"
                      >{{ $t("Utils.delete") }}
                      </a-button>
                    </div>
                  </div>
                </div>

              </a-table>
            </div>
          </div>
        </collapse-card>
        <collapse-card :title="$t('message.maker')" class="my-card">
          <a-row
            v-if="loanDetails.MakelnEmpnbr || loanDetails.MakelnComnt"
            type="flex"
          >
            <a-col :flex="1">
              <div ref="MakelnEmpnbr" class="item-text">
                <h6>{{ $t("message.user_id") }}</h6>
                <span>{{ loanDetails.MakelnEmpnbr }}</span>
              </div>
            </a-col>
            <a-col :flex="1">
              <div ref="MakelnComnt" class="item-text">
                <h6>{{ $t("message.maker_comment") }}</h6>
                <span>{{ loanDetails.MakelnComnt }}</span>
              </div>
            </a-col>
          </a-row>
          <div v-else class="no-information">
            {{ $t("message.no_information") }}
          </div>
        </collapse-card>

        <collapse-card :title="$t('message.checker')" class="my-card">
          <a-row
            v-if="
              loanDetails.CheckerEmpnbr ||
                loanDetails.CheckerComnt ||
                loanDetails.CheckerReview
            "
            type="flex"
          >
            <a-col :flex="1">
              <div ref="CheckerEmpnbr" class="item-text">
                <h6>{{ $t("message.user_id") }}</h6>
                <span>{{ loanDetails.CheckerEmpnbr }}</span>
              </div>
            </a-col>
            <a-col :flex="1">
              <div ref="CheckerReview" class="item-text">
                <h6>{{ $t("message.review") }}</h6>
                <span>{{ CheckerReview[loanDetails.CheckerReview] }}</span>
              </div>
            </a-col>
            <a-col :flex="1">
              <div ref="CheckerComnt" class="item-text">
                <h6>{{ $t("message.checker_comment") }}</h6>
                <span>{{ loanDetails.CheckerComnt }}</span>
              </div>
            </a-col>
          </a-row>
          <div v-else class="no-information">
            {{ $t("message.no_information") }}
          </div>
        </collapse-card>
      </a-col>
    </a-row>
    <a ref="download" :href="pdfUrl" download />
    <a-modal
      v-model="dele"
      :title="$t('loan.delete_history_title')"
      @ok="deleteHist"
    >
      <p>
        {{ $t('loan.delete_history_content') }}
      </p>
    </a-modal>
  </div>
</template>

<script>
import Loan from "@/service/loanService";
import Common from "@/service/common";
import Customer from "@/service/customer";
import config from "@/lib/config";
import ProductService from "@/service/productService";
import CM from "@/service/common";

export default {
  name: "LoanDetails",
  data() {
    return {
      columns: [
        {
          title: this.$t("loan.date"),
          dataIndex: "TranDt",
          scopedSlots: { customRender: "Date" }
        },
        {
          title: this.$t("loan.time"),
          dataIndex: "TranTm",
          scopedSlots: { customRender: "Time" }
        },
        {
          title: this.$t("loan.TRC_code"),
          dataIndex: "TxTypCd",
          scopedSlots: { customRender: "TRC" }
        },
        {
          title: this.$t("loan.amount"),
          dataIndex: "TraTotlAmt",
          scopedSlots: { customRender: "Amount" }
        },
        {
          title: this.$t("loan.principal"),
          dataIndex: "RealRepayPrin",
          scopedSlots: { customRender: "Principal" }
        },
        {
          title: this.$t("loan.interest"),
          dataIndex: "RealRepayIntr",
          scopedSlots: { customRender: "Interest" }
        },
        {
          title: this.$t("loan.fee"),
          dataIndex: "RealRepayFee",
          scopedSlots: { customRender: "Fee" }
        },
        {
          title: this.$t("loan.outstanding_balance"),
          dataIndex: "OutBalance",
          scopedSlots: { customRender: "Balance" }
        },
        {
          title: this.$t("message.action"),
          dataIndex: "DisbuType",
          scopedSlots: { customRender: "Action" }
        }
      ],
       contactColumns: [
        {
          title: this.$t("loan.date"),
          dataIndex: "TranDt",
          scopedSlots: { customRender: "Date" },
          children: [
               {
          title: this.$t("loan.time"),
          dataIndex: "TranTm",
          scopedSlots: { customRender: "Time" }
        }
          ]
        },
        {
          title: this.$t("loan.contacted_status"),
          dataIndex: "TxTypCd",
          scopedSlots: { customRender: "TRC" },
          children: [
            {
               title: this.$t("loan.contacted_channel"),
          dataIndex: "TxTypCd",
          scopedSlots: { customRender: "TRC" }
            }
          ]
        },
        {
          title: this.$t("loan.contacted_outcome"),
          dataIndex: "TraTotlAmt",
          scopedSlots: { customRender: "Amount" }
        },
        {
          title: this.$t("loan.promise_to_pay_amount"),
          dataIndex: "RealRepayPrin",
          scopedSlots: { customRender: "Principal" },
          children: [
             {
          title: this.$t("loan.promise_to_pay_date"),
          dataIndex: "RealRepayIntr",
          scopedSlots: { customRender: "Interest" }
        }
          ]
        },
        {
          title: this.$t("message.user_id"),
          dataIndex: "OutBalance",
          scopedSlots: { customRender: "Balance" }
        },
        {
          dataIndex: "DisbuType",
          title: this.$t("message.action"),
          scopedSlots: { customRender: "Action" }
        }
      ],
      loanDetails: {},
      productDetails: {},
      currentcyResult: [],
      currencyList: [],
      Gender: { "0": this.$t('message.male'), "1": this.$t('message.female'), "2": this.$t('message.other') },
        info: {
        SignInfo: [{}],
        AddressArr: [{}, {}],
        Emergency: [{}]
      },
      currencySpinning: false,
      currencyUse: '',
      LoanDubilNo: null,
      transactionHistoryList: [],
      repaymentPlanEnquireList: [],
      // repaymentFrequencyList: {},
      productList: [],
      // arrangementList: {},
      customerStatus: {
        0: this.$t("message.regular"),
        3: this.$t("message.blacklist"),
        4: this.$t("message.inactive")
      },
      GuarantorMethod: {
        "01": this.$t("message.no_guarantee"),
        "02": this.$t("message.guarantor")
      },
      Country: {},
      LoanStatus: {
        "01": this.$t("loan.request"),
        "02": this.$t("loan.approved"),
        "03": this.$t("loan.denied"),
        10: this.$t("loan.closed")
      },
      DisbursementStatus: {
        "01": this.$t("loan.total"),
        "02": this.$t("loan.partial")
      },
      CheckerReview: {
        "01": this.$t("message.agree"),
        "02": this.$t("message.return")
      },
      AutoRepayActivation: { "01": this.$t("loan.auto_repay") },
      TxTypCd: { "03": this.$t("loan.rpym"), "04": this.$t("loan.disb") },
      DisbursementChannel: { "01": this.$t("loan.bank") },
      TxTypDetail: {
        1: this.$t("loan.repayment"),
        2: this.$t("loan.disbursement")
      },
      pdfUrl: "",
      reveal: {},
      pageNum: 1,
      custDetail: [],
      pageSize: 10,
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
      pagination: {
        defaultCurrent: 1, // defaultCurrent
        showSizeChanger: true, // 显示可改变每页数量
        showQuickJumper: true, // 是否可以快速跳转至某页
        pageSizeOptions: ["10", "20", "30", "40"], // 每页数量选项
        total: 0, // 数据总数
        showTotal: (total) => this.showTotal(total),
        onShowSizeChange: (current, pageSize) =>
          this.showSizeChange(current, pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.changePage(page, pageSize)
      },
      dele: false
    };
  },
    computed: {
        arrangementList() {
            return this.$store.state.enumeration['IL0010'] || {}
        },
        repaymentFrequencyList() {
            return this.$store.state.enumeration['IL0011'] || {}
        }
    },
  mounted() {
    const Country = {};
    config.countryCode.forEach((item) => {
      Country[item.key] = item.value;
    });
    this.Country = Country;
    this.getLoanDetails();
    // this.getArrangementList();
    this.setDownloadList();
    // 点击下载
    this.$EventBus.$on("breadcrumbDownload", (item) => {
      this.download(item);
    });
    this.$EventBus.$on('breadcrumbEdit', () => {
      this.intoEdit()
    })
  },
  destroyed() {
    this.$EventBus.$off("breadcrumbDownload")
    this.$EventBus.$off("breadcrumbEdit")
  },
  methods: {
    intoEdit() {
      const query = this.$route.query;
        let url = "";
        if (query.ApprovalStatus === "06") {
          url = "loanReview";
        } else {
            url = "loanEdit";
          if ((query.ApprovalStatus === "02" && query.LoanStatus === "01") ||
          query.ApprovalStatus === "01" && query.LoanStatus === "02" && !query.LoanDubilNo) {
            url = "loanReject";
          }
        }
        this.$router.push({ path: "/loan/" + url, query: query });
    },
     getCustomerDetails() {
      Customer.getCustomerDetails({ CustId: this.loanDetails.CustNo }).then(res => {
        console.log('getCustomerDetails = ', res);
        const birthdayTime = new Date(res.Birthday).getTime();
        if (birthdayTime) {
          res.age = parseInt(
            (new Date().getTime() - birthdayTime) / (1000 * 60 * 60 * 24 * 365)
          );
        } else {
          res.age = "-";
        }
        this.info = res;
      });
    },
    getBankName(name) {
      let resString = '-'
        switch (name) {
            case `ICBC`:
                resString = this.$t('message.icbc')
                break;
            case `Mizuho FG`:
                resString = this.$t('message.mizuho_FG')
                break;
            case `Wells fargo`:
                resString = this.$t('message.wells_fargo')
                break;
            case `HSBC`:
                resString = this.$t('message.hsbc')
                break;
            case `Citigroup`:
                resString = this.$t('message.citigroup')
                break;
            default:
                resString = `-`
        }
        return resString
    },
    creditCardFormat(value) {
      if (value && value.length > 5) {
        const creditNum = value.split('');
        const data = creditNum.slice((creditNum.length - 4), creditNum.length)
        const num = data.join('')
        return 'XXXX XXXX XXXX ' + num
      } else {
        return '-'
      }
    },
    GuarantorIdTypeCheck(loanDetails) {
      if (this.GuarantorMethod[loanDetails.GuarMethod] !== "No Guarantee" && this.GuarantorMethod[loanDetails.GuarMethod] !== "ไม่มีการค้ำประกัน") {
        return loanDetails.GuarIDTp === "101" ? this.$t('message.citizen_id') : this.$t('message.passport');
      } else {
        return "";
      }
    },
    showDelete(node) {
      this.dele = true;
      this.node = node;
    },
    deleteHist() {
      this.dele = false;
      Loan.deleteLoanHist({
        CustNo: this.$route.query.CustNo,
        LoanDubilNo: this.LoanDubilNo,
        TranDt: this.node.TranDt,
        TranTm: this.node.TranTm
      }).then((res) => {
        if (res.Status === "ok") {
          this.$message.success(this.$t('loan.delete_transaction_success'));
          this.getLoanTransactionHistory();
        }
      });
    },
    jump(record, edit) {
      let path;
      if (record.TxTypCd === "03") {
        if (edit === "edit") {
          path = "/loan/loanRepayment/edit";
        } else {
          path = "/loan/loanRepayment/detail";
        }
      } else if (record.TxTypCd === "04") {
        if (edit === "edit") {
          path = "/loan/loanDisbursement/edit";
        } else {
          path = "/loan/loanDisbursement/detail";
        }
      }
      this.$router.push({
        path: path,
        query: {
          ...this.$route.query,
          TranDt: record.TranDt,
          TranTm: record.TranTm,
          InstallmentAmount: this.loanDetails.InstallmentAmount,
          AvailableQuota: this.loanDetails.AvailableQuota,
          Currency: this.currencyUse
        }
      });
    },
      contactHistoryRoute(record, edit) {
      let path;
      if (record.TxTypCd === "03") {
        if (edit === "edit") {
          path = "/loan/contactHistory/edit";
        } else {
          path = "/loan/contactHistory/detail";
        }
      } else if (record.TxTypCd === "04") {
        if (edit === "edit") {
          path = "/loan/contactHistory/edit";
        } else {
           path = "/loan/contactHistory/detail";
        }
      }
      this.$router.push({
        path: path,
        query: {
          ...this.$route.query,
          TranDt: record.TranDt,
          TranTm: record.TranTm,
          InstallmentAmount: this.loanDetails.InstallmentAmount,
          AvailableQuota: this.loanDetails.AvailableQuota,
          Currency: this.currencyUse
        }
      });
      },
    newContactRecPage() {
      this.$router.push({
        path: "/loan/contactHistory/create",
        params: {
          type: 'Create'
        }
      })
    },
    addDisbursement() {
      let flag = false
      if (this.transactionHistoryList?.length > 0) {
        this.transactionHistoryList.forEach(item => {
          if (item.DisbuType === '02' && item.ApplyStatus === "01") {
            flag = true
          }
        })
      }
      if (!flag) {
        this.$router.push({
          path: '/loan/loanDisbursement/create',
          query: {
            ...this.$route.query,
            LoanProdtNo: this.loanDetails.LoanProdtNo,
            AvailableQuota: this.loanDetails.AvailableQuota,
            Currency: this.currencyUse
          }
        })
      } else {
        this.$message.warning('There is a business on the way that has not been approved')
      }
    },
    addRepayment() {
      let flag = false
      if (this.transactionHistoryList?.length > 0) {
        this.transactionHistoryList.forEach(item => {
          if (item.DisbuType === '02' && item.ApplyStatus === "01") {
            flag = true
          }
        })
      }
      if (!flag) {
        this.$router.push({
        path: '/loan/loanRepayment/create',
        query: {
          ...this.$route.query,
          LoanProdtNo: this.loanDetails.LoanProdtNo,
          InstallmentAmount: this.loanDetails.InstallmentAmount,
          Currency: this.currencyUse
        }
      })
      } else {
        this.$message.warning('There is a business on the way that has not been approved')
      }
    },
    idFormat(text, p) {
      if (text) {
        const data = text.split("");
        if (p === "cif") {
          for (let i = 1; i <= data.length - 1; i++) {
            if (i % 3 === 0) {
              data[i - 1] += "-";
            }
          }
          return data.join("");
        } else {
          const newText =
            text.slice(0, 1) +
            "-" +
            text.slice(1, 5) +
            "-" +
            text.slice(5, 10) +
            "-" +
            text.slice(10, 12) +
            "-" +
            text.slice(12, 13);
          return newText;
        }
      }
      // return text;
    },
    async getCurrencyList() {
      await CM.getOptionList().then(res => {
        this.currentcyResult = res["CM0001"]
      })
      for (const i in this.currentcyResult) {
        this.currencyList.push({ name: this.currentcyResult[i], value: i });
      }
    },
    async getProductCurrency() {
       const param = {
          LoanProdtNo: this.loanDetails.LoanProdtNo || null,
          LoanProdtVersNo: "00001"
        }
        await ProductService.getProductDetails(param).then(res => {
        this.productDetails["CurCd"] = res.CurCd;
        this.currencyList.forEach(item => {
          if (item.value === this.productDetails.CurCd) {
            this.currencyUse = item.name;
          }
        });
        });
        this.currencySpinning = false;
    },
    getLoanDetails() {
      const param = {
        MakelnAplySn: this.$route.query.MakelnAplySn,
        CustNo: this.$route.query.CustNo,
        LoanStatus: this.$route.query.LoanStatus || null
      };
      this.getCurrencyList();
      Loan.getLoanDetails(param).then((res) => {
        this.loanDetails = res;
        this.loanDetails.RepayDay = Number(this.loanDetails.RepayDay)
        console.log("getLoanDetails = ", this.loanDetails);
        this.getCustomerDetails()
        this.LoanDubilNo = res.LoanDubilNo;
        this.$emit("disabledBreadcrumbEditButton", res.LoanStatus === "10");

        this.getLoanTransactionHistory();
        this.repaymentPlanEnquire();
        if (this.LoanDubilNo) {
          this.getEditDetails(res);
        }
        if (res.LoanProdtNo) {
          this.getProductList(res);
        }
          this.getProductCurrency();
      });
    },
    getEditDetails(info) {
      Loan.getEditDetails(info.LoanDubilNo).then((res) => {
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
              this.loanDetails[k] = res.ElementNewValue
              Arr.push(k);
            }
          } else if (res.LoanElement === '5') {
            const oldlist = res.ElementOldValue.split(',')
            const newlist = res.ElementNewValue.split(',')
            Object.keys(this.obj5).forEach((val, index, arr) => {
              console.log(val, index, arr)
              if (oldlist[index] !== newlist[index]) {
                this.loanDetails[val] = newlist[index]
                Arr.push(val)
              }
            })
          } else if (res.LoanElement === '6') {
            const oldlist = res.ElementOldValue.split(',')
            const newlist = res.ElementNewValue.split(',')
            Object.keys(this.obj6).forEach((val, index) => {
              if (oldlist[index] !== newlist[index]) {
                this.loanDetails[val] = newlist[index]
                Arr.push(val)
              }
            })
          } else if (res.LoanElement === '2') {
            const oldlist = res.ElementOldValue.split(',')
            const newlist = res.ElementNewValue.split(',')
            Object.keys(this.obj2).forEach((val, index, arr) => {
              console.log(val, index, arr)
              if (oldlist[index] !== newlist[index]) {
                this.loanDetails[val] = newlist[index]
                Arr.push(val)
              }
            })
          }
          if (Arr.length > 0) {
            Arr.forEach(item => {
            try {
              this.$refs[item].querySelector("h6").style.color = "#f00";
                // this.$refs[item].$el.querySelector('h6').style.color = '#f00'
            } catch (e) {
                console.log(e)
            }
          })
          }
        }
      });
    },
    getLoanTransactionHistory() {
      console.log("LoanDubilNo: ", this.LoanDubilNo);
      if (this.LoanDubilNo) {
        const param = {
          CustNo: this.$route.query.CustNo || null,
          LoanDubilNo: this.LoanDubilNo,
          PageRecCount: this.pageSize,
          PageNo: this.pageNum
        };
        Loan.getLoanTransactionHistory(param).then((res) => {
          console.log("get Loan Transaction History res", res)
          this.transactionHistoryList = res.Records;
          this.pagination.total = res.PageTotCount;
          this.pageNum = res.PageNo;
        });
      }
    },
    repaymentPlanEnquire() {
      if (this.LoanDubilNo) {
        const param = {
          CustNo: this.$route.query.CustNo || null,
          LoanDubilNo: this.LoanDubilNo,
          PageRecCount: this.pageSize,
          PageNo: this.pageNum
        };
        Loan.repaymentPlanEnquire(param).then((res) => {
          res.Records = res.Records || [];
          const repaymentPlanItem =
            res.Records.filter((item) => item.KeprcdStusCd === "01")[0] || {};
          delete repaymentPlanItem.RepayDay;
          this.loanDetails = { ...this.loanDetails, ...repaymentPlanItem };
        });
      }
    },
    getProductList(info) {
      const param = {
        PageNo: 1,
        PageRecCount: 999
      };
      ProductService.getProductList(param).then((res) => {
        this.productList = res.Records;
        const product =
          this.productList.filter(
            (item) => item.LoanProdtNo === info.LoanProdtNo
          )[0] || {};
        this.$set(this.reveal, "productName", product.LoanProdtNm);
      });
    },
    getArrangementList() {
        const res = this.$store.state.enumeration
        this.arrangementList = res["IL0010"];
        this.repaymentFrequencyList = res["IL0011"] || {};
    },
    changePage(page, pageSize) {
      this.pageNum = page;
      this.pageSize = pageSize;
      this.getLoanTransactionHistory();
    },
    // 改变每页数量时更新显示
    showSizeChange(current, pageSize) {
      this.pageNum = current;
      this.pageSize = pageSize;
      this.getLoanTransactionHistory();
    },
    showTotal() {
      return (
        this.$t("system.totalLeft") +
        this.pagination.total +
        this.$t("system.totalRight")
      );
    },
    setDownloadList() {
      const downloadList = [];
      const authBtns = JSON.parse(sessionStorage.getItem("authBtns") || "[]");
      config.downloadList.loanDetails.forEach((item) => {
        item.auth =
          item.type === "pdf"
            ? this.$buttonConfig.Loan.DownloadFiles
            : this.$buttonConfig.Loan.SendEmail;
        if (item.auth) {
          if (authBtns.indexOf(Number(item.auth)) !== -1) {
            downloadList.push(item);
          }
        } else {
          downloadList.push(item);
        }
      });
      this.$EventBus.$emit("getDownloadList", downloadList);
    },
    download(item) {
      const param = {
        ChanEleType: item.key,
        CustNo: this.$route.query.CustNo,
        LoanDubilNo: this.LoanDubilNo
      };
      if (item.type === "email") {
        const key = "sendEmail";
        this.$message.loading({ content: this.$t("loan.sending_email"), key });
        Loan.loanSetEmail(param).then((res) => {
          if (res.Status === "ok") {
            this.$message.success({
              content: this.$t("loan.email_sent_success"),
              key,
              duration: 2
            });
          } else {
            this.$message.error({
              content: this.$t("loan.email_sent_failed"),
              key,
              duration: 2
            });
          }
        });
      } else {
        const key = "getting";
        this.$message.loading({
          content: this.$t("loan.get_pdf_download_link"),
          key,
          duration: 2
        });
        Loan.loanPDF(param)
          .then((pdfInfo) => {
            Common.downloadFile(pdfInfo.FileKey)
              .then((res) => {
                if (res.UrlStr) {
                  this.pdfUrl = res.UrlStr;
                  setTimeout(() => {
                    this.$refs.download.click();
                  });
                } else {
                  this.$message.error({
                    content: this.$t("loan.get_pdf_download_failed"),
                    key,
                    duration: 2
                  });
                }
              })
              .finally(() => {
                // this.$message.success({ content: 'Loaded!', key, duration: 2 });
              });
          })
          .catch(() => {
            this.$message.error({
              content: this.$t("loan.get_pdf_download_failed"),
              key,
              duration: 2
            });
          });
      }
    },
    jumpLoanRepaymentPlan() {
      this.$router.push({
        path: "/loan/loanRepaymentPlan",
        query: {
          CustNo: this.$route.query.CustNo,
          LoanDubilNo: this.LoanDubilNo
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
#LoanDetails{
  /deep/ .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
    padding: 3px 16px;
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
    color: #f5222d;
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
    margin-bottom: 24px;
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

  .my-card {
    margin-bottom: 24px;
    position: relative;
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

  span.click-line-text {
    cursor: pointer;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #1890ff;
    margin-bottom: 0;
  }

  .break-all {
    word-break: break-all;
  }

  .redtext{
    color:red;
    white-space: nowrap;
  }
  .date{
    white-space: nowrap;
  }

  .table-action {
    display: flex;
    justify-content: flex-start;
    .table-action-line {
      width: 1px;
      height: 14px;
      background-color: #d8d8d8;
      position: relative;
      top: 10px;
      margin: 0 6px;
    }
  }
  /deep/ .table-button-line.ant-btn {
    padding: 0 !important;
  }
  .edit-button {
    display: flex;
    .ant-btn-link {
      padding: 0;
    }
  }
  /deep/ .ant-table.ant-table-scroll-position-left{
    overflow-x: auto;
  }
}

</style>
