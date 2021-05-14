<template>
  <div style="padding: -24px">
    <a-tabs :active-key="tabKey" @change="changeTabs">
      <a-tab-pane :key="1" :tab="$t('history.product_characteristic')">
        <a-spin class="loan" :spinning="isSpinning">
          <ProductSearchModule
            v-if="tabKey == 1"
            :input-select="productData.inputSelect"
            :date-select="productData.dateSelect"
            @query="getProductHistoryList"
          />
          <a-table
            v-if="tabKey === 1"
            :pagination="pagination"
            :loading="loading"
            :columns="productData.columns"
            :data-source="productData.data"
          >
            <div slot="ChgAplyDt" slot-scope="itemText, record">
              {{ itemText }} {{ record.chgAplyTm }}
            </div>
            <div slot="itemValue" slot-scope="itemText, record">
              <div v-if="record.prodElement === 'ProdtStus'">
                {{ itemText | filterProdtStatus }}
              </div>
              <div v-else-if="record.prodElement === 'filterLoanGuarManrCd'">
                {{ itemText | filterLoanGuarManrCd }}
              </div>
              <div v-else-if="record.prodElement === 'LoanProdtTypCd'">
                {{ itemText | filterLoanProdtTypCd }}
              </div>
              <div v-else-if="record.prodElement === 'LoanProdtClsfCd'">
                {{ itemText | filterLoanProdtClsfCd }}
              </div>
              <div v-else-if="record.prodElement === 'NumberOfApplicant'">
                {{ itemText | filterNumberOfApplicant }}
              </div>
              <div v-else-if="record.prodElement === 'ChrgManrCd'">
                {{ itemText | filterChrgManrCd }}
              </div>
              <div v-else-if="record.prodElement === 'PmitAdvRepayFlg'">
                {{ itemText | filterPmitAdvRepayFlg }}
              </div>
              <div v-else-if="record.prodElement === 'ExmnvrfyStusCd'">
                {{ itemText | filterExmnvrfyStusCd }}
              </div>
              <div v-else-if="record.prodElement === 'CurCd'">
                {{ currencyList.find(res => res.value === itemText).name }}
              </div>
              <div v-else-if="record.prodElement === 'AplyLoanAmtCeilVal'">
                {{ itemText | filterAplyLoanAmtCeilVal }}
              </div>
              <div v-else>
                {{ itemText }}
              </div>
            </div>
            <div slot="Parameter" slot-scope="text">
              {{ text | prodFilter }}
            </div>
            <div slot="OldValue" slot-scope="itemText">
              {{ itemText | doubleFilter }}
            </div>
            <div slot="NewValue" slot-scope="itemText">
              {{ itemText | doubleFilter }}
            </div>
          </a-table>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane :key="2" :tab="$t('history.customer')" force-render>
        <a-spin class="loan" :spinning="isSpinning">
          <CustomerSearchModule
            v-if="tabKey === 2"
            :input-select="customerData.inputSelect"
            :date-select="customerData.dateSelect"
            @query="getCustomerHistoryList"
          />
          <a-table
            v-if="tabKey === 2"
            :loading="loading"
            :pagination="pagination"
            :columns="customerData.columns"
            :data-source="customerData.data"
            :row-key="
              record => {
                record.id;
              }
            "
          >
            <div slot="ChgAplyDt" slot-scope="itemText, record">
              {{ itemText }} {{ record.chgAplyTm }}
            </div>
            <div slot="itemValue" slot-scope="itemText, record">
              <div v-if="record.custElement === 'emergencyContactRelationship'">
                {{ itemText | filterEmergencyContactRelationship }}
              </div>
              <div v-else-if="record.custElement === 'customerStatus'">
                {{ itemText | filterCustomerStatus }}
              </div>
              <div v-else-if="record.custElement === 'Gender'">
                {{ itemText | filterGender }}
              </div>
              <div v-else-if="record.custElement === 'IdType'">
                {{ itemText | filterIDType }}
              </div>
              <div v-else-if="record.custElement === 'MaritalStatus'">
                {{ MaritalStatus[itemText] }}
              </div>
              <div v-else-if="record.custElement === 'Highest Education Level'">
                {{ itemText | filterHighestEducationLevel }}
              </div>
              <div v-else-if="record.custElement === 'Job'">
                {{ jobList[itemText] }}
              </div>
              <div v-else>
                {{ itemText }}
              </div>
            </div>
            <div slot="Parameter" slot-scope="text">
              {{ text | custFilter }}
            </div>
          </a-table>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane :key="3" :tab="$t('history.loan_characteristic')">
        <a-spin class="loan" :spinning="isSpinning">
          <LoanSearchModule
            v-if="tabKey === 3"
            :input-select="loanData.inputSelect"
            :date-select="loanData.dateSelect"
            @query="getLoanHistoryList"
          />
          <a-table
            v-if="tabKey === 3"
            :loading="loading"
            :pagination="pagination"
            :columns="loanData.columns"
            :data-source="loanData.data"
            :row-key="
              record => {
                record.id;
              }
            "
          >
            <div slot="ChgAplyDt" slot-scope="itemText, record">
              {{ itemText }} {{ record.chgAplyTm }}
            </div>
            <div slot="itemValue" slot-scope="itemText, record">
              <div v-if="record.loanElement === 'customerStatus'">
                {{ itemText | filterCustomerStatus }}
              </div>
              <div v-else-if="record.loanElement === 'GuarantorMethod'">
                {{ itemText | filterGuarantorMethod }}
              </div>
              <div v-else-if="record.loanElement === 'LoanStatus'">
                {{ itemText | filterLoanStatus }}
              </div>
              <div v-else-if="record.loanElement === 'DisbursementStatus'">
                {{ itemText | filterDisbursementStatus }}
              </div>
              <div v-else-if="record.loanElement === 'CheckerReview'">
                {{ itemText | filterCheckerReview }}
              </div>
              <div v-else-if="record.loanElement === 'AutoRepayActivation'">
                {{ itemText | filterAutoRepayActivation }}
              </div>
              <div v-else-if="record.loanElement === 'TxTypCd'">
                {{ itemText | filterTxTypCd }}
              </div>
              <div v-else-if="record.loanElement === 'DisbursementChannel'">
                {{ itemText | filterDisbursementChannel }}
              </div>
              <div v-else-if="record.loanElement === 'TxTypDetail'">
                {{ itemText | filterTxTypDetail }}
              </div>
              <div v-else-if="record.loanElement === 'GuarPassCountry'">
                {{ Country[itemText] }}
              </div>
              <div v-else>
                {{ itemText }}
              </div>
            </div>
            <div slot="Parameter" slot-scope="text">
              {{ text | loanFilter }}
            </div>
          </a-table>
        </a-spin>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import HistoryService from "@/service/historyService";
