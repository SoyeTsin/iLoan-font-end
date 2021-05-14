<template>
  <a-cascader
    :options="data"
    :display-render="displayRender"
    change-on-select
    :load-data="loadData"
    placeholder="Select date"
    :value="selectValue"
    :disabled="disabled"
    @change="onChange"
  />
  <!---expand-trigger="hover"-->
</template>
<script>
    export default {
        name: "DateSelect",
        props: {
            initialValue: {
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
            }
        },
        data() {
            return {
                data: [],
                month: [],
                initData: [],
                selectValue: []
            }
        },
        watch: {
            initialValue: function(val) {
                if (val) {
                    const dataArr = val.split('-');
                    const selectYear = this.data.filter(year => year.value === dataArr[0])[0];
                    const selectMonth = selectYear.children.filter(month => month.value === dataArr[1])[0];
                    this.data[selectYear.index].children[selectMonth.index].children = this.getDay(dataArr)
                    this.data = [...this.data];
                    this.selectValue = dataArr;
                } else {
                    this.selectValue = []
                }
            }
        },
        mounted() {
            this.month = this.getMonth();
            this.data = this.getYear();
            this.initData = JSON.parse(JSON.stringify(this.data))
        },
        methods: {
            onChange(value, item) {
                if (value.length === 1) {
                    this.data = [...this.initData]
                }
                if (value.length === 3) {
                    this.selectValue = value;
                    this.$emit('change', new Date(value.join('-')))
                }
                if (value.length === 0) {
                    this.selectValue = [];
                    this.$emit('change', undefined)
                }
            },
            loadData(selectedOptions) {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                targetOption.children = this.getDay([selectedOptions[0].value, selectedOptions[1].value]);
                this.data = [...this.data];
            },
            displayRender({ labels }) {
                return labels.join('-');
            },
            getYear() {
                const year = [];
                const thisYear = new Date().getFullYear();
                let index = 0;
                for (let i = thisYear - 80; i <= thisYear - 1; i++) {
                    year.push({
                        value: i + '',
                        label: i + '',
                        index: index,
                        children: this.month
                    })
                    index++
                }
                year.reverse();
                return year
            },
            getMonth() {
                const month = [];
                let index = 0;
                for (let i = 1; i <= 12; i++) {
                    let str = i + '';
                    if (i < 10) {
                       str = '0' + i
                    }
                    month.push({
                        value: str,
                        label: str,
                        index: index,
                        isLeaf: false
                    })
                    index++
                }
                return month
            },
            getDay(dateArr) {
                const dayNumber = this.$moment(dateArr.join('-'), "YYYY-MM").daysInMonth() || [];
                const days = [];
                for (let day = 1; day <= dayNumber; day++) {
                    let str = day + '';
                    if (day < 10) {
                        str = '0' + day
                    }
                    days.push({
                        value: str + '',
                        label: str + ''
                    })
                }
                return days
            }
        }
    }
</script>
<style scoped>
</style>
