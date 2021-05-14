<template>
  <a-spin :spinning="spinning" class="addrm">
    <div class="treeData">
      <a-tabs @change="changeTab">
        <a-tab-pane key="0" tab="Menu Authority">
          <a-form :form="form" layout="inline" class="content role-manager-add-role" :self-update="true">
            <a-form-item label="Role name" :required="true">
              <a-input
                v-model="roleName"
                v-decorator="[ 'nickname', {rules: [{ pattern:'^[a-zA-Z]+$', type:'string', message: 'Only enter a-z/A_Z!'},{ required: true, message: 'Please input nickname!' }]} ]"
                placeholder="Role Name"
                :max-length="40"
              />
            </a-form-item>
            <a-form-item label="Description">
              <a-input v-model="description" placeholder="Description" :max-length="50" />
            </a-form-item>
            <div style="color: #cccccc;text-align: center;margin-top: 140px">*This page is being redone</div>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="1" tab="Menu Authority">
          <div v-if="menuList && menuList.length>0" class="content role-manager-add-role">
            <a-row>
              <a-col
                v-for="(menu,index) in menuList"
                :key="menu.id"
                :span="index==0?2:4"
                :style="index==0?'':'margin-left:50px'"
              >
                <div v-if="functionMenu[menu.id].length>0">
                  <a-tree
                    v-model="checkedKeys[menu.id]"
                    show-line
                    checkable
                    :expanded-keys="expandedKeys[menu.id]"
                    :auto-expand-parent="autoExpandParent[menu.id]"
                    :tree-data="functionMenu[menu.id]"
                    default-expand-all
                    @expand="onExpand($event,menu.id)"
                    @check="onCheck($event,menu.id)"
                  />
                </div>
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Function Authority">
          <div class="content role-manager-add-role">
            <a-table
              :columns="funcColumns"
              :row-key="record => record.id"
              :data-source="functionList"
              size="small"
              bordered
              :pagination="false"
            >
              <template slot="menuTitle">
                <a-checkbox
                  :checked="pageChecked"
                  @change="pageCheckAll($event)"
                > Menu
                </a-checkbox>
              </template>
              <template slot="menu" slot-scope="record">
                <span style="display:flex;justify-content:space-between">
                  <a-checkbox
                    :checked="checkedFuncList[record.id].length == record.function.length"
                    @change="onCheckAllChange($event,record)"
                  > {{ record.menu }}</a-checkbox>
                </span>
              </template>
              <template slot="function" slot-scope="record">
                <div style="width:100%;text-align:left">
                  <a-row>
                    <a-checkbox-group v-model="checkedFuncList[record.id]" @change="onSelectFunc(record)">
                      <a-col v-for="fun in record.function" :key="fun.id" :span="6">
                        <a-checkbox :value="fun.id">
                          {{ fun.id }}-
                          {{ fun.label }}</a-checkbox>
                      </a-col>
                    </a-checkbox-group>
                  </a-row>
                </div>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <!--        <a-tab-pane key="3" tab="CI Authority">-->
        <!--          <div v-if="checkedCiList && checkedCiList.length>0" class="content">-->
        <!--            <a-row>-->
        <!--              <a-col v-for="ci in checkedCiList" :key="ci.id" :span="4">-->
        <!--                <div v-if="ciMenu[ci.id].length>0">-->
        <!--                  <a-tree-->
        <!--                    v-model="checkedKeysCi[ci.id]"-->
        <!--                    show-line-->
        <!--                    checkable-->
        <!--                    :expanded-keys="expandedKeysCi[ci.id]"-->
        <!--                    :auto-expand-parent="autoExpandParentCi[ci.id]"-->
        <!--                    :tree-data="ciMenu[ci.id]"-->
        <!--                    default-expand-all-->
        <!--                    @expand="onExpandCi($event,ci.id)"-->
        <!--                    @check="onCheckCi($event,ci.id)"-->
        <!--                  />-->
        <!--                </div>-->
        <!--              </a-col>-->
        <!--            </a-row>-->
        <!--          </div>-->
        <!--        </a-tab-pane>-->
        <a-button slot="tabBarExtraContent" type="primary" style="margin-right:5px" @click="save">save</a-button>
        <a-button slot="tabBarExtraContent" type="default" style="margin-right:5px" @click="back">back</a-button>
      </a-tabs>
    </div>
  </a-spin>
