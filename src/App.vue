<template>
  <a-config-provider
    :locale="locale"
    :get-popup-container="triggerNodeFun"
  >
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      locale: this.antd.langLib[this.antd.lang]
    }
  },
  mounted() {
    let lang = ''
    Object.defineProperty(this.antd, 'lang', {
      get: () => {
        return lang
      },
      set: newVal => {
        lang = newVal;
        this.locale = this.antd.langLib[newVal]
      }
    })
  },
  methods: {
    triggerNodeFun(triggerNode) {
      return triggerNode ? triggerNode.parentNode : document.body
    }
  }
}
</script>
<style lang="less">
#app {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
body{
  overflow: auto;
  overflow-x: hidden;
}
.capitalize {
  text-transform: capitalize;
}
</style>