import config from "@/lib/config";
import ProductSearchModule from "@/components/SearchModule";
import CustomerSearchModule from "@/components/SearchModule";
import LoanSearchModule from "@/components/SearchModule";
import filterActive from "@/filter/history";
import productFilter from "@/filter/productFilter";
import customerFilter from "@/filter/customerFilter";
import loanFilter from "@/filter/loanFilter";

export default {
  name: "Loan",
  filters: {
    ...filterActive,
    ...productFilter,
    ...customerFilter,
    ...loanFilter,
    doubleFilter(e) {
      return (e * 100).toFixed(2) + "%";
    }
  },
  components: {
    ProductSearchModule,
    CustomerSearchModule,
    LoanSearchModule
  },
  data() {
    return {
      tabKey: 1,
      loading: false,
      isSpinning: true,
      MaritalStatus: { "10": this.$t('message.single'), "20": this.$t('message.married'), "30": this.$t('message.divorced'), "40": this.$t('message.widowed') },
      productData: { columns: [
    {
      title: this.$t('history.date_time'),
      dataIndex: "chgAplyDt",
      key: "DateAndTime",
      scopedSlots: { customRender: "ChgAplyDt" }
    },
    {
      title: this.$t('history.parameter'),
      dataIndex: "prodElement",
      key: "Parameter",
      scopedSlots: { customRender: "Parameter" },
      filters: [],
      onFilter: (value, record) => record.prodElement.indexOf(value) === 0
    },
    {
      title: this.$t('history.old_value'),
      dataIndex: "elementOldValue",
      key: "OldValue",
      scopedSlots: { customRender: "OldValue" }
    },
    {
      title: this.$t('history.new_value'),
      dataIndex: "elementNewValue",
      key: "NewValue",
      scopedSlots: { customRender: "NewValue" }
    },
    {
      title: this.$t('history.user_id'),
      dataIndex: "finlModfyTelrNo",
      key: "UserID",
      scopedSlots: { customRender: "UserID" }
    }
  ],
  data: [],
  inputSelect: [
    // { value: 'StartPayPlatDate', name: 'Loan Application Date', inputType: 'date' }, //
    {
      name: this.$t('product.product_name'),
      value: "LoanProdtNm",
      inputLength: 50,
      rules: [
        "inputValue",
        {
          rules: [
            {
              pattern: "^[0-9 a-zA-Z]+$",
              type: "string",
              message: this.$t('message.input_only_alphabet_number')
            },
            {
              required: true,
              message: this.$t('product.product_name_required'),
              min: 1,
              max: 50
            }
          ]
        }
      ]
    },
    {
      name: this.$t('product.product_id'),
      value: "LoanProdtNo",
      inputLength: 8,
      rules: [
        "inputValue",
        {
          rules: [
            {
              pattern: "^[0-9a-zA-Z]+$",
              type: "string",
              message: this.$t('message.input_only_alphabet_number')
            },
            { required: true, message: this.$t('product.product_id_required') }
          ]
        }
      ]
    }
  ],
  dateSelect: [{ name: "Date", value: "Date" }] },
      customerData: { columns: [
    {
      title: this.$t('history.date_time'),
      dataIndex: "chgAplyDt",
      key: "DateAndTime",
      scopedSlots: { customRender: "ChgAplyDt" }
    },
    {
      title: this.$t('history.parameter'),
      dataIndex: "custElement",
      key: "Parameter",
      scopedSlots: { customRender: "Parameter" },
      filters: [],
      onFilter: (value, record) => record.custElement.indexOf(value) === 0
    },
    {
      title: this.$t('history.old_value'),
      dataIndex: "elementOldValue",
      key: "OldValue",
      scopedSlots: { customRender: "itemValue" }
    },
    {
      title: this.$t('history.new_value'),
      dataIndex: "elementNewValue",
      key: "NewValue",
      scopedSlots: { customRender: "itemValue" }
    },
    {
      title: this.$t('history.user_id'),
      dataIndex: "finlModfyTelrNo",
      key: "UserID",
      scopedSlots: { customRender: "UserID" }
    }
  ],
  data: [],
  inputSelect: [
    {
      name: this.$t('customer.customer_name'),
      value: "CustName",
      inputLength: 80,
      rules: [
        "inputValue",
        {
          rules: [
            {
              required: true,
              message: this.$t('customer.customer_name_required'),
              max: 80,
              min: 1
            }
          ]
        }
      ],
      customRules: {
        noSymbol: false,
        noLetter: false
      }
    },
    {
      name: this.$t('message.cif'),
      value: "CustId",
      inputLength: 12,
      rules: [
        "inputValue",
        {
          rules: [
            {
              pattern: "^[0-9]+$",
              type: "string",
              message: this.$t('message.input_only_number')
            },
            {
              required: true,
              message: this.$t('message.input_max_12_digits'),
              max: 12,
              min: 12
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
      name: this.$t('message.id_certificate'),
      value: "CitizenID",
      inputLength: 13,
      rules: [
        "inputValue",
        {
          rules: [
            {
              required: true,
              message: this.$t('message.input_max_13_digits'),
              max: 13,
              min: 13
            }
          ]
        }
      ],
      customRules: {
        noSymbol: true,
        noLetter: true,
        ignoreSymbol: ["-"]
      }
    },
    {
      name: this.$t('message.passport_id'),
      value: "PassportId",
      inputLength: 10,
      rules: [
        "inputValue",
        {
          rules: [
            {
              pattern: "^[0-9a-zA-Z]+$",
              type: "string",
              message: this.$t('message.input_only_alphabet_number')
            },
            {
              required: true,
              message: this.$t('message.passport_certificate_id_max_lenght'),
              min: 1,
              max: 10
            }
          ]
        }
      ],
      customRules: {
        noSymbol: false,
        noLetter: false
      }
    }
  ],
  dateSelect: [{ name: "Date", value: "Date" }] },
      loanData: { columns: [
    {
      title: this.$t('history.date_time'),
      dataIndex: "chgAplyDt",
      key: "DateAndTime",
      scopedSlots: { customRender: "ChgAplyDt" }
    },
    {
      title: this.$t('history.parameter'),
      dataIndex: "loanElement",
      key: "Parameter",
      scopedSlots: { customRender: "Parameter" },
      filters: [],
      onFilter: (value, record) => record.loanElement.indexOf(value) === 0
    },
    {
      title: this.$t('history.old_value'),
      dataIndex: "elementOldValue",
      key: "OldValue",
      scopedSlots: { customRender: "itemValue" }
    },
    {
      title: this.$t('history.new_value'),
      dataIndex: "elementNewValue",
      key: "NewValue",
      scopedSlots: { customRender: "itemValue" }
    },
    {
      title: this.$t('history.user_id'),
      dataIndex: "finlModfyTelrNo",
      key: "UserID",
      scopedSlots: { customRender: "UserID" }
    }
  ],
  data: [],
  inputSelect: [
    { value: "LoanDubilNo", name: this.$t('history.loan_reference_number'), inputLength: 29 }, //
    // { value: 'ApplicationDate', name: 'Loan Application Date' }, //
    // { name: 'Loan Application Date', value: 'AplyMakelnDtFrom', inputType: 'date' },
    {
      name: this.$t('customer.customer_name'),
      value: "CustName",
      inputLength: 40,
      customRules: {
        noSymbol: false,
        noLetter: false
      }
    },
    {
      name: this.$t('message.cif'),
      value: "CustId",
      inputLength: 12,
      rules: [
        "inputValue",
        {
          rules: [
            {
              pattern: "^[0-9]+$",
              type: "string",
              message: "Only enter numbers!"
            },
            {
              required: true,
              message: "Please enter 12 digits",
              max: 12,
              min: 12
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
      name: this.$t('message.id_certificate'),
      value: "CitizenID",
      inputLength: 17,
      rules: [
        "inputValue",
        {
          rules: [
            {
              pattern: "\\d{1,1}\\-\\d{4,4}\\-\\d{5,5}\\-\\d{2,2}-\\d{1,1}",
              type: "string",
              message: this.$t('message.input_only_alphabet_number')
            },
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
      name: this.$t('message.passport_id'),
      value: "PassportId",
      inputLength: 20,
      rules: [
        "inputValue",
        {
          rules: [
            {
              pattern: "^[0-9a-zA-Z]+$",
              type: "string",
              message: this.$t('message.input_only_alphabet_number')
            },
            { required: true, message: this.$t('message.passport_certificate_id_required') }
          ]
        }
      ],
      customRules: {
        noSymbol: false,
        noLetter: false
      }
    }
  ],
  dateSelect: [{ name: "Date", value: "Date" }] },
      currencyList: [],
      pageNum: 1,
      totalCount: 0,
      historyFilter: filterActive,
      jobList: config.jobList,
      Country: {},
      pageSize: config.pageSize,

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
      }
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query) {
      const Country = {};
      config.countryCode.forEach(item => {
        Country[item.key] = item.value;
      });
      this.Country = Country;
      const key = Object.keys(query)[0];
      const param = {
        startTime: this.$moment().subtract(1, "months"),
        endTime: this.$moment(),
        inputSelected: key,
        inputValue: query[Object.keys(query)[0]]
      };
      // 页面跳转查询在这里
      switch (key) {
        case "LoanProdtNm": // 这里是传过来的参数名
          this.getProductHistoryList(param);
          break;
        case "CustId": // 这里是传过来的参数名
          this.tabKey = 2;
          this.getCustomerHistoryList(param);
          break;
        case "LoanDubilNo": // 这里是传过来的参数名
          this.tabKey = 3;
          this.getLoanHistoryList(param);
          break;
      }
    }
    this.getCurrencyList();
  },
  methods: {
    getCurrencyList() {
      this.currencyList = [];
        const res = this.$store.state.enumeration["CM0001"]
        for (const i in res) {
          this.currencyList.push({ name: res[i], value: i });
        }
        this.currencyList.sort((s1, s2) => {
          const x1 = s1.name.toUpperCase();
          const x2 = s2.name.toUpperCase();
          if (x1 < x2) return -1;
          if (x1 > x2) return 1;
          return 0;
        });
        this.isSpinning = false;
    },
    changeTabs(e) {
      this.tabKey = e;
    },
    reloadTableFun(res, type) {
      // 筛选 重新渲染表头
      const records = res.records || [];
      let historyType = "";
      switch (type) {
        case "productData":
          // elementClsf = 'prodElementClsf'
          // element = 'prodElement'
          historyType = "prod";
          break;
        case "customerData":
          historyType = "cust";
          break;
        case "loanData":
          historyType = "loan";
          break;
      }
      let filters = [];
      for (const i in records) {
        const text = this.historyFilter[`${historyType}Filter`](
          records[i][`${historyType}ElementClsf`]
        );
        filters.push({
          text,
          value: records[i][`${historyType}ElementClsf`],
          children: []
        });
      }
      filters = this.arrayDeduplication(filters);
      console.log(filters);
      for (const i in filters) {
        for (const j in records) {
          if (filters[i].value === records[j][`${historyType}ElementClsf`]) {
            const text = this.historyFilter[`${historyType}Filter`](
              records[j][`${historyType}Element`]
            );
            filters[i].children.push({
              text,
              value: records[j][`${historyType}Element`]
            });
          }
        }
        filters[i].children = this.arrayDeduplication(filters[i].children);
      }
      this[`${type}`].columns[1].filters = filters;
    },
    getProductHistoryList(e) {
      if (!e) {
        this.productData.data = [];
        this.pagination.total = 0;
        this.pageNum = 1;
        return;
      }
      this.queryData = e;
      this.loading = true;
      const param = {
        PageNo: this.pageNum,
        PageRecCount: this.pageSize
      };
      if (e) {
        // 插入查询条件
        param[e.inputSelected] = e.inputValue;
        param.DateFrom = this.$moment(e.startTime).format("yyyy-MM-DD");
        param.DateTo = this.$moment(e.endTime).format("yyyy-MM-DD");
      }
      HistoryService.getProductHistoryList(param)
        .then(res => {
          if (!res.records) {
            let proName = "";
            for (const i in this.productData.inputSelect) {
              if (this.productData.inputSelect[i].value === e.inputSelected) {
                proName = this.productData.inputSelect[i].name;
              }
            }
            this.$message.warning("No " + proName + " found");
          }
          this.productData.data = res.records || [];
          this.pagination.total = res.totCount || 0;
          this.pageNum = res.pageNo || 1;
          this.loading = false;
          this.reloadTableFun(res, `productData`);
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    arrayDeduplication(arr = []) {
      const map = new Map();
      for (const item of arr) {
        if (!map.has(item.value)) {
          map.set(item.value, item);
        }
      }
      return [...map.values()];
    },
    getCustomerHistoryList(e) {
      if (!e) {
        this.customerData.data = [];
        this.pagination.total = 0;
        this.pageNum = 1;
        return;
      }
      this.queryData = e;
      this.loading = true;
      let IdType = '';
      let IdNo = '';
      if (e.inputSelected === 'CitizenID') {
        IdType = '101';
        IdNo = e.inputValue
      } else if (e.inputSelected === 'PassportId') {
        IdType = '104'
        IdNo = e.inputValue
      }
      const param = {
        PageNo: this.pageNum,
        IdType: IdType,
        IdNo: IdNo,
        PageRecCount: this.pageSize
      };
      if (e) {
        // 插入查询条件
        param[e.inputSelected] = e.inputValue;
        param.DateFrom = this.$moment(e.startTime).format("yyyy-MM-DD");
        param.DateTo = this.$moment(e.endTime).format("yyyy-MM-DD");
        if (e.inputSelected === "CitizenId") {
          param.IdType = "101";
          param.IdNo = e.inputValue;
        }
        if (e.inputSelected === "PassportId") {
          param.IdType = "104";
          param.IdNo = e.inputValue;
        }
      }
      HistoryService.getCustomerHistoryList(param)
        .then(res => {
          if (!res.records) {
            let proName = "";
            for (const i in this.customerData.inputSelect) {
              if (this.customerData.inputSelect[i].value === e.inputSelected) {
                proName = this.customerData.inputSelect[i].name;
              }
            }
            this.$message.warning("No " + proName + " found");
          }
          console.log(res);
          this.customerData.data = res.records || [];
          this.pagination.total = res.totCount || 0;
          this.pageNum = res.pageNo || 1;
          this.loading = false;
          this.reloadTableFun(res, `customerData`);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getLoanHistoryList(e) {
      if (!e) {
        this.loanData.data = [];
        this.pagination.total = 0;
        this.pageNum = 1;
        return;
      }
      this.queryData = e;
      this.loading = true;
      const param = {
        PageNo: this.pageNum,
        PageRecCount: this.pageSize
      };
      if (e) {
        // 插入查询条件
        if (e.inputSelected === "AplyMakelnDtFrom") {
          param.AplyMakelnDtFrom = this.$moment(e.inputValue[0]).format(
            "yyyy-MM-DD"
          );
          param.AplyMakelnDtTo = this.$moment(e.inputValue[1]).format(
            "yyyy-MM-DD"
          );
        } else {
          param[e.inputSelected] = e.inputValue;
        }
        param.DateFrom = this.$moment(e.startTime).format("yyyy-MM-DD");
        param.DateTo = this.$moment(e.endTime).format("yyyy-MM-DD");
        if (e.inputSelected === "CitizenId") {
          param.IdType = "101";
          param.IdNo = e.inputValue;
        }
        if (e.inputSelected === "PassportId") {
          param.IdType = "104";
          param.IdNo = e.inputValue;
        }
      }
      HistoryService.getLoanHistoryList(param)
        .then(res => {
          if (!res.records) {
            let proName = "";
            for (const i in this.loanData.inputSelect) {
              if (this.loanData.inputSelect[i].value === e.inputSelected) {
                proName = this.loanData.inputSelect[i].name;
              }
            }
            this.$message.warning("No " + proName + " found");
          }
          console.log(res);
          this.loanData.data = res.records || [];
          this.pagination.total = res.totCount || 0;
          this.pageNum = res.pageNo || 1;
          this.loading = false;
          this.reloadTableFun(res, `loanData`);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 翻页
    changePage(page, pageSize) {
      this.pageSize = pageSize;
      this.pageNum = page;
      if (pageSize) this.getHistoryList();
    },
    // 改变每页数量时更新显示
    showSizeChange(current, pageSize) {
      this.pageNum = current;
      this.pageSize = pageSize;
      this.getHistoryList();
    },
    showTotal() {
      return (
        this.$t("system.totalLeft") +
        this.pagination.total +
        this.$t("system.totalRight")
      );
    },
    getHistoryList() {
      //
      if (this.tabKey === 1) this.getProductHistoryList(this.queryData);
      if (this.tabKey === 2) this.getCustomerHistoryList(this.queryData);
      if (this.tabKey === 3) this.getLoanHistoryList(this.queryData);
    },
    intoDetails() {
      this.$router.push("/loan/loanDetails");
    }
  }
};
</script>

<style scoped lang="less">
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
/deep/ .ant-table-filter-dropdown .ant-dropdown-menu {
  overflow-x: visible;
}
.should {
  background-color: #ffffff;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

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
  background-color: #ffffff;
  min-height: 240px;
  padding: 26px 32px;
  box-sizing: border-box;

  .table-action {
    display: flex;
    justify-content: flex-start;
    height: 14px;

    > button {
      height: 14px;
      line-height: 14px;
    }

    .table-action-line {
      width: 1px;
      height: 14px;
      background-color: #d8d8d8;
    }
  }
}
</style>
