import React from "react";
import Chart from "react-apexcharts";

const ChartSpecs = ({ stats }) => {
  console.log(stats)

  return (
    <Chart
      options={{
        horizontal: true,
        chart: {
          id: "basic-bar",
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        yaxis: {
          max: 100,
          labels: {
            show: false,
          },
        },
        xaxis: {
          categories: [
            "HP",
            "Attack",
            "Defense",
            "Special-Attack",
            "Special-Defense",
            "Speed",
          ],
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            barHeight: "100%",
            distributed: true,
          },
        },
        colors: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#f48024",
        ],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"],
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
        },
      }}
      series={[
        {
          name: "test",
          data: stats.map((status) => status.base_stat),
        },
      ]}
      type="bar"
      width="500"
    />
  );
};

export default ChartSpecs;
