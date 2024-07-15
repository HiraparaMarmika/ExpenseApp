import React, { useContext, useState } from "react";
import { MyContext } from "../../context/DataProvider";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

export default function Home() {
  const { formData, setFormData } = useContext(MyContext);

  const formDataHandler = (alldata) => {
    setFormData((prev) => {
      return [
        ...prev,
        {
          amount: alldata.amount,
          description: alldata.description,
          date: alldata.date,
          category: alldata.category,
          id: Math.random(),
          key: Math.random(),
        },
      ];
    });
  };

  return (
    <>
      <ExpenseForm formDataHandler={formDataHandler} />
    </>
  );
}
