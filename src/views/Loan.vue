<template>
  <div style="padding: -24px">
    <a-tabs :active-key="tabKey" @change="changeTabs">
      <a-tab-pane :key="1" :tab="$t('loan.loan_acc')">
        <div class="loan">
          <SearchModule
            :date-select="searchInputSelect"
            :select-type="selectType"
            :show-input="false"
            @query="query"
            @change="selectChange"
          />
          <a-button
            v-auth="$buttonConfig.Loan.NewLoan"
            type="primary"
            style="margin-bottom: 26px"
            icon="plus"
            @click="() => this.$router.push('/loan/loanCreate')"
          >{{ $t('loan.new_loan') }}
          </a-button>
          <a-table
            :columns="columns"
            :data-source="loanList"
            row-key="CrdtAplyNo"
            :pagination="pagination"
            :loading="tableLoading"
          >
            <div slot="LoanReferenceNumber" slot-scope="itemText, record">
              <div class="flex">
                <div class="group-content">
                  <p>
                    {{ record.LoanContNo === '' ? '-' : record.LoanContNo }}
                  </p>
                  <p>
                    {{ record.MakelnAplySn === '' ? '-' : record.MakelnAplySn }}
                  </p>
                  <p>
                    {{ statusEnum.status[itemText] === '' ? '-' : statusEnum.status[itemText] }}
                  </p>
                </div>
              </div>
            </div>
            <div slot="AmountUSD" slot-scope="itemText, record">
              <p style="color: #36cfc9">{{ record.CredQta }}</p>
              <p>{{ $lib.calcNum(itemText * 100) }}%</p>
            </div>
            <div slot="Cif" slot-scope="itemText, record">
              <span>{{ record.BrwerCustNo.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1-$2-$3-$4") }}</span>
            </div>
            <div slot="MaturityDate" slot-scope="itemText, record">
              <p>
                <a-icon style="margin-right: 10px" type="calendar" />
                {{ record.ActlMakelnDt }}
              </p>
              <p>
                <a-icon style="margin-right: 10px" type="calendar" />
                {{ record.MatrDt }}
              </p>
            </div>
            <div slot="Action" slot-scope="item" class="table-action">
              <a-button
                v-auth="$buttonConfig.Loan.LoanDetail"
                type="link"
                class="table-button-line"
                @click="intoDetails(item)"
              >
                {{ $t('message.view_btn') }}
              </a-button>
              <div v-if="item.MakelnAplyStusCd !== '10'" class="edit-button-list">
                <!--审批-->
                <div v-if="item.ApprovalStatus === '06'" class="edit-button-main">
                  <!--放款审批-->
                  <div v-if="item.MakelnAplyStusCd === '01'" v-auth="$buttonConfig.Loan.EditNewLoanDetail" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                  <!--修改审批-->
                  <div v-if="item.MakelnAplyStusCd === '02'" v-auth="$buttonConfig.Loan.EditLoanRequested" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                </div>
                <!--修改-->
                <div v-if="item.ApprovalStatus === '01'" class="edit-button-main">
                  <div v-auth="$buttonConfig.Loan.EditLoanAgreed" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '03' || item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                </div>
                <!--修改退回-->
                <div v-if="item.ApprovalStatus === '02'" class="edit-button-main">
                  <div v-auth="$buttonConfig.Loan.EditLoanReturned" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                </div>
              </div>

            </div>

            <span slot="Status" slot-scope="text">{{ statusEnum.status[text] }}</span>
            <span slot="ProductType" slot-scope="text">{{
              statusEnum.ProductType[text]
            }}</span>
            <span slot="Approval" slot-scope="text">
              <span v-if="text !== '06'" :class="text === '01' ? 'great' : 'error'">{{
                statusEnum.approval[text]
              }}</span>
              <span v-else class="warning">{{ statusEnum.approval[text] }}</span>
            </span>
            <!--      <span slot="LoanReferenceNumber" slot-scope="text,item">-->
            <!--        <p>{{ item.LoanContNo || '-' }}</p>-->
            <!--        <p>{{ item.MakelnAplySn || '-' }}</p>-->
            <!--      </span>-->
          </a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="Collection">
        <a-row type="flex">
          <a-col :flex="1" :span="1">
            <div class="card">
              <p class="card-header">Overdue Amount Last 7 Days</p>
              <h1>{{ currencyCal(totalOveralAmount) }}</h1>
            </div>
          </a-col>
          <a-col :flex="2" :offset="1" class="card">
            <a-row type="flex" justify="space-between">
              <p> Task Dashboard</p>
              <p> Total Active Loan Account ({{ accNumberSum }} accounts)</p>
            </a-row>
            <a-row>
              <StackedProgressBar height style="margin-top: 0;" label-location="" :list="values" :striped="true" />
            </a-row>
            <a-row type="flex" class="t-content">
              <div v-for="task in collectionsSumm" :key="task.color">
                <span class="dot-tag" :style="{ backgroundColor: task.color }" />
                <span>{{ TranStatus[task.TranStatus] }}, {{ CollTaskDlwthStusCd[task.CollTaskDlwthStusCd] }} <span style="fontWeight: bold"> {{ task.Percent }} % </span> ({{ task.TotCount }} accounts)</span>
              </div>
            </a-row>
          </a-col>
        </a-row>
        <div style="marginTop: 1rem;" class="loan">
          <SearchModule
            :date-select="searchInputCollectionSelect"
            :select-type="selectType"
            :show-input="false"
            @query="queryCollections"
            @change="selectCollectionsChange"
          />
          <a-table
            :columns="columnsCollections"
            :data-source="loanListCollections"
            row-key="PromisePayDt"
            :pagination="paginationCollection"
            :loading="tableCollectLoading"
          >
            <div slot="TranStatus" slot-scope="itemText, record">
              <div class="flex">
                <div class="group-content">
                  <p>
                    {{ record.LoanDubilNo === '' ? '-' : record.LoanDubilNo }}
                  </p>
                </div>
                <p>
                  {{ TranStatus[record.TranStatus] === '' ? '-' : TranStatus[record.TranStatus] }}
                </p>
              </div>
            </div>
            <div slot="Int" slot-scope="itemText, record">
              <p style="color: #36cfc9">{{ record.LoanAmt }}</p>
              <p style="text-aligh: right;">{{ $lib.calcNum(itemText * 100) }}%</p>
            </div>
            <div slot="PromisePayDt" slot-scope="itemText, record">
              <p>
                <a-icon style="margin-right: 10px" type="calendar" />
                {{ record.CrDuetDt }}
              </p>
              <p>
                <a-icon style="margin-right: 10px" type="calendar" />
                {{ record.PromisePayDt }}
              </p>
            </div>
            <div slot="Cw" slot-scope="itemText, record">
              <p :class="colorUserStatus(record.CollTaskDlwthStusCd)">
                {{ CollTaskDlwthStusCd[record.CollTaskDlwthStusCd] === ''? '-': CollTaskDlwthStusCd[record.CollTaskDlwthStusCd] }}
              </p>
              <p>{{record.TaskDate}}</p>
              <p>{{ record.CorgTaskExampId === '' ? '-' : record.CorgTaskExampId }}</p>
            </div>
            <div slot="Action" slot-scope="item" class="table-action">
              <a-button
                v-auth="$buttonConfig.Loan.LoanDetail"
                type="link"
                class="table-button-line"
                @click="intoCollectionsDetails(item)"
              >
                {{ $t('message.view_btn') }}
              </a-button>
              <div v-if="item.MakelnAplyStusCd !== '10'" class="edit-button-list">
                <!--审批-->
                <div v-if="item.ApprovalStatus === '06'" class="edit-button-main">
                  <!--放款审批-->
                  <div v-if="item.MakelnAplyStusCd === '01'" v-auth="$buttonConfig.Loan.EditNewLoanDetail" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                  <!--修改审批-->
                  <div v-if="item.MakelnAplyStusCd === '02'" v-auth="$buttonConfig.Loan.EditLoanRequested" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                </div>
                <!--修改-->
                <div v-if="item.ApprovalStatus === '01'" class="edit-button-main">
                  <div v-auth="$buttonConfig.Loan.EditLoanAgreed" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '03' || item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                </div>
                <!--修改退回-->
                <div v-if="item.ApprovalStatus === '02'" class="edit-button-main">
                  <div v-auth="$buttonConfig.Loan.EditLoanReturned" class="edit-button">
                    <div class="table-action-line" />
                    <a-button type="link" :disabled="item.MakelnAplyStusCd === '04'" @click="intoDetailsEdit(item)">{{ $t('message.edit_btn') }}</a-button>
                  </div>
                </div>
              </div>

            </div>
            <span slot="Approval" slot-scope="text">
              <span v-if="text !== '06'" :class="text === '01' ? 'great' : 'error'">{{
                text === '' ? '-' : statusEnum.approval[text]
              }}</span>
              <span v-else class="warning">{{ statusEnum.approval[text] }}</span>
            </span>
          </a-table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import SearchModule from "@/components/SearchModule";
import StackedProgressBar from 'vue-stacked-progress-bar'
import Loan from "@/service/loanService";

export default {
  name: "Loan",
  filters: {
    doubleFilter(e) {
      return (e * 100).toFixed(2) + "%";
    }
  },
  components: {
    SearchModule,
    StackedProgressBar
  },
  data() {
    return {
      buttons: sessionStorage.getItem("authBtns"),
      values: [],
      labelLocation: 'outside',
      loanList: [],
      loanListCollections: [],
      taskDashboardItem: [
        {
          name: "Fully Paid",
          percent: "44.12%",
          color: '#001529',
          totalAcc: "1,157"
        },
        {
          name: "Partially Paid, Done",
          percent: "4.36%",
          color: '#228EF9',
          totalAcc: "1,157"
        },
        {
           name: "Partially Paid, Awaiting",
          percent: "7.70%",
          color: '#0050B3',
          totalAcc: "184"
        },
         {
           name: "Unpaid, Done",
          percent: "28.16%",
          color: '#FFAB2F',
          totalAcc: "672"
        },
         {
           name: "Unpaid, Awaiting",
          percent: "15.66%",
         color: '#FEDE43',
          totalAcc: "374"
        }
      ],
      columns: [
        {
          title: this.$t('loan.loan_reference_number'),
          dataIndex: "LoanContNo",
          class: "three-line b",
          children: [
              {
                  class: "three-line-second",
                  title: this.$t('loan.application_number'),
                  dataIndex: 'MakelnAplySn',
                  scopedSlots: { customRender: 'LoanReferenceNumber' }
              },
              {
                  class: "three-line-filter",
                  title: this.$t('loan.loan_status'),
                  dataIndex: "MakelnAplyStusCd",
                  scopedSlots: { customRender: "Status" },
            filters: [
            { text: this.$t('loan.request'), value: '01' },
            { text: this.$t('loan.approved'), value: '02' },
            { text: this.$t('loan.denied'), value: '03' },
            { text: this.$t('loan.closed'), value: '10' }
            ],
            onFilter: (value, record) => record.MakelnAplyStusCd.indexOf(value) === 0
                }
            ]
        },
        {
          title: this.$t('message.cif'),
          width: 100,
          dataIndex: "BrwerCustNo",
          scopedSlots: { customRender: "Cif" }
        },
        {
          title: this.$t('product.product_type'),
          dataIndex: "LoanProdtTypeCd",
          width: 100,
          scopedSlots: { customRender: "ProductType" }
        },
        {
          title: this.$t('loan.loan_amount_USD'),
          dataIndex: "CredQta",
          children: [
            {
              title: this.$t('loan.interest_rate'),
              dataIndex: "ExecIntrt",
              class: "amount",
              sorter: (a, b) => a.ExecIntrt - b.ExecIntrt,
              scopedSlots: { customRender: "AmountUSD" }
            }
          ],
          sorter: (a, b) => {
          return a.CredQta - b.CredQta;
          }
        },
        {
          title: this.$t('loan.drawdown_date'),
          dataIndex: "ActlMakelnDt",
          width: 300,
          key: "EffectiveDate",
          children: [
            {
              title: this.$t('loan.maturity_date'),
              dataIndex: "MatrDt",
              height: 40,
              sorter: (a, b) => a.length - b.length,
              scopedSlots: { customRender: "MaturityDate" }
            }
          ],
         sorter: (a, b) => {
            const sor =
              this.$moment(a.ActlMakelnDt, "yyy-MM-DD") -
              this.$moment(b.ActlMakelnDt, "yyy-MM-DD");
            if (sor > 0) return 1;
            if (sor === 0) return 0;
            if (sor < 0) return -1;
          }
        },
        {
          title: this.$t('message.maker_checker_status'),
          dataIndex: "ApprovalStatus",
          scopedSlots: { customRender: "Approval" },
          filters: [
          { text: this.$t('message.agreed'), value: '01' },
          { text: this.$t('message.returned'), value: '02' },
          { text: this.$t('message.end'), value: "03" },
          { text: this.$t('message.abstain'), value: "04" },
          { text: this.$t('message.reject'), value: "05" },
          { text: this.$t('message.pending'), value: '06' }
          ],
            onFilter: (value, record) => record.ApprovalStatus.indexOf(value) === 0

        },
        {
          title: this.$t("Loan.action"),
          scopedSlots: { customRender: "Action" },
          width: 100
        }
      ],
      columnsCollections: [
       {
           class: "three-line-second",
                  title: this.$t('loan.loan_reference_number'),
                  dataIndex: 'LoanDubilNo',
                  children: [
                     {
                  title: this.$t('loan.transaction_status'),
                  dataIndex: "TranStatus",
                                scopedSlots: { customRender: 'TranStatus' },

            filters: [
            { text: this.$t('loan.fully_paid'), value: '01' },
            { text: this.$t('loan.partial_paid'), value: '02' },
            { text: this.$t('loan.un_paid'), value: '03' }
            ],
            onFilter: (value, record) => record.TranStatus.indexOf(value) === 0
                }
                  ]
        },
        {
          title: this.$t('loan.loan_amount_USD'),
          dataIndex: "LoanAmt",
          width: 300,
          children: [
            {
              title: this.$t('loan.interest_rate'),
              dataIndex: "Int",
              sorter: (a, b) => a.Int - b.Int,
              scopedSlots: { customRender: "Int" }
            }
          ],
          sorter: (a, b) => {
          return a.LoanAmt - b.LoanAmt;
          }
        },
        {
          title: this.$t('loan.current_due_date'),
          dataIndex: "CrDuetDt",
          width: 300,
          key: "EffectiveDate",
          children: [
            {
              title: this.$t('loan.promise_to_pay_date'),
              dataIndex: "PromisePayDt",
              height: 40,
                    sorter: (a, b) => {
            const sor =
              this.$moment(a.PromisePayDt, "yyy-MM-DD") -
              this.$moment(b.PromisePayDt, "yyy-MM-DD");
            if (sor > 0) return 1;
            if (sor === 0) return 0;
            if (sor < 0) return -1;
          },
              scopedSlots: { customRender: "PromisePayDt" }
            }
          ],
         sorter: (a, b) => {
            const sor =
              this.$moment(a.CrDuetDt, "yyy-MM-DD") -
              this.$moment(b.CrDuetDt, "yyy-MM-DD");
            if (sor > 0) return 1;
            if (sor === 0) return 0;
            if (sor < 0) return -1;
          }
        },
        {
          title: this.$t('loan.task_status'),
           class: "three-line-second",
             dataIndex: "CollTaskDlwthStusCd",
          children: [
            {
              title: this.$t('loan.task_date'),
               class: "three-line-second",
                    dataIndex: "TaskDate",
                     scopedSlots: { customRender: "Cw" }
            },
            {
              title: this.$t('message.user_id'),
              dataIndex: "CorgTaskExampId",
              class: "three-line-second",
              scopedSlots: { customRender: "Cw" }
            }
          ]
        },
        {
          title: this.$t('message.maker_checker_status'),
          dataIndex: "MakeCheckStatus",
          scopedSlots: { customRender: "Approval" },
          filters: [
          { text: this.$t('message.agreed'), value: '01' },
          { text: this.$t('message.returned'), value: '02' },
          { text: this.$t('message.end'), value: "03" },
          { text: this.$t('message.abstain'), value: "04" },
          { text: this.$t('message.reject'), value: "05" },
          { text: this.$t('message.pending'), value: '06' }
          ],
            onFilter: (value, record) => record.ApprovalStatus.indexOf(value) === 0

        },
        {
          title: this.$t("Loan.action"),
          scopedSlots: { customRender: "Action" },
          width: 100
        }
      ],
      searchInputSelect: [
        {
          value: "LoanContNo",
          name: this.$t('loan.loan_reference_number'),
          maxLength: 15,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp("^[0-9]+$"),
                  type: "string",
                  message: this.$t('loan.enter_only_number')
                },
                {
                  required: true,
                  message: this.$t('loan.warning_loan_reference_number'),
                  min: 1,
                  max: 29
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: true
          }
        },
         {
          value: "MakelnAplySn",
          name: this.$t('loan.loan_application_number'),
          maxLength: 15,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('loan.warning_loan_reference_number'),
                  min: 1,
                  max: 29
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: false
          }
        },
        {
          value: "ApplicationDate",
          name: this.$t('loan.loan_application_date'),
          customRules: {
            noSymbol: true,
            noLetter: false
          }
        },
        {
          name: this.$t('message.cif'),
          value: "BrwerCustNo",
          inputLength: 15,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('message.input_max_12_digits'),
                  max: 15,
                  min: 12
                }
              ]
            }
          ],
            customRules: {
              noSymbol: true,
              ignoreSymbol: ["-"],
              noLetter: true
            }
        },
        {
          value: "BrwerNm",
          name: this.$t('customer.customer_name'),
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('customer.warning_customer_name'),
                  max: 80,
                  min: 1
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            ignoreSymbol: ["&", "/", ".", "()", "-", ",", "'"],
            noLetter: false,
            noNumber: true
          }
        },
        {
          name: this.$t('message.id_certificate'),
          value: "CitizenID",
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('message.input_max_13_digits'),
                  max: 17,
                  min: 17
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: true
          }
        },
        {
          value: "Passport",
          name: this.$t('message.passport_id'),
          inputLength: 10,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp("^[0-9 a-zA-Z]+$"),
                  type: "string",
                  message: this.$t('message.input_only_string')
                },
                {
                  required: true,
                  message:
                    this.$t('message.passport_certificate_id_max_lenght'),
                  max: 10,
                  min: 1
                },
                { min: 1 }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: false
          }
        } //
      ],
      searchInputCollectionSelect: [
        {
          value: "LoanContNo",
          name: this.$t('loan.loan_reference_number'),
          maxLength: 15,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp("^[0-9]+$"),
                  type: "string",
                  message: this.$t('loan.enter_only_number')
                },
                {
                  required: true,
                  message: this.$t('loan.warning_loan_reference_number'),
                  min: 1,
                  max: 29
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: true
          }
        },
         {
          value: "UserId",
          name: this.$t('message.user_id'),
          maxLength: 15,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('loan.warning_loan_reference_number'),
                  min: 1,
                  max: 29
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: false
          }
        },
        {
          name: this.$t('message.cif'),
          value: "CustNo",
          inputLength: 15,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('message.input_max_12_digits'),
                  max: 15,
                  min: 12
                }
              ]
            }
          ],
            customRules: {
              noSymbol: true,
              ignoreSymbol: ["-"],
              noLetter: true
            }
        },
        // {
        //   value: "ApplicationDate",
        //   name: this.$t('loan.loan_application_date'),
        //   customRules: {
        //     noSymbol: true,
        //     noLetter: false
        //   }
        // },
        {
          value: "CustName",
          name: this.$t('customer.customer_name'),
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('customer.warning_customer_name'),
                  max: 80,
                  min: 1
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            ignoreSymbol: ["&", "/", ".", "()", "-", ",", "'"],
            noLetter: false,
            noNumber: true
          }
        },
        {
          name: this.$t('loan.current_due_date'),
          value: "CurrentDueDt",
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('message.input_max_13_digits'),
                  max: 17,
                  min: 17
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: true
          }
        },
        {
          value: "PromispayDt",
          name: this.$t('loan.promise_to_pay_date'),
          inputLength: 10,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp("^[0-9 a-zA-Z]+$"),
                  type: "string",
                  message: this.$t('message.input_only_string')
                },
                {
                  required: true,
                  message:
                    this.$t('message.passport_certificate_id_max_lenght'),
                  max: 10,
                  min: 1
                },
                { min: 1 }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: false
          }
        },
                {
          name: this.$t('loan.task_status'),
          value: "CollTaskDlwthStusCd",
          rules: [
            "inputValue",
            {
              rules: [
                {
                  required: true,
                  message: this.$t('message.input_max_13_digits'),
                  max: 17,
                  min: 17
                }
              ]
            }
          ],
          customRules: {
            noSymbol: true,
            noLetter: true
          }
        }
      ],
      statusEnum: {
        status: {
          "01": this.$t('loan.request'), // 进放款审批
          "02": this.$t('loan.approved'), // 进修改审批
          "03": this.$t('loan.denied'),
          "10": this.$t('loan.closed')
        },
        approval: {
          "01": this.$t('message.agreed'),
          "02": this.$t('message.returned'),
          "03": this.$t('message.end'),
          "04": this.$t('message.abstain'),
          "05": this.$t('message.reject'),
          "06": this.$t('message.pending')
        },
        ProductType: {
          "01": this.$t('message.personal_micro_loan')
        }
      },
      queryParam: {},
      selectType: "dateInput",

      pageNum: 1,
      tabKey: 1,
      pageSize: 10,
      pageColSize: 10,
      tableLoading: false,
      tableCollectLoading: false,
      pagination: {
        defaultCurrent: 1, // defaultCurrent
        showSizeChanger: true, // 显示可改变每页数量
        showQuickJumper: true, // 是否可以快速跳转至某页
        pageSizeOptions: ["10", "20", "30", "40"], // 每页数量选项
        total: 0, // 数据总数
        showTotal: total => this.showTotal(total),
        onShowSizeChange: (current, pageSize) =>
          this.showSizeChange(current, pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.changePage(page, pageSize)
      },
      paginationCollection: {
        defaultCurrent: 1, // defaultCurrent
        showSizeChanger: true, // 显示可改变每页数量
        showQuickJumper: true, // 是否可以快速跳转至某页
        pageSizeOptions: ["10", "20", "30", "40"], // 每页数量选项
        total: 0, // 数据总数
        showTotal: total => this.showTotal(total),
        onShowSizeChange: (current, pageSize) =>
          this.showCollectionSizeChange(current, pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.changeCollectionPage(page, pageSize)
      },
      collectionsSumm: [],
      totalOveralAmount: 0,
      CollTaskDlwthStusCd: {
        "01": "Awaiting",
        "09": "Done",
        "16": "Cancelled"
      },
      tranColor: {
        "01": "Fully Paid",
        "02": "Partial Paid",
        "03": "Unpaid"
      },
      TranStatus: {
        "01": "Fully Paid",
        "02": "Partial Paid",
        "03": "Unpaid"
      },
      accNumberSum: 0
    };
  },
  computed: {},
  beforeMount() {
        // this.tableLoading = true;
  },
  mounted() {
    // if (this.loanAuth) {
    //     this.columns.push({
    //         title: this.$t('Loan.action'),
    //         scopedSlots: { customRender: 'Action' },
    //         width: 100
    //     });
    // }
    // this.getLoanList()
    const userInfoStr = localStorage.getItem('userInfo') || "{}";
    const userInfo = JSON.parse(userInfoStr) || {};
    const OrgNo = userInfo.belong[0].orgId;
    console.log("🚀 ~ file: Loan.vue ~ line 690 ~ getCollectionSummInfo ~ OrgId", OrgNo)
    const param = {
      OrgNo
    }
    this.getTotalOverdueAmount(param);
    this.getCollectionSummInfo(param);
  },
  methods: {
    colorUserStatus(status) {
      if (status === "01") {
        return 'warning'
      } else if (status === '09') {
        return 'great'
      } else if (status === '16') {
        return 'error';
      }
    },
    getTotalOverdueAmount(param) {
      Loan.getTotalOverdueAmount(param).then((res) => {
        if (typeof res.OverdueAmt === "number") {
          this.totalOveralAmount = res.OverdueAmt
          console.log('total', res)
        }
      });
    },
    currencyCal(val) {
      return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(val);
    },
    changeTabs(e) {
      console.log("🚀 ~ file: Loan.vue ~ line 933 ~ changeTabs ~ e", e)
      this.tabKey = e;
      if (e !== 2) {
      this.getReportName();
      this.searchConfig.inputSelect[0].list = [];
      this.searchConfig.dateSelect[0].list = [];
      this.disbursementData.data = [];
      this.repaymentData.data = [];
      this.otherData.data = [];
      this.pageNum = 0;
      this.totalCount = 0;
      this.pagination.total = 0;
      }
    },
    getCollectionSummInfo(param) {
      Loan.CollectionSummaryInfo(param).then((res) => {
        if (res.Records.length > 0) {
          this.collectionsSumm = res.Records;
          for (let i = 0; i < this.collectionsSumm.length; i++) {
            this.collectionsSumm[i]["color"] = this.taskDashboardItem[i].color;
            // { text: '20.TL', percentage: 30, striped: false, color: '#001529' },
            this.values.push({
              text: this.CollTaskDlwthStusCd[this.collectionsSumm[i]["CollTaskDlwthStusCd"]],
              percentage: this.collectionsSumm[i]["Percent"],
              color: this.collectionsSumm[i]["color"],
              striped: false
            })
          }
          console.log('cco', this.collectionsSumm)
          this.totalAcc();
        }
      });
    },
    query(e) {
      this.queryParam = e || {};
      if (Object.keys(this.queryParam).length > 0) {
        this.getLoanList();
      }
    },
    queryCollections(e) {
      console.log('oox');
      this.queryParam = e || {};
      if (Object.keys(this.queryParam).length > 0) {
        this.getLoanListCollections();
      }
    },
    getLoanList(pageNum) {
      this.tableLoading = true;
      const param = {
        // StartPayPlatDate: null, // 1
        // EndPayPlatDate: null,
        // MakelnAplySn: null, // 0
        // BrwerNm: null, // 3
        // LoanContNo: null,
        // MakelnAplyStusCd: null,
        // IndvCrtfTypCd: null,
        // CrtfNo: null, // 4
        // BrwerCustNo: null, // 2
        PageNo: pageNum || 1,
        PageRecCount: this.pageSize
      };
      console.log('this.queryParam', this.queryParam);

      if (this.queryParam.dateSelected === "CitizenID") {
        param.CrtfNo = this.queryParam.inputValue;
        param.IndvCrtfTypCd = "101";
      } else if (this.queryParam.dateSelected === "Passport") {
        param.CrtfNo = this.queryParam.inputValue;
        param.IndvCrtfTypCd = "104";
      } else if (this.queryParam.dateSelected === "ApplicationDate") {
        param.StartPayPlatDate = new Date(this.queryParam.startTime).format(
          "yyyy-MM-dd"
        );
        param.EndPayPlatDate = new Date(this.queryParam.endTime).format(
          "yyyy-MM-dd"
        );
      } else {
        if (this.queryParam.dateSelected) {
          param[this.queryParam.dateSelected] = this.queryParam.inputValue;
        }
      }
      console.log('param', param);
      Loan.getLoanList(param)
        .then(res => {
          this.loanList = res.Records;
          console.log("🚀 ~ file: Loan.vue ~ line 728 ~ getLoanList ~ this.loanListCollections", this.loanListCollections)
          this.pagination.total = res.PageTotCount;
          this.pageNum = res.PageNo;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    totalAcc() {
     this.accNumberSum = this.collectionsSumm.reduce((acc, curr) => { return acc + curr.TotCount }, 0)
    },
    getLoanListCollections(pageNum) {
      this.tableCollectLoading = true;
      const param = {
        // StartPayPlatDate: null, // 1
        // EndPayPlatDate: null,
        // MakelnAplySn: null, // 0
        // BrwerNm: null, // 3
        // LoanContNo: null,
        // MakelnAplyStusCd: null,
        // IndvCrtfTypCd: null,
        // CrtfNo: null, // 4
        // BrwerCustNo: null, // 2
        PageNo: pageNum || 1,
        PageRecCount: this.pageColSize
      };
      console.log('this.queryParam', this.queryParam);

        if (this.queryParam.dateSelected === 'LoanContNo') {
          console.log("🚀 ~ file: Loan.vue ~ line 1043 ~ getLoanListCollections ~ this.queryParam.dateSelected", this.queryParam.dateSelected)
          param["LoanDubilNo"] = this.queryParam.inputValue
        }
       if (this.queryParam.dateSelected === "CurrentDueDt" || this.queryParam.dateSelected === "PromispayDt") {
        param.InqBeginDt = new Date(this.queryParam.startTime).format(
          "yyyy-MM-dd"
        );
        param.InqEndDt = new Date(this.queryParam.endTime).format(
          "yyyy-MM-dd"
        );
      } else {
        if (this.queryParam.dateSelected && this.queryParam.dateSelected !== 'LoanContNo') {
          param[this.queryParam.dateSelected] = this.queryParam.inputValue;
        }
      }
      console.log('param', param);
      Loan.collectionListQuery(param)
        .then(res => {
          this.loanListCollections = res.Records;
        console.log("🚀 ~ file: Loan.vue ~ line 998 ~ getLoanListCollections ~ res", res)
          this.loanListCollections = res.CollTasks;
          this.paginationCollection.total = res.PageTotCount;
          this.pageNum = res.PageNo;
        })
        .finally(() => {
          this.tableCollectLoading = false;
        });
    },
    selectChange(e) {
      console.log(e);
      if (e.dateSelected) {
        if (e.dateSelected !== "ApplicationDate") {
          this.selectType = "dateInput";
        } else {
          this.selectType = "";
        }
      }
    },
    selectCollectionsChange(e) {
      if (e.dateSelected) {
        if (e.dateSelected !== "CurrentDueDt" && e.dateSelected !== "PromispayDt") {
          this.selectType = "dateInput";
        } else {
          this.selectType = "";
        }
      }
    },
    changePage(page) {
      console.log(page);
      this.getLoanList(page);
    },
    changeCollectionPage(page) {
      console.log(page);
      this.getLoanListCollections(page);
    },
    // 改变每页数量时更新显示
    showSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.getLoanList();
    },
    showCollectionSizeChange(current, pageSize) {
      this.pageColSize = pageSize;
      this.getLoanListCollections();
    },
    showTotal() {
      return (
        this.$t("system.totalLeft") +
        this.pagination.total +
        this.$t("system.totalRight")
      );
    },
    showCollectionTotal() {
      return (
        this.$t("system.totalLeft") +
        this.paginationCollection.total +
        this.$t("system.totalRight")
      );
    },
    jump(url, item) {
      this.$router.push({
        path: "/loan/" + url,
        query: {
          MakelnAplySn: item.MakelnAplySn,
          CustNo: item.BrwerCustNo,
          LoanStatus: item.MakelnAplyStusCd,
          ApprovalStatus: item.ApprovalStatus,
          LoanDubilNo: item.LoanContNo,
          CustId: item.BrwerCustNo
        }
      });
    },
    cJump(url, item) {
      console.log("🚀 ~ file: Loan.vue ~ line 1128 ~ cJump ~ item", item)
      this.$router.push({
        path: "/loan/" + url,
        query: {
          MakelnAplySn: item.MakelnAplySn,
          CustNo: item.CustNo,
          LoanStatus: item.LoanStatus,
          ApprovalStatus: item.ApprovalStatus,
          LoanDubilNo: item.LoanDubilNo,
          CustId: item.BrwerCustNo
        }
      });
    },
    intoDetails(e) {
      console.log('intoDetails', e);
      this.jump("loanDetails", e);
    },
    intoCollectionsDetails(e) {
      console.log('intoDetails', e);
      this.cJump("loanDetails", e);
    },
    intoDetailsEdit(e) {
      if (e.ApprovalStatus === "06") {
        this.jump("loanReview", e);
      } else {
        let url = "loanEdit";
        if ((e.ApprovalStatus === "02" && e.MakelnAplyStusCd === "01") || e.ApprovalStatus === "01" && e.MakelnAplyStusCd === "02" && !e.LoanContNo) {
          url = "loanReject";
        }
        console.log('url', url);
        this.jump(url, e);
      }
    }
  }
};
</script>

<style scoped lang="less">
.t-content{
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 90px;
}
/deep/ .amount {
  text-align: right !important;
}
/deep/ .ant-table-thead > tr > th .ant-table-header-column {
  white-space: nowrap !important;
}
.three-line {
  white-space: nowrap !important;
}
/deep/ .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters {
  white-space: nowrap;
}
/deep/ .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-sorters {
  white-space: nowrap;
}
/deep/ .main{
  // padding: 10px;
  height: 12px !important;
  margin-top: 2px !important;
}
.dot-tag{
  margin-right: 10px;
     padding: 5px;
    display: inline-flex;
    background-color: red;
    width: 10px;
}
.card{
  background: white;
  padding: 20px;
  border-radius: 10px;
  height: 150px;

  h1{
    font-size: 25px;
  line-height: 6px;

  }
}
/deep/ .ant-tabs-bar {
  background-color: #ffffff;
  padding-left: 6px;
  padding-right: 6px;
  box-sizing: border-box;
  margin: 0;
}

/deep/ .ant-tabs-tabpane {
  padding: 24px;
  box-sizing: border-box;
}

/deep/ .ant-tabs-tab {
  font-family: PingFangSC;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: center;
}
/deep/ .ant-table-row-cell-break-word {
  white-space: nowrap !important;
}
/deep/ .ant-table-thead > tr > th .anticon-filter, .ant-table-thead > tr > th .ant-table-filter-icon {
  right: auto;
}
/deep/ .three-line-second {
  text-align: left !important;
  display: block;
  padding-bottom: 1px;
  border-bottom-color: white !important;
}
/deep/ .three-line-filter{
 text-align: left !important;
  display: block;
  padding: 8px 16px;
  border-top-color: white !important;
}
td .three-line {
  background-color: blue !important;
}
/deep/ .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
  padding: 2px 15px;
}
/deep/ td  .three-line{
background-color: blue !important;
}
/deep/ .three-line{
  text-align: left !important;
  display: block;
  border-top-color: white !important;

}
/deep/ .ant-table-thead{

border-bottom-color: white;
}
.should {
  background-color: #fff;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  /deep/ .table-button-line.ant-btn {
    padding: 0 !important;
  }

  .should-item {
    width: 33.33%;
    height: 106px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .should-item-line:after {
    display: block;
    content: " ";
    position: absolute;
    right: 0;
    width: 1px;
    height: 58px;
    background-color: #e8e8e8;
    top: 24px;
  }

  .should-title {
    height: 22px;
    font-family: PingFangSC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 4px;
  }

  .should-number {
    height: 32px;
    font-family: PingFangSC;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
  }

  .should-number-blue {
    color: #1890ff;
  }
}

.loan {
  background-color: #fff;
  min-height: 240px;
  padding: 26px 32px;
  box-sizing: border-box;

  /deep/ .table-button-line.ant-btn {
    padding: 0 !important;
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
}
.edit-button {
  display: flex;
  .ant-btn-link {
    padding: 0;
  }
}
.great {
  color: #3dbd7d;
}

.warning {
  color: #faad14;
}

.error {
  color: #f5222d;
}
</style>
