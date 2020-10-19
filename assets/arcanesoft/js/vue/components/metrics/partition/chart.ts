import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
    name: 'v-partition-chart',

    props: {
        data: {
            type: Array,
            required: true,
        },
        labels: {
            type: Array,
            default: () => [],
        },
        colors: {
            type: Array,
            default: () => [],
        },
    },

    setup(props) {
        let chart
        const chartRef = ref(null)

        onMounted((): void => {
            chart = window['plugins'].chart(chartRef.value, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: props.data,
                        backgroundColor: props.colors,
                    }],
                    labels: props.labels,
                },
                options: {
                    cutoutPercentage: 80,
                    rotation: 270,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: true,
                        displayColors: false,
                        callbacks: {
                            label(tooltipItem, data) {
                                let dataset = data.datasets[tooltipItem.datasetIndex]
                                let value = dataset.data[tooltipItem.index]
                                let total = Object.values(dataset._meta)[0]['total']

                                return (total > 0 ? ((value * 100) / total).toFixed(2) : '0')+'%'
                            },
                        }
                    }
                },
            })
        })

        onUnmounted((): void => {
            chart.destroy()
        })

        return {
            chartRef,
        }
    },

    template: `
        <canvas ref="chartRef"></canvas>
    `,
})
