import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
    name: 'v-trend-chart',

    props: {
        data: {
            type: Array,
            required: true,
        },
        labels: {
            type: Array,
            default: () => [],
        },
    },

    setup(props) {
        let chart
        const chartRef = ref(null)

        onMounted((): void => {
            chart = window['plugins'].chart(chartRef.value, {
                type: 'line',
                data: {
                    labels: props.labels,
                    datasets: [
                        {
                            // label: props.legend,
                            lineTension: 0,
                            backgroundColor: "rgba(0, 123, 255, 0.05)",
                            borderColor: "rgba(0, 123, 255, 0.5)",
                            pointBackgroundColor: "rgba(0, 123, 255, 0.5)",
                            pointBorderColor: "rgba(0, 123, 255, 0.7)",
                            data: props.data,
                        },
                    ],
                },
                options: {
                    layout: {
                        padding: {
                            top: 10,
                        },
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                        }],
                        yAxes: [{
                            display: false,
                        }],
                    },
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
        <div class="card-chart" style="height: 8rem;">
            <canvas ref="chartRef"></canvas>
        </div>
    `,
})
