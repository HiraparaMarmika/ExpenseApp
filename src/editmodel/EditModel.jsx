import React, { useContext, useEffect, useState } from "react";
import "./EditModel.css";
import { MyContext } from "../context/DataProvider";
import { createPortal } from "react-dom";
export default function EditModel({ editdata, onEdit, cancle }) {
  const { formData, setFormData } = useContext(MyContext);
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
  useEffect(() => {
    setAllData((prev) => {
      console.log(prev);
      return {
        ...prev,
        amount: editdata[0]?.amount,
        description: editdata[0]?.description,
        date: editdata[0]?.date,
        category: editdata[0]?.category,
      };
    });
  }, [editdata]);

  const editTaskHandler = (e) => {
    e.preventDefault();
    const data = [...editdata];
    const index = formData.findIndex((i) => i.id === data[0].id);
    console.log(index);
    formData[index] = {
      id: data[0].id,
      amount: allData.amount,
      description: allData.description,
      date: allData.date,
      category: allData.category,
    };
    console.log(index);
    setFormData(formData);
    localStorage.setItem("formData", JSON.stringify(formData));
    onEdit(formData);
  };
  return (
    <>
      {createPortal(
        <>
          <div className="model"></div>
          <div className="form-box">
            <form action="" onSubmit={editTaskHandler}>
              <h1 style={{ textAlign: "center" }}>Expense Form</h1>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount.."
                value={allData?.amount}
                onChange={allDataHandler}
              />
              <input
                type="text"
                placeholder="Enter Description.."
                name="description"
                value={allData?.description}
                onChange={allDataHandler}
              />
              <input
                type="date"
                placeholder="Enter Date.."
                name="date"
                value={allData?.date}
                onChange={allDataHandler}
              />
              <label htmlFor="">Category:</label>&nbsp;&nbsp;&nbsp;
              <select
                value={allData?.category}
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
              <div className="model-btn">
                <button className="edit">Edit</button>
                <button className="cancle" onClick={cancle}>
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </>,
        document.getElementById("model")
      )}
    </>
  );
}
