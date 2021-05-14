<template>
  <div class="user-manager">
    <SearchModule :input-select="seniorQList" @query="getUserList" />
    <div class="content-body">
      <a-button
        v-auth="$buttonConfig.system.user_manager.addUser"
        type="primary"
        icon="plus"
        style="margin-bottom: 26px"
        @click="addEvent()"
      >
        {{ $t("userManager.add") }}
      </a-button>
      <a-table
        :columns="columns"
        :row-key="
          record => {
            return record.id;
          }
        "
        :data-source="sourceList"
        :loading="loading"
        :pagination="pagination"
      >
        <span slot="mobile" slot-scope="text, item">
          {{ item.email }}
          {{ text }}
        </span>
        <span slot="groups" slot-scope="groups, item">
          <div style="margin-bottom: 6px">
            <a-tag
              v-for="(tag, index) in item.roles"
              :key="`roles_${index}`"
              color="blue"
            >
              {{ tag.name }}
            </a-tag>
          </div>
          <div>
            <a-tag
              v-for="(tag, index) in groups"
              :key="`groups_${index}`"
              color="green"
            >
              {{ tag.name }}
            </a-tag>
          </div>
        </span>

        <span slot="createAt" slot-scope="createAt">
          <span>{{ createAt }}</span>
        </span>

        <span slot="operation" slot-scope="record">
          <span
            v-auth="$buttonConfig.system.user_manager.editUser"
            class="actionIcon"
            @click="editUserEvent(record)"
          >
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("userManager.edit") }}</span>
              </template>
              <a-icon type="edit" class="actionIcon" style="margin-left:2px" />
            </a-tooltip>
            <!-- <a-icon type="edit" theme="outlined" /> -->
          </span>

          <span
            v-auth="$buttonConfig.system.user_manager.loginSetting"
            class="actionIcon"
            @click="editUserInfoValidDate(record)"
          >
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("userManager.loginSetting") }}</span>
              </template>
              <a-icon
                type="calendar"
                class="actionIcon"
                style="margin-left:3px"
              />
            </a-tooltip>
            <!-- <a-icon type="edit" theme="outlined" /> -->
          </span>
          <a-popconfirm
            :title="$t('userManager.unfreeze_user')"
            :ok-text="$t('menu.yes')"
            :cancel-text="$t('menu.no')"
            @confirm="unlockUserInfoValidDate(record)"
            @cancel="delCancel"
          >
            <span
              v-if="record.isActive == false"
              v-auth="$buttonConfig.system.user_manager.deactiveUser"
              class="actionIcon"
            >
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("userManager.unfreeze") }}</span>
                </template>
                <a-icon
                  type="unlock"
                  class="actionIcon"
                  style="margin-left:3px"
                />
              </a-tooltip>
              <!-- <a-icon type="edit" theme="outlined" /> -->
            </span>
          </a-popconfirm>
          <a-popconfirm
            :title="$t('userManager.freeze_user')"
            :ok-text="$t('menu.yes')"
            :cancel-text="$t('menu.no')"
            @confirm="lockUserInfoValidDate(record)"
            @cancel="delCancel"
          >
            <span
              v-if="(freeze = record.isActive == true)"
              v-auth="$buttonConfig.system.user_manager.activeUser"
              class="actionIcon"
            >
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("userManager.freeze") }}</span>
                </template>
                <a-icon
                  type="lock"
                  class="actionIcon"
                  style="margin-left:3px"
                />
              </a-tooltip>
              <!-- <a-icon type="edit" theme="outlined" /> -->
            </span>
          </a-popconfirm>
          <a-popconfirm
            v-if="authed"
            :title="$t('userManager.unbind_user')"
            :ok-text="$t('menu.yes')"
            :cancel-text="$t('menu.no')"
            @confirm="unBindUser(record)"
            @cancel="unBindCancel"
          >
            <span class="actionIcon">
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("userManager.unbind") }}</span>
                </template>
                <a-icon type="api" class="actionIcon" style="margin-left:3px" />
              </a-tooltip>
              <!-- <a-icon type="edit" theme="outlined" /> -->
            </span>
          </a-popconfirm>
          <!-- <span class="actionIcon" @click="deleteUserEvent(record)"> -->
          <a-popconfirm
            v-auth="$buttonConfig.system.user_manager.deleteUser"
            :title="$t('userManager.delete_user')"
            :ok-text="$t('menu.yes')"
            :cancel-text="$t('menu.no')"
            @confirm="deleteUserEvent(record)"
            @cancel="delCancel"
          >
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("userManager.delete") }}</span>
              </template>
              <a-icon
                type="delete"
                class="actionIcon"
                style="margin-left:8px"
              />
            </a-tooltip>

            <!-- <a-icon class="actionIcon" type="delete" theme="outlined"></a-icon> -->
          </a-popconfirm>
          <!-- </span> -->
        </span>
      </a-table>
    </div>
    <!-- add user model view -->
    <a-modal
      v-model="showAddUserView"
      :title="
        editUserInfo.id ? $t('userManager.editUser') : $t('userManager.addUser')
      "
      :footer="null"
      :width="600"
    >
      <a-form :self-update="true" :form="form" @submit="submitNewVersion">
        <a-form-item
          :label="$t('userManager.userName')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [
                  { pattern: '^[0-9 A-Z a-z]+$', type: 'string' },
                  { required: true, message: $t('message.please_correct_information') },
                ]
              }
            ]"
            :max-length="10"
            :placeholder="$t('message.input_your_user_id')"
            :disabled="editUserInfo.id ? true : false"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item
          :label="$t('userManager.nickname')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            v-decorator="[
              'nickname',
              {
                rules: [
                  {
                    pattern: new RegExp('^[a-zA-Z -&.\\\'\\\\()/,-]+$'),
                    type: 'string',
                    required: true,
                    message: $t('message.please_correct_information')
                  },
                ]
              }
            ]"
            :max-length="80"
            :min-length="1"
            autocomplete="off"
            :placeholder="this.$t('placeholder.input_employee_name')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('userManager.password')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    type: 'string',
                    required: true,
                    message: $t('message.please_correct_information')
                  }
                ]
              }
            ]"
            :placeholder="$t('userManager.passwordAlert')"
            type="password"
            :class="password"
            autocomplete="new-password"
          />
        </a-form-item>
        <a-form-item
          :label="$t('userManager.email')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  { type: 'email', message: $t('message.please_correct_information') },
                  { required: true, message: $t('message.please_correct_information') }
                ]
              }
            ]"
            :min-length="1"
            :max-length="254"
            autocomplete="off"
            class="email"
            :placeholder="$t('message.input_email')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('userManager.phone')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            v-decorator="[
              'mobile',
              {
                rules: [
                  {
                    pattern: new RegExp('^[0-9 -+()\\-\\\\#]+$'),
                    type: 'string',
                    required: true,
                    message: $t('message.please_correct_information')
                  }
                ]
              }
            ]"
            :min-length="1"
            :max-length="20"
            class="phone"
            autocomplete="off"
            :placeholder="$t('Utils.PhoneNumberTo')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('userManager.role')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select
            v-decorator="[
              'roles',
              { rules: [{ required: true, message: $t('userManager.selectRole') }] }
            ]"
            mode="multiple"
            :placeholder="$t('userManager.selectRole')"
            style="width: 100%"
            @change="roleHandleChange"
            @popupScroll="popupScroll"
          >
            <a-select-option v-for="item in roleList" :key="item.id">{{
              item.name
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('userManager.group')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-tree-select
            v-decorator="[
              'groups',
              { rules: [{ required: true, message: $t('userManager.selectGroup') }] }
            ]"
            style="width: 100%"
            :tree-data="groupTreeList"
            multiple
            :show-checked-strategy="SHOW_PARENT"
            :search-placeholder="$t('menu.please_select')"
            :placeholder="$t('userManager.selectGroup')"
            @change="groupHandleChange"
          />
        </a-form-item>
        <a-button type="primary" html-type="submit">
          {{ $t("userManager.confirm") }}
        </a-button>
        <a-button @click="newVersionCancel">{{
          $t("userManager.cancel")
        }}</a-button>
      </a-form>
    </a-modal>
    <a-modal
      v-model="showLoginSetting"
      :title="$t('userManager.loginSetting')"
      :ok-text="$t('userManager.confirm')"
      :cancel-text="$t('userManager.cancel')"
      @ok="submitTimeSetting"
      @cancel="newVersionCancel"
    >
      <a-form>
        <a-form-item
          :label="$t('userManager.startingTime')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-date-picker
            v-model="editUserInfo.accessBegin"
            show-time
            style="width: 100%"
            format="YYYY-MM-DD HH:mm:ss"
            :disabled="isClear"
            @change="changeDateBegin"
            @ok="datePickerOK"
          />
        </a-form-item>
        <a-form-item
          :label="$t('userManager.endTime')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-date-picker
            v-model="editUserInfo.accessEnd"
            show-time
            style="width: 100%"
            format="YYYY-MM-DD HH:mm:ss"
            :disabled="isClear"
            @change="changeDateEnd"
          />
        </a-form-item>
        <a-form-item
          :label="$t('userManager.clear')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-checkbox :checked="isClear" @change="loginSettingOnChange">
            {{ $t("userManager.clearTime") }}
          </a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import UM from "@/service/um";
import comm from "../../utils/common.js";
import moment from "moment";
import SearchModule from "@/components/SearchModule";

import { TreeSelect } from "ant-design-vue";
import inputValidate from "@/lib/input-validate";
// const

export default {
  components: {
    SearchModule
  },
  data() {
    return {
      seniorQList: [
        {
          value: "username",
          name: this.$t("userManager.userName"),
          inputLength: 10,
          rules: [
            "inputValue",
            {
              rules: [{}, { required: true, message: this.$t('message.input_user_id') }]
            }
          ]
        },
        {
          value: "email",
          name: this.$t("userManager.email"),
          inputLength: 254,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp("^[0-9 a-zA-Z\\-\\\\_\\\\@\\\\'\\\\]+$"),
                  type: "string",
                  min: 1,
                  message: this.$t('message.correct_email_format')
                },
                { required: true, message: this.$t('message.input_email') }
              ]
            }
          ]
        },
        {
          value: "mobile",
          name: this.$t("userManager.phone"),
          inputLength: 20,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp('^[0-9 -+()\\-\\\\#]+$'),
                  type: "string",
                  min: 1,
                  max: 20,
                  message: this.$t('message.please_correct_information')
                }
              ]
            }
          ]
        },
        {
          value: "nickname",
          name: this.$t("userManager.nickname"),
          inputLength: 80,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp('^[a-zA-Z -&.\\\'\\\\()/,-]+$'),
                  type: "string",
                  required: true,
                  message: this.$t('message.please_correct_information')
                }
              ]
            }
          ]
        },
        {
          value: "role",
          name: this.$t("userManager.role"),
          list: []
        },
        {
          value: "groupId",
          name: this.$t("userManager.group"),
          rules: [
            "inputValue",
            {
              inputLength: 40,
              rules: [
                {
                  pattern: new RegExp(
                    "^[0-9 a-zA-Z \\&\\\\/\\\\()\\\\-\\\\,\\\\.\\\\,\\\\'\\\\]+$"
                  ),
                  type: "string",
                  min: 1,
                  max: 40,
                  message: this.$t('message.correct_phone_format')
                },
                { required: true, message: this.$t('message.input_group') }
              ]
            }
          ],
          list: []
        }
      ], // 高级查询
      SHOW_PARENT: TreeSelect.SHOW_ALL,
      parentGroups: [],
      groupTreeList: [],
      form: this.$form.createForm(this, {}),
      advancedVisible: "true",
      sourceList: [],
      EApassword: true,
      showAddUserView: false, // 是否显示添加用户弹出框
      showLoginSetting: false,
      userName: "",
      nickname: "",
      password: "",
      email: "",
      phoneNum: "",
      selectedRoles: [],
      selectedGroups: [],
      selectedEndGroups: [],
      groupList: [],
      roleList: [],
      groupListQuery: [],
      roleListQuery: [],
      editUserInfo: {},
      pageSize: 10,
      pageNum: 1,
      totalCount: 0,
      searchParams: {},
      loading: false,
      reparams: {},
      isClear: false, // 登录设置中是否清除时间标志
      dateEnable: true, // 登录设置中时间是否可以选择
      buttons: sessionStorage.getItem("authBtns"),
      authed: false,
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
  computed: {
    params() {
      return this.$store.state.params;
    },
    columns() {
      return [
        {
          title: this.$t("userManager.userName"),
          dataIndex: "username",
          sorter: (a, b) => a["username"].localeCompare(b["username"])
        },
        {
          title: this.$t("userManager.email"),
          dataIndex: "email",
          children: [
            {
              title: this.$t("userManager.phone"),
              dataIndex: "mobile",
              scopedSlots: { customRender: "mobile" }
            }
          ]
        },

        {
          title: this.$t("userManager.role"),
          dataIndex: "roles",
          scopedSlots: {
            customRender: "roles"
          },
          children: [
            {
              title: this.$t("userManager.group"),
              dataIndex: "groups",
              scopedSlots: {
                customRender: "groups"
              }
            }
          ]
        },
        {
          title: this.$t("userManager.createdTime"),
          dataIndex: "createAt",
          scopedSlots: {
            customRender: "createAt"
          },
          sorter: (a, b) => a["createAt"].localeCompare(b["createAt"])
        }
      ];
    }
  },
  beforeMount() {
    const checkButtons =
      this.buttons.indexOf(this.$buttonConfig.system.user_manager.editUser) !=
        -1 ||
      this.buttons.indexOf(
        this.$buttonConfig.system.user_manager.deactiveUser
      ) != -1 ||
      this.buttons.indexOf(this.$buttonConfig.system.user_manager.activeUser) !=
        -1 ||
      this.buttons.indexOf(
        this.$buttonConfig.system.user_manager.loginSetting
      ) != -1 ||
      this.buttons.indexOf(this.$buttonConfig.system.user_manager.deleteUser) !=
        -1 ||
      this.buttons.indexOf(this.$buttonConfig.system.user_manager.unbindUser) !=
        -1;
    if (checkButtons) {
      this.columns.push({
        title: this.$t("userManager.action"),
        width: "150px",
        scopedSlots: { customRender: "operation" }
      });
    }
    // google验证码登入且授权解绑按钮，显示该按钮
    const qcode = JSON.parse(sessionStorage.getItem("qcodeLogin")) != "0"; // 1:二维码登陆 0:其他方式登陆
    this.authed =
      this.buttons.indexOf(this.$buttonConfig.system.user_manager.unbindUser) !=
        -1 && qcode;
    inputValidate(document.querySelectorAll(".no-symbol-number"), {
      noSymbol: true,
      noNumber: true
    });
    inputValidate(document.querySelectorAll(".no-symbol-letter"), {
      noSymbol: true,
      noLetter: true
    });
    // ""Allow alphabets, space,and symbol & /. ( ) - , '""
    inputValidate(document.querySelectorAll(".guarantor"), {
      noSymbol: true,
      noNumber: true,
      noLetter: false,
      ignoreSymbol: ["&", "/", ".", "()", "-", ",", '""']
    });
    // Allow alphabets and INT Not allow negative number
    inputValidate(
      document.querySelectorAll(".no-symbol-neg-have-letter-number"),
      { noNeg: true, noSymbol: true, noLetter: false, noNumber: false }
    );
    inputValidate(document.querySelectorAll(".no-symbol"), { noSymbol: true });
    inputValidate(document.querySelectorAll(".spouse-certificate-id"), {
      noSymbol: true,
      noLetter: true,
      noNumber: false
    });
    // Allow alphabets and space
    inputValidate(document.querySelectorAll(".institution"), {
      noSymbol: true,
      noLetter: false
    });
    // "Allow alphabets, INT, space and symbol -"
    inputValidate(document.querySelectorAll(".zipcode"), {
      noLetter: false,
      noSymbol: true,
      ignoreSymbol: ["-"]
    });
    // "INT, space and symbol + - ( ) #"
    inputValidate(document.querySelectorAll(".phone"), {
      noSymbol: true,
      noNumber: false,
      ignoreSymbol: ["+", "-", "()", "#"]
    });
    // "Allow alphabets, INT, space,and symbol - , . : ; ' ° & / ( ) #"
    inputValidate(document.querySelectorAll(".validate-addr"), {
      noSymbol: true,
      noLetter: false,
      noNumber: false,
      ignoreSymbol: ["&", ",", "-", "/", "()", ".", "#", ":", ";", "°", "'"]
    });
    // Allow alphabets and INT
    inputValidate(document.querySelectorAll(".no-hrn"), {
      noSymbol: true,
      noLetter: false,
      noNumber: false
    });
    // Allow alphabets, space, and symbol & /. ( ) - , '
    inputValidate(document.querySelectorAll(".bank-name"), {
      noLetter: false,
      noNumber: true,
      noSymbol: true,
      ignoreSymbol: ["&", ",", "-", "/", "()", "."]
    });
    // Allow alphabets and full stop (.)
    inputValidate(document.querySelectorAll(".full-stop"), {
      noLetter: false,
      noSymbol: true,
      ignoreSymbol: ["."]
    });
    // ""Allow alphabets, INT and symbol - _ @""""
    inputValidate(document.querySelectorAll(".password"), {
      noLetter: false,
      noNumber: false,
      noSymbol: true,
      ignoreSymbol: ["-", "_", "@", '""', "'"]
    });
    inputValidate(document.querySelectorAll(".email"), {
      noSymbol: true,
      ignoreSymbol: ["_", "-", "@", "."]
    });
    this.getUserList();
    this.getGroupList();
    this.getRoleList();
  },
  methods: {
    datePickerOK(e) {
      // console.log('datePickerOK--- ', e)
    },
    moment,
    dateStringFormat(str) {
      comm.dateStringFormat(str);
    },
    addEvent() {
      this.showAddUserView = true;
      this.EApassword = true;
      this.editUserInfo = {};
      this.form.resetFields();
    },

    submitNewVersion(e) {
      const vs = this;
      e.preventDefault(); // 这样就好了
      this.form.validateFields((err, values) => {
        if (err) {
          //
        } else {
          // console.log(values)
          // this.showAddUserView = false;
          this.nickname = values.nickname;
          this.email = values.email;
          this.phoneNum = values.mobile;
          this.password = values.password;
          this.userName = values.userName;
          // this.selectedGroups = values.groups;
          // this.selectedRoles = values.roles;
          this.selectedEndGroups = [];
          const selectedGroups1 = values.groups;
          const selectedGroups2 = [];
          selectedGroups1.forEach(element => {
            selectedGroups2.push(element);
          });
          selectedGroups2.forEach(element => {
            this.groupList.forEach(group => {
              if (group.id == element) {
                const tempGroup = {
                  id: group.id,
                  ring: 0
                };
                this.selectedEndGroups.push(tempGroup);
              }
            });
          });
          if (vs.editUserInfo.id) {
            vs.updateUser();
          } else {
            vs.addUser();
          }
        }
      });
    },

    loginSettingOnChange(e) {
      this.isClear = !this.isClear;

      this.dateEnable = !this.isClear;
      if (this.isClear == true) {
        this.editUserInfo.accessBegin = null;
        this.editUserInfo.accessEnd = null;
      }
    },
    changeDateBegin(value, dateString) {
      this.editUserInfo.accessBegin = value;
    },
    changeDateEnd(value, dateString) {
      this.editUserInfo.accessEnd = value;
    },
    submitTimeSetting() {
      const beginDate = new Date(this.editUserInfo.accessBegin);
      const endDate = new Date(this.editUserInfo.accessEnd);

      if (this.isClear == false) {
        if (beginDate.toDateString() == "Invalid Date") {
          this.$message.info(this.$t("userManager.selectStartDate"));
          return;
        }
        if (endDate.toDateString() == "Invalid Date") {
          this.$message.info(this.$t("userManager.selectEndDate"));
          return;
        }

        if (endDate < beginDate) {
          this.$message.info(this.$t("userManager.startDateBehindEndDate"));
          return;
        }
        this.reparams = {
          email: this.editUserInfo.email,
          mobile: this.editUserInfo.mobile,
          nickname: this.editUserInfo.nickname,
          username: this.editUserInfo.username,
          groups: this.editUserInfo.groups,
          roles: this.editUserInfo.roles,
          id: this.editUserInfo.id,
          accessBegin: this.editUserInfo.accessBegin,
          accessEnd: this.editUserInfo.accessEnd
        };
      } else {
        this.reparams = {
          email: this.editUserInfo.email,
          mobile: this.editUserInfo.mobile,
          nickname: this.editUserInfo.nickname,
          username: this.editUserInfo.username,
          groups: this.editUserInfo.groups,
          roles: this.editUserInfo.roles,
          id: this.editUserInfo.id,
          accessBegin: "0001-01-01T00:00:00Z",
          accessEnd: "0001-01-01T00:00:00Z"
        };
      }

      UM.updateUserInfo(this.reparams).then(data => {
        this.pageNum = 1;
        this.getUserList();
        this.newVersionCancel();
        this.$message.success(this.$t('report.notify_update_success'));
      });
    },
    delCancel() {},
    clearData() {
      this.isClear = false; // 登录设置中是否清除时间标志
      this.editUserInfo.accessBegin = "0001-01-01T00:00:00Z";
      this.editUserInfo.accessEnd = "0001-01-01T00:00:00Z";
      this.editUserInfo = {};
      // this.dateEnable = true; //登录设置中时间是否可以选择
      this.editUserInfo = {};
      this.nickname = "";
      this.form.getFieldDecorator("userName");
      this.form.setFieldsValue({
        userName: ""
      });
      this.form.getFieldDecorator("nickname");
      this.form.setFieldsValue({
        nickname: ""
      });
      this.form.getFieldDecorator("password");
      this.form.setFieldsValue({
        password: ""
      });

      this.form.getFieldDecorator("email");
      this.form.setFieldsValue({
        email: ""
      });
      this.form.getFieldDecorator("mobile");
      this.form.setFieldsValue({
        mobile: ""
      });
      this.form.getFieldDecorator("groups");
      this.form.setFieldsValue({
        groups: []
      });
      this.form.getFieldDecorator("roles");
      this.form.setFieldsValue({
        roles: []
      });
      this.selectedRoles = [];
      this.selectedGroups = [];
      this.selectedGroupsN = [];
    },

    newVersionCancel() {
      this.form.resetFields();
      // this.showAddUserView = false;
      // this.showLoginSetting = false;
      // this.clearData();
    },
    roleHandleChange(rolesValue) {
      this.selectedRoles = [];
      rolesValue.forEach(element => {
        this.roleList.forEach(role => {
          if (role.id == element) {
            const tempRole = {
              id: role.id,
              name: role.name
            };
            this.selectedRoles.push(tempRole);
          }
        });
      });
    },
    groupHandleChange(groupValue) {
      this.selectedGroups = groupValue;
    },
    popupScroll() {
      // console.log("popupScroll");
    },

    editUserEvent(uInfo) {
      this.EApassword = false;
      this.clearData();
      const tempData = {
        ...uInfo
      };
      this.showAddUserView = true;

      this.form.getFieldDecorator("userName");
      this.form.setFieldsValue({
        userName: tempData.username
      });
      this.form.getFieldDecorator("nickname");
      this.form.setFieldsValue({
        nickname: tempData.nickname
      });
      // this.nickname = uInfo.nickname;
      this.form.getFieldDecorator("email");
      this.form.setFieldsValue({
        email: tempData.email
      });
      this.form.getFieldDecorator("mobile");
      this.form.setFieldsValue({
        mobile: tempData.mobile
      });
      this.form.getFieldDecorator("groups");
      this.selectedGroups = tempData.groups;
      const tempGroupList = [];
      this.selectedGroups.forEach(element => {
        tempGroupList.push(element.id);
      });
      this.form.setFieldsValue({
        groups: tempGroupList
      });

      this.form.getFieldDecorator("roles");

      this.selectedRoles = tempData.roles;
      const tempRoleList = [];
      this.selectedRoles.forEach(element => {
        tempRoleList.push(element.id);
      });
      this.form.setFieldsValue({
        roles: tempRoleList
      });
      this.editUserInfo = tempData;
    },

    editUserInfoValidDate(uInfo) {
      this.showLoginSetting = true;
      this.editUserInfo = uInfo;
      // console.log(this.editUserInfo)
      if (this.editUserInfo.accessBegin == "0001-01-01T00:00:00Z") {
        this.editUserInfo.accessBegin = null;
      }
      if (this.editUserInfo.accessEnd == "0001-01-01T00:00:00Z") {
        this.editUserInfo.accessEnd = null;
      }
    },

    deleteUserEvent(uInfo) {
      this.deleteUser(uInfo);
    },
    // 请求用户列表信息
    getUserList(res) {
      this.loading = true;
      // {"username":"kkk","mobile":"68888","email":"w222@121,con","role":1,"groupId":14,"sort":1,"orderBy":"created_at","pageSize":10,"pageIndex":1}
      const params = {
        sort: 1,
        orderBy: "created_at",
        pageSize: this.pageSize,
        pageIndex: this.pageNum,
        ...this.searchParams
      };
      if (res) {
        // 插入查询条件
        params[res.inputSelected] = res.inputValue;
      }
      UM.queryUserList(params).then(data => {
        this.loading = false;
        if (data) {
          this.sourceList = data.data;
          this.pagination.total = data.totalCount;
          // this.totalCount = data.totalCount;
        } else {
          this.sourceList = [];
          this.pagination.total = 0;
          this.pageNum = 1;
        }
        this.sourceList.forEach(element => {
          element.createAt = comm.dateStringFormat(element.createAt);
          let beginTime = element.accessBegin;
          if (beginTime.startsWith("0001")) {
            beginTime = null;
            element.accessBegin = null;
          } else {
            element.accessBegin = moment(
              comm.dateStringFormat(beginTime),
              "YYYY-MM-DD HH:mm:ss"
            ).isValid()
              ? moment(comm.dateStringFormat(beginTime), "YYYY-MM-DD HH:mm:ss")
              : "";
          }
          // moment(comm.dateStringFormat(beginTime), 'YYYY-MM-DD HH:mm:ss');
          let endTime = element.accessEnd;
          if (endTime.startsWith("0001")) {
            endTime = null;
            element.accessEnd = null;
          } else {
            element.accessEnd = moment(
              comm.dateStringFormat(endTime),
              "YYYY-MM-DD HH:mm:ss"
            ).isValid()
              ? moment(comm.dateStringFormat(endTime), "YYYY-MM-DD HH:mm:ss")
              : "";
          } // moment(comm.dateStringFormat(endTime), 'YYYY-MM-DD HH:mm:ss');
        });
      });
    },
    getRoleList() {
      this.loading = true;
      const params = {
        pageSize: 99999999,
        pageIndex: 1
      };
      UM.queryRoleList(params).then(data => {
        this.loading = false;
        this.roleList = data.data;
        // 设置搜索框中的用户组选择数据
        this.roleList.forEach(element => {
          const item = {
            Key: element.id,
            CodeEn: element.name
          };
          this.roleListQuery.push(item);
          const searchItem = {
            value: element.id,
            name: element.name
          };
          this.seniorQList[3].list.push(searchItem);
        });
      });
    },
    getGroupList() {
      const that = this;
      that.loading = true;
      const params = {
        pageSize: 99999999,
        pageIndex: 1
      };
      UM.queryGroupList(params)
        .then(data => {
          that.loading = false;
          that.groupList = data.data;
          // 设置搜索框中的用户组选择数据
          that.groupList.forEach(element => {
            const item = {
              Key: element.id,
              CodeEn: element.name
            };
            that.groupListQuery.push(item);
            const searchItem = {
              value: element.id,
              name: element.name
            };
            this.seniorQList[4].list.push(searchItem);
          });

          if (that.groupList.length > 0) {
            const group = that.groupList[0];
            // that.defaultSelectedKeys.push(group.id);
            that.parentGroups = that.getChildrenGroupList(group);
            that.groupTreeList = that.getTreeList(that.groupList);
          }
        })
        .catch(err => {
          that.$message.error(err.errorMsg);
        });
    },
    getTreeList(list) {
      list = list || [];
      const childObj = {};
      list.forEach(element => {
        childObj[element.parentId] = childObj[element.parentId] || [];
        childObj[element.parentId].push(element);
      });
      return list.filter(group => {
        group.children = childObj[group.id] || [];
        group.title = group.name;
        group.value = group.id;
        group.key = group.id;
        return group.parentId == 0;
      });
    },
    getChildrenGroupList(node) {
      const childrenGroups = [];
      // 获取一级节点
      if (node.parentId == 0) {
        this.groupList.forEach(group => {
          if (group.parentId == node.parentId) {
            // group.scopedSlots = {
            //     "title": "title"
            // }
            const tempGroup = {
              title: group.name,
              value: group.id,
              key: group.id
            };
            tempGroup.children = [];
            childrenGroups.push(tempGroup);
          }
        });
        return childrenGroups;
      } else {
        // 获取每个节点的后续节点

        return new Promise(resolve => {
          if (node.dataRef.children.length != 0) {
            resolve();
            return;
          }
          setTimeout(() => {
            this.groupList.forEach(group => {
              if (group.parentId == node.dataRef.value) {
                const tempGroup = {
                  title: group.name,
                  value: group.id,
                  key: group.id,
                  children: []
                };
                childrenGroups.push(tempGroup);
              }
            });
            node.dataRef.children = childrenGroups;
            this.parentGroups = [...this.parentGroups];
            // console.log(this.parentGroups, "???");
            resolve();
          }, 200);
        });
      }
    },
    addUser() {
      // 去除空格
      const passWord = this.password.replace(/\s+/g, "");
      const params = {
        email: this.email,
        mobile: this.phoneNum,
        nickname: this.nickname,
        password: passWord,
        username: this.userName,
        groups: this.selectedEndGroups,
        roles: this.selectedRoles
      };
      UM.addUser(params)
        .then(data => {
          this.getUserList();
          this.newVersionCancel();
          this.$message.success(this.$t('userManager.addSuccess'));
          this.form.resetFields(); // 初始化表单
          this.showAddUserView = false;
          this.editUserInfo = {};
        })
        .catch(err => {
          // this.$message.error(err.errorMsg);
          if (err.errorMsg === "Password must include upper - case alphanumeric and special characters") {
          this.$message.error(this.$t('userManager.error_message_password_include_upper_case'));
          } else if (err.errorMsg === "Password too short") {
             this.$message.error(this.$t('forgotpassword.password_too_short'));
          } else if (err.errorMsg === "Add user fail, mobile must be 11 digit number") {
            this.$message.error(this.$t('userManager.error_message_mobile_must_11_digit'))
          } else if (err.errorMsg === "Add user fail, user email already exists") {
            this.$message.error(this.$t('userManager.error_message_email_already_exist'))
          } else {
            this.$message.error(err.errorMsg);
          }
          console.log("🚀 ~ file: UserManager.vue ~ line 1180 ~ addUser ~ err.errorMsg", err.errorMsg)
        });
    },
    updateUser() {
      if (this.editUserInfo.accessBegin == null) {
        this.editUserInfo.accessBegin = "0001-01-01T00:00:00Z";
      }
      if (this.editUserInfo.accessEnd == null) {
        this.editUserInfo.accessEnd = "0001-01-01T00:00:00Z";
      }
      // 去除空格
      const pWord = this.password.replace(/\s+/g, "");
      const params = {
        email: this.email,
        mobile: this.phoneNum,
        nickname: this.nickname,
        password: pWord,
        username: this.userName,
        groups: this.selectedEndGroups,
        roles: this.selectedRoles,
        id: this.editUserInfo.id,
        accessEnd: this.editUserInfo.accessEnd,
        accessBegin: this.editUserInfo.accessBegin
      };

      UM.updateUserInfo(params).then(data => {
        // this.pageNum = 1;
        this.getUserList();
        this.newVersionCancel();
        this.$message.success(this.$t('report.notify_update_success'));
      });
    },
    deleteUser(uInfo) {
      const params = uInfo.id;
      UM.deleteUserInfo(params)
        .then(data => {
          this.getUserList();
          this.$message.success(this.$t('userManager.deleteUserSuccess'));
        })
        .catch(err => {
          this.$message.error(err.errorMsg);
        });
    },
    //
    changePage(page, pageSize) {
      this.pageSize = pageSize;
      this.pageNum = page;
      this.getUserList();
    },
    // 改变每页数量时更新显示
    showSizeChange(current, pageSize) {
      this.pageNum = current;
      this.pageSize = pageSize;
      this.getUserList();
    },
    showTotal(total) {
      return (
        this.$t("system.totalLeft") +
        this.pagination.total +
        this.$t("system.totalRight")
      );
    },
    // 解冻账户
    unlockUserInfoValidDate(record) {
      const params = record.id;
      UM.active(params)
        .then(data => {
          this.getUserList();
          this.getGroupList();
          this.getRoleList();
          this.$message.success(this.$t("report.notify_active_success"));
        })
        .catch(err => {
          this.$message.error(err.errorMsg);
        });
    },
    // 冻结账户
    lockUserInfoValidDate(record) {
      const params = record.id;
      UM.deactive(params)
        .then(data => {
          this.getUserList();
          this.getGroupList();
          this.getRoleList();
          this.$message.success(this.$t("report.notify_deactive_success"));
        })
        .catch(err => {
          this.$message.error(err.errorMsg);
        });
    },
    // 解绑用户
    unBindUser(record) {
      UM.unBindUser({ username: record.username })
        .then(data => {
          this.$message.success(this.$t("report.notify_unbind_success"));
        })
        .catch(err => {
          this.$message.error(err.errorMsg);
        });
    },
    unBindCancel() {}
  }
};
</script>

<style lang="less" scoped>
.user-manager {
  background-color: #ffffff;
  min-height: 240px;
  padding: 26px 32px;
  box-sizing: border-box;
}

.submit-button {
  margin-right: 12px;
}
</style>
