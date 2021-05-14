<template>
  <div class="role-manager">
    <SearchModule :input-select="seniorQList" @query="queryRoleList" />
    <div class="content-body">
      <a-button
        v-auth="$buttonConfig.system.role_manager.addRole"
        style="margin-bottom: 26px"
        type="primary"
        icon="plus"
        @click="addRole()"
      >{{
        $t("roleManager.add")
      }}
      </a-button>
      <a-table
        :columns="columns"
        row-key="id"
        :loading="loading"
        :data-source="roleList"
        :pagination="pagination"
      >
        <div slot="operation" slot-scope="record" v-auth="$buttonConfig.system.role_manager.editRole">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{ $t("roleManager.edit") }}</span>
            </template>
            <a class="btn-a" @click="updateMenu(record)">
              <a-icon type="edit" style="margin-left:2px" />
            </a>
          </a-tooltip>
          <a-popconfirm
            :title="$t('roleManager.del_confirm')"
            :ok-text="$t('yes')"
            :cancel-text="$t('no')"
            @confirm="deleteRole(record.id)"
          >
            <a-tooltip v-auth="$buttonConfig.system.role_manager.deleteRole" placement="bottom">
              <template slot="title">
                <span>{{ $t("roleManager.removed") }}</span>
              </template>
              <a class="btn-a">
                <a-icon type="delete" style="margin-left:3px" />
              </a>
            </a-tooltip>
          </a-popconfirm>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import UM from "@/service/um";
import comm from '@/utils/common.js';

import SearchModule from '@/components/SearchModule';

export default {
  components: {
    SearchModule
  },
  data() {
    return {
      current: 1,
      total: 0,
      pageSize: 10,
      advancedVisible: 'true',
      seniorQList: [
        { value: 'name', name: this.$t('roleManager.role_name'), inputLength: 40,
          rules: ['inputValue', {
            rules: [{
            }, { required: true, message: this.$t('product.product_name_required') }]
          }]
        }
        // { value: 'describe', name: this.$t('roleManager.description'), inputLength: 20 }
        // { value: 3, name: this.$t('roleManager.crate_time'), SearchSeqNo: 3, InputType: 'datarange' }
      ], // 高级查询
      roleList: [],
      columns: [
         {
          title: this.$t('roleManager.role_name'),
          dataIndex: 'name',
          sorter: (a, b) => comm.localeCompare(a.name, b.name)
        },
        {
          title: this.$t('roleManager.description'),
          dataIndex: 'describe'
        },
        {
          title: this.$t('roleManager.crate_time'),
          dataIndex: 'createAt',
          sorter: (a, b) => comm.localeCompare(a.createAt, b.createAt)
        }
      ],
      loading: false,
      buttons: sessionStorage.getItem('authBtns'),
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
      }
    };
  },
  mounted() {
    if (this.buttons.indexOf(this.$buttonConfig.system.role_manager.deleteRole) != -1 || this.buttons.indexOf(this.$buttonConfig.system.role_manager.editRole) != -1) {
      this.columns.push(
          {
            title: this.$t('roleManager.action'),
            scopedSlots: { customRender: 'operation' },
            width: 100
          }
      );
    }
    this.queryRoleList();
  },
  methods: {
    changePage(pageNumber) {
      this.current = pageNumber;
      this.queryRoleList();
    },
    queryRoleList(res) {
      this.roleList = [];
      this.loading = true;

      const param = {
        pageIndex: this.current,
        pageSize: this.pageSize,
        sort: 1
      };
      if (res) {
        // 插入查询条件
        param[res.inputSelected] = res.inputValue
      }
      UM.roleQuery(param).then((res) => {
        this.loading = false;
        if (res && res.data && res.data.length > 0) {
          this.roleList = res.data;
          this.total = res.totalCount;
          this.roleList.forEach((element) => {
            element.createAt = comm.dateStringFormat(element.createAt);
          });
        }
      }).catch(err => {
        this.$message.error(err.errorMsg);
      })
    },

    searchByParams(e) {
      this.roleList = [];
      this.loading = true;
      const param = { sort: 1 };

      // Query conditions returned by the loop query template. 循环查询模板返回的查询条件
      for (let i = 0; i < e.length; i++) {
        // Assign a value to the query condition service name.
        if (e[i].InputId == '1') {
          param.name = e[i].InputValue;
        }
        // Assign a value to the query condition service type.
        if (e[i].InputId == '2') {
          param.describe = e[i].InputValue;
        }
        // Assign a value to the query condition time.
        if (e[i].InputId == '3') {
          param.createdAt =
              { 'from': new Date(e[i].InputValue[0]), 'to': new Date(e[i].InputValue[1]) };
        }
      }
      UM.roleQuery(param).then((res) => {
        this.loading = false;
        if (res && res.data && res.data.length > 0) {
          this.total = res.totalCount;
          this.roleList = res.data;
          this.roleList.forEach((element) => {
            element.createAt = comm.dateStringFormat(element.createAt);
          });
        }
      }).catch(err => {
        this.$message.error(err.errorMsg);
      })
    },
    addRole() {
      localStorage.setItem('roleManagerData', null)
      this.$router.push({
        path: '/roleManagerAddRole'
      });
    },
    deleteRole(id) {
      UM.deleteRole(id).then((data) => {
        if (data != 0) {
          this.$message.info(data.errorMsg);
          return;
        }
        this.$message.success(this.$t("userManager.delete_role_success"));
        this.queryRoleList();
      }).catch(err => {
        this.$message.error(err.errorMsg);
      })
    },
    updateMenu(record) {
      // this.global.roleData = record
      localStorage.setItem('roleManagerData', JSON.stringify(record))
      this.$router.push({ path: '/roleManagerEditRole' });
    },

    /**
     * @description: a callback function, executed when the page number is changed, and it takes the resulting page number and pageSize as its arguments
     * @param {type}
     * @return:
     */
    // 改变每页数量时更新显示
    /**
     * @description: a callback function, executed when pageSize is changed  改变每页数量时更新显示
     * @param {type}
     * @return:
     */
    showSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.queryRoleList();
    },

    /**
     * @description: a callback function show total number
     * @param {type}
     * @return:
     */
    showTotal(total) {
      return this.$t("system.totalLeft") + this.pagination.total + this.$t("system.totalRight");
    }
  }
};
</script>

<!--<style src="@/style/common.less" lang="less"></style>-->
<style lang="less">
.role-manager {
  background-color: #ffffff;
  min-height: 240px;
  padding: 26px 32px;
  box-sizing: border-box;
}

.role_mgr {
  margin: 0 20px 0 20px;

  .content-body .pagination {
    text-align: right;
    padding-top: 20px;
    position: relative;
  }

  .content-body .btn-a {
    padding: 0 5px;
  }
}
</style>

