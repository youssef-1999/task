import React from 'react'
import { Chart } from "react-google-charts";

function Graph({amount}) {
     const data = [
        ["Year", "Total amount per day"],
        ["2022", {amount}],
       
      ];
      
       const options = {
        chart: {
          title: "Total amount per day",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      };
  return (
    <div className="container">

        <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
);
  
}

export default Graph
