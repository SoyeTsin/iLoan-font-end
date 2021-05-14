<template>
  <div>
    <div class="should">
      <div class="should-item should-item-line">
        <div class="should-title">{{ $t('customer.total_numer_customer') }}</div>
        <!--        <div>{{ statistics.TotalCustNum }}</div>-->
        <ICountUp
          class="should-number"
          :delay="countUpConfig.delay"
          :end-val="statistics.TotalCustNum"
          :options="countUpConfig"
        />
      </div>
      <div class="should-item should-item-line">
        <div class="should-title">{{ $t('customer.new_customer_month') }}</div>
        <div class="should-number should-number-blue">
          <ICountUp
            :delay="countUpConfig.delay"
            :end-val="statistics.TotalCustCurrmth"
            :options="countUpConfig"
          />
          <a-icon type="arrow-up" />
        </div>
      </div>
      <div class="should-item">
        <div class="should-title">{{ $t('customer.black_list') }}</div>
        <!--        <div class="should-number">{{ statistics.TotalCustBlack }}</div>-->
        <ICountUp
          class="should-number"
          :delay="countUpConfig.delay"
          :end-val="statistics.TotalCustBlack"
          :options="countUpConfig"
        />
      </div>
    </div>
    <div class="customer">
      <SearchModule :input-select="searchConfig.inputSelect" @query="query" />
      <a-button
        v-auth="$buttonConfig.Customer.NewCustomer"
        type="primary"
        style="margin-bottom: 26px"
        icon="plus"
        @click="()=>(this.$router.push('/customer/customerCreate'))"
      >{{ $t('customer.new_customer_btn') }}
      </a-button>
      <a-table
        :columns="columns"
        row-key="CustId"
        :data-source="tableData"
        :loading="tableLoading"
        :pagination="{
          total:totalCount,
        }"
        @change="pageChange"
      >
        <span slot="CIF" slot-scope="text">{{ text }}</span>
        <span slot="custStatus" slot-scope="status">{{
          custStatus[status]
        }}</span>
        <div slot="recordStatus" slot-scope="status">
          <span v-if="status === '12' || status === '13'" class="warning">{{
            recordStatus[status] || ""
          }}</span>
          <span v-else :class="status === '01' ? 'great' : 'error'">{{
            recordStatus[status] || ""
          }}</span>
        </div>
        <div slot="Action" slot-scope="custId, record" class="table-action">
          <a-button
            type="link"
            class="table-button-line"
            @click="jump('details', record)"
          >{{ $t('message.view_btn') }}
          </a-button>
          <div
            v-if="record.RecordStatus === '12' || record.RecordStatus === '13'"
            v-auth="$buttonConfig.Customer.EditCustomerRequested"
            class="edit-button"
          >
            <div class="table-action-line" />
            <a-button
              type="link"
              class="table-button-line"
              @click="jump('edit', record)"
            >{{ $t('message.edit_btn') }}</a-button>
          </div>
          <div
            v-if="record.RecordStatus === '01'"
            v-auth="$buttonConfig.Customer.EditCustomerAgreed"
            class="edit-button"
          >
            <div class="table-action-line" />
            <a-button
              type="link"
              class="table-button-line"
              @click="jump('edit', record)"
            >{{ $t('message.edit_btn') }}</a-button>
          </div>
          <div
            v-if="record.RecordStatus === '16'"
            v-auth="$buttonConfig.Customer.EditCustomerReturned"
            class="edit-button"
          >
            <div class="table-action-line" />
            <a-button
              type="link"
              class="table-button-line"
              @click="jump('edit', record)"
            >{{ $t('message.edit_btn') }}</a-button>
          </div>
        </div>
        <span slot="IdType" slot-scope="type">{{ IdType[type] }}</span>
      </a-table>
    </div>
  </div>
</template>
<script>
import SearchModule from "@/components/SearchModule";
import Customer from "@/service/customer";
import ICountUp from "vue-countup-v2";

