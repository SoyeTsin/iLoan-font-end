<template>
  <div>
    <a-card :title="$t('summary.loan_balance_statistics')" class="chart-card">
      <chart ref="balance" :options="options.balance" :autoresize="true" class="chart-card" style="width: 100%" />
    </a-card>
    <a-card :title="$t('summary.loan_customer_statistics')" class="chart-card">
      <chart ref="customer" :options="options.customer" :autoresize="true" class="chart-card" style="width: 100%" />
    </a-card>
    <a-card :title="$t('summary.loan_risk_classification')" class="chart-card">
      <chart ref="risk" :options="options.risk" :autoresize="true" class="chart-card" style="width: 100%" />
    </a-card>
  </div>
</template>

<script>
import chart from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import Summary from "@/service/summary";

export default {
	name: 'Summary',
	components: {
		chart
	},
	data() {
		return {
			options: {
				balance: {
                    title: {
                        text: this.$t('summary.loan_balance_statistics'),
                        textStyle: {
                            fontSize: 16
                        }
                    },
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					toolbox: {
						feature: {
							magicType: { show: true, type: ['line'] },
							restore: { show: true },
							saveAsImage: { show: true }
						}
					},
					legend: {
						data: [this.$t('summary.new_loan'), this.$t('summary.loan_balance'), this.$t('summary.MoM_growth')]
					},
					xAxis: [
						{
							type: 'category',
							data: [],
							axisPointer: {
								type: 'shadow'
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '',
							min: 0,
							// max: 250,
							// interval: 100,
							axisLabel: {
								formatter: '{value}'
							}
						},
						{
							type: 'value',
							name: this.$t('summary.MoM_growth'),
							max: 1,
							interval: 0.2,
							axisLabel: {
								formatter: '{value} %'
							}
						}
					],
					series: []
				},
				customer: {
                    title: {
                        text: this.$t('summary.loan_customer_statistics'),
                        textStyle: {
                            fontSize: 16
                        }
                    },
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					toolbox: {
						feature: {
							saveAsImage: { show: true }
						}
					},
					legend: {
						data: [this.$t('summary.new_customer'), this.$t('summary.total_customer')]
					},
					xAxis: [
						{
							type: 'category',
							data: [],
							axisPointer: {
								type: 'shadow'
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '',
							min: 0,
							// max: 250,
							// interval: 100,
							axisLabel: {
								formatter: '{value}'
							}
						}
					],
					series: []
				},
				risk: {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
                    toolbox: {
                        feature: {
                            saveAsImage: { show: true }
                        }
                    },
					legend: {
						orient: 'vertical',
						left: 10,
						data: [this.$t('summary.normal'), this.$t('summary.attention'), this.$t('summary.secondary'), this.$t('summary.suspicious'), this.$t('summary.loss')]
					},
					series: [
						{
							name: '',
							type: 'pie',
							radius: ['50%', '70%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center'
							},
							emphasis: {
								label: {
									show: true,
									fontSize: '30',
									fontWeight: 'bold'
								}
							},
							labelLine: {
								show: false
							},
							data: []
						}
					]
				}
			}
		};
	},
	mounted() {
		this.getBalance();
		this.getCustomer();
		this.getRisk();
	},
	methods: {
		getBalance() {
			this.$refs.balance.showLoading({ text: this.$t('Utils.loading') })
			Summary.getBalance().then(res => {
				console.log('getSummaryBalance', res)
				const xAxis = [];
				const series = [
					{ name: this.$t('summary.new_loan'), key: 'NLoanAmtPerMon', type: 'bar', data: [] },
					{ name: this.$t('summary.loan_balance'), key: 'BalancePerMon', type: 'bar', data: [] },
					{ name: this.$t('summary.MoM_growth'), key: 'SeqGrowthPerMon', type: 'line', data: [] }
				];
				const data = res.Records || [];
				const colorList = ['#f2a3a2', '#f6d498', '#72c142']
				data.forEach(item => {
					xAxis.push(item.CurrDt);
					series.forEach((axis, index) => {
                        axis.itemStyle = {
                            normal: {
                                color: colorList[index]
                            }
                        }
						if (axis.key === 'SeqGrowthPerMon') {
							if (item[axis.key]) {
								item[axis.key] = (item[axis.key] / 100).toFixed(2)
							}
							axis.yAxisIndex = 1
						}
						axis.data.push(item[axis.key])
					})
				})

				console.log(xAxis)
				console.log(series)
				this.options.balance.series = series;
				this.options.balance.xAxis[0].data = xAxis;
				this.$refs.balance.hideLoading()
			})
		},
		getCustomer() {
			this.$refs.customer.showLoading({ text: this.$t('Utils.loading') })
			Summary.getCustomer().then(res => {
				const xAxis = [];
				const series = [
					{ name: this.$t('summary.new_customer'), key: 'BalancePerMon', type: 'bar', data: [] },
					{ name: this.$t('summary.total_customer'), key: 'NLoanAmtPerMon', type: 'bar', data: [] }
				];
				const data = res.Records || [];
                const colorList = ['#3179a1', '#4ba221']
                data.forEach(item => {
					xAxis.push(item.CurrDt);
					series.forEach((axis, index) => {
                        axis.itemStyle = {
                            normal: {
                                color: colorList[index]
                            }
                        }
						axis.data.push(item[axis.key])
					})
				})
				this.options.customer.series = series;
				this.options.customer.xAxis[0].data = xAxis;
				console.log(xAxis, series)
				this.$refs.customer.hideLoading()
				console.log(res)
			})
		},
		getRisk() {
			this.$refs.risk.showLoading({ text: this.$t('Utils.loading') })
			Summary.getRisk().then(res => {
				const series = [
					{ name: this.$t('summary.normal') },
					{ name: this.$t('summary.attention') },
					{ name: this.$t('summary.secondary') },
					{ name: this.$t('summary.suspicious') },
					{ name: this.$t('summary.loss') }
				]
				const data = res.Records || [];
				data.forEach(item => {
					series[item.RiskClsfCdPerMon - 1].value = item.PercentPerMon.replace('%', '')
				})
                const colorList = ['#d87b3f', '#eaa676', '#5cb43d', '#d23b29', '#988b3d']
                series.forEach((item, index) => {
                    item.itemStyle = {
                        normal: {
                            color: colorList[index]
                        }
                    }
                })
                this.options.risk.series[0].data = series;

                console.log(series)
				this.$refs.risk.hideLoading()
			})
		}
	}
};
</script>

<style scoped lang="less">
/deep/ .ant-card-body,
.chart-card {
  width: 100%;
  margin-bottom: 24px;
}
/deep/ .ant-card-head-title{
    font-size: 18px;
}
</style>
