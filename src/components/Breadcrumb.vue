<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <span v-if="$route.path === '/summary'">{{ $t('Utils.webstitle') }}</span>
        <a v-else href="javascript:;" @click="$router.push({path:'/summary'})">{{ $t('Utils.webstitle') }}</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item, i) in breadList" :key="i">
        <a
          v-if="i !== breadList.length - 1"
          @click="breadRoute(item)"
        >{{ trans(item.meta.title) }}</a>
        <span v-else>{{ trans(item.meta.title) }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-row
      style="margin-top: 16px; font-size: 18px; font-weight: 600"
      type="flex"
    >
      <a-col v-if="breadList.length > 0" flex="1 1">
        {{ trans(breadList[breadList.length - 1].meta.title) }}
      </a-col>
      <a-col v-if="showOperator" flex="0 1" class="operator">
        <a-dropdown v-if="downloadList.length > 0">
          <a-menu slot="overlay" @click="download">
            <a-menu-item v-for="(item, index) in downloadList" :key="index">
              <a-icon :type="item.icon" />{{ item.text }}
            </a-menu-item>
          </a-menu>
          <a-button
            style="margin-left: 8px"
            type="primary"
          >{{ $t("message.download_btn") }}
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-button
          type="primary"
          :disabled="disabledBreadcrumbEdit"
          @click="intoEdit"
        >{{ $t("message.edit_btn") }}</a-button>
        <a-button @click="() => $router.back(-1)">{{
          $t("message.back_btn")
        }}</a-button>
      </a-col>
      <a-col v-if="showCancel" flex="0 1" class="operator">
        <a-button @click="() => $router.back(-1)">{{ $t("Utils.cancel") }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    disabledBreadcrumbEdit: { type: Boolean, default: true }
  },
  data() {
    return {
      downloadList: [],
      breadList: []
    };
  },
  computed: {
    showOperator() {
      return this.$route.meta.type === "details";
    },
    showCancel() {
      return (
        this.$route.meta.type === "edit" || this.$route.meta.type === "create"
      );
    }
  },
  watch: {
    $route(to, from) {
      this.downloadList = [];
      const str = sessionStorage.getItem("breadList");
      if (str) {
        const breadList = JSON.parse(str);
        if (to.meta.parentPath && breadList.length > 0) {
          const index = breadList.findIndex(
            (item) => to.meta.parentPath === item.path
          );
          if (index > 0) {
            this.breadList = breadList.slice(0, index + 1);
            this.breadList.push({
              meta: to.meta,
              path: to.path
            });
          } else {
            this.breadList = [];
            this.breadList.push({
              meta: to.meta,
              path: to.path
            });
            this.findList(to);
          }
        } else {
          this.breadList = [];
          this.breadList.push({
            meta: to.meta,
            path: to.path
          });
        }
        sessionStorage.setItem("breadList", JSON.stringify(this.breadList));
      }
    }
  },
  mounted() {
    this.$EventBus.$on("getDownloadList", (data) => {
      this.$nextTick(() => {
        this.downloadList = data || [];
      });
    });
    if (sessionStorage.getItem("breadList")) {
      this.breadList = JSON.parse(sessionStorage.getItem("breadList"));
      if (this.$route.path !== this.breadList[this.breadList.length - 1].path) {
        this.breadList = []
        this.breadList.push({
          meta: this.$route.meta,
          path: this.$route.path
        })
        this.findList(this.$route)
        sessionStorage.setItem("breadList", JSON.stringify(this.breadList));
      }
    } else {
      this.breadList.push({ meta: { title: "nav.Summary" }});
      sessionStorage.setItem("breadList", JSON.stringify(this.breadList));
    }
  },
  methods: {
    breadRoute(item) {
      if (!item.meta.needParam) this.$router.push({ path: item.path })
      else this.$router.push({ path: item.path, query: { ...this.$route.query }})
    },
    findList(to) {
      const routeList = this.$router.options.routes[3].children;
      if (routeList?.length > 0) {
        routeList.some((item) => {
          if (to.meta.parentPath === item.path) {
            this.breadList.unshift({
              meta: item.meta,
              path: item.path
            });
            if (item.meta.parentPath) {
              return this.findList(item);
            }
          }
        });
      }
    },
    trans(title) {
      if (title.includes(".")) {
        return this.$t(title);
      }
      return title;
    },
    download(e) {
      const item = this.downloadList[e.key];
      this.$EventBus.$emit("breadcrumbDownload", item);
    },
    intoEdit() {
      this.$EventBus.$emit("breadcrumbEdit");
    }
  }
};
</script>

<style scoped lang="less">
.breadcrumb {
  background-color: #ffffff;
  height: 98px;
  padding: 16px 24px 16px 32px;

  .operator {
    display: flex;
    justify-content: flex-end;

    > button {
      margin-left: 12px;
    }
  }
}
</style>
