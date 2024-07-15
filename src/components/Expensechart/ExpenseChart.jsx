import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { MyContext } from "../../context/DataProvider";
import { type } from "@testing-library/user-event/dist/type";

export default function ExpenseChart() {
  const { formData } = useContext(MyContext);
  const options = {
    chart: {
      id: "expense-chart",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: formData.map((expense) => expense.date),

      title: {
        text: "date",
      },
    },
    yaxis: {
      data: formData.map((expense) => expense.amount),
      stepSize: 10,
      title: {
        text: "amount",
      },
    },
  };

  const series = [
    {
      name: " Expenses",
      data: formData.map((expense) => expense.amount),
    },
  ];
  return (
    <div style={{ marginTop: "50px", marginLeft: "50px" }}>
      <Chart options={options} series={series} type="line" width={800} />
    </div>
  );
}
