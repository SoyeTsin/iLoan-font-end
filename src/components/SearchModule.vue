<template>
  <div class="search-module">
    <a-form :form="searchForm" @submit="handleSubmit">
      <a-row type="flex">
        <a-col flex="1 0">
          <a-row v-if="showInput" type="flex">
            <a-col>
              <a-form-item>
                <a-select
                  v-if="inputSelect.length > 0"
                  v-decorator="SearchValidate.inputSelected"
                  class="search-select"
                  :placeholder="$t('placeholder.select_parameter')"
                  @change="selectedType"
                >
                  <a-select-option
                    v-for="item in inputSelect"
                    :key="item.value"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-if="inputType === 'date'" flex="1 0">
              <a-row type="flex">
                <a-col class="search-date-picker-col">
                  <a-form-item>
                    <a-date-picker
                      v-decorator="SearchValidate.inputStartDate"
                      :disabled-date="inputStartDate"
                      class="search-date-picker"
                      :placeholder="$t('placeholder.date_start_time')"
                    />
                  </a-form-item>
                </a-col>
                <a-col class="search-date-to-col">
                  <div
                    style="width: 38px;text-align: center;position: relative;top:-14px"
                  >
                    {{ $t('Utils.to') }}
                  </div>
                </a-col>
                <a-col class="search-date-picker-col">
                  <a-form-item>
                    <a-date-picker
                      v-decorator="SearchValidate.inputEndDate"
                      :disabled-date="inputEndDate"
                      class="search-date-picker"
                      :placeholder="$t('placeholder.date_end_time')"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col v-else flex="1 0">
              <a-form-item>
                <a-select
                  v-if="hideTextField || selectList.length > 0"
                  v-decorator="SearchValidate.inputValue"
                  class="search-select-end"
                  :placeholder="$t('placeholder.select_parameter')"
                >
                  <a-select-option v-for="item in selectList" :key="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <a-input
                  v-if="!hideTextField"
                  ref="searchInput"
                  v-decorator="SearchValidate.inputValue"
                  :placeholder="$t('Utils.search')"
                  style="width: 100%"
                  class="search-input"
                  :max-length="inputLength"
                  :min-length="inputMinLength"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="dateSelect.length > 0" type="flex">
            <a-col>
              <a-form-item>
                <a-select
                  v-decorator="SearchValidate.dateSelected"
                  class="search-select"
                  :placeholder="$t('placeholder.select_parameter')"
                  @change="selectedType"
                >
                  <a-select-option v-for="item in dateSelect" :key="item.value">
                    {{ item.name === 'Date' ? $t('loan.date') : item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col flex="1 0">
              <a-row v-if="selectType === 'dateInput'">
                <a-col>
                  <a-form-item>
                    <a-input
                      ref="searchInput"
                      v-decorator="SearchValidate.inputValue"
                      :placeholder="$t('Utils.search')"
                      style="width: 100%"
                      class="search-input"
                      @change="valuesChange($event, 'input')"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-else type="flex">
                <a-col class="search-date-picker-col">
                  <a-form-item>
                    <a-date-picker
                      ref="searchInput"
                      v-decorator="SearchValidate.startTime"
                      class="search-date-picker"
                      :placeholder="$t('placeholder.date_start_time')"
                      format="YYYY-MM-DD"
                      :disabled-date="disabledStartDate"
                      @change="valuesChange($event, 'date')"
                    />
                  </a-form-item>
                </a-col>
                <a-col class="search-date-to-col">
                  <div
                    style="width: 38px;text-align: center;position: relative;top:-14px"
                  >
                    {{ $t('Utils.to') }}
                  </div>
                </a-col>
                <a-col class="search-date-picker-col">
                  <a-form-item>
                    <a-date-picker
                      v-decorator="SearchValidate.endTime"
                      class="search-date-picker"
                      :placeholder="$t('placeholder.date_end_time')"
                      format="YYYY-MM-DD"
                      :disabled-date="disabledEndDate"
                      @change="valuesChange($event, 'date')"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-col class="search-button">
          <div class="search-operating">
            <a-button
              type="primary"
              html-type="submit"
              :disabled="disabledQuery"
            >
              {{ $t('message.query_btn') }}
            </a-button>
            <a-button @click="reset">{{ $t('message.reset_btn') }}</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import SearchValidate from "@/verification/SearchModule";
import inputValidate from "@/lib/input-validate";

export default {
  name: "SearchModule",
  props: {
    hideTextField: Boolean,
    dateRange: Boolean,
    inputSelect: {
      type: Array,
      default() {
        return [];
      }
    },
    dateSelect: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: String,
      default() {
        return "datePicker";
      }
    },
    showInput: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      searchForm: this.$form.createForm(this, {
        onValuesChange: (_, changedFields) => {
          // console.log(changedFields)
          this.$emit("change", changedFields);
        }
      }),
      startTime: null,
      endTime: null,
      endOpen: false,
      disabledQuery: true,
      isIdSelector: "",
      inputLength: 40,
      Patterns: {
        CitizenID: "_-____-_____-__-_",
        CustId: "___-___-___-___",
        BrwerCustNo: "___-___-___-___"
      },
      PassPortPattern: false,
      inputType: null,
      inputMinLength: null,
      SearchValidate: JSON.parse(JSON.stringify(SearchValidate)),
      selectList: []
    };
  },
  created() {
    this.$on("change", res => this.onValuesChange(res));
    if (this.dateSelect.length > 0) {
      // this.customRule()
    }
  },
  mounted() {
    inputValidate(document.querySelectorAll(".namer"), {
      noSymbol: false,
      noNumber: false,
      noLetter: false
    });
    // console.log(this.inputSelect);
    // console.log(this.dateSelect);
    this.customRule()
  },
  methods: {
    hyphenAppend(e) {
      if (e.inputType !== "deleteContentBackward") {
        if (
          this.isIdSelector === "CitizenID" ||
          this.isIdSelector === "CustId"
        ) {
          const pattern = String(this.Patterns[this.isIdSelector]);
          const pattern_ex = String("-");
          let returnText = String("");
          const obj_l = e.target.value.length;
          const obj_l2 = obj_l - 1;
          for (let i = 0; i < pattern.length; i++) {
            if (obj_l2 == i && pattern.charAt(i + 1) == pattern_ex) {
              returnText += e.target.value + pattern_ex;
              e.target.value = returnText;
            }
          }
          if (obj_l >= pattern.length) {
            e.target.value = e.target.value.substr(0, pattern.length);
          }
        }
      }
    },
    onValuesChange(res) {
      if (res.inputValue) {
        let selectKey = "dateSelected";
        if (this.showInput) {
          selectKey = "inputSelected";
        }
        const selectValue = this.searchForm.getFieldsValue([selectKey]) || {};
        this.disabledQuery = !(
          selectValue[selectKey] && res?.inputValue?.length > 0
        );
      }

      if (res.dateSelected) {
        this.getDateDisabledQuery();
      }
    },
    selectChange(e, type) {
      // console.log("this.showInput", e);
      e !== "" ? (this.isIdSelector = e) : "";
      if (e === "LoanContNo") {
        this.inputLength = 29;
      }
      if (e === "BrwerNm") {
        this.inputLength = 80;
      }
      if (e === "Passport") {
        this.inputLength = 10;
      }
      if (!this.showInput) {
        this.searchForm.resetFields();
        this.disabledQuery = true;
      }
    },
    valuesChange(e, type) {
      if (type === "input") {
        const dateValue =
          this.searchForm.getFieldsValue(["dateSelected"]) || {};
        this.disabledQuery = !(
          dateValue.dateSelected && e.target.value.length > 0
        );
        // console.log("isId", this.isIdSelector);
      } else if (type === "date") {
        this.getDateDisabledQuery();
      }
    },
    getDateDisabledQuery() {
      this.$nextTick(() => {
        const dateValue = this.searchForm.getFieldsValue([
          "startTime",
          "endTime",
          "dateSelected"
        ]);
        this.disabledQuery = !(
          dateValue.startTime &&
          dateValue.endTime &&
          dateValue.dateSelected
        );
      });
    },
    selectedType(value) {
      if (value !== "Date") {
        this.searchForm.resetFields();
      }
      this.disabledQuery = true;
      this.selectList = [];
      value !== "" ? (this.isIdSelector = value) : "";
      this.inputSelect.forEach(item => {
        if (item.value === value) {
          this.inputLength = item.inputLength || 80;
          this.inputMinLength = item.inputMinLength || null;
          // 如果选择的类型是下拉框形式给下拉框列表赋值
          this.selectList = item.list || [];
          this.inputType = item.inputType || "";
          if (item.rules?.length > 0) {
            this.SearchValidate.inputValue = item.rules;
          } else {
            this.SearchValidate.inputValue = JSON.parse(
              JSON.stringify(SearchValidate.inputValue)
            );
          }
          if (item.customRules) {
            inputValidate([this.$refs.searchInput.$el], item.customRules);
          }
        }
      });
      this.dateSelect.forEach(item => {
        if (item.value === value) {
          this.inputLength = item.inputLength || 80;
          this.inputMinLength = item.inputMinLength || null;
          // 如果选择的类型是下拉框形式给下拉框列表赋值
          this.selectList = item.list || [];
          this.inputType = item.inputType || "";
          if (item.rules?.length > 0) {
            this.SearchValidate.inputValue = item.rules;
          } else {
            this.SearchValidate.inputValue = JSON.parse(
              JSON.stringify(SearchValidate.inputValue)
            );
          }
          if (item.customRules) {
            inputValidate([this.$refs.searchInput.$el], item.customRules);
          }
        }
      });
    },
    customRule() {
      this.SearchValidate.inputValue[1].rules[0].validator = (
        rule,
        value,
        callback
      ) => {
        if (!value) {
          callback(this.$t('message.please_correct_information'));
        }
        callback()
      }
    },
    inputStartDate(value) {
      const endValue = this.searchForm.getFieldValue("inputEndDate");
      if (!value || !endValue) {
        return false;
      }
      return value.valueOf() > endValue.valueOf();
    },
    inputEndDate(value) {
      const startValue = this.searchForm.getFieldValue("inputStartDate");
      if (!value || !startValue) {
        return false;
      }
      return startValue.valueOf() >= value.valueOf();
    },
    disabledStartDate(value) {
      const endValue = this.searchForm.getFieldValue("endTime");
      if (!value || !endValue) {
        return false;
      }
      return value.valueOf() > endValue.valueOf();
    },
    disabledEndDate(value) {
      const startValue = this.searchForm.getFieldValue("startTime");
      if (!value || !startValue) {
        return false;
      }
      return startValue.valueOf() >= value.valueOf();
    },
    formatDate(e) {
      return this.$moment(this.$moment(e).format("yyyy-MM-DD"), "yyy-MM-DD");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.searchForm.validateFields((err, values) => {
        // console.log("valuess", values);
        if (values["inputValue"]?.split("").includes("-")) {
          if (
            values["inputSelected"] === "CustId" ||
            values["inputSelected"] === "CustName" ||
            values["inputSelected"] === "CitizenID" ||
            values["dateSelected"] === "CitizenID" ||
            values["dateSelected"] === "BrwerCustNo"
          ) {
            values["inputValue"] = values["inputValue"].split("-").join("");
          }
        }
        if (!err) {
          console.log("Received values of form: ", values);
          if (this.inputType === "date") {
            values.inputValue = [values.inputStartDate, values.inputEndDate];
          }
          this.$emit("query", values);
        }
      });
    },
    reset() {
      this.searchForm.resetFields();
      this.disabledQuery = true;
      this.$emit("query", null);
    }
  }
};
</script>

<style scoped lang="less">
.search-module {
  width: 100%;
  //margin-bottom: 26px;

  .date-range {
    margin-top: 12px;

    /deep/ .ant-row-flex {
      width: 100%;
    }
  }

  .picker-content {
    display: flex;
  }

  .search-button {
    width: 170px;
  }

  //.search-option {
  //    display: flex;
  //    justify-content: flex-start;
  //    line-height: 32px;

  .search-select {
    width: 240px;

    /deep/ .ant-select-selection {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      right: -1px;
    }
  }

  .search-select-end {
    /deep/ .ant-select-selection {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .ant-select-focused {
    z-index: 999;
  }

  .search-input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .search-date-to-col {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-date-picker-col {
    width: calc((100% - 38px) / 2);

    .search-date-picker {
      width: 100%;

      /deep/ .ant-calendar-picker-input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  //}

  .search-operating {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;

    & > button {
      margin-left: 15px;
    }
  }
}
</style>
