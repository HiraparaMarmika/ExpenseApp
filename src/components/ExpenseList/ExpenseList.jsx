import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/DataProvider";
import "./ExpenseList.css";
import EditModel from "../../editmodel/EditModel";
import { CSVLink } from "react-csv";
import ReactFileReader from "react-file-reader";
export default function ExpenseList({ formDataHandler }) {
  const [openModel, setOpenModel] = useState(false);
  const [file, setFile] = useState("");
  const [editdata, setEditData] = useState("");
  const { formData, setFormData } = useContext(MyContext);

  const [query, setQuery] = useState("");
  const [expense, setExpense] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = formData.filter((item) => {
    if (query == "all") {
      return formData;
    }
    return (
      item.category?.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
    );
  });

  console.log(filteredData);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("formData"));
    if (storedExpenses) {
      setExpense(storedExpenses);
      calculateTotalAmount(storedExpenses);
    }
  }, []);

  const calculateTotalAmount = (expenses) => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.amount);
    });
    setTotalAmount(total);
  };

  const DeleteHandler = (id) => {
    const deleteData = formData.filter((item) => id !== item.id);
    setFormData(deleteData);
  };
  const editHandler = (id) => {
    setOpenModel(true);
    const edititems = formData.filter((item) => id === item.id);
    setEditData(edititems);
  };
  const onEdit = (data) => {
    setFormData(data);
    setOpenModel(false);
  };
  const cancle = () => {
    setOpenModel(false);
  };

  const uploadFile = (files) => {
    var read = new FileReader();

    read.onload = function (e) {
      setFile(read.result);
    };

    read.readAsText(files[0]);
  };
  return (
    <>
      {openModel && (
        <EditModel
          setEditData={setEditData}
          editdata={editdata}
          onEdit={onEdit}
          cancle={cancle}
        />
      )}

      <div className="ExpenseList">
        <div className="list-search">
          <div>
            <h1>Expense List</h1>
          </div>
          <div>
            <select value={query} onChange={handleChange}>
              <option value="all">All</option>
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="Transportation">Transportation</option>
              <option value="education"> Education</option>
              <option value="phoneBill"> Phone Bill</option>
              <option value="entertainment"> Entertainment</option>
            </select>
            <input
              type="search"
              placeholder="search expense.."
              onChange={handleChange}
            />
            <button>
              <CSVLink data={formData}>Download</CSVLink>
            </button>
            <ReactFileReader handleFiles={uploadFile} fileTypes={".csv"}>
              <button className="btn"> Upload </button>
            </ReactFileReader>
          </div>
        </div>

        <table>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {filteredData.length > 0 ? (
            <>
              {filteredData.map((item) => (
                <tr>
                  <td>{item.amount}</td>
                  <td> {item.description}</td>
                  <td> {item.date}</td>
                  <td> {item.category}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        DeleteHandler(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => {
                        editHandler(item.id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="expense-total">
                <div>Total Amount:{totalAmount}</div>
              </tr>
            </>
          ) : (
            <p style={{ textAlign: "center" }}>No results found</p>
          )}
        </table>
        <div>{file}</div>
      </div>
    </>
  );
}
