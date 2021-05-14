<template>
  <div class="menu-manager">
    <a-button v-auth="$buttonConfig.system.menu_manager.addMenu" type="primary" style="margin-bottom: 26px" icon="plus" @click="addMenu">
      {{ $t("menu.btn_add_menu") }}
    </a-button>
    <a-table
      :row-class-name="rowClassName"
      :row-key="record => record.id"
      :columns="columns"
      :data-source="dataList"
      :loading="loading"
      :pagination="false"
    >
      <div slot="icon" slot-scope="text, record">
        <a-icon v-if="record.icon" :type="record.icon" />
      </div>
      <div slot="operation" slot-scope="record">
        <a-tooltip v-auth="$buttonConfig.system.menu_manager.editMenu" placement="bottom">
          <template slot="title">
            <span>{{ $t("comm.edit") }}</span>
          </template>
          <a class="btn-a" @click="updateMenu(record)">
            <a-icon type="edit" style="margin-left:2px" />
          </a>
        </a-tooltip>
        <a-popconfirm
          v-auth="$buttonConfig.system.menu_manager.deleteMenu"
          :title="$t('menu.confirm_delete_menu_msg')"
          :ok-text="$t('menu.yes')"
          :cancel-text="$t('menu.no')"
          @confirm="deleteMenu(record)"
        >
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{ $t("comm.removed") }}</span>
            </template>
            <a class="btn-a">
              <a-icon type="delete" style="margin-left:3px" />
            </a>
          </a-tooltip>
        </a-popconfirm>
      </div>
    </a-table>

    <a-modal
      destroy-on-close
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :ok-text="$t('menu.confirm')"
      :cancel-text="$t('menu.cancel')"
      @ok="confirm"
      @cancel="cancel"
    >
      <a-form :form="form" :self-update="true">
        <a-form-item :label="$t('menu.id')" v-bind="formItemLayout">
          <a-input
            v-decorator="['id', {rules: [{ required: true, message: $t('menu.input_menu_id') }]}]"
            :disabled="action == 'update'"
            type="number"
            :maxlength="15"
          />
        </a-form-item>
        <a-form-item :label="$t('menu.name')" v-bind="formItemLayout">
          <a-input
            v-decorator="['name', {rules: [{ required: true, message: $t('menu.input_menu_name') }]}]"
            :maxlength="20"
          />
        </a-form-item>
        <a-form-item :label="$t('menu.display')" v-bind="formItemLayout">
          <a-input
            v-decorator="['display', {rules: [{ required: true, message: $t('menu.input_menu_I18N') }]}]"
            :maxlength="20"
          />
        </a-form-item>
        <a-form-item :label="$t('menu.icon')" v-bind="formItemLayout">
          <a-select
            v-decorator="['icon', {rules: [{ required: false, message: $t('menu.input_menu_icon') }]}]"
            :placeholder="$t('menu.selection_required')"
          >
            <a-select-option value="">{{ $t('menu.no_menu_icon') }}</a-select-option>
            <a-select-option v-for="(item,index) in icons" :key="index" :value="item">
              <a-icon :type="item" />
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('menu.parent_menu')" v-bind="formItemLayout">
          <a-tree-select
            v-decorator="['parentId', {rules: [{ required: true, message: $t('menu.select_parent_menu') }]}]"
            show-search
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="parentMenuTree"
            :placeholder="$t('menu.selection_required')"
            tree-default-expand-all
            tree-data-simple-mode
          />
        </a-form-item>
        <a-form-item :label="$t('menu.href')" v-bind="formItemLayout">
          <a-input
            v-decorator="['href', {rules: [{ required: false, message: $t('menu.input_menu_path') }]}]"
            :maxlength="100"
          />
        </a-form-item>
        <a-form-item :label="$t('menu.index')" v-bind="formItemLayout">
          <a-input-number v-decorator="['index', { initialValue: 1 }]" :min="1" :max="20" />
        </a-form-item>
        <a-form-item :label="$t('menu.type')" v-bind="formItemLayout">
          <a-input
            v-decorator="['type', {rules: [{ required: false, message: $t('menu.input_service_type') }]}]"
            :maxlength="20"
          />
        </a-form-item>
        <a-form-item :label="$t('menu.status')" v-bind="formItemLayout">
          <a-radio-group
            v-decorator="['status', {initialValue: 'normal',rules: [{ required: true, message: $t('menu.choose_menu_status') }]}]"
          >
            <a-radio-button value="normal">{{ $t('menu.status_normal') }}</a-radio-button>
            <a-radio-button value="disabled">{{ $t('menu.status_disabled') }}</a-radio-button>
            <a-radio-button value="hidden">{{ $t('menu.status_hidden') }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="$t('menu.menu_type')" v-bind="formItemLayout">
          <a-radio-group
            v-decorator="['menuType', {initialValue: 'view',rules: [{ required: true, message: $t('menu.choose_menu_type') }]}]"
          >
            <a-radio-button value="view">{{ $t('menu.menu_type_view') }}</a-radio-button>
            <a-radio-button value="menu">{{ $t('menu.menu_type_menu') }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import UM from "@/service/um";

export default {
  data() {
    return {
      loading: true,
      columns: null,
      dataList: null,
      parentMenuTree: [],
      basicQList: [],
      seniorQList: [{
        value: 'name',
        InputType: "text",
        SearchSeqNo: 1,
        name: this.$t('menu.name'),
        placeholderName: this.$t('menu.name')
      }],
      title: '',
      action: null,
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this, { name: 'menu' }),
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      icons: ['bell', 'home', 'profile', 'user', 'robot', 'setting', 'codepen', 'meh', 'appstore', 'read', 'gold',
        'shop', 'thunderbolt', 'hdd', 'database', 'instagram', 'switcher', 'pie-chart'],
      buttons: sessionStorage.getItem('authBtns')
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.columns = [
        { title: this.$t('menu.name'), dataIndex: 'name', align: 'left' },
        // { title: this.$t('menu.parent_menu'), dataIndex: 'parentId',  },
        { title: this.$t('menu.menu_type'), dataIndex: 'menuType' },
        { title: this.$t('menu.status'), dataIndex: 'status' },
        { title: this.$t('menu.icon'), dataIndex: 'icon', scopedSlots: { customRender: 'icon' }},
        { title: this.$t('menu.href'), dataIndex: 'href' },
        { title: this.$t('menu.id'), dataIndex: 'id' },
        { title: this.$t('menu.level'), dataIndex: 'level' },
        { title: this.$t('menu.index'), dataIndex: 'index' }
        // { title: this.$t('menu.display'), dataIndex: 'display' },
        // { title: this.$t('menu.type'), dataIndex: 'type' },
        // { title: this.$t("comm.action"), scopedSlots: { customRender: "operation" }, fixed: "right", width: 100 }
      ];

      if (this.buttons.indexOf(this.$buttonConfig.system.menu_manager.editMenu) != -1 || this.buttons.indexOf(this.$buttonConfig.system.menu_manager.deleteMenu) != -1) {
        this.columns.push({
          title: this.$t('comm.action'),
          scopedSlots: { customRender: 'operation' },
          fixed: 'right',
          width: 100
        });
      }
      this.queryMenuData();
    },

    rowClassName(record, index) {
      if (record.menuType == 'view') {
        return 'view-row';
      } else {
        return 'menu-row';
      }
    },
    queryMenuData(res) {
      const params = {
        'pageIndex': 1,
        'pageSize': 9999,
        'orderBy': 'index'
      };
      if (res) {
        // 插入查询条件
        params[res.inputSelected] = res.inputValue
      }
      UM.menuQuery(params).then((res) => {
        this.loading = false;
        const dataTemp = res || [];
        this.dataList = this.getTreeData(dataTemp);
        this.parentMenuTree = this.getParentMenuTreeData(dataTemp);
      }).catch(err => {
        this.$message.error(err.errorMsg);
      });
    },
    getTreeData(datas) {
      const childrenObject = {};
      datas.forEach((d) => {
        d.id = String(d.id);
        d.parentId = String(d.parentId);
        if (d.parentId != '0') {
          childrenObject[d.parentId] = childrenObject[d.parentId] || [];
          childrenObject[d.parentId].push(d);
        }
      });

      return datas.filter((d) => {
        if (d.menuType == 'menu') {
          d.children = childrenObject[d.id];
        }
        return d.parentId == 0;
      });
    },
    /**
     * @description: compiste menu tree with '@' id,since ant-tree needs
     */
    getParentMenuTreeData(datas) {
      const treeData = [{ id: '0', level: 0, pId: null, value: 'Menus@0', label: 'Menus[0]' }];
      datas.forEach((d) => {
        if (d.menuType == 'menu') {
          treeData.push({
            id: String(d.id),
            pId: String(d.parentId),
            value: d.name + '@' + d.id,
            label: d.name + '[' + d.id + ']',
            level: d.level
          });
        }
      });
      return treeData;
    },

    parseData(data) {
      const parentId = +data.parentId.split('@')[1];
      const parent = this.parentMenuTree.filter((d) => d.id == parentId)[0];
      const newData = {
        'id': +data.id,
        'name': data.name,
        'display': data.display,
        'icon': data.icon,
        'parentId': parentId,
        'href': data.href,
        'level': parent.level + 1,
        'index': data.index,
        'menuType': data.menuType,
        'type': data.type,
        'status': data.status
      };
      return newData;
    },
    confirm() {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          let funcName = null;
          if (this.action == 'add') {
            funcName = 'newAddMenu';
          } else if (this.action == 'update') {
            funcName = 'newUpdateMenu';
          }
          UM[`${funcName}`](this.parseData(values)).then((res) => {
            this.confirmLoading = false;
            this.$message.success(this.$t('menu.operating_success'));
            this.visible = false;
            this.queryMenuData();
          });
        } else {
          this.confirmLoading = false;
        }
      });
    },
    cancel() {
      this.visible = false;
      this.confirmLoading = false;
    },
    addMenu() {
      this.visible = true;
      this.action = 'add';
      this.title = this.$t('menu.add_menu');
    },
    deleteMenu(record) {
      if (record.children && record.children.length > 0) {
        this.$message.warn(this.$t('menu.cannot_delete_menu'));
        return;
      }
      UM.newDeleteMenu(+record.id).then((res) => {
        this.queryMenuData();
      }).catch(err => {
        this.$message.error(err.errorMsg);
      });
    },
    updateMenu(record) {
      this.visible = true;
      this.action = 'update';
      this.title = this.$t('menu.update_menu');
      this.$nextTick(() => {
        // remove '@' when enter after first time
        if (record.parentId.indexOf('@') > -1) {
          record.parentId = record.parentId.split('@')[1];
        }
        const parent = this.parentMenuTree.filter((d) => d.id == record.parentId)[0];
        record.parentId = parent.value;
        this.form.setFieldsValue({
          id: record.id,
          name: record.name,
          display: record.display,
          href: record.href,
          icon: record.icon,
          parentId: record.parentId,
          index: record.index,
          menuType: record.menuType,
          type: record.type,
          status: record.status
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.menu-manager {
  background-color: #ffffff;
  min-height: 240px;
  padding: 26px 32px;
  box-sizing: border-box;
}
</style>