</template>
<script>
import UM from "@/service/um";

const funcColumns = [
  {
    scopedSlots: { customRender: 'menu' },
    slots: { title: 'menuTitle' },
    width: '20%'
  },
  {
    title: 'Function',
    scopedSlots: { customRender: 'function' }
  }
];
const ciColumns = [
  {
    scopedSlots: { customRender: 'category' },
    slots: { title: 'ciTitle' },
    width: '20%'
  },
  {
    title: 'Ci',
    scopedSlots: { customRender: 'ci' }
  }
];

export default {
  data() {
    return {
      funcColumns,
      ciColumns,
      spinning: true,
      form: this.$form.createForm(this),
      // expandedKey of each menu tree
      expandedKeys: {},
      // autoExpandParent of each menu tree
      autoExpandParent: {},
      // autoExpandParent of each menu tree
      checkedKeys: {},
      // original menu data
      oriMenu: [],
      // original menu tree
      menuList: [],
      // dynamic collapse css style
      customStyle:
          'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      // default expand collapse
      activeKey: [],
      // each attribute is a tree
      functionMenu: {},
      // for checked all function
      searchChildren: [],
      searchParent: [],
      roleName: '',
      description: '',
      functionList: [],
      checkedFuncList: {},
      indeterminate: {},
      checkAll: {},
      buttonList: [],
      isAdd: true,
      role: {},
      autOfRole: [],
      checkedLv1List: [],
      checkLv1: {},
      // 授权菜单树结构列表
      arraylist: [],
      pageChecked: false,

      ciList: [],
      ciMenu: {},
      // expandedKey of each ci tree
      expandedKeysCi: {},
      // autoExpandParent of each ci tree
      autoExpandParentCi: {},
      // autoExpandParent of each ci tree
      checkedKeysCi: {},
      checkedCiList: [],
      ciMenuArray: []
    };
  },
  mounted() {
    this.role = JSON.parse(localStorage.getItem('roleManagerData')) || {};
    this.isAdd = this.role.id == undefined;

    // 角色编辑
    if (!this.isAdd) {
      this.roleName = this.role.name;
      this.description = this.role.describe;
      this.queryRole();
    } else { // 新增角色
      this.queryMenuData();
      this.queryButtonData();
      // this.queryCi();
    }
  },
  methods: {
    // @Desc   on expand menu tree
    // @Author Glenn
    // @Param
    //    event  expand node
    //    id     menu id
    onExpand(event, id) {
      this.expandedKeys[id] = [];
      this.expandedKeys[id] = event;
      this.autoExpandParent[id] = false;
    },
    // @Desc   on expand ci tree
    // @Author Glenn
    // @Param
    //    event  expand node
    //    id     menu id
    onExpandCi(event, id) {
      this.expandedKeysCi[id] = [];
      this.expandedKeysCi[id] = event;
      this.autoExpandParentCi[id] = false;
    },
    // @Desc   on click lv2 menu checked
    // @Author Glenn
    // @Param
    //    event  checked node
    //    id     menu id
    onCheck(event, id) {
      this.checkedKeys[id] = event;
    },
    // @Desc   on click lv2 ci checked
    // @Author Glenn
    // @Param
    //    event  checked node
    //    id     menu id
    onCheckCi(event, id) {
      this.checkedKeysCi[id] = event;
    },
    // @Desc   query menu data list
    // @Author Glenn
    queryMenuData() {
      // 查询菜单列表
      this.spinning = true
      UM.menuQuery({ 'pageIndex': 1, 'pageSize': 1000, 'orderBy': 'index' }).then((res) => {
        // 获取菜单列表
        const dataTemp = res || [];
        // 保存全量平铺菜单数据
        this.oriMenu = dataTemp;
        // 将菜单列表加工成树结构
        this.menuList = this.getTreeData(dataTemp);

        this.menuList.forEach((d1) => {
          // 初始化树对象（以父节点为key）
          this.functionMenu[d1.id] = [];

          // 初始化树数据
          this.functionMenu[d1.id].push({
            title: d1.name,
            key: d1.id,
            children: d1.children
          });

          // 初始化全局变量searchParent
          this.searchParent = [];
          if (d1.children.length > 0) {
            // 有子菜单，把自己加入树
            this.searchParent.push(d1.id);
          }
          // 用于搜索当前节点下的所有子节点的id，赋给全局变量searchParent
          this.nodeDeepSearch(d1.children);

          // 用于显示展开数组
          this.$set(this.expandedKeys, d1.id, this.searchParent);
          // 默认菜单勾选
          this.$set(this.checkedKeys, d1.id, []);
          // 默认自动展开
          this.$set(this.autoExpandParent, d1.id, true);
        });

        // 点击修改角色，需回显权限
        console.log(!this.isAdd)
        if (!this.isAdd) {
          // 将平铺的菜单data组成树data
          const authList = JSON.parse(JSON.stringify(this.autOfRole));
          this.treedatalist(authList);

          // 遍历授权菜单
          this.arraylist.forEach((arr) => {
            this.searchChildren = [];
            if (arr.children.length > 0) {
              // 递归获得该菜单下子菜单id数组列表
              this.deepSearch(arr.children);
              this.searchChildren.forEach((e) => {
                const m = this.getMenuById(e);
                // 遍历子菜单id数组列，赋值
                if (m.menuType == 'view') {
                  this.checkedKeys[arr.id].push(String(e));
                }
              });
            } else if (arr.children.length == 0) {
              // 若无子节点需把自己勾上 如home菜单
              this.checkedKeys[arr.id].push(String(arr.id));
            }
          });
        }
        this.spinning = false
      }).catch(err => {
        this.$message.error(err.errorMsg);
      })
    },
    queryButtonData() {
      // 查询按钮列表
      UM.buttonQuery(0).then((res) => {
        // 获取按钮列表
        this.buttonList = res;
        if (!this.isAdd) {
          const authList = JSON.parse(JSON.stringify(this.autOfRole));
          authList.forEach((d) => {
            if (d.menuType === 'view' && d.buttons != null && d.buttons.length > 0) {
              this.$set(this.checkedFuncList, d.id, []);
              d.buttons.forEach((btn) => {
                this.checkedFuncList[d.id].push(btn);
              });

              this.checkedFuncList[d.id] = new Set(this.checkedFuncList[d.id]);
              this.checkedFuncList[d.id] = Array.from(this.checkedFuncList[d.id]);
            }
          });
        }
      }).catch(err => {
        this.$message.error(err.errorMsg);
      })
    },

    // 查询授权
    queryRole() {
      const tmp = [];
      tmp.push(this.role.id);
      const param = {
        roles: tmp
      };
      UM.autOfRole(param).then((res) => {
        this.autOfRole = res;
        // 查询
        this.queryMenuData();
        this.queryButtonData();
        // this.queryCi();
      }).catch(err => {
        this.$message.error(err.errorMsg);
      })
    },
    // @Desc   format data into a tree
    // @Author Glenn
    // @param  datas  menu data
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
    // @Desc   deeply searching to get the list of node's id
    // @Author Glenn
    // @param  menu  menu data
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
    // 深度搜索菜单列表
    nodeDeepSearch(menu) {
      for (let i = 0; i < menu.length; i++) {
        // recursion tree
        if (menu[i].children && menu[i].children.length > 0) {
          this.searchParent.push(menu[i].id);
          this.nodeDeepSearch(menu[i].children);
        }
      }
    },
    save() {
      if (this.roleName.trim() == '' || this.roleName == undefined) {
        this.$message.info('Please input the role name');
        return;
      } else {
        let menuAut = [];

        for (const menu in this.checkedKeys) {
          if (this.checkedKeys[menu].length > 0) {
            this.checkedKeys[menu].forEach((element) => {
              const m = this.getMenuById(element);
              this.findParentId(m.id, menuAut);
              menuAut.push(Number(m.id));
            });
          }

          menuAut = menuAut.filter((d) => {
            return d != 0;
          });

          menuAut = new Set(menuAut);
          menuAut = Array.from(menuAut);
        }

        const funcAut = [];
        for (const func in this.checkedFuncList) {
          // 已取消勾选的菜单，其按钮权限无需送参（eg.在菜单页选了菜单，在功能页勾选了该菜单的按钮，返回菜单页，取消该菜单的勾选）
          if (menuAut.indexOf(Number(func)) != -1) {
            this.checkedFuncList[func].forEach((d) => {
              funcAut.push(Number(d));
            });
          }
        }

        if (this.isAdd) {
          // 新增
          const param = {
            name: this.roleName, describe: this.description, status: 1, menu: menuAut, button: funcAut
          };
          UM.addRole(param).then((res) => {
            this.$message.success('Add Role Success!');
            this.$router.push({
              path: '/roleManager'
            });
          }).catch(err => {
            this.$message.error(err.errorMsg);
          })
        } else {
          // 更新
          const param = {
            id: this.role.id,
            name: this.roleName,
            describe: this.description,
            status: 1,
            menu: menuAut,
            button: funcAut
          };

          UM.updateRole(param).then((res) => {
            this.$message.success('Update Role Success!');
            this.$router.push({
              path: '/roleManager',
              params: { role: this.role }
            });
          }).catch(err => {
            this.$message.error(err.errorMsg);
          })
        }
      }
    },
    // 父id搜索
    findParentId(id, data) {
      const m = this.getMenuById(id);

      if (m.parentId != 0) {
        this.findParentId(m.parentId, data);
      }
      data.push(Number(m.parentId));
    },
    // 回退
    back() {
      this.$router.push({
        path: '/roleManager'
      });
    },
    // tab切换
    changeTab(keyTab) {
      const that = this
      if (keyTab == 2) {
        // 根据已选菜单展示按钮列表
        // 按钮列表初始化
        that.functionList = [];
        // 组织已选菜单id数组，用于过滤按钮权限（若菜单取消勾选，对应的按钮权限应自动取消）
        const checkedMenuList = [];
        // 遍历已选菜单（菜单id数组）
        for (const key in that.checkedKeys) {
          // 遍历子菜单
          that.checkedKeys[key].forEach((m) => {
            // 根据m（菜单id）获取菜单信息
            const menu = that.getMenuById(m);
            // 查叶子菜单
            if (menu.buttons && menu.buttons.length > 0) {
              // 组织已选菜单id数组
              checkedMenuList.push(menu.id);
              // 新勾选的菜单，初始化按钮列表
              if (!that.checkedFuncList[menu.id] || that.checkedFuncList[menu.id].length < 0) {
                that.$set(that.checkedFuncList, menu.id, []);
              }
              // 对按钮列表进行加工
              const obj = [];
              // 国际化
              const localLan = that.$i18n.locale;
              menu.buttons.forEach((a) => {
                // 中英标签
                if (localLan == 'zh') {
                  obj.push({ id: that.getButtonById(a).button, label: that.getButtonById(a).label });
                } else {
                  obj.push({ id: that.getButtonById(a).button, label: that.getButtonById(a).en_abel });
                }
              });
              obj.sort((a, b) => {
                return a.id - b.id;
              });
              that.functionList.push({ id: menu.id, menu: menu.name, function: obj });
            }
          });
        }

        // 排序
        that.functionList.sort((a, b) => {
          return a.id - b.id;
        });

        // 过滤权限（若菜单取消勾选，对应的按钮权限应自动取消）
        for (const id in that.checkedFuncList) {
          if (checkedMenuList.indexOf(id) == -1) {
            that.checkedFuncList[id] = [];
          }
        }

        // 按钮菜单全选框处理
        let flag = true;
        // 若有一个按钮没勾上，则按钮菜单全选框为false
        if (that.functionList.length > 0) {
          that.functionList.forEach((p) => {
            if (that.checkedFuncList[p.id].length != p.function.length) {
              flag = false;
            }
          });
        } else { // 没有勾选菜单，按钮菜单全选框为false
          flag = false;
        }

        // 绑定全选框model
        if (flag) {
          that.pageChecked = true;
        } else {
          that.pageChecked = false;
        }
      } else if (keyTab == 3) {
        // 组织已选ci菜单id数组，用于ci权限（若菜单取消勾选，对应的ci权限应自动取消）
        const chooseCi = [];
        // 勾选的ci树数组
        that.checkedCiList = [];

        // id‘3’是ci所在菜单树，遍历ci菜单树
        that.checkedKeys['3'].forEach((e) => {
          const menu = that.getMenuById(e);
          // 菜单是service/data/resource/distributed/api gate的,则加入ci树中
          if (that.ciMenuArray.indexOf(menu.name.toLowerCase()) != -1) {
            // 遍历全量ci树
            that.ciList.forEach((ci) => {
              if (ci.name == menu.name) {
                that.checkedCiList.push(ci);
                // 组织已选ci菜单id数组
                chooseCi.push(ci.id);
              }
            });
          }
        });
        // 排序
        that.checkedCiList.sort((a, b) => {
          return a.id - b.id;
        });

        // 过滤权限（若ci菜单取消勾选，对应的ci权限应自动取消）
        for (const id in that.checkedKeysCi) {
          if (chooseCi.indexOf(id) == -1) {
            that.checkedKeysCi[id] = [];
          }
        }
      }
    },
    getMenuById(id) {
      const that = this
      let menu = {};
      that.oriMenu.forEach((d) => {
        if (d.id == id) {
          menu = d;
        }
      });
      return menu;
    },
    getButtonById(id) {
      const that = this
      let button = {};
      that.buttonList.forEach((d) => {
        if (d.button == id) {
          button = d;
        }
      });
      return button;
    },
    getCiByName(name) {
      const that = this
      let ci = {};
      that.oriCiList.forEach((c) => {
        if (c.name.toLowerCase() == name) {
          ci = c;
        }
      });
      return ci;
    },

    onSelectFunc(record) {
      let flag = true;
      this.functionList.forEach((p) => {
        if (this.checkedFuncList[p.id].length != p.function.length) {
          flag = false;
        }
      });

      if (flag) {
        this.pageChecked = true;
      } else {
        this.pageChecked = false;
      }
    },
    // @Desc   on check all page
    // @Author Glenn
    // @Param
    //    event  check event
    pageCheckAll(e) {
      if (e.target.checked) {
        this.pageChecked = true;
        this.functionList.forEach((p) => {
          this.checkedFuncList[p.id] = [];
          p.function.forEach((fun) => {
            this.checkedFuncList[p.id].push(fun.id);
          });
        });
      } else {
        this.pageChecked = false;
        this.functionList.forEach((p) => {
          this.checkedFuncList[p.id] = [];
        });
      }
    },
    onCheckAllChange(e, record) {
      this.checkedFuncList[record.id] = [];
      if (!e.target.checked) {
        // this.checkedFuncList[record.id] = [];
      } else {
        record.function.forEach((d) => {
          this.checkedFuncList[record.id].push(d.id);
        });
      }

      let flag = true;
      this.functionList.forEach((p) => {
        if (this.checkedFuncList[p.id].length != p.function.length) {
          flag = false;
        }
      });

      if (flag) {
        this.pageChecked = true;
      } else {
        this.pageChecked = false;
      }
    },
    // 授权菜单平铺结构转成树结构
    treedatalist(data) {
      if (data.length === 0) {
        return;
      }

      const len = data.length;
      for (let i = 0; i < len; i++) {
        if (data[i].level == 1) {
          data[i]['children'] = [];
          this.arraylist.push(data[i]);
        }
      }
      return this.treedatalistdg(data, this.arraylist);
    },
    // 递归获得子菜单
    treedatalistdg(data, arraylist) {
      if (arraylist.length === 0) {
        return;
      }
      for (let j = 0; j < arraylist.length; j++) {
        for (let i = 0; i < data.length; i++) {
          if (data[i]['parentId'] == arraylist[j]['id']) {
            data[i]['children'] = [];
            arraylist[j]['children'].push(data[i]);
          }
        }
        if (arraylist[j]['children'].length > 0) {
          this.treedatalistdg(data, arraylist[j]['children']);
        }
      }
    }

  }
};
</script>
<style lang="less">
.addrm {
  height: 100%;

  .head {
    padding: 11px 26px 26px 26px;

    .ant-form-item {
      margin-left: 60px;
    }

    .ant-input {
      width: 300px;
    }
  }

  .roleBtn {
    height: 75px;
    line-height: 75px;
    background-color: rgb(242, 242, 242);

    .Fieldpermissions {
      margin-left: 50px;
    }
  }

  .content {
    margin: 10px 20px 0 20px;
  }

  .ant-checkbox-group {
    display: flex;
    flex-flow: wrap;
  }
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

.role-manager-add-role {
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 24px;
}

</style>
