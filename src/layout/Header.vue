<template>
  <div class="header-main">
    <a-layout-header
      class="header"
      :style="{
        left:collapsed?'80px':'256px',
        width:collapsed?'calc(100% - 80px)':'calc(100% - 256px)'}"
    >
      <div class="header-left">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="clickTrigger"
        />
      </div>
      <div class="settings">
        <div class="language">
          <a-dropdown placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">{{ $t("nav.language") }}
              <a-icon type="down" class="icon-down" />
            </a>
            <a-menu slot="overlay" @click="changeLanguage">
              <!-- <a-menu-item key="zh">简体中文</a-menu-item> -->
              <a-menu-item key="en">{{ $t('message.lang_eng') }}</a-menu-item>
              <a-menu-item key="th">{{ $t('message.lang_thai') }} </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="user-operation">
          <a-dropdown placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-icon class="user-icon" type="user" />
              {{ global.userInfo.nickname || global.userInfo.name }}
            </a>
            <a-menu slot="overlay" @click="userOperation">
              <a-menu-item key="changePassword" @click="changePassword">
                <a-icon type="form" />
                {{ $t("nav.changePassword") }}
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">
                <a-icon type="logout" />
                {{ $t("nav.logout") }}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {},
  data() {
    return {
      collapsed: false
    }
  },
  mounted() {
    this.$store.commit('getEnumeration')
  },
  methods: {
    clickTrigger() {
      this.collapsed = !this.collapsed
      this.$emit("trigger", this.collapsed);
    },
    changeLanguage(e) {
      // console.log("🚀 ~ file: Header.vue ~ line 70 ~ changeLanguage ~ e", e)
      localStorage.setItem('language', e.key)
      this.$i18n.locale = this.antd.lang = e.key || 'en';
      this.$store.commit('getEnumeration')
    },
    userOperation(e) {
      this[e.key]();
    },
    changePassword() {
      sessionStorage.setItem('passwordType', "passwdexpire")
      this.$router.push('/passwordSetting')
    },
    logout() {
      this.global.expire = 0;
      this.global.userInfo = {};
      this.antd.lang = 'en';
      localStorage.clear();
      sessionStorage.clear();
      this.$router.replace({ path: '/login' });
    }
  }
}
</script>
<style lang="less">

.header {
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  background: #FFF;
  border-bottom: solid 1px #cccccc;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  height: 68px;
  position: absolute;
  z-index: 100;
  left: 256px;
  //width: calc(100% - 256px);
  width: calc(100% - 256px);
  right: 0;
  top: 0;
  transition: all 0.2s;

  .header-left {
    display: flex;

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }

    .trigger:hover {
      color: #1890ff;
    }

    .logo {
      width: 256px;
      text-align: center;
    }

    .menu {
      //margin-left: 100px;
      .ant-menu-root {
        .ant-menu-item, .ant-menu-submenu {
          height: 64px;
          line-height: 64px;
        }

        .ant-menu-submenu-selected, .ant-menu-item-selected {
          background: none;
          color: #FFF;

          .menu-icon {
            color: #FFF;
          }
        }
      }

    }
  }

  .settings {
    display: flex;
    margin-right: 24px;

    .user-operation {
      margin-left: 20px;

      .user-icon {
        margin-right: 10px;
      }

    }

    a.ant-dropdown-link {
      color: #333;
    }

    .icon-down {
      margin-left: 5px;
    }
  }
}

.sub-menu {
  .ant-menu-item-group {
    float: left;
    min-height: 120px;
    min-width: 120px;
    padding: 22px 0 20px 0;

    .ant-menu-item-group-title {
      color: #FFF;
      padding-left: 28px;
    }

    .ant-menu-item-group-list {
      .ant-menu-item {
        font-size: 12px;
        height: 22px;
        line-height: 22px;
        font-weight: 200;
      }
    }
  }
}

.menu-icon {
  margin-right: 10px;
}

</style>
