<template>
  <a-layout id="sider">
    <div class="logo"><div class="logoicon" /></div>
    <a-layout-sider v-model="collapsed" :trigger="null" :collapsible="true" width="256" class="left-side">
      <Sider />
    </a-layout-sider>
    <a-layout class="main">
      <Header @trigger="c=>collapsed = c" />
      <Breadcrumb :disabled-breadcrumb-edit="disabledBreadcrumbEdit" />
      <router-view v-if="$route.meta.fullScreen" @disabledBreadcrumbEditButton="disabledBreadcrumbEditButton" />
      <a-layout-content v-else class="content">
        <router-view @disabledBreadcrumbEditButton="disabledBreadcrumbEditButton" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Sider from "@/layout/Sider";
import Header from "@/layout/Header";
import Breadcrumb from "@/components/Breadcrumb";
// import UM from "@/service/um";

export default {
    name: "Base",
    components: { Breadcrumb, Sider, Header },
    data() {
        return {
            collapsed: false,
            disabledBreadcrumbEdit: false,
            menuData: [],
            menuInfo: {},
            siderData: []
        };
    },
    computed: {
        routerPath() {
            return this.$route.path
        }
    },
    watch: {
        routerPath() {
            this.disabledBreadcrumbEdit = false
        }
    },
    mounted() {
        // this.getMenu();
    },
    methods: {
        disabledBreadcrumbEditButton(e) {
            this.disabledBreadcrumbEdit = e
        }
        // // 获取菜单
        // getMenu() {
        //     console.log(this.global.userInfo)
        //     const roles = []
        //     this.global.userInfo.roles.map(item => roles.push(item.id))
        //     UM.getMenu({ roles: roles }).then(res => {
        //         this.menuData = this.handleMenuData(res);
        //         console.log(this.menuData)
        //     })
        // }

    }
};
</script>
<style lang="less">
#sider{
    width:100%;
    .ant-table-wrapper .ant-table.ant-table-scroll-position-left{
        overflow-x: auto;
    }
    .ant-table-wrapper .ant-table.ant-table-scroll-position-left .ant-table-scroll{
        overflow-x: auto;
    }
    .logo {
        background: rgba(255, 255, 255, 0.2);
        height: 68px;
        position: absolute;
        background-color: #001529;
        width: 256px;
        padding:16px;
        .logoicon{
            background-color: rgba(255, 255, 255, 0.2);
            width: 100%;
            height: 100%;
        }
    }

    .left-side{
        overflow-x: hidden;
        margin-top: 68px;
    }

    .main {
        width: calc(100% - 256px);
        margin-top: 68px;
        display: flex;

        .content {
            margin: 24px 16px;
            padding: 24px;
            background: #FFF;
            flex-shrink: 0;
        }
    }
}

</style>
