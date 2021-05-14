<template>
  <input ref="input" v-decorator="vDecorator" :placeholder="placeholder" :disabled="disabled" type="text" class="ant-input number-input" @blur="$emit('blur')">
</template>
<script>
export default {
  name: "NumberInput",
  props: {
    vDecorator: {
      type: Array,
      default() {
        return []
      }
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    maxLength: {
      type: Number,
      default() {
        return 99
      }
    },
      max: {
      type: Number,
      default() {
        return null
      }
    },
    min: {
      type: Number,
      default() {
        return null
      }
    },
    decimal: {
      type: Boolean,
      default() {
        return false
      }
    },
    positive: {
      type: Boolean,
      default() {
        return true
      }
    },
    formatter: {
      type: Boolean,
      default() {
        return false
      }
    },
    interestrate: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      decorator: []
    }
  },
  mounted() {
    this.$refs.input.oninput = this.oninput
    this.$refs.input.onkeypress = this.onkeypress
  },
  methods: {
    oninput(e) {
      let value = e.target.value + '';
      if (this.interestrate) {
        value = value.replace(/[^\d^\.]+/g, '')
        // value = value.replace(/\.{9,}/g, ".")
        // value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      }
      if (this.formatter) {
        value = value.replace(/,/g, '')
      }
      if (!this.decimal && value) {
        value = value.replace(/[^\d]/g, '')
        value = value.replace(/^\./g, "")
      } else {
        value = value.replace(/[^\d^\.]+/g, '')
        value = value.replace(/^\./g, '')
        value = value.replace(/\.{2,}/g, ".")
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
      }
      if (this.decimal) {
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      }
      if (value.split('.')[0].length > this.maxLength) { // 整数位数不超过最大位数
          value = value.substring(0, this.maxLength);
      }
      if (this.max) {
          if (Number(value) > this.max) {
              value = this.max + ''
          }
      }
      if (this.min) {
          if (Number(value) < this.min) {
              value = this.min + ''
          }
      }
      if (this.formatter) {
        value = value.replace(/,/g, '')
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      e.target.value = value;
      // const obj = {
      //   value: value
      // }
      // let v = JSON.parse(JSON.stringify(obj)).value;
      this.$emit('change', value.replace(/,/g, ''))
    },
    onkeypress(e) {
      if (e.key === '.' && !this.decimal) {
        e.returnValue = false
      }
      if (e.key === '^') {
          e.returnValue = false
      }
    }
  }
}
</script>

<style scoped>
.number-input{
}

input:-webkit-autofill {
  box-shadow: 0 0 0 1000px white inset !important;
}
input:-webkit-autofill:focus {
  box-shadow: 0 0 0 1000px white inset !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"],.number-input {
  width: 50%;
  display: inline-block;
  -moz-appearance: textfield;
}
</style>
