<template>
  <div>
    <div class="group-manager">
      <a-row type="flex">
        <a-col :flex="3" style="width: 363px; padding-right: 20px">
          <CollapseCard ref="tree" :title="$t('noti.notification_directory')">
            <a-tree
              default-expand-all
              show-line
              :tree-data="parentGroups"
              :check-strictly="true"
              style="min-height: 350px"
              @select="onSelect"
            >
              <template slot="Default" slot-scope="node">
                <span class="custom-node" @dblclick="showMxGraph('edit', node)">
                  <span class="node node-title">
                    <span>{{ node.NotificationName }}</span>
                    <span class="extra-tools">
                      <a-dropdown :get-popup-container="(e) => e.parentNode">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                        >
                          {{ $t('comm.action') }}<a-icon type="down" />
                        </a>
                        <a-menu
                          slot="overlay"
                          overlay-class-name="dropdown-item"
                        >
                          <a-menu-item key="1" @click="gotoEdit(node)">
                            <a>{{ $t('noti.edit_notification') }}</a>
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </span>
                </span>
              </template>
              <template slot="ByProductID" slot-scope="node">
                <span class="custom-node" @dblclick="showMxGraph('edit', node)">
                  <span class="node node-title">
                    <span>{{ node.title }}</span>
                    <span class="extra-tools">
                      <a-dropdown :get-popup-container="(e) => e.parentNode">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                        >
                          {{ $t('comm.action') }}<a-icon type="down" />
                        </a>
                        <a-menu
                          slot="overlay"
                          overlay-class-name="dropdown-item"
                        >
                          <a-menu-item key="1" @click="addNotification(node)">
                            <a>{{ $t('noti.add_notification') }}</a>
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </span>
                </span>
              </template>
              <template slot="Untitled" slot-scope="node">
                <span class="custom-node" @dblclick="showMxGraph('edit', node)">
                  <span class="node node-title">
                    <span>{{
                      node.NotificationName ? node.NotificationName : $t('noti.untitled')
                    }}</span>
                    <span class="extra-tools">
                      <a-dropdown :get-popup-container="(e) => e.parentNode">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                        >
                          {{ $t('comm.action') }}<a-icon type="down" />
                        </a>
                        <a-menu
                          slot="overlay"
                          overlay-class-name="dropdown-item"
                        >
                          <a-menu-item key="0" @click="gotoEdit(node)">
                            <a>{{ $t('noti.edit_notification') }}</a>
                          </a-menu-item>
                          <a-menu-item key="1" @click="gotoValidation(node)">
                            <a>{{ $t('noti.edit_validation') }}</a>
                          </a-menu-item>
                          <a-menu-item key="2" @click="showDelete(node)">
                            <a>{{ $t('noti.delete_notification') }}</a>
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </span>
                </span>
              </template>
            </a-tree>
          </CollapseCard>
        </a-col>
        <a-col :flex="7">
          <!-- user list view -->
          <CollapseCard :title="$t('noti.validation')">
            <a-table
              class="table-content"
              :columns="columns"
              :data-source="sourceList"
              :pagination="pagination"
            />
          </CollapseCard>
        </a-col>
      </a-row>
    </div>
    <a-modal
      v-model="dele"
      :title="$t('noti.delete_notification_title')"
      @ok="deleteNoti"
    >
      <p>
        {{ $t('noti.delete_notification_content') }}
      </p>
    </a-modal>
  </div>
</template>

<script>
import Noti from "@/service/notification";

