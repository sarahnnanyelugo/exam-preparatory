import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from "react-apexcharts";
import {useSelector} from "react-redux";

class QuestionChart extends Component {
  constructor(props) {
    super(props);
    const {analysisdata} = props;

    this.state = {
      options: {
        labels: analysisdata?.details?.question_performance_chart?.label,
        colors: analysisdata?.details?.question_performance_chart?.color,
        fill: {
          type: "solid",
          colors: [
            function ({ value, seriesIndex, w }) {
            // console.log(value,seriesIndex,w.config.colors[seriesIndex]);
            return w.config.colors[seriesIndex];
            },
          ],
        },
        chart: {
          animations: {
            enabled: false,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 500,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
      },
      events: {
        beforeMount: this.testEndAnimation("Mounting"),
        mounted: this.testEndAnimation("Mounted"),
      },
      redrawOnParentResize: false,
      series: analysisdata?.details?.question_performance_chart?.series,
    };
  }
  testEndAnimation(e) {
    // console.log(e, new Date().getTime());
  }
  render() {
    return (
      <div className="donut" id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width="100%"
        />
      </div>
    );
  }
}
export default QuestionChart;
