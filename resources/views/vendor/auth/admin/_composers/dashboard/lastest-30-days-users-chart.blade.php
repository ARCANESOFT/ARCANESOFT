<div class="box">
    <div class="box-header with-border">
        <h2 class="box-title">Latest 30 days created users</h2>
    </div>
    <div class="box-body">
        <canvas id="latestUsersChart" height="300"></canvas>
    </div>
</div>

@section('scripts')
    @parent

    <script>
        $(function () {
            new Chart($('canvas#latestUsersChart'), {
                type: 'line',
                data: {
                    labels: {!! $latestUsersByThirtyDays->keys() !!},
                    datasets: [
                        {
                            label: 'Registered users',
                            data: {!! $latestUsersByThirtyDays->values() !!},
                            fill: true,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(0, 115, 183, 0.1)',
                            borderColor: '#0073B7',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            spanGaps: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
    </script>
@endsection
