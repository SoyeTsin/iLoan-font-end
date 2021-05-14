<template>
  <div>
    <!--    {{ pageStute }} - {{ pageStute>1 }}-->
    <a-tabs :active-key="tabKey" @change="changeTabs">
      <a-tab-pane :key="1" :tab="$t('roleManager.role_account')">
        <a-spin :spinning="spinning">
          <a-form
            :form="form"
            @submit="handleSubmit"
          >
            <CollapseCard :title="$t('roleManager.loan')" class="my-card">
              <a-icon slot="extra" type="down" class="extra" />
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-form-item :label="$t('roleManager.role_status')">
                    <a-radio-group
                      v-decorator="formValidate.RoleStutes"
                      class="my-radio"
                      :disabled="showDisabled"
                    >
                      <a-radio value="1">
                        {{ $t('roleManager.active') }}
                      </a-radio>
                      <a-radio value="2">
                        {{ $t('roleManager.inactive') }}
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
                <a-col :span="7">
                  <a-form-item :label="$t('roleManager.role_name')">
                    <a-input v-decorator="formValidate.RoleName" :max-length="40" :disabled="showDisabled" />
                  </a-form-item>
                </a-col>
                <a-col :span="7">
                  <a-form-item :label="$t('roleManager.description')">
                    <a-textarea v-decorator="formValidate.Description" :disabled="showDisabled" />
                  </a-form-item>
                </a-col>
              </a-row>
            </CollapseCard>
            <div style="margin-top: 30px;display: flex;justify-content: center;">
              <a-button style="margin-right: 30px" :disabled="showDisabled" @click="resetForm">{{ $t('roleManager.cancel') }}</a-button>
              <a-button type="primary" html-type="submit">{{ $t('comm.next') }}</a-button>
            </div>
          </a-form>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane :key="2" :tab="$t('menuAuthority.menuAuthority')" force-render :disabled="!(pageStute>0)">
        <a-spin :spinning="spinning" class="role-manager-add-role">
          <a-empty v-if="showDisabled" :description="$t('menuAuthority.lack_permissions')" :image="original" />
          <a-checkbox-group style="width: 100%" :value="menuSubmitData.checkedKeysA" @change="onChangeMenu">
            <div style="display: flex;justify-content: flex-start;flex-wrap:wrap;">
              <div
                v-for="(itemX,indexX) in menuList"
                :key="indexX"
                style="width: 33.33%;min-height: 36px;line-height: 36px;"
              >
                <a-checkbox
                  v-if="itemX.id!=='99'"
                  :value="itemX.id"
                >{{ itemX.name }}
                </a-checkbox>
                <a-tree
                  v-else
                  v-model="treeCheckedKeys"
                  :checkable="true"
                  :show-line="showLine"
                  :show-icon="showIcon"
                  :expanded-keys="[itemX.id]"
                  :auto-expand-parent="autoExpandParent"
                  :selected-keys="selectedKeys"
                  :tree-data="[itemX]"
                  @expand="onExpand"
                  @select="onSelect"
                />
              </div>
            </div>
          </a-checkbox-group>
        </a-spin>
        <div style="margin-top: 30px;display: flex;justify-content: center;">
          <a-button style="margin-right: 30px" :disabled="showDisabled" @click="resetForm">{{ $t('userManager.cancel') }}</a-button>
          <a-button type="primary" :disabled="showDisabled" @click="changeTabs(3)">{{ $t('comm.next') }}</a-button>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="3" :tab="$t('functionAuthority.function_authority')" :disabled="!(pageStute>1)">
        <a-spin :spinning="spinning" class="role-manager-add-role">
          <a-checkbox-group :value="buttonSubmitData" style="width: 100%" @change="onChangeCheckbox">
            <CollapseCard title="Product Management" class="my-card">
              <a-icon slot="extra" type="down" class="extra" />
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.basic') }}</div>
                  <a-checkbox value="3006" disabled>
                    {{ $t('functionAuthority.query_product_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.restrict') }}</div>
                  <a-checkbox :disabled="findDisabled(3007)" value="3007">
                    {{ $t('functionAuthority.history_log_product_characteristic') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.maker_checker') }}</div>
                  <a-checkbox :disabled="findDisabled(3001)" value="3001">
                    {{ $t('functionAuthority.create_new_product') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox value="3002" disabled>
                    {{ $t('functionAuthority.view_product_detail') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(3003)" value="3003">
                    {{ $t('functionAuthority.edit_product_detail') }}<br>({{ $t('functionAuthority.status_requested') }})
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="14" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(3004)" value="3004">
                    {{ $t('functionAuthority.edit_product_detail') }}<br>({{ $t('functionAuthority.status_agreed') }})
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="14" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(3005)" value="3005">
                    {{ $t('functionAuthority.edit_product_detail') }}<br>({{ $t('functionAuthority.status_return') }})
                  </a-checkbox>
                </a-col>
              </a-row>
            </CollapseCard>
            <CollapseCard :title="$t('functionAuthority.customer')" class="my-card">
              <a-icon slot="extra" type="down" class="extra" />
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.basic') }}</div>
                  <a-checkbox value="4005" disabled>
                    {{ $t('functionAuthority.query_customer_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.restrict') }}</div>
                  <a-checkbox :disabled="findDisabled(4006)" value="4006">
                    {{ $t('functionAuthority.history_log_customer_detail') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.maker_checker') }}</div>
                  <a-checkbox :disabled="findDisabled(4001)" value="4001">
                    {{ $t('functionAuthority.create_new_customer') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox value="4004" disabled>
                    {{ $t('functionAuthority.view_customer_detail') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(4007)" value="4007">
                    {{ $t('functionAuthority.view_attached_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(4003)" value="4003">
                    {{ $t('functionAuthority.edit_customer_detail') }}<br>
                    {{ $t('functionAuthority.status_requested') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(4008)" value="4008">
                    {{ $t('functionAuthority.download_customer_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(4002)" value="4002">
                    {{ $t('functionAuthority.edit_customer_detail') }}<br>
                    {{ $t('functionAuthority.status_agreed') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(4009)" value="4009">
                    {{ $t('functionAuthority.send_emails') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(4010)" value="4010">
                    {{ $t('functionAuthority.edit_customer_detail') }}<br>
                    {{ $t('functionAuthority.status_return') }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </CollapseCard>
            <CollapseCard :title="$t('roleManager.loan')" class="my-card">
              <a-icon slot="extra" type="down" class="extra" />
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.basic') }}</div>
                  <a-checkbox value="6005" disabled>
                    {{ $t('functionAuthority.query_loan_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.restrict') }}</div>
                  <a-checkbox :disabled="findDisabled(6006)" value="6006">
                    {{ $t('functionAuthority.view_repayment_plan') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.maker_checker') }}</div>
                  <a-checkbox :disabled="findDisabled(6001)" value="6001">
                    {{ $t('functionAuthority.create_new_loan') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox value="6003" disabled>
                    {{ $t('functionAuthority.view_loan_detail') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(6007)" value="6007">
                    {{ $t('functionAuthority.view_history_log_loan_characteristic') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(6011)" value="6011">
                    {{ $t('functionAuthority.edit_new_loan_detail') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(6008)" value="6008">
                    {{ $t('functionAuthority.download_loan_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(6002)" value="6002">
                    {{ $t('functionAuthority.edit_loan_detail') }}<br>
                    {{ $t('functionAuthority.status_requested') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(6009)" value="6009">
                    {{ $t('functionAuthority.send_emails') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(6010)" value="6010">
                    {{ $t('functionAuthority.edit_loan_detail') }}<br>
                    {{ $t('functionAuthority.status_agreed') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7" />
                <a-col :span="7" />
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(6004)" value="6004">
                    {{ $t('functionAuthority.edit_loan_detail') }}<br>
                    {{ $t('functionAuthority.status_return') }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </CollapseCard>
            <CollapseCard :title="$t('functionAuthority.history')" class="my-card">
              <a-icon slot="extra" type="down" class="extra" />
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(7001)" value="7001">
                    {{ $t('functionAuthority.query_history_log_product_characteristic') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(7003)" value="7003">
                    {{ $t('functionAuthority.query_history_log_customer') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(7005)" value="7005">
                    {{ $t('functionAuthority.query_history_log_loan_characteristic') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(7002)" value="7002">
                    {{ $t('functionAuthority.view_history_log_product_characteristic') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(7004)" value="7004">
                    {{ $t('functionAuthority.view_history_log_customer') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(7006)" value="7006">
                    {{ $t('functionAuthority.view_history_log_loan_characteristic') }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </CollapseCard>
            <CollapseCard :title="$t('functionAuthority.report')" class="my-card">
              <a-icon slot="extra" type="down" class="extra" />
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.basic') }}</div>
                  <a-checkbox :disabled="findDisabled(8001)" value="8001">
                    {{ $t('functionAuthority.query_regulartory_report_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <div class="card-content-header">{{ $t('functionAuthority.restrict') }}</div>
                  <a-checkbox :disabled="findDisabled(8006)" value="8006">
                    {{ $t('functionAuthority.download_regulatory_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7" />
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8002)" value="8002">
                    {{ $t('functionAuthority.query_credit_bureau_report_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8007)" value="8007">
                    {{ $t('functionAuthority.download_credit_bureau_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7" />
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8003)" value="8003">
                    {{ $t('functionAuthority.query_disbursement_report_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8008)" value="8008">
                    {{ $t('functionAuthority.download_disbursement_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7" />
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8004)" value="8004">
                    {{ $t('functionAuthority.query_repayment_report_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8009)" value="8009">
                    {{ $t('functionAuthority.download_repayment_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7" />
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8005)" value="8005">
                    {{ $t('functionAuthority.query_other_report_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(8010)" value="8010">
                    {{ $t('functionAuthority.download_other_files') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7" />
              </a-row>
            </CollapseCard>
            <CollapseCard :title="$t('userAudit.userName')" class="my-card">
              <a-icon slot="extra" type="down" class="extra" />
              <a-row>
                <a-col>
                  <div class="card-content-header">{{ $t('userAudit.userName') }}</div>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010101)" value="99010101">
                    {{ $t('userManager.add') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010102)" value="99010102">
                    {{ $t('userManager.deleteUser') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010103)" value="99010103">
                    {{ $t('userManager.editUser') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010105)" value="99010105">
                    {{ $t('userManager.disableUser') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010106)" value="99010106">
                    {{ $t('userManager.unlockUser') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010110)" value="99010110">
                    {{ $t('userManager.set_login_time') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <div class="card-content-header">{{ $t('userManager.group') }}</div>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010107)" value="99010107">
                    {{ $t('userManager.add_group_user') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010108)" value="99010108">
                    {{ $t('userManager.delete_group_user') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010201)" value="99010201">
                    {{ $t('userManager.add_group') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010202)" value="99010202">
                    {{ $t('userManager.delete_group') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010203)" value="99010203">
                    {{ $t('userManager.edit_group') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7" />
              </a-row>

              <a-row>
                <a-col>
                  <div class="card-content-header">{{ $t('userManager.role') }}</div>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010301)" value="99010301">
                    {{ $t('userManager.add_role') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010302)" value="99010302">
                    {{ $t('roleManager.removed') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010303)" value="99010303">
                    {{ $t('userManager.edit_role') }}
                  </a-checkbox>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010304)" value="99010304">
                    {{ $t('userManager.role_list') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="14" />
              </a-row>

              <a-row>
                <a-col>
                  <div class="card-content-header">{{ $t('menu.menu_type_menu') }}</div>
                </a-col>
              </a-row>
              <a-row type="flex" justify="space-between">
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010501)" value="99010501">
                    {{ $t('menu.add_menu') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010502)" value="99010502">
                    {{ $t('menu.del_menu') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="7">
                  <a-checkbox :disabled="findDisabled(99010503)" value="99010503">
                    {{ $t('menu.edit_menu') }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </CollapseCard>
          </a-checkbox-group>
        </a-spin>
        <div style="margin-top: 30px;display: flex;justify-content: center;">
          <a-button style="margin-right: 30px" @click="resetForm">{{ $t('message.reset_btn') }}</a-button>
          <a-button type="primary" @click="submitRole">{{ pageStute === 1 ? $t('message.next_btn') : $t('message.save_btn') }}</a-button>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import UM from "@/service/um";
import original from '@/assets/original.png'

export default {
  name: 'Loan',
  filters: {
    doubleFilter(e) {
      return (e * 100).toFixed(2) + '%';
    }
  },
  data() {
    return {
      original,
      tabKey: 1,
      spinning: true,
      form: this.$form.createForm(this, { name: 'validate_other' }),
      formValidate: {
        // Basic
        RoleStutes: [
          'RoleStutes',
          {
            initialValue: `1`,
            rules: [{ required: true, message: this.$t('message.select_correct_information') }]
          }
        ],
        RoleName: [
          'RoleName',
          {
          inputLength: 40,
            rules: [{ type: 'string', message: this.$t('message.alphabets_only') }, {
              required: true,
              min: 1,
              max: 40,
              message: this.$t('roleManager.input_role_name')
            }]
          }
        ],
        Description: [
          'Description',
          {
            rules: [{ min: 0, max: 20, message: this.$t('message.please_correct_information') }]
          }
        ]
      },
      treeData: [
  {
    title: this.$t('userAudit.userName'),
    key: '0',
    children: [
      {
        title: this.$t('userAudit.userName'),
        key: '990101'
      },
      {
        title: this.$t('userManager.group'),
        key: '990102'
      },
      {
        title: this.$t('userManager.role'),
        key: '990103'
      },
      {
        title: this.$t('menu.menu_type_menu'),
        key: '990105'
      }
    ]
  }
],
      expandedKeys: [], // ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      treeCheckedKeys: [],
      selectedKeys: [],
      isAdd: true,
      showLine: true,
      showIcon: false,
      pageStute: 0,
      roleStutes: 1,
      autOfRole: [],
      menuList: [],
      menuSubmitData: { checkedKeysA: [], checkedKeysB: [] },
      buttonSubmitData: [],
      oriMenu: [],
      functionCheckedKeys: []
    };
  },
  computed: {
    showDisabled() {
      return this.autOfRole.length === 0 && !this.isAdd
    },
    functionCheckedKeysComputed() {
      // 遍历授权function
      const that = this
      const thisCheckedKeys = []
      that.nowMenuList.forEach(item => {
        const buttons = item.buttons || []
        buttons.forEach(childItem => {
          thisCheckedKeys.push(childItem + '')
        })
      })
      return thisCheckedKeys
    },
    nowMenuList() {
      // 当前选中的菜单
      const that = this
      const nowMenu = [...new Set([...that.menuSubmitData.checkedKeysA, ...that.menuSubmitData.checkedKeysB])]
      const nowList = []
      const menu = [...that.oriMenu]
      if (!that.add) {
        // 需要把‘全量菜单’中的菜单项目替换成‘用户权限菜单’中的菜单项目
        // 全量菜单: menu 用户权限菜单：autOfRole
        for (const i in menu) {
          that.autOfRole.forEach(auto => {
            if (menu[i].id + '' === auto.id + '') {
              menu[i] = auto
            }
          })
        }
      }
      menu?.forEach(res => {
        nowMenu?.forEach(nowId => {
          if (res.id + '' === nowId + '') {
            nowList.push(res)
          }
        })
      })
      return nowList
    }
  },
  watch: {
    functionCheckedKeysComputed(val) {
      this.buttonSubmitData = val
    },
    treeCheckedKeys(val) {
      // 监控树形多选框 判断用户模块的功能是否勾选
      this.menuSubmitData.checkedKeysB = val
      console.log(this.menuSubmitData);
    }
  },
  mounted() {
    this.role = JSON.parse(localStorage.getItem('roleManagerData') || '{}');
    this.isAdd = !this.role?.id;// true是新增

    if (!this.isAdd) {
      // 角色编辑
      this.form.setFieldsValue({
        RoleStutes: this.role.status + '',
        RoleName: this.role.name,
        Description: this.role.describe
      })
      this.queryRole();
    } else {
      // 新增角色
      this.queryMenuData();
    }
  },
  methods: {
    findDisabled(e) {
      const that = this
      // 找出当前选中的菜单中的所有按钮
      const nowMenu = [...new Set([...that.menuSubmitData.checkedKeysA, ...that.menuSubmitData.checkedKeysB])]
      // oriMenu为所有菜单
      let isButton = true
      nowMenu.forEach(orItem => {
        that.oriMenu.forEach(item => {
          // 找出选中菜单的所有对应按钮
          if (orItem * 1 === item.id * 1) {
            // 查找item 里面的buttons
            item.buttons?.forEach(bu => {
              if (bu * 1 === e * 1) {
                isButton = false
              }
            })
          }
        })
      })
      return isButton
    },
    save() {
      if (this.isAdd) {
        // 新增
        const menuSubmitData = [...new Set([...this.menuSubmitData.checkedKeysA, ...this.menuSubmitData.checkedKeysB])].sort()
        const buttonSubmitData = this.buttonSubmitData.sort()
        const menu = menuSubmitData.map(res => +res)
        const button = buttonSubmitData.map(res => +res)
        const param = {
          name: this.roleName,
          describe: this.description,
          status: this.roleStutes * 1,
          menu,
          button
        };
        UM.addRole(param).then((res) => {
          this.$message.success(this.$t('roleManager.add_role_success'));
          this.$router.push({
            path: '/roleManager'
          });
        })
      } else {
        // 更新
        const menuSubmitData = [...new Set([...this.menuSubmitData.checkedKeysA, ...this.menuSubmitData.checkedKeysB])].sort()
        const buttonSubmitData = this.buttonSubmitData.sort()
        const menu = menuSubmitData.map(res => +res)
        const button = buttonSubmitData.map(res => +res)
        const param = {
          id: this.role.id,
          name: this.roleName,
          describe: this.description,
          status: this.roleStutes * 1,
          menu,
          button
        };

        UM.updateRole(JSON.parse(JSON.stringify(param))).then((res) => {
          this.$message.success(this.$t('roleManager.update_role_success'));
          this.$router.push({
            path: '/roleManager',
            params: { role: this.role }
          });
        })
      }
    },
    // 查询修改的角色有的授权
    queryRole() {
      const tmp = [];
      tmp.push(this.role.id);
      const param = {
        roles: tmp
      };
      UM.autOfRole(param).then((res) => {
        this.autOfRole = res || []; // 这里是用户有的权限菜单
        if (!res) {
          this.pageStute = 1
          this.spinning = false
          return
        }
        this.pageStute = 2
        // 查询
        this.queryMenuData();// 这里是查询所有菜单
      })
    },
    getTreeData(datas) {
      const childrenObject = {};
      datas.forEach((d) => {
        d.id = String(d.id);
        d.parentId = String(d.parentId);
        d['title'] = d.name;
        d['key'] = d.id;
        if (d.parentId != '0') {
          childrenObject[d.parentId] = childrenObject[d.parentId] || [];
          childrenObject[d.parentId].push(d);
        }
      });
      // Filter top-level trees
      return datas.filter((d) => {
        // if (d.menuType == "menu") {
        //   d.children = childrenObject[d.id];
        // }
        d.children = childrenObject[d.id] || [];
        return d.parentId == 0;
      });
    },
    queryMenuData() { // 查询第二个标签哪些是勾选的
      const that = this
      // 查询菜单列表
      that.spinning = true
      UM.menuQuery({ 'pageIndex': 1, 'pageSize': 1000, 'orderBy': 'index' }).then((res) => {
        // 获取菜单列表
        const dataTemp = res || [];

        // 保存全量平铺菜单数据
        that.oriMenu = dataTemp;
        // 将菜单列表加工成树结构
        that.menuList = that.getTreeData(dataTemp);

        // 点击修改角色，需回显权限
        console.log(!that.isAdd)
        if (!that.isAdd) {
          // 遍历授权菜单
          let nowMenu = that.oriMenu || []
          if (!that.isAdd) { // 这里判断用户如果是修改模式取当前角色的菜单（第二个标签）
            nowMenu = this.autOfRole || []
          }
          nowMenu.forEach(item => {
            console.log(item)
            that.menuSubmitData.checkedKeysA.push(item.id + '')
            if (!that.isAdd && ["990101", "990102", "990103", "990104", "990105"].find(res => item.id + '' === res)) { // 这里判断用户如果是修改模式取当前角色的菜单（第二个标签）
              this.treeCheckedKeys.push(item.id + '')
            } else {
              item.children?.forEach(childItem => {
                this.treeCheckedKeys.push(childItem.id + '')
              })
            }
          })
        }
        that.spinning = false
      }).catch(err => {
        that.$message.error(err.errorMsg);
      })
    },
    changeTabs(e) { // 切换菜单时触发
      const that = this
      that.tabKey = e
      // 第二个选项卡激活时，进入第三个选项卡
      if (parseInt(e) === 3 && that.pageStute >= 1) {
        that.pageStute = 2 // 等于2 释放第三个选项卡
        // 造数据
        const menuArr = [...new Set([...that.menuSubmitData.checkedKeysA, ...that.menuSubmitData.checkedKeysB])]
        menuArr.sort((a, b) => {
          return a.id - b.id;
        });
        if (menuArr.length === 0) {
          that.$message.error(this.$t('roleManager.selection_required'))
          return
        }
        let nowMenu = that.oriMenu || [] // 全量菜单
        if (!that.isAdd) { // 这里判断用户如果是修改模式取当前角色的功能
          nowMenu = that.autOfRole || []
        }
        menuArr?.forEach(itemSelect => {
          nowMenu.forEach(item => {
            if (item.id === itemSelect) {
              that.buttonSubmitData = [...that.buttonSubmitData, ...(item.buttons || [])]
            }
            item.children?.forEach(children => {
              if (children.id === itemSelect) {
                that.buttonSubmitData = [...that.buttonSubmitData, ...(children.buttons || [])]
              }
            })
          })
        })
        for (const i in that.buttonSubmitData) {
          that.buttonSubmitData[i] = that.buttonSubmitData[i] + ''
        }
      }
    },
    deepSearch(menu) {
      if (menu.length < 0) {
        return;
      }
      for (let i = 0; i < menu.length; i++) {
        const tmpMenu = this.getMenuById(menu[i].id);
        if (menu[i].children.length == 0 || tmpMenu.children.length == menu[i].children.length) {
          this.searchChildren.push(menu[i].id);
        }

        // recursion tree
        if (menu[i].children && menu[i].children.length > 0) {
          this.deepSearch(menu[i].children);
        }
      }
    },
    onChangeCheckbox(e) {
      console.log(e)
      this.buttonSubmitData = e
    },
    submitRole() {
      this.save()
    },
    onChangeMenu(e) {
      this.menuSubmitData.checkedKeysA = e
      console.log(JSON.stringify(this.menuSubmitData))
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(val) {
      console.log('onCheck', val);
      this.treeCheckedKeys = val;
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info);
      this.selectedKeys = selectedKeys;
    },
    resetForm() {
      this.pageStute = 0 // 屏蔽第二第三个选项卡
      this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.pageStute = 1 // 等于1 释放第二个选项卡
          this.roleStutes = values.RoleStutes
          this.roleName = values.RoleName
          this.description = values.Description || ''
          this.changeTabs(2)
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.role-manager-add-role {
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 24px;

  /deep/ .ant-checkbox-wrapper {
    margin-bottom: 6px;

    &.ant-checkbox-wrapper-checked {
      color: #1890ff;
    }
  }
}

/deep/ .ant-tree-treenode-checkbox-checked .ant-tree-title {
  color: #1890ff;
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

.my-radio {
  display: flex;
  flex-direction: column;

  > label {
    margin-bottom: 6px;
  }
}

.my-card {
  margin-bottom: 24px;
}

.card-content-header {
  height: 36px;
  line-height: 36px;
  padding-right: 12px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #001529;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #f0f2f5;
}

</style>
