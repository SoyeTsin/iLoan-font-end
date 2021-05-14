<template>
  <div>
    <a-menu
      :open-keys.sync="openKeys"
      :selected-keys="selectKeys"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.id">
          <router-link :to="item.href">
            <a-icon :type="item.icon" />
            <span>{{ $t('nav.'+item.display) }}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.id" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>
<script>
import { Menu } from 'ant-design-vue';

const SubMenu = {
    template: `
        <a-sub-menu :key="menuInfo.href" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" /><span>{{$t('nav.'+menuInfo.display)}}</span>
        </span>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.href">
                <router-link :to="item.href">
                    <span>{{$t('nav.'+item.display)}}</span>
                </router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.href" :menu-info="item"/>
        </template>
        </a-sub-menu>
    `,
    name: 'SubMenu',
    isSubMenu: true,
    props: {
        ...Menu.SubMenu.props,
        menuInfo: {
            type: Object,
            default: () => ({})
        },
        parentKey: {
            type: [String, Number],
            default: ''
        }
    }
};
export default {
    name: "Sider",
    components: {
        'sub-menu': SubMenu
    },
    props: {
        // menuData: {
        //     type: Array,
        //     required: true
        // }
    },
    data() {
        return {
            menuData: [],
            selectKeys: [],
            openKeys: [''],
            haveChildren: false
        }
    },
    computed: {
    },
    watch: {
        '$route': function(val) {
            // console.log(val)
            this.selectKeys = [val.meta.module || ''];
        }
    },
    mounted() {
        this.menuData = this.handleMenuData(JSON.parse(sessionStorage.getItem('authRawList') || '[]'));
        this.selectKeys = [this.$route.meta.module];
        console.log('Menu Data = ', this.menuData)
    },
    methods: {
        handleMenuData(data) {
            // console.log(this.$router)
            // console.log(this.$route)
            data.forEach(item => {
                delete item.children;
            });
            const map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            const val = [];
            data.forEach((item) => {
                // item.key = 'menu_'+index
                const parent = map[item.parentId];
                // console.log(parent)
                if (parent) {
                    parent.children = parent.children || [];
                    // let menuKey = ''
                    // if(!parent.menuKey){
                    //     menuKey = val.length;
                    //     console.log('没有menuKey,取val的长度',val.length)
                    // }else{
                    //     menuKey = parent.menuKey
                    //     console.log('有menuKey',parent.menuKey)
                    // }
                    // item.menuKey = menuKey + '_' + parent.children.length;
                    parent.children.push(item);
                } else {
                    // item.menuKey = val.length + '';
                    val.push(item);
                }
            });
            // console.log(val);
            return val;
        }
    }
}
</script>
<style scoped>
</style>
