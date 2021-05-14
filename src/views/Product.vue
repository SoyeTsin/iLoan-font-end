<template>
  <div class="product">
    <SearchModule :input-select="inputSelect" @query="getProductList" />
    <a-button
      v-auth="$buttonConfig.Product.NewProduct"
      type="primary"
      style="margin-bottom: 26px"
      icon="plus"
      @click="() => this.$router.push('/product/productDetails/productDetailsCreate')"
    >{{ $t('product.new_product_btn') }}
    </a-button>
    <a-table
      :columns="columns"
      row-key="LoanProdtNo"
      :loading="loading"
      :data-source="productList"
      :pagination="pagination"
    >
      <div slot="Status" slot-scope="text" class="table-action">
        <div v-if="text === '01'">
          <div>{{ text | filterProdtStatus($t('message.inactive')) }}</div>
        </div>
        <div v-if="text === '02'">
          <div>{{ text | filterProdtStatus($t('message.active')) }}</div>
        </div>
        <div v-if="text === '03'">
          <div>{{ text | filterProdtStatus($t('message.cancelled')) }}</div>
        </div>
      </div>
      <div slot="ExmnvrfyStusCd" slot-scope="text" class="table-action">
        <div v-if="text === '1'" style="color: #3dbd7d">
          {{ text | filterApproval($t('message.agreed')) }}
        </div>
        <div v-if="text === '2'" style="color: #faad14">
          {{ text | filterApproval($t('message.pending')) }}
        </div>
        <div v-if="text === '3'" style="color: #7a7a7a">
          {{ text | filterActive }}
        </div>
        <div v-if="text === '10'" style="color: #f5222d">
          {{ text | filterApproval($t('message.return')) }}
        </div>
        <div v-if="text === '9'" style="color: #0052ba">
          {{ text | filterActive }}
        </div>
      </div>
      <div slot="Action" slot-scope="text, item" class="table-action">
        <a-button
          v-auth="$buttonConfig.Product.ProductDetail"
          type="link"
          class="table-button-line"
          @click="intoDetails(item)"
        >
          {{ $t('message.view_btn') }}
        </a-button>
        <div v-if="productAuthLine" class="table-action-line" />
        <a-button
          v-auth="$buttonConfig.Product.EditProductRequested"
          type="link"
          class="table-button-line"
          :disabled="item.ProdtStus === '03'"
          @click="intoDetailsEdit(item)"
        >
          {{ $t('message.edit_btn') }}
        </a-button>
      </div>
    </a-table>
  </div>
</template>

<script>
import ProductService from "@/service/productService";
import SearchModule from "@/components/SearchModule";
import filterActive from "@/filter/productFilter";

