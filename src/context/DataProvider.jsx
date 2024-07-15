import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext();
export default function DataProvider({ children }) {
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) || []
  );

  localStorage.setItem("formData", JSON.stringify(formData));

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  return (
    <>
      <MyContext.Provider
        value={{
          formData,
          setFormData,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
}
