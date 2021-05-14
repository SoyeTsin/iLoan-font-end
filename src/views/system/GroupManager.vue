<template>
  <div>
    <!-- edit group user model view -->
    <div v-if="showEditGroupUserView">
      <div class="group-manager">
        <a-transfer
          :list-style="{
            width: 'calc(50% - 20px)',
            height: '600px'
          }"
          class="transfer"
          :data-source="allUserList"
          :show-search="true"
          :filter-option="filterOption"
          :target-keys="selectedKeys"
          :render="(item) => item.username"
          :row-key="(record) => record.id"
          @change="handleChange"
        />
      </div>
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
        "
      >
        <a-button style="margin-right: 20px" @click="ResetDate">{{
          $t("message.reset_btn")
        }}</a-button>
        <a-button type="primary" @click="editGroupUseSubmitEvent">{{
          $t("Utils.submit")
        }}</a-button>
      </div>
    </div>
    <div v-else class="group-manager">
      <a-row type="flex">
        <a-col :flex="3" style="width: 363px; padding-right: 20px">
          <CollapseCard ref="tree" :title="$t('groupManager.group_directory')">
            <a-tree
              v-if="treeState == 1"
              default-expand-all
              show-line
              :tree-data="parentGroups"
              :load-data="getChildrenGroupList"
              :check-strictly="true"
              style="min-height: 350px"
              @select="onSelect"
            >
              <!-- normal node -->
              <template slot="title" slot-scope="node">
                <span
                  class="custom-node"
                  style="margin-bottom: 150px"
                  @dblclick="showMxGraph('edit', node)"
                >
                  <!-- title: name + tools -->
                  <span class="node node-title">
                    <span>{{ node.name }}</span>
                    <span class="extra-tools">
                      <!--                  <span>-->
                      <a-dropdown :get-popup-container="(e) => e.parentNode">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                        >
                          {{ $t("message.action") }}<a-icon type="down" />
                        </a>
                        <a-menu
                          slot="overlay"
                          overlay-class-name="dropdown-item"
                        >
                          <a-menu-item
                            key="1"
                            v-auth="$buttonConfig.system.group_manager.addGroup"
                            @click="openAddingPanel('groupAdd', node)"
                          >
                            <a>{{ $t("groupManager.new_subgroup") }}</a>
                          </a-menu-item>
                          <a-menu-item
                            key="2"
                            v-auth="
                              $buttonConfig.system.group_manager.editGroup
                            "
                            @click="openAddingPanel('editGroup', node)"
                          >
                            {{ $t("groupManager.editGroupName") }}
                          </a-menu-item>
                          <a-menu-item
                            key="3"
                            v-auth="
                              $buttonConfig.system.group_manager.addGroupUser
                            "
                            @click="openAddingPanel('editGroupMember', node)"
                          >
                            {{ $t("groupManager.editGroupUser") }}
                          </a-menu-item>
                          <a-menu-item
                            key="4"
                            v-auth="
                              $buttonConfig.system.group_manager.deleteGroup
                            "
                            @click="deleteNode(node)"
                          >
                            <!-- <a-popconfirm
                              :title="$t('groupManager.confirm_delete_group_msg')"
                              :ok-text="$t('groupManager.yes_msg')"
                              :cancel-text="$t('groupManager.no_msg')"
                              @confirm="deleteGroup(node)"
                              @cancel="cancel"
                            >
                              {{ $t('groupManager.deleteGroup') }}
                            </a-popconfirm> -->
                            {{ $t("groupManager.deleteGroup") }}
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </span>
                </span>
              </template>
              <!-- root node -->
              <template slot="titleroot" slot-scope="node">
                <span class="custom-node" @dblclick="showMxGraph('edit', node)">
                  <span class="node node-title">
                    <span>{{ node.name }}</span>
                    <span class="extra-tools">
                      <!--                  <span>-->
                      <a-dropdown :get-popup-container="(e) => e.parentNode">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                        >
                          {{ $t("message.action") }}<a-icon type="down" />
                        </a>
                        <a-menu
                          slot="overlay"
                          overlay-class-name="dropdown-item"
                        >
                          <a-menu-item
                            key="1"
                            @click="openAddingPanel('groupAdd', node)"
                          >
                            <a>{{ $t("groupManager.new_subgroup") }}</a>
                          </a-menu-item>
                          <a-menu-item
                            key="3"
                            @click="openAddingPanel('editGroupMember', node)"
                          >
                            {{ $t("groupManager.editGroupUser") }}
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
        <a-col :flex="7" style="overflow-x: auto">
          <!-- user list view -->
          <CollapseCard :title="$t('groupManager.userList')">
            <a-table
              class="table-content"
              :columns="columns"
              row-key="id"
              :data-source="sourceList"
              :pagination="pagination"
            >
              <span
                slot="operation"
                slot-scope="record"
                v-auth="$buttonConfig.system.group_manager.deleteGroupUser"
              >
                <a-popconfirm
                  :title="$t('groupManager.confirm_delete_user_msg')"
                  :ok-text="$t('groupManager.yes_msg')"
                  :cancel-text="$t('groupManager.no_msg')"
                  @confirm="deleteUserEvent(record)"
                  @cancel="cancel"
                >
                  <a-icon class="actionIcon" type="delete" theme="outlined" />
                </a-popconfirm>
              </span>
            </a-table>
          </CollapseCard>
        </a-col>
      </a-row>
      <!-- add group model view -->
      <a-modal
        v-model="showAddGroupView"
        :footer="null"
        :title="
          isEdit
            ? $t('groupManager.editModelTitle')
            : $t('groupManager.groupModelTitle')
        "
      >
        <a-form :form="form" :self-update="true">
          <a-form-item
            :label="$t('groupManager.groupName')"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'groupName',
                {
                  rules: [
                    { type: 'string' },
                    {
                      required: true,
                      message: $t('groupManager.groupName_required')
                    }
                  ]
                }
              ]"
              :max-length="40"
            />
          </a-form-item>

          <a-form-item
            :label="$t('groupManager.description')"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-textarea v-model="groupDes" rows="3" :max-length="20" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }" class="submit-area">
            <a-button
              type="primary"
              class="sumbit-button"
              @click="submitEvent"
            >{{ $t("message.save_btn") }}</a-button>
            <a-button @click="submitCancelEvent">{{
              $t("message.reset_btn")
            }}</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal
        v-model="dele"
        :title="$t('groupManager.confirm_delete_group_msg')"
        :ok-text="$t('groupManager.yes_msg')"
        :cancel-text="$t('groupManager.no_msg')"
        @ok="deleteGroup"
      >
        <p>{{ $t("groupManager.confirm_delete_group_content") }}</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import UM from "@/service/um";