export default {
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      sourceList: [],
      dele: false,
      parentGroups: [],
      treeGroups: [
        {
          title: this.$t('noti.loan_account_reminder'),
          key: "1",
          NoteType: "01",
          NoteLevel: "0",
          children: [
            {
              NotificationName: this.$t('noti.default'),
              NoteType: "01",
              NoteLevel: "1",
              key: "01",
              scopedSlots: {
                title: "Default"
              }
            },
            {
              title: this.$t('noti.by_product_id'),
              key: "02",
              NoteType: "01",
              NoteLevel: "2",
              scopedSlots: {
                title: "ByProductID"
              },
              children: []
            }
          ]
        },
        {
          title: this.$t('noti.loan_account_late_notification'),
          key: "2",
          NoteType: "02",
          NoteLevel: "0",
          children: [
            {
              NotificationName: this.$t('noti.default'),
              NoteType: "02",
              NoteLevel: "1",
              key: "03",
              scopedSlots: {
                title: "Default"
              }
            },
            {
              title: this.$t('noti.by_product_id'),
              key: "04",
              NoteType: "02",
              NoteLevel: "2",
              scopedSlots: {
                title: "ByProductID"
              },
              children: []
            }
          ]
        },
        {
          title: this.$t('noti.account_statement'),
          key: "3",
          NoteType: "03",
          NoteLevel: "0",
          children: [
            {
              NotificationName: this.$t('noti.default'),
              NoteType: "03",
              NoteLevel: "1",
              key: "05",
              scopedSlots: {
                title: "Default"
              }
            }
          ]
        }
      ],
      pagination: {
        defaultCurrent: 1, // defaultCurrent
        showSizeChanger: true, // 显示可改变每页数量
        showQuickJumper: true, // 是否可以快速跳转至某页
        pageSizeOptions: ["10", "20", "30", "40"], // 每页数量选项
        total: 0, // 数据总数
        showTotal: (total) => this.showTotal(total)
      }
    };
  },
  computed: {
    columns() {
      return [
        {
          title: this.$t('noti.validtion_type'),
          dataIndex: "Type"
        },
        {
          title: this.$t('noti.product_id'),
          dataIndex: "ProductId"
        }
      ];
    }
  },

  mounted() {
    this.queryTree();
  },
  methods: {
    onSelect(a, b) {
      const obj = b.node.$vnode.data.props;
      this.sourceList = [];
      Noti.queryNotificationProduct({
        ...obj
      }).then((res) => {
        if (res.Records?.length > 0) {
          res.Records.forEach((element) => {
            const obj = {
              ProductId: element,
              key: element,
              Type: this.$t('noti.product_id')
            };
            this.sourceList.push(obj);
          });
          this.pagination.total = res.Records.length;
        } else {
          this.sourceList = []
          this.pagination.total = 0
        }
      });
    },
    showDelete(node) {
      this.dele = true;
      this.node = node;
    },
    deleteNoti() {
      this.dele = false;
      Noti.deleteNotification({
        TempId: this.node.TempId
      }).then((res) => {
        if (res.State === "ok") {
          this.$message.success(this.$t('noti.delete_notification_success'));
          this.queryTree();
        }
      });
    },
    queryTree() {
      this.Reminder = []
      this.Late = []
      this.parentGroups = JSON.parse(JSON.stringify(this.treeGroups));
      Noti.queryNotification({}).then((res) => {
        if (res.Records) {
          res.Records.forEach((item) => {
            item.key = item.TempId;
            if (item.NoteType === "01") {
              if (item.NoteLevel === "1") {
                this.ReminderDefault = JSON.parse(JSON.stringify(item));
              }
              if (item.NoteLevel === "2") {
                item.scopedSlots = { title: "Untitled" };
                this.Reminder.push(item);
              }
            }
            if (item.NoteType === "02") {
              if (item.NoteLevel === "1") {
                this.LateDefault = JSON.parse(JSON.stringify(item));
              }
              if (item.NoteLevel === "2") {
                item.scopedSlots = { title: "Untitled" };
                this.Late.push(item);
              }
            }
            if (item.NoteType === "03") {
              if (item.NoteLevel === "1") {
                this.StatementDefault = JSON.parse(JSON.stringify(item));
              }
            }
          });
          this.parentGroups.forEach((element) => {
            element.children.forEach((item) => {
              if (item.key === "01" && this.ReminderDefault) {
                item.TempId = this.ReminderDefault.TempId
              } else if (item.key === "02" && this.Reminder.length > 0) {
                item.children = this.Reminder;
              } else if (item.key === "03" && this.LateDefault) {
                item.TempId = this.LateDefault.TempId
              } else if (item.key === "04" && this.Late.length > 0) {
                item.children = this.Late;
              } else if (item.key === "05" && this.StatementDefault) {
                item.TempId = this.StatementDefault.TempId
              }
            });
          });
        }
      });
    },
    gotoEdit(node) {
      const url = "/notification/edit";
      if (!node.TempId) {
        this.$router.push({
          path: url,
          query: {
            NotificationName: node.NotificationName,
            NoteLevel: node.NoteLevel,
            NoteType: node.NoteType
          }
        });
      } else {
        this.$router.push({ path: url, query: { TempId: node.TempId, NoteLevel: node.NoteLevel, NoteType: node.NoteType }});
      }
    },
    gotoValidation(node) {
      const url = "/notification/validation";
      this.$router.push({
        path: url,
        query: {
          TempId: node.TempId,
          NoteMethod: node.NoteMethod,
          NoteType: node.NoteType
        }
      });
    },
    addNotification(node) {
      let NoteType;
      if (node.eventKey === "02") {
        NoteType = "01";
      } else if (node.eventKey === "04") {
        NoteType = "02";
      }
      Noti.addNotification({
        NoteMethod: "1",
        NoteType: NoteType,
        NoteLevel: "2"
      }).then((res) => {
        if (res.State === "ok") {
          this.$message.success(this.$t('noti.add_notification_success'));
          this.queryTree();
        }
      });
    },

    showTotal(total) {
      return (
        this.$t("system.totalLeft") +
        this.pagination.total +
        this.$t("system.totalRight")
      );
    }
  }
};
</script>

<style lang="less" scoped>
@file-color: #1acdff;
@folder-color: #577eff;
@edit-color: rgb(37, 75, 199);
@delete-color: rgb(163, 82, 103);
@deep: ~">>>";

.content-space {
  height: 100%;
  width: 2%;
  background-color: #eee;
}

.node {
  align-items: center;
  text-align: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  // align-items: center;
}

.node-title {
  display: flex;
  justify-content: space-between;
  text-align: left;
  box-sizing: border-box;

  .extra-tools {
    text-align: right;
    box-sizing: border-box;
    padding-right: 24px;
  }
}

.node-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100px;
  margin-left: 5px;
}

.custom-node {
  width: 100%;

  &:hover {
    .extra-tools {
      display: inline;
    }
  }

  span {
    flex: 1;
  }
}

.extra-tools {
  display: none;
}

.submit-area {
  text-align: right;
  margin-bottom: 10px;
}

.sumbit-button {
  margin-right: 20px;
}

.actionIcon {
  color: #1e90ff;
  margin-left: 10px;
}

.transfer {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}

@{deep} .ant-tree {
  overflow: hidden;
}

@{deep} .ant-tree-node-content-wrapper {
  width: 100%;
}

.ant-pagination-total-text {
  position: absolute;
  left: 5px;
}

/deep/ .ant-dropdown .ant-dropdown-menu {
  padding: 8px;

  .ant-dropdown-menu-item:before {
    display: none;
  }
}
</style>
