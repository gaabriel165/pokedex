import React from "react";
import Chart from "react-apexcharts";

const ChartSpecs = ({ pokemon }) => {
  return (
    <Chart
      options={{
        horizontal: true,
        chart: {
          id: "basic-bar",
          type: "bar",
          height: 350,
        },
        yaxis: {
          max: 100,
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
          },
        },
      }}
      series={[
        {
          name: "test",
          data: pokemon.stats.map((status) => status.base_stat),
        },
      ]}
      type="bar"
      width="500"
    />
  );
};

export default ChartSpecs;
