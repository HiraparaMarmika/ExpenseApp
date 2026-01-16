import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import RootLayout from "./Pages/RootLayout";
import ExpenseList from "./components/ExpenseList/ExpenseList";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import DetailsPage from "./Pages/DetailsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoutes>
          <RootLayout />
        </PrivateRoutes>
      ),
      children: [
        { path: "/", element: <ExpenseList /> },
        { path: "/add-expense", element: <Home /> },
        { path: "/expense-Details/:id", element: <DetailsPage /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
