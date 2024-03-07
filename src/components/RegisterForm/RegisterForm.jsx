import axios from "axios";
import "./RegisterForm.css";
import React, { useContext, useState } from "react";
import CompanyName from "../../CreateContext";
import { LayoutDesign } from "../../LayoutDesign/LayoutDesign";
const RegisterForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);

  const [row, setRow] = useState(10);
  const [column, setColumn] = useState(10);

 
  return (
    <>
      {!formSubmit ? (
        <div className="Form">
          <div className="Form-container">
            <h2 className="Form-Heading">Registration</h2>
            <div className="Form-Input">
              <h3>Row</h3>
              <input
                type="number"
                value={row}
                onChange={(e) => {
                  setRow(parseInt(e.target.value));
                }}
              />
              <h3>Column</h3>
              <input
                type="number"
                value={column}
                onChange={(e) => {
                  setColumn(parseInt(e.target.value));
                }}
              />
            </div>

            <div className="Form-Buttons">
              <button
                onClick={() => {
                  setFormSubmit(true);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
       <LayoutDesign row={row} column={column}/>
      )}
    </>
  );
};
export default RegisterForm;
