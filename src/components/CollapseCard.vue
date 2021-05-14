<template>
  <a-collapse class="collapse" active-key="1" expand-icon-position="right">
    <a-collapse-panel key="1" :header="title">
      <slot />
      <slot slot="extra" name="setting" />
    </a-collapse-panel>
  </a-collapse>
</template>
<script>
export default {
  name: "CollapseCard",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: {
      type: String
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
.collapse {
  border-color: #e8e8e8;

  .ant-collapse-header {
    background: #fff;
    border-radius: 2px;
  }

  .ant-collapse-header {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 16px;
    padding: 16px 24px !important;
    border-radius: 0 0 2px 2px;
  }

  .ant-collapse-content {
    border-color: #e8e8e8;
    overflow: visible;
  }

  .ant-collapse-item {
    border-color: #e8e8e8;
  }
}
</style>
