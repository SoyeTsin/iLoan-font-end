<template>
  <div style="padding: -24px">
    <a-tabs :active-key="tabKey" @change="changeTabs">
      <a-tab-pane :key="1" :tab="$t('report.disbursement')">
        <div class="loan">
          <SearchModule
            :hide-text-field="true"
            :input-select="searchConfig.inputSelect"
            :date-select="searchConfig.dateSelect"
            @query="query"
          />
          <a-table
            :columns="disbursementData.columns"
            :data-source="disbursementData.data"
            :loading="tableLoading"
            :pagination="pagination"
            @change="pageChange"
          >
            <div slot="Action" slot-scope="record" class="table-action">
              <a-button type="link" @click="downloadFile(record)">
                {{ $t('message.download_btn') }}
              </a-button>
            </div>
          </a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="2" :tab="$t('report.repayment')">
        <div class="loan">
          <SearchModule
            :hide-text-field="true"
            :input-select="searchConfig.inputSelect"
            :date-select="searchConfig.dateSelect"
            @query="query"
          />
          <a-table
            :columns="repaymentData.columns"
            :data-source="repaymentData.data"
            :loading="tableLoading"
            :pagination="pagination"
            @change="pageChange"
          >
            <div slot="Action" slot-scope="record" class="table-action">
              <a-button type="link" @click="downloadFile(record)">
                {{ $t('message.download_btn') }}
              </a-button>
            </div>
          </a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="3" :tab="$t('report.other')">
        <div class="loan">
          <SearchModule
            :hide-text-field="true"
            :input-select="searchConfig.inputSelect"
            :date-select="searchConfig.dateSelect"
            @query="query"
          />
          <a-table
            row-key="GeneratedTime"
            :columns="otherData.columns"
            :data-source="otherData.data"
            :loading="tableLoading"
            :pagination="pagination"
            @change="pageChange"
          >
            <div slot="Action" slot-scope="record" class="table-action">
              <a-button type="link" @click="downloadFile(record)">
                {{ $t('message.download_btn') }}
              </a-button>
            </div>
          </a-table>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a ref="download" :href="pdfUrl" download />
  </div>
</template>

<script>
import SearchModule from "@/components/SearchModule";
import Report from "@/service/report";
import CM from "@/service/common";