export default {
  name: "Product",
  components: {
    SearchModule
  },
  filters: filterActive,
  data() {
    return {
      buttons: sessionStorage.getItem("authBtns"),
      loading: false,
      inputSelect: [
        {
          name: this.$t('product.product_name'),
          value: "LoanProdtNm",
          inputLength: 20,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: new RegExp(
                    "^[0-9 a-zA-Z\\&\\/\\.\\()\\,\\/s\\'\\-\\ ]+$"
                  ),
                  required: true,
                  type: "string",
                  message: this.$t('message.input_only_alphabet_number')
                },
                { required: true, message: this.$t('product.product_name_required') }
              ]
            }
          ]
        },
        {
          name: this.$t('product.product_id'),
          value: "LoanProdtNo",
          inputLength: 8,
          rules: [
            "inputValue",
            {
              rules: [
                {
                  pattern: "^[0-9a-zA-Z]+$",
                  type: "string",
                  message: this.$t('message.input_only_alphabet_number')
                },
                { required: true, message: this.$t('product.product_id_required') }
              ]
            }
          ]
        }
      ],
      columns: [
        {
          title: this.$t('product.product_id'),
          dataIndex: "LoanProdtNo",
          width: 80,
          key: "ProductID"
        },
        {
          title: this.$t('product.product_name'),
          dataIndex: "LoanProdtNm",
          width: 250,
          key: "ProductName"
        },
        {
          title: this.$t('message.effective_date'),
          dataIndex: "DrawdownDate",
          width: 70,
          class: "effective-date",
          key: "EffectiveDate",
          sorter: (a, b) => {
            const sor =
              this.$moment(a.DrawdownDate, "yyy-MM-DD") -
              this.$moment(b.DrawdownDate, "yyy-MM-DD");
            if (sor > 0) return 1;
            if (sor === 0) return 0;
            if (sor < 0) return -1;
          }
        },
        {
          title: this.$t('product.product_status'),
          dataIndex: "ProdtStus",
          key: "ProdtStus",
          width: 70,
          scopedSlots: { customRender: "Status" },
          filters: [
            { text: this.$t('message.inactive'), value: "01" },
            { text: this.$t('message.active'), value: "02" },
            { text: this.$t('message.cancelled'), value: "03" }
          ],
          onFilter: (value, record) => record.ProdtStus.indexOf(value) === 0
        },
        {
          title: this.$t('message.maker_checker_status'),
          dataIndex: "ExmnvrfyStusCd",
          key: "ExmnvrfyStusCd",
          width: 110,
          scopedSlots: { customRender: "ExmnvrfyStusCd" },
          filters: [
            { text: this.$t('message.agreed'), value: "1" },
            { text: this.$t('message.pending'), value: "2" },
            { text: this.$t('message.return'), value: "10" }
          ],
          onFilter: (value, record) =>
            record.ExmnvrfyStusCd.indexOf(value) === 0
        }
        // {
        //   title: 'Action',
        //   scopedSlots: { customRender: 'Action' },
        //   width: 200
        // }
      ],
      productList: [],
      temp: {},
      pageNum: 1,
      pageSize: 10,
      pagination: {
        defaultCurrent: 1, // defaultCurrent
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        total: 0,
        showTotal: total => this.showTotal(total),
        onShowSizeChange: (current, pageSize) =>
          this.showSizeChange(current, pageSize),
        onChange: (page, pageSize) => this.changePage(page, pageSize)
      }
    };
  },
  computed: {
    productAuth() {
      return (
        this.buttons.indexOf(this.$buttonConfig.Product.EditProductRequested) !=
          -1 ||
        this.buttons.indexOf(this.$buttonConfig.Product.ProductDetail) != -1
      );
    },
    productAuthLine() {
      return (
        this.buttons.indexOf(this.$buttonConfig.Product.EditProductRequested) !=
          -1 &&
        this.buttons.indexOf(this.$buttonConfig.Product.ProductDetail) != -1
      );
    }
  },
  mounted() {
    if (this.productAuth) {
      this.columns.push({
        title: this.$t('message.action'),
        scopedSlots: { customRender: "Action" },
        width: 100
      });
    }
    // this.getProductList()
  },
  methods: {
    onFilterExmnvrfyStusCd(value, record) {
      return record.ExmnvrfyStusCd === value;
    },
    getProductList(e) {
        this.loading = true;
        let param = {
          PageNo: this.pageNum,
          PageRecCount: this.pageSize
        };
        if (e) {
           param = {
          PageNo: 1,
          PageRecCount: 10
        };
          param[e.inputSelected] = e.inputValue;
          if (e.inputSelected === "LoanProdtNm") {
          this.temp[e.inputSelected] = e.inputValue;
          }
        } else {
          param = {
          PageNo: this.pageNum,
          PageRecCount: this.pageSize
        };
         param[Object.keys(this.temp)] = this.temp[Object.keys(this.temp)]
        }
         console.log("🚀 ~ file: Product.vue ~ line 246 ~ getProductList ~ param", param)
        ProductService.getProductList(param).then(res => {
          this.productList = res.Records;
          this.pagination.total = res.PageTotCount;
          this.pageNum = res.PageNo;
          this.loading = false;
        });
    },
    changePage(page, pageSize) {
      this.pageNum = page;
      this.pageSize = pageSize;
      this.getProductList();
    },
    showSizeChange(current, pageSize) {
      this.pageNum = current;
      this.pageSize = pageSize;
      this.getProductList();
    },
    showTotal() {
      return (
        this.$t("system.totalLeft") +
        this.pagination.total +
        this.$t("system.totalRight")
      );
    },
    intoDetails(e) {
      this.$router.push(
        `/product/productDetails?LoanProdtNo=${e.LoanProdtNo}&LoanProdtVersNo=${e.LoanProdtVersNo}&ProdtStus=${e.ProdtStus}`
      );
    },
    intoDetailsEdit(e) {
      this.$router.push(
        `/product/productDetails/productDetailsEdit?LoanProdtNo=${e.LoanProdtNo}&LoanProdtVersNo=${e.LoanProdtVersNo}`
      );
    }
  }
};
</script>

<style scoped lang="less">
.product {
  background-color: #ffffff;
  min-height: 240px;
  padding: 26px 32px;
  box-sizing: border-box;

/deep/ .ant-table-row-cell-break-word {
  white-space: nowrap;
}
  /deep/ .table-button-line.ant-btn {
    padding: 0 !important;
  }

  .table-action {
    display: flex;
    justify-content: flex-start;

    .table-action-line {
      width: 1px;
      height: 14px;
      background-color: #d8d8d8;
      position: relative;
      top: 10px;
      margin: 0 6px;
    }
  }
}
</style>