import comm from "../../utils/common.js";

import {
  // eslint-disable-next-line no-unused-vars
  SSL_OP_SSLEAY_080_CLIENT_DH_BUG
} from "constants";

export default {
  components: {},
  data() {
    return {
      dele: false,
      // add group info form
      form: this.$form.createForm(this),
      // mark show or hidden add group view
      showAddGroupView: false,
      // mark show or hidden add edit group user view
      showEditGroupUserView: false,
      // selected group user list
      sourceList: [],
      // all group list
      groupList: [],
      // default tree data
      parentGroups: [],
      // all user list
      allUserList: [],
      // seleted group info
      currentNode: {},
      // selected current group user id list
      selectedKeys: [],
      // mark this edit group info is add or update
      isEdit: false,
      // edit group name
      groupName: "",
      groupsId: "",
      // edit group des
      groupDes: "",
      // selected group user
      currentGroupAllUser: [],
      defaultSelectedKeys: [0],
      // mark tree reload again
      treeState: 1,
      // buttonList
      oldAllUserList: [],
      oldSelectedKeys: [],
      time: 0,
      buttons: sessionStorage.getItem("authBtns"),
      seniorQList: [
        { value: 1, name: "User Id", SearchSeqNo: 1, InputType: "text" }
      ], // 高级查询
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
  computed: {
    /**
     * @description: list component show column list
     * @param: none
     * @return: column list
     */
    columns() {
      return [
        {
          title: this.$t("groupManager.userName"),
          dataIndex: "username",
          sorter: (a, b) => a["username"].localeCompare(b["username"])
        },
        {
          title: this.$t("groupManager.email"),
          dataIndex: "email"
        },
        {
          title: this.$t("groupManager.phone"),
          dataIndex: "mobile"
        },
        {
          title: this.$t("groupManager.createdTime"),
          dataIndex: "createAt",
          sorter: (a, b) => a["createAt"].localeCompare(b["createAt"])
        }
        // {
        //     title: this.$t("group_manager.action"),
        //     scopedSlots: {
        //         customRender: "operation"
        //     }
        // }
      ];
    }
  },
  watch: {
    $route(to, from) {
      this.init(to.name)
    }
  },
  mounted() {
    this.init(this.$route.name)
  },
  methods: {
    init(name) {
      this.time++
      if (this.time > 0) {
        if (name === "editUser") {
        this.showEditGroupUserView = true;
        this.queryAllUserList(true);
      } else {
        if (
          this.buttons.indexOf(
            this.$buttonConfig.system.group_manager.deleteGroupUser
          ) != -1
        ) {
          this.columns.push({
            title: this.$t("groupManager.action"),
            scopedSlots: {
              customRender: "operation"
            }
          });
        }
        this.showEditGroupUserView = false;
        this.queryAllUserList(false);
        this.queryGroupList();
      }
      }
    },
    /**
     * @description: tree selected callback func
     * @param {type}
     * @return:
     */
    onSelect(keys, { selected: bool, selectedNodes, node, event }) {
      this.currentNode = node.dataRef;
      // console.log('se')
      this.getUserList(this.currentNode);
      this.defaultSelectedKeys = [this.currentNode.id];
    },

    /**
     * @description: expand tree callbact event
     * @param {type}
     * @return:
     */
    onExpand() {
      // console.log("Trigger Expand");
    },
    /**
     * @description: dblclick callback
     * @param {type}
     * @return:
     */
    showMxGraph(method, node) {
      // console.log("showMxGraph", node);
    },

    /**
     * @description: node icon click callback
     * @param {type}
     * @return:
     */
    openAddingPanel(method, node) {
      // add group event
      if (method == "groupAdd") {
        this.isEdit = false;
        this.showAddGroupView = true;
        // this.currentNode = node;
        this.groupDes = "";
        this.groupName = "";
        this.form.getFieldDecorator("groupName");
        this.form.setFieldsValue({
          groupName: ""
        });
      } else if (method == "editGroup") {
        // edit group event
        this.isEdit = true;
        this.currentNode = node;
        this.showAddGroupView = true;
        this.groupDes = this.currentNode.describe;
        this.groupName = this.currentNode.name;
        this.form.getFieldDecorator("groupName");
        this.form.setFieldsValue({
          groupName: this.currentNode.name
        });
      } else if (method == "editGroupMember") {
        // edit group user event
        // this.currentNode = node;
        this.$router.push({ path: "/groupManager/eidt" });
        // this.showEditGroupUserView = true;
      }
    },

    /**
     * @description: query group list
     * @param {type}
     * @return:
     */
    queryGroupList() {
      this.treeState = 0;
      // console.log("loadedKeys:  ", /this.loadedKeys)

      this.parentGroups = [];
      // post params
      const params = {
        pageSize: 99999999,
        pageIndex: 1
      };
      const vs = this;
      this.currentNode = {};
      // sent post request
      UM.queryGroupList(params).then((res) => {
        vs.treeState = 1;
        const rootNode = {
          id: 0,
          name: "iLoan",
          parentId: -1,
          scopedSlots: {
            title: "titleroot"
          },
          children: []
        };
        if (res) {
          vs.groupList = res.data;
          if (vs.groupList.length > 0) {
            const group = vs.groupList[0];
            vs.defaultSelectedKeys = [];
            vs.defaultSelectedKeys.push(group.id);
            const tempG = vs.getChildrenGroupList(rootNode);
            rootNode.children = [...tempG];
          }
        }
        vs.parentGroups = [rootNode];
      });
    },

    /**
     * @description: get user list by group
     * @param {type}
     * @return:
     */
    getUserList(group) {
      this.groupsId = group.id;
      if (group.id == -1) {
        return;
      }
      // {"username":"kkk","mobile":"68888","email":"w222@121,con","role":1,"groupId":14,"sort":1,"orderBy":"created_at","pageSize":10,"pageIndex":1}
      const params = {
        sort: 1,
        orderBy: "created_at",
        pageSize: this.pageSize,
        pageIndex: this.pageNum,
        groupId: group.id
      };

      UM.queryUserList(params).then((res) => {
        if (res) {
          this.sourceList = res.data;
          this.pagination.total = res.totalCount;
        } else {
          this.sourceList = [];
          this.pagination.total = 0;
          this.pageNum = 1;
        }
        // format date
        this.sourceList.forEach((element) => {
          element.createAt = comm.dateStringFormat(element.createAt);
        });
      });
    },
    // 根据条件查询所有用户数据，不分页
    /**
     * @description: query all user by group
     *               when group is none query all user
     * @param {type}
     * @return:
     */
    queryAllUserList(haveGroupId) {
      const params = {
        sort: 1,
        orderBy: "created_at",
        pageSize: 9999999,
        pageIndex: 1
      };

      if (haveGroupId) {
        params.groupId = this.currentNode.id;
      }

      UM.queryUserList(params).then((res) => {
        if (res) {
          // query selected user
          if (haveGroupId) {
            this.selectedKeys = [];
            res.data.forEach((item) => {
              item["key"] = item.id.toString();
              item["title"] = item.id;
            });
            this.currentGroupAllUser = res.data;
            this.currentGroupAllUser.forEach((element) => {
              this.selectedKeys.push(element.id);
              this.oldSelectedKeys.push(element.id);
            });
          } else {
            this.allUserList = res.data;
            this.oldAllUserList = res.data;
          }
        }
      });
    },
    ResetDate() {
      this.selectedKeys = this.oldSelectedKeys;
      this.allUserList = this.oldAllUserList;
    },
    /**
     * @description: get group childen list by node
     * @param {type}
     * @return:
     */
    getChildrenGroupList(node) {
      const childrenGroups = [];
      // 获取一级节点
      // get root node
      if (node.parentId == 0 || node.parentId == -1) {
        this.getUserList(node);
        this.groupList.forEach((group) => {
          if (group.parentId == node.id) {
            group.scopedSlots = {
              title: "title"
            };
            group.children = [];
            childrenGroups.push(group);
          }
        });
        return childrenGroups;
      } else {
        // 获取每个节点的后续节点
        const vs = this;
        // get selected children node
        return new Promise((resolve) => {
          if (node.dataRef.children.length != 0) {
            resolve();
            return;
          }
          setTimeout(() => {
            vs.groupList.forEach((group) => {
              if (group.parentId == node.dataRef.id) {
                group.scopedSlots = {
                  title: "title"
                };
                group.children = [];
                childrenGroups.push(group);
              }
            });
            node.dataRef.children = childrenGroups;
            vs.parentGroups = [...vs.parentGroups];
            resolve();
          }, 200);
        });
      }
    },

    /**
     * @description: delete group event 删除用户组确认事件
     * @param {type}
     * @return:
     */
    confirm(node) {},

    /**
     * @description: 删除用户组取消事件
     * @param {type}
     * @return:
     */
    cancel() {},

    /**
     * @description: modify group cancel event 添加修改用户组取消事件
     * @param {type}
     * @return:
     */
    submitCancelEvent() {
      this.showAddGroupView = false;
      // this.currentNode = {};
      this.groupDes = "";
      this.groupName = "";
    },

    /**
     * @description: modify group confirm event 添加修改用户组提交事件
     * @param {type}
     * @return:
     */
    submitEvent() {
      // const vs = this;
      this.form.validateFields((err, values) => {
        if (err) {
          //
        } else {
          // 为空或全部为空格
          if (this.groupDes.match(/\s+/g)) {
            this.$message.info(this.$t("userManager.description_limit_space"));
          } else {
            this.groupName = values.groupName;
            if (this.isEdit == true) {
              this.editGroupInfo();
            } else {
              this.addGroupInfo();
            }
          }
        }
      });
    },
    // 编辑组用户提交事件
    /**
     * @description: edit group user sumbit event
     * @param {type}
     * @return:
     */
    editGroupUseSubmitEvent() {
      this.checkAndOrDelGroupUser();
    },
    // 编辑用户组取消事件
    /**
     * @description: edit group user cancel event
     *               clean all selected data
     * @param {type}
     * @return:
     */
    editGroupUseCancelEvent() {
      this.selectedKeys = [];
      this.currentGroupAllUser = [];
      // this.showEditGroupUserView = false;
      this.$router.push({ path: "/groupManager" });
    },

    /**
     * @description: transfer callback group user selected
     * @param {type}
     * @return:
     */
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.selectedKeys = targetKeys;
    },
    /**
     * @description: transfer callback filterOption
     * @param {type}
     * @return:
     */
    filterOption(inputValue, option) {
      return option.username.indexOf(inputValue) > -1;
    },

    /**
     * @description: delete user event
     * @param {type}
     * @return:
     */
    deleteUserEvent(uInfo) {
      this.deleteUser(uInfo);
    },

    /**
     * @description: send delete user to service
     * @param {type}
     * @return:
     */
    deleteUser(uInfo) {
      const params = {
        groupId: this.groupsId,
        users: [uInfo.id]
      };

      UM.deleteusers(params).then((res) => {
        this.getUserList(this.currentNode);
      });
    },

    /**
     * @description: send group info to service
     * @param {type}
     * @return:
     */
    editGroupInfo() {
      const params = {
        name: this.groupName,
        id: this.currentNode.id,
        describe: this.groupDes
      };
      UM.updateGroup(params).then((res) => {
        this.queryGroupList();
        this.showAddGroupView = false;
      });
    },

    /**
     * @description: send add group data
     * @param {type}
     * @return:
     */
    addGroupInfo() {
      const params = {
        describe: this.groupDes,
        parentId: this.currentNode.id,
        name: this.groupName
      };
      UM.addGroup(params).then((res) => {
        this.queryGroupList();
        this.showAddGroupView = false;
      });
    },

    /**
     * @description: send delete group to service
     * @param {type}
     * @return:
     */
    deleteGroup() {
      const params = this.node.id;
      this.dele = false;
      UM.deleteGroup(params).then((res) => {
        this.queryGroupList();
        this.$message.success(this.$t("userManager.delete_group_success"));
      });
    },

    deleteNode(node) {
      this.node = node;
      this.dele = true;
    },

    /**
     * @description: check user in this group is add or delete
     *               send to service
     * @param {type}
     * @return:
     */
    checkAndOrDelGroupUser() {
      // get delete users
      const delUserIds = [];
      this.currentGroupAllUser.forEach((oldUser) => {
        let have = false;
        const len = this.selectedKeys.length;
        for (let index = 0; index < len; index++) {
          const newUser = this.selectedKeys[index];
          if (oldUser.id == newUser) {
            have = true;
            break;
          }
        }
        if (have == false) {
          delUserIds.push(oldUser.id);
        }
      });
      // get add users
      const addUserIds = [];
      this.selectedKeys.forEach((newUser) => {
        let have = false;
        const len = this.currentGroupAllUser.length;
        for (let index = 0; index < len; index++) {
          const oldUser = this.currentGroupAllUser[index];
          if (oldUser.id == newUser) {
            have = true;
            break;
          }
        }
        if (have == false) {
          addUserIds.push(newUser);
        }
      });
      // send  delete event to service
      if (delUserIds.length > 0) {
        this.deleteGroupUser(delUserIds);
      }
      // send  add event to service
      if (addUserIds.length > 0) {
        this.addGroupUser(addUserIds);
      }
      // when no add and delete user close this view
      if (delUserIds.length == 0 && addUserIds.length == 0) {
        this.editGroupUseCancelEvent();
      }
    },

    /**
     * @description: add group
     * @param {type}
     * @return:
     */
    addGroupUser(users) {
      const params = {
        ring: 5,
        groupId: this.currentNode.id,
        users: users
      };
      UM.addGroupUser(params).then((res) => {
        this.getUserList(this.currentNode);
        this.editGroupUseCancelEvent();
      });
    },

    /**
     * @description: delete group
     * @param {type}
     * @return:
     */
    deleteGroupUser(users) {
      const params = {
        ring: 5,
        groupId: this.currentNode.id,
        users: users
      };
      UM.deleteGroupUser(params).then((res) => {
        this.getUserList(this.currentNode);
        this.editGroupUseCancelEvent();
      });
    },

    /**
     * @description: a callback function, executed when the page number is changed, and it takes the resulting page number and pageSize as its arguments
     * @param {type}
     * @return:
     */
    changePage(page, pageSize) {
      this.pageSize = pageSize;
      this.pageNum = page;
      this.getUserList(this.currentNode);
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
      this.getUserList(this.currentNode);
    },

    /**
     * @description: a callback function show total number
     * @param {type}
     * @return:
     */
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
