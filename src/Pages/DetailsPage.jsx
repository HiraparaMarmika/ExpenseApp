import React from 'react'
import { useParams } from 'react-router-dom';

function DetailsPage() {
    const param = useParams();
    const expenseData=JSON.parse(localStorage.getItem("formData"));
   const filterexpense = expenseData.find((item) => item.id == param.id);

  return (
    <>
       <div className="expense-details">
      <h1>Expense Details</h1>

      <div className="details-card">
        <p><strong>Amount:</strong> ₹{filterexpense.amount}</p>
        <p><strong>Description:</strong> {filterexpense.description}</p>
        <p><strong>Date:</strong> {filterexpense.date}</p>
        <p><strong>Category:</strong> {filterexpense.category}</p>
      </div>
    </div>
    </>
  )
}

export default DetailsPage