export default {
  name: "Report",
  components: {
    SearchModule
  },
  data() {
    return {
      tempDate: {},
      pdfUrl: "",
      tabKey: 1,
      sorterSelected: "",
      isDateOfReportSorted: false,
      isTimeOfReportSorted: false,
      isFileTypeSorted: false,
      isOrderByDataDateSorted: false,
      disbursementData: {
  columns: [
    {
      title: this.$t('report.report_name'),
      dataIndex: "ReportName",
      key: "ReportName",
      scopedSlots: { customRender: "ReportName" }
    },
    {
      title: this.$t('report.report_date'),
      dataIndex: "GeneratedDate",
      key: "GeneratedDate",
      scopedSlots: { customRender: "GeneratedDate" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('report.report_time'),
      dataIndex: "GeneratedTime",
      key: "GeneratedTime",
      scopedSlots: { customRender: "GeneratedTime" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('report.data_date'),
      dataIndex: "DataDate",
      key: "DataDate",
      scopedSlots: { customRender: "DataDate" },
      sorter: (a, b) => {
        return a.length - b.length
      }
    },
    {
      title: this.$t('report.file_type'),
      dataIndex: "ReportFileType",
      key: "ReportFileType",
      scopedSlots: { customRender: "ReportFileType" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('message.action'),
      scopedSlots: { customRender: "Action" }
    }
  ],
  data: []
},
      repaymentData: {
  columns: [
    {
      title: this.$t('report.report_name'),
      dataIndex: "ReportName",
      key: "ReportName",
      scopedSlots: { customRender: "ReportName" }
    },
    {
      title: this.$t('report.report_date'),
      dataIndex: "GeneratedDate",
      key: "GeneratedDate",
      scopedSlots: { customRender: "GeneratedDate" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('report.report_time'),
      dataIndex: "GeneratedTime",
      key: "GeneratedTime",
      scopedSlots: { customRender: "GeneratedTime" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('report.data_date'),
      dataIndex: "DataDate",
      key: "DataDate",
      scopedSlots: { customRender: "DataDate" },
      sorter: (a, b) => {
        return a.length - b.length
      }
    },
    {
      title: this.$t('report.file_type'),
      dataIndex: "ReportFileType",
      key: "ReportFileType",
      scopedSlots: { customRender: "ReportFileType" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('message.action'),
      scopedSlots: { customRender: "Action" }
    }
  ],
  data: []
},
      otherData: {
  columns: [
    {
      title: this.$t('report.report_name'),
      dataIndex: "ReportName",
      key: "ReportName",
      scopedSlots: { customRender: "ReportName" }
    },
    {
      title: this.$t('report.report_date'),
      dataIndex: "GeneratedDate",
      key: "GeneratedDate",
      scopedSlots: { customRender: "GeneratedDate" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('report.report_time'),
      dataIndex: "GeneratedTime",
      key: "GeneratedTime",
      scopedSlots: { customRender: "GeneratedTime" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('report.data_date'),
      dataIndex: "DataDate",
      key: "DataDate",
      scopedSlots: { customRender: "DataDate" },
      sorter: (a, b) => a['DataDate'].localeCompare(b['DataDate'])
    },
    {
      title: this.$t('report.file_type'),
      dataIndex: "ReportFileType",
      key: "ReportFileType",
      scopedSlots: { customRender: "ReportFileType" },
      sorter: (a, b) => {
        return a.length - b.length;
      }
    },
    {
      title: this.$t('message.action'),
      scopedSlots: { customRender: "Action" }
    }
  ],
  data: []
},
      pageNum: 0,
      totalCount: 0,
      tableData: [],
      tableLoading: false,
      searchConfig: {
        inputSelect: [
          {
            name: this.$t("report.report_name"),
            value: "ReportName",
            inputLength: 40,
            list: []
          }
        ],
        dateSelect: [{ name: this.$t('report.data_date'), value: "Date", list: [] }]
      },
      pageSize: 10,
      pagination: {
        defaultCurrent: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        total: 0,
        showTotal: total => this.showTotal(total),
        onShowSizeChange: (current, pageSize) =>
          this.showSizeChange(current, pageSize)
      }
    };
  },
  beforeMount() {
    this.tableLoading = true;
    this.getReportName();
  },
  methods: {
    showTotal() {
      return (
        this.$t("system.totalLeft") +
        this.pagination.total +
        this.$t("system.totalRight")
      );
    },
    showSizeChange(current, pageSize) {
      this.pageNum = current;
      this.pageSize = pageSize;
      this.report();
    },
    changeTabs(e) {
      this.tabKey = e;
      this.getReportName();
      this.searchConfig.inputSelect[0].list = [];
      this.searchConfig.dateSelect[0].list = [];
      this.disbursementData.data = [];
      this.repaymentData.data = [];
      this.otherData.data = [];
      this.pageNum = 0;
      this.totalCount = 0;
      this.pagination.total = 0;
    },
    query(e) {
      this.queryParam = e || {};
      if (Object.keys(this.queryParam).length > 0) {
        this.tempDate = e;
        this.report(e, this.pageNum);
      }
    },
    report(e, pageNum) {
      this.tableLoading = true;

      let param = {
        ReportType: "",
        ReportCategory: "",
        ReportName: "",
        OrderByDate: this.isDateOfReportSorted ? "ASC" : "DESC",
        OrderByTime: this.isTimeOfReportSorted ? "ASC" : "DESC",
        OrderByFileType: this.isFileTypeSorted ? "DESC" : "ASC",
        OrderByDataDate: this.isOrderByDataDateSorted ? "ASC" : "DESC",
        PageNo: pageNum,
        PageRecCount: this.pageSize
      };
      if (this.queryParam.inputSelected) {
        param[this.queryParam.inputSelected] = this.queryParam.inputValue;
      }
      if (this.tabKey === 1) {
        param.ReportType = "IL001";
      }
      if (this.tabKey === 2) {
        param.ReportType = "IL002";
      }
      if (this.tabKey === 3) {
        param.ReportType = "IL003";
      }

      if (e) {
        param[e.inputSelected] = e.inputValue;
        param.DateFrom = this.$moment(e.startTime).format("yyyy-MM-DD");
        param.DateTo = this.$moment(e.endTime).format("yyyy-MM-DD");
      } else {
        param.DateFrom = this.$moment(this.tempDate.startTime).format(
          "yyyy-MM-DD"
        );
        param.DateTo = this.$moment(this.tempDate.endTime).format("yyyy-MM-DD");
      }
      param = Object.assign(param);
      Report.getFileList(param)
        .then(res => {
          this.pagination.total = res.PageTotount || 0;
          this.pageNum = res.PageNo || 1;
          if (this.tabKey === 1) {
            this.disbursementData.data = res.Records;
          }
          if (this.tabKey === 2) {
            this.repaymentData.data = res.Records;
          }
          if (this.tabKey === 3) {
            this.otherData.data = res.Records;
          }
        })
        .finally(() => {
          this.tableLoading = false;
          this.tempDate = e;
        });
    },
    getReportName() {
      const param = {
        ReportType: ""
      };
      if (this.tabKey === 1) {
        param.ReportType = "IL001";
      }
      if (this.tabKey === 2) {
        param.ReportType = "IL002";
      }
      if (this.tabKey === 3) {
        param.ReportType = "IL003";
      }
      Report.getNameList(param).then(res => {
        this.tableLoading = false;
        const report = res.Records;
        report.map(item => {
          const reportList = {
            value: item.ReportName,
            name: item.ReportName
          };
          this.searchConfig.inputSelect[0].list.push(reportList);
          this.searchConfig.dateSelect[0].list.push(reportList)
        });
      });
    },
    pageChange(e, page, sorter) {
      this.sorterSelected = sorter;
      if (sorter.field === "GeneratedDate") {
        this.isDateOfReportSorted = !this.isDateOfReportSorted;
      }

      if (sorter.field === "GeneratedTime") {
        this.isTimeOfReportSorted = !this.isTimeOfReportSorted;
      }

      if (sorter.field === "ReportFileType") {
        this.isFileTypeSorted = !this.isFileTypeSorted;
      }

      if (sorter.field === "DataDate") {
        this.isOrderByDataDateSorted = !this.isOrderByDataDateSorted;
      }

      this.report(this.tempDate, e.current);
    },
    downloadFile(e) {
      this.tableLoading = true;
      return new Promise((resolve, reject) => {
        CM.downloadFile(e.ReportFileKey)
          .then(res => {
            if (res.UrlStr) {
              this.pdfUrl = res.UrlStr;
              setTimeout(() => {
                this.$refs.download.click();
              });
              this.tableLoading = false;
            } else {
              this.$message.error({
                content: "Failed to get download link",
                duration: 2
              });
              this.tableLoading = false;
            }
          })
          .catch(error => {
            reject(error);
            this.tableLoading = false;
          });
      });
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
