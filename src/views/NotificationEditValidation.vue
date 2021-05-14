<template>
  <div id="NotificationEditValidation">
    <a-transfer
      :data-source="allData"
      :target-keys="targetKeys"
      :disabled="disabled"
      :titles="[$t('noti.invalid'), $t('noti.valid')]"
      :show-search="true"
      :filter-option="
        (inputValue, item) => item.title.indexOf(inputValue) !== -1
      "
      :show-select-all="false"
      @change="onChange"
    >
      <template
        slot="children"
        slot-scope="{
          props: {
            direction,
            filteredItems,
            selectedKeys,
            disabled: listDisabled
          },
          on: { itemSelectAll, itemSelect }
        }"
      >
        <collapse-card
          :title="direction === 'left' ? $t('noti.invalid') : $t('noti.valid')"
          class="my-card my-card-left"
        >
          <a-table
            :row-selection="
              getRowSelection({
                disabled: listDisabled,
                selectedKeys,
                itemSelectAll,
                itemSelect
              })
            "
            :columns="direction === 'left' ? leftColumns : rightColumns"
            :data-source="filteredItems"
            size="small"
            :style="{ pointerEvents: listDisabled ? 'none' : null }"
            :custom-row="
              ({ key, disabled: itemDisabled }) => ({
                on: {
                  click: () => {
                    if (itemDisabled || listDisabled) return;
                    itemSelect(key, !selectedKeys.includes(key));
                  }
                }
              })
            "
          />
        </collapse-card>
      </template>
    </a-transfer>
    <div class="submit-content">
      <a-button style="margin-right: 16px" @click="reset">{{
        $t("Utils.reset")
      }}</a-button>
      <a-button @click="save">{{ $t("message.save_btn") }} </a-button>
    </div>
  </div>
</template>
<script>
import Noti from "@/service/notification";
import difference from "lodash/difference";

export default {
  data() {
    return {
      allData: [],
      dd: {
        itemUnit: "item",
        itemsUnit: "items",
        notFoundContent: "The list is empty",
        searchPlaceholder: "Search here"
      },
      targetKeys: [],
      oriTargetKeys: [],
      disabled: false,
      showSearch: false,
      leftColumns: [
        {
          dataIndex: "ProductId",
          title: "ProductId"
        }
      ],
      rightColumns: [
        {
          dataIndex: "ProductId",
          title: "ProductId"
        }
      ]
    };
  },
  created() {
    // Promise.all(api1, api2).then(() => {
    //   console.log(this.allData)
    //   console.log(this.originTargetKeys)
    // })
    Noti.queryNotificationProduct({
      ...this.$route.query,
      NoteLevel: "1"
    }).then((res) => {
      if (res.Records?.length > 0) {
        res.Records.forEach((element) => {
          const obj = { ProductId: element, key: element };
          this.allData.push(obj);
        });
      }
    });
    Noti.queryNotificationProduct({
      ...this.$route.query,
      NoteLevel: "2"
    }).then((res) => {
      if (res.Records?.length > 0) {
        res.Records.forEach((element) => {
          const obj = { ProductId: element, key: element };
          this.allData.push(obj);
          this.oriTargetKeys.push(element);
          this.targetKeys.push(element);
        });
      }
    });
  },
  methods: {
    onChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys;
    },

    triggerDisable(disabled) {
      this.disabled = disabled;
    },

    triggerShowSearch(showSearch) {
      this.showSearch = showSearch;
      console.log("this.showSearch", this.showSearch);
    },
    getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
      return {
        getCheckboxProps: (item) => ({
          props: { disabled: disabled || item.disabled }
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          itemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          itemSelect(key, selected);
        },
        selectedRowKeys: selectedKeys
      };
    },
    reset() {
      this.targetKeys = this.oriTargetKeys;
      console.log("his.targetKeys", this.targetKeys);
    },
    save() {
      const AddProductList = [];
      const DelProductList = [];
      this.targetKeys.forEach((item) => {
        if (!this.oriTargetKeys.includes(item)) {
          AddProductList.push(item);
        }
      });
      this.oriTargetKeys.forEach((item) => {
        if (!this.targetKeys.includes(item)) {
          DelProductList.push(item);
        }
      });
      if (AddProductList.length > 0 || DelProductList.length > 0) {
        Noti.addNotificationValidate({
          ...this.$route.query,
          NoteLevel: "2",
          DelProductList: DelProductList,
          AddProductList: AddProductList
        }).then((res) => {
          if (res.State === "ok") {
            this.$router.push({ path: "/notification" });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
#NotificationEditValidation {
  .ant-transfer-list-header {
    display: none;
  }
  .ant-transfer-list {
    padding-top: 0px;
  }
  .submit-content {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
}
</style>>

