import React, { useContext, useEffect, useState } from "react";
import "./ExpenseForm.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/DataProvider";
export default function ExpenseForm({ formDataHandler }) {
  const nav = useNavigate();

  const [allData, setAllData] = useState({
    id: Math.random(),
    amount: "",
    description: "",
    date: new Date().toString(),
    category: [
      "food",
      "shopping",
      "Transportation",
      "education",
      "phoneBill",
      "entertainment",
    ],
  });
  const allDataHandler = (e) => {
    const { name, value } = e.target;
    setAllData((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(allData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formDataHandler(allData);
    console.log(allData);
    nav("/");
  };

  return (
    <>
      <div className="expenseform">
        <form action="" onSubmit={submitHandler}>
          <h1>Expense Form</h1>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount.."
            value={allData.amount}
            onChange={allDataHandler}
          />
          <input
            type="text"
            placeholder="Enter Description.."
            name="description"
            value={allData.description}
            onChange={allDataHandler}
          />
          <input
            type="date"
            placeholder="Enter Date.."
            name="date"
            value={allData.date}
            onChange={allDataHandler}
          />
          <label htmlFor="">Category:</label>&nbsp;&nbsp;&nbsp;
          <select
            value={allData.category}
            onChange={allDataHandler}
            name="category"
          >
            <option>Select Category</option>
            <option value="food">Food</option>
            <option value="shopping">Shopping</option>
            <option value="Transportation">Transportation</option>
            <option value="education"> Education</option>
            <option value="phoneBill"> Phone Bill</option>
            <option value="entertainment"> Entertainment</option>
          </select>
          <div className="btn">
            <button>Add Expense</button>
          </div>
        </form>
      </div>
    </>
  );
}
