import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navlogout = useNavigate();
  const logout = () => {
    localStorage.removeItem("login");
    navlogout("/login");
  };
  return (
    <>
      <div className="main-container">
        <div className="nav-container">
          <div>
            <h1>Expense Tracker</h1>
          </div>
          <div className="nav-link">
            <ul>
              <li>
                <NavLink to="/" className="links">
                  Home
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink className="links" to="/add-expense">
                  Add Expense
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink className="links" to="/expense-chart">
                  Expense chart
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <NavLink className="links" to="/login" onClick={logout}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
