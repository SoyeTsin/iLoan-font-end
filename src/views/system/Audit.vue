<template>
  <div style="margin:0 20px 0 20px">
    <!-- search condition component -->
    <div class="content-head">
      <!--      <searchTemplate-->
      <!--        :basic-q-list="basicQList"-->
      <!--        :senior-q-list="seniorQList"-->
      <!--        :advanced-visible="advancedVisible"-->
      <!--        @setQueryCond="searchByParams($event)"-->
      <!--      />-->
    </div>
    <div class="content-body">
      <!-- audit data table  -->
      <a-table
        :columns="columns"
        :row-key="(record) => {record.id}"
        :data-source="sourceList"
        :pagination="pagination"
        size="small"
      >
        <!-- expand data -->
        <span slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <div class="expend">
            <div class="expend-item">
              <div>
                <div class="expend-row-item-title">
                  {{ $t('user_audit.userName') }}
                </div>
                <div class="expend-row-item-title">
                  {{ $t('user_audit.logType') }}
                </div>
                <div class="expend-row-item-title">
                  {{ $t('user_audit.operatorLevel') }}
                </div>
                <!-- show event detail button -->
                <div class="expend-row-item-title">
                  <a @click="rowSelected(record)">
                    {{ $t('user_audit.viewEvent') }}
                  </a>

                </div>
              </div>
              <div>
                <div class="expend-row-item-text">
                  {{ record.user }}
                </div>
                <div class="expend-row-item-text">
                  {{ record.logtype }}
                </div>
                <div class="expend-row-item-text">
                  {{ record.operatorLevel }}
                </div>
              </div>

            </div>
            <div class="expend-item2">
              <div>
                <div class="expend-row-item-title">
                  {{ $t('user_audit.operator') }}
                </div>
                <div class="expend-row-item-title">
                  {{ $t('user_audit.time') }}
                </div>

              </div>
              <div>
                <div class="expend-row-item-text">
                  {{ record.operator }}
                </div>
                <div class="expend-row-item-text">
                  {{ record.time }}
                </div>
              </div>
            </div>
          </div>
        </span>
      </a-table>
    </div>
    <!-- event detail view -->
    <a-modal
      v-model="showEventDetail"
      :footer="null"
      :title="$t('user_audit.viewEvent')"
    >
      <a-row :gutter="24">
        <a-col :span="6" class="row_title">
          {{ $t('user_audit.request') }}
        </a-col>
        <a-col :span="24" class="row_content_text">
          <a-textarea
            v-model="currentDetail.request"
            size="big"
            read-only
            rows="3"
          />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="6" class="row_title">
          {{ $t('user_audit.response') }}
        </a-col>
        <a-col :span="24" class="row_content_text">
          <a-textarea
            v-model="currentDetail.response"
            size="big"
            rows="15"
            read-only
          />
        </a-col>
      </a-row>
    </a-modal>

  </div>
</template>

<script>
import UM from "@/service/um";
import comm from '../../utils/common.js';
// import searchTemplate from '@/components/searchTemplate';

