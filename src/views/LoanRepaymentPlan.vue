<template>
  <div class="view">
    <a-table :columns="columns" :data-source="data" :loading="loading" row-key="Pridnum" />
  </div>
</template>
<script>
import Loan from "@/service/loanService";
export default {
    name: "LoanRepaymentPlan",
    data() {
        return {
            data: [],
            loading: true,
            columns: [
    {
        title: this.$t('loan.repayment_date'),
        dataIndex: 'RepayDay'
    },
    {
        title: this.$t('loan.period'),
        dataIndex: 'Pridnum'
    },
    {
        title: this.$t('loan.installment_USD'),
        dataIndex: 'RepayTotlAmt'
    },
    {
        title: this.$t('loan.principal_USD'),
        dataIndex: 'RepayPrin'
    },
    {
        title: this.$t('loan.interest_USD'),
        dataIndex: 'RepayIntr'
    },
    {
        title: this.$t('loan.outstanding_balance_USD'),
        dataIndex: 'RemainPrin'
    }
],
            option: this.$route.query
        };
    },
    mounted() {
        console.log(this.option)
        if (this.option.CustNo && this.option.LoanDubilNo) {
            this.repaymentPlanEnquire();
        } else {
            this.loading = false
        }
    },
    methods: {
        repaymentPlanEnquire(pageNo) {
            const param = {
                CustNo: this.option.CustNo,
                LoanDubilNo: this.option.LoanDubilNo,
                PageRecCount: 999,
                PageNo: pageNo || 1
            }
            Loan.repaymentPlanEnquire(param).then(res => {
                console.log(res)
                this.data = res.Records || []
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
<style scoped>
</style>
