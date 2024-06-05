import ReactApexChart from "react-apexcharts";
import React from "react";
class TimeChart extends React.Component {
  constructor(props) {
    super(props);
    const {analysisdata} = props;
    this.state = {
      series: [
        {
          name: "",
          data: analysisdata?.details?.question_time_chart?.data,
        },
      ],
      // analysisdata?.details?.question_time_chart?.series,
      options: {
        annotations: {
          points: [
            {
              seriesIndex: 0,
              label: {
                borderColor: "#775DD0",
                offsetY: 0,
              },
            },
          ],
        },
        chart: {
          type: "bar",
        },
        plotOptions: {
          bar: {
            columnWidth: "4px",
            distributed: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        legend: { show: false },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "s";
          },
          //   offsetY: -20,
          style: {
            fontSize: "8px",
            colors: ["black"],
            fontWeight: "bold",
          },
        },
        stroke: {
          width: 2,
        },

        grid: {
          row: {
            colors: ["#fff"],
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "8px",
              fontWeight: "bold",
            },
          },
          categories: analysisdata?.details?.question_time_chart?.categories,
          tickPlacement: "on",
        },
        yaxis: {
          title: {
            text: "Time (secs)",
          },
        },
        fill: {
          type: "solid",
          colors: [
            function ({ value, seriesIndex, w }) {
              if (value >= 45) {
                return "#D52143";
              } else if (value <= 45 && value > 17) {
                return "#2F67D8";
              } else if (value <= 17) {
                return "#5EAA42";
              }
            },
          ],
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={600}
          width="100%"
        />
      </div>
    );
  }
}
export default TimeChart;