export default {
  components: {
    // searchTemplate
  },
  data() {
    return {
      // tag event detail view
      showEventDetail: false,
      // tag advance search view default show or hidden
      advancedVisible: 'true',
      // search component baseic condition  //基础查询
      basicQList: [{
        InputType: 'text',
        Name: 'User Name',
        placeholderName: 'user_audit.userName'
      }],
      // search component advance condition //高级查询条件
      seniorQList: [{
        InputType: 'text',
        Name: 'User Name',
        placeholderName: 'user_audit.userName'
      },
        {
          InputType: 'select',
          Name: 'Level',
          placeholderName: 'user_audit.level',
          RefList: [{
            'Key': 'info',
            'CodeEn': 'Info'
          }, {
            'Key': 'error',
            'CodeEn': 'Error'
          }, {
            'Key': 'debug',
            'CodeEn': 'Debug'
          }]
        },
        {
          InputType: 'datetimeRange',
          Name: 'Creation Time',
          placeholderName: 'user_audit.time'
        }
      ],
      // data list
      sourceList: [],
      // search condition username
      searchUserName: '',
      // search condition Level
      searchLevel: '',
      // search condition BeginDate
      searchBeginDate: '',
      // search condition EndDate
      searchEndDate: '',
      // show page number
      pageNum: 1,
      // show  number of data items per page
      pageSize: 10,
      // Pagination component prop
      pagination: {
        // default initial page number
        defaultCurrent: 1,
        // default number of data items per page
        defaultPageSize: 10,
        // determine whether pageSize can be changed
        showSizeChanger: true,
        // Whether to hide pager on single page
        // hideOnSinglePage: true,
        // determine whether you can jump to pages directly // 显示可改变每页数量
        showQuickJumper: true,
        // specify the sizeChanger options // 每页数量选项
        pageSizeOptions: ['10', '20', '30', '40'],
        // total number of data items
        total: 0,
        // a callback function show total number
        showTotal: (total) => this.showTotal(total),
        // a callback function, executed when pageSize is changed  改变每页数量时更新显示
        onShowSizeChange:
            (current, pageSize) => this.showSizeChange(current, pageSize),
        // a callback function, executed when the page number is changed,
        // and it takes the resulting page number and pageSize as its arguments
        onChange:
            (page, pageSize) => this.changePage(page, pageSize)
      },
      // mark show event detail item data
      currentDetail: {}
    };
  },
  computed: {
    /**
     * @description: list component show column list
     * @param: none
     * @return: column list
     */
    columns() {
      return [{
        title: this.$t('user_audit.userName'),
        dataIndex: 'user',
        sorter: (a, b) =>
            a['user'].localeCompare(
                b['user']
            )
      },
        {
          title: this.$t('user_audit.operator'),
          dataIndex: 'operator'
        },
        {
          title: this.$t('user_audit.operatorLevel'),
          dataIndex: 'operatorLevel'
        }, {
          title: this.$t('user_audit.logType'),
          dataIndex: 'logtype'
        }, {
          title: this.$t('user_audit.time'),
          dataIndex: 'time',
          sorter: (a, b) =>
              a['time'].localeCompare(
                  b['time']
              )
        }
      ];
    }
  },
  watch: {},
  mounted() {
    /**
     * @description: when view display query audit data
     * @param {type}
     * @return:
     */
    this.queryAuditData();
  },

  methods: {
    /**
     * @description: a callback function, executed when search button is clicked
     * @param {event：searchTemplate callback}
     * @return: none
     */
    searchByParams(event) {
      this.searchUserName = '';
      this.searchLevel = '';
      this.searchBeginDate = '';
      this.searchEndDate = '';
      let userName = '';
      let level = '';
      let beginTime = '';
      let endTime = '';
      /**
       * @description: loop iteration event to get search condition
       */
      for (let index = 0; index < event.length; index++) {
        const item = event[index];
        // get search condition
        if (item.Name == 'User Name') {
          userName = item.InputValue;
        } else if (item.Name == 'Level') {
          level = item.InputValue;
        } else if (item.Name == 'Creation Time') {
          // get date condition
          if (item.InputValue.length == 2) {
            const begDate = new Date(item.InputValue[0]);
            const endDate = new Date(item.InputValue[1]);
            beginTime = comm.formatDateString(begDate);
            endTime = comm.formatDateString(endDate);
          }
        }
      }
      // set global search condition
      this.pageNum = 1;
      this.searchUserName = userName;
      this.searchLevel = level;
      this.searchBeginDate = beginTime;
      this.searchEndDate = endTime;
      // send request to service
      this.queryAuditData();
    },

    /**
     * @description: a callback function, executed when the page number is changed, and it takes the resulting page number and pageSize as its arguments
     * @param {type}
     * @return:
     */
    changePage(page) { // page,pageSize
      this.queryAuditData(page);
    },

    // 改变每页数量时更新显示
    /**
     * @description: a callback function, executed when pageSize is changed  改变每页数量时更新显示
     * @param {type}
     * @return:
     */
    showSizeChange(current, pageSize) {
      this.pageNum = current;
      this.pageSize = pageSize;
      this.queryAuditData(this.pageNum);
    },

    /**
     * @description: a callback function show total number
     * @param {type}
     * @return:
     */
    showTotal() { // total
      return this.$t("system.totalLeft") + this.pagination.total + this.$t("system.totalRight");
    },

    /**
     * @description: send request to service and get audit data
     * @param {int:pagenum}
     * @return: none
     */
    queryAuditData(pageNum) {
      // set default pageNum
      if (pageNum == -1) {
        pageNum = this.pageNum;
      }

      // request params
      const params = {
        'fields': [
          'audit'
        ],
        'filters': {
          'user': this.searchUserName,
          'begintime': this.searchBeginDate,
          'endtime': this.searchEndDate,
          'level': this.searchLevel
        },
        'SortedBy': ['time', 'desc'],
        'offset': pageNum,
        'limit': this.pageSize,
        'groupId': 1
      };
      // send post request
      UM.auditQuery(params).then((res) => {
        if (res) {
          const dataList = res.data;

          // format date
          dataList.forEach((element) => {
            const date = element.time;
            element.time = comm.stringToDateString(date);
          });
          // set page global data
          this.sourceList = dataList;
          this.pagination.total = res.total;
          this.pageNum = pageNum;
        } else { // if response is null set global data to default
          this.sourceList = [];
          this.pagination.total = 0;
          this.pageNum = 1;
        }
      }).catch(err => {
        this.$message.error(err.errorMsg);
      });
    },

    /**
     * @description: expand row
     * @param {type}
     * @return:
     */
    rowSelected(event) {
      this.showEventDetail = true;
      this.currentDetail = event;
    }

  }
};
</script>

<!--<style src="@/style/common.less" lang="less"></style>-->
<style lang="less">
.content-head {
  display: flex;
  justify-content: space-between;
}

.content-body {
  margin-top: 20px;
}

.row_title {
  // textAlign: 'left';
  height: 30px;
  border: 2px;
  border-color: #f00;
  padding-top: 5px;
}

.expend {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.expend-item {
  display: flex;
  flex-direction: row;
  flex: 1;
  // justify-content: space-between;
  width: 100%;
}

.expend-item2 {
  display: flex;
  flex-direction: row;
  flex: 2;
  // justify-content: space-between;
  width: 100%;
}

.expend-row-item-title {
  display: flex;
  flex-direction: row;
  // width: 25%;
  font-size: 12px;
  color: #999;
  text-align: left;
  margin-top: 10px;
  // background-color: aqua;
}

.expend-row-item-text {
  display: flex;
  flex-direction: row;
  // width: 75%;
  font-size: 12px;
  color: #333;
  text-align: left;
  margin-left: 20px;
  margin-top: 10px;
  // background-color: blanchedalmond;
}

.expend-button {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  font-size: 12px;
  background-color: blanchedalmond;
  align-items: center;
  width: 80px;

}

.ant-pagination-total-text {
  position: absolute;
  left: 5px;
}
</style>