export default {
  name: "Customer",
  components: {
    SearchModule,
    ICountUp
  },
  data() {
    return {
      buttons: sessionStorage.getItem("authBtns"),
      statistics: {
        TotalCustBlack: 0,
        TotalCustCurrmth: 0,
        TotalCustNum: 0
      },
      countUpConfig: {
        delay: 100,
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: ""
      },
      custStatus: { "0": this.$t('message.regular'), "3": this.$t('message.black_list'), "4": this.$t('message.inactive') },
      recordStatus: {
        "12": this.$t('message.pending'),
        "13": this.$t('message.pending'),
        "01": this.$t('message.agreed'),
        "16": this.$t('message.returned')
      },
      IdType: { "101": this.$t('message.citizen_id'), "104": this.$t('message.passport') },
      pageNo: 1,
      totalCount: 0,
      tableData: [],
      tableLoading: false,
      queryParam: {},
      columns: [
        {
          title: this.$t('message.cif'),
          dataIndex: "newCustId",
          width: 100,
          scopedSlots: { customRender: "CIF" }
        },
        {
          title: this.$t('customer.customer_name'),
          dataIndex: "CustName",
          width: 300
        },
        {
          title: this.$t('message.id_type'),
          dataIndex: "IdType",
          width: 50,
          scopedSlots: { customRender: "IdType" },
          sorter: true
        },
        {
          title: this.$t('message.certificate_id'),
          dataIndex: "newIdNo",
          width: 90,
          sorter: true
        },
        {
          title: this.$t('customer.customer_status'),
          dataIndex: "CustStatus",
          scopedSlots: { customRender: "custStatus" },
          width: 140,
          filters: [
            { text: this.$t('message.regular'), value: "0" },
            { text: this.$t('message.blacklist'), value: "3" },
            { text: this.$t('message.inactive'), value: "4" }
          ]
        },
        {
          title: this.$t('message.maker_checker_status'),
          dataIndex: "RecordStatus",
          scopedSlots: { customRender: "recordStatus" },
          width: 170,
          filters: [
            { text: this.$t('message.agreed'), value: "01" },
            { text: this.$t('message.pending'), value: "12" },
            { text: this.$t('message.returned'), value: "16" }
          ]
        },
        {
          title: this.$t("Customer.action"),
          scopedSlots: { customRender: "Action" },
          width: 100
        }
      ],

      searchConfig: {
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
                    type: "string",
                    message: this.$t('customer.input_only_string')
                  },
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
              noSymbol: true,
              noLetter: false,
              noNumber: true,
              ignoreSymbol: ["&", "/", ".", "-", ",", "'"]
            }
          },
          {
            name: this.$t('message.cif'),
            value: "CustId",
            inputLength: 15,
            rules: [
              "inputValue",
              {
                rules: [
                  {
                    type: "string",
                    message: this.$t('message.input_only_number')
                  },
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
            name: this.$t('message.id_certificate'),
            value: "CitizenID",
            inputLength: 17,
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
            name: this.$t('message.passport_id'),
            value: "Passport",
            inputLength: 10,
            rules: [
              "inputValue",
              {
                rules: [
                  {
                    pattern: new RegExp("^[0-9 a-zA-Z]+$"),
                    required: true,
                    message: this.$t('message.input_passport_certification'),
                    max: 10,
                    min: 1
                  }
                ]
              }
            ],
            customRules: {
              noSymbol: true
            }
          } // 104
        ]
      }
    };
  },
  computed: {},
  mounted() {
    // if (this.customerAuth) {
    //   this.columns.push({
    //     title: this.$t('Customer.action'),
    //     scopedSlots: { customRender: 'Action' },
    //     width: 100
    //   });
    // }
    this.getCustomerStatistics();
    // this.getCustomerList();
  },
  methods: {
    getCustomerStatistics() {
      Customer.getStatistics().then(res => {
        console.log(res);
        this.statistics = res;
      });
    },
    query(e) {
      this.queryParam = e || {};
      if (Object.keys(this.queryParam).length > 0) {
        this.getCustomerList();
      }
    },
    getCustomerList(pageNo, option) {
      this.pageNo = pageNo || 1;
      this.tableLoading = true;
      let param = {
        CustId: "",
        CustName: "",
        IdType: "",
        IdNo: "",
        OwnOrgId: "",
        AcctManager: "",
        PageNo: pageNo || 1
      };

      if (this.queryParam.inputSelected === "CitizenID") {
        param.IdNo = this.queryParam.inputValue;
        param.IdType = "101";
      } else if (this.queryParam.inputSelected === "Passport") {
        param.IdNo = this.queryParam.inputValue;
        param.IdType = "104";
      } else {
        if (this.queryParam.inputSelected) {
          param[this.queryParam.inputSelected] = this.queryParam.inputValue;
        }
      }
      param = Object.assign(param, option);
      Customer.getCustomerList(param)
        .then(res => {
          console.log(res);
          res.Records.forEach(item => {
            if (item.CustId && typeof item.CustId === "string") {
              const CustIdArr = item.CustId.split("");
              let newCustId = "";
              CustIdArr.forEach((s, i) => {
                if (i % 3 === 0 && i !== 0) {
                  newCustId = newCustId + "-" + s;
                } else {
                  newCustId = newCustId + s;
                }
              });
              item.newCustId = newCustId;
            }
            if (item.IdNo) {
              const IdNoArr = item.IdNo.split("");
              let newIdNo = "";
              IdNoArr.forEach((s, i) => {
                if (i === 1 || i === 5 || i === 10 || i === 12 || i === 13) {
                  newIdNo = newIdNo + "-" + s;
                } else {
                  newIdNo = newIdNo + s;
                }
              });
              item.newIdNo = newIdNo;
            }
          });
          this.totalCount = res.PageTotCount;
          this.tableData = res.Records;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    pageChange(page, filters, sorter) {
      console.log(page, filters, sorter);
      filters = filters || {};
      let sorterParam = {};
      if (sorter.field) {
        let SortKey = sorter.field;
        if (sorter.field === "newIdNo") {
          SortKey = "IdNo";
        }
        sorterParam = {
          SortKey: SortKey,
          OrderType:
            sorter.order === "ascend"
              ? "1"
              : sorter.order === "descend"
              ? "2"
              : ""
        };
      }
      if (Object.keys(filters).length > 0) {
        console.log(filters);
        if (filters.RecordStatus) {
          if (filters.RecordStatus.indexOf("12") !== -1) {
            filters.RecordStatus.push("13");
          }
        }
      }
      // if (!sorter.field && Object.keys(filters).length === 0) {
      //   this.getCustomerList(page.current)
      // }
      const param = Object.assign(sorterParam, filters);
      this.getCustomerList(page.current, param);
    },
    jump(type, e) {
      let url = "";
      const query = {
        id: e.CustId,
        recrodStatus: e.RecordStatus
      };
      if (type === "details") {
        url = "/customer/customerDetails";
      } else if (type === "edit") {
        if (e.RecordStatus === "12" || e.RecordStatus === "13") {
          url = "/customer/customerReview";
        } else {
          url = "/customer/customerEdit";
        }
      }
      this.$router.push({ path: url, query: query });
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .ant-table-row-cell-break-word {
  white-space: nowrap;
}
.should {
  background-color: #fff;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;

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

.customer {
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
