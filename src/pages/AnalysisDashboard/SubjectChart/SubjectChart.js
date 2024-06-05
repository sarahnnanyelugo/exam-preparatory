import ReactApexChart from "react-apexcharts";
import React from "react";

class SubjectChart extends React.Component {
  constructor(props) {
    super(props);
    const {analysisdata} = props;
    this.state = {
      series: [
        {
          name: "",
          data: analysisdata?.details?.question_subject_topic_chart?.data,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          labels: {
            style: {
              fontSize: "8px",
              fontWeight: "bold",
            },
          },
          categories: analysisdata?.details?.question_subject_topic_chart?.categories,
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: true,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          title: {
            text: "Time (secs)",
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val + "";
            },
          },
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
        />
      </div>
    );
  }
}
export default SubjectChart;
