import React, { useContext, useState } from "react";
import "./LayoutDesign.css";
import axios from "axios";
import { Cell } from "./Cell";
import { CompanyName } from "../CreateContext";
import { layOut } from "../CreateContext";
import { useNavigate } from "react-router-dom";

export const LayoutDesign = ({ row, column }) => {
  const [arrayData, setArrayData] = useState({});

  const { companyName } = useContext(CompanyName);
  const navigate=useNavigate()
  const {res,setRes}=useContext(layOut);
  const updateValue = (rowIndex, colIndex, value) => {
    const newArrayData = { ...arrayData };
    newArrayData[rowIndex][colIndex] = value;
    setArrayData(newArrayData);
  };
  React.useEffect(() => {
    const initialArrayData = {};
    for (let i = 0; i < row; i++) {
      initialArrayData[i] = Array(column).fill(0);
    }
    setArrayData(initialArrayData);
  }, [row, column]);
  const dataArray = Object.values(arrayData);
 

  const layOutDto={
    companyName:companyName,
    row:row,
    column:column,
    layOut:dataArray
  }
  const handleSubmit=async()=>{
    const res = await axios.post("http://localhost:8080/layout",layOutDto)
console.log(res)
setRes(res)
layOut(res)
    console.log(layOutDto)
    navigate("/seating")

  }
  return (
    <div className="layout-page">
      {dataArray.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} updateValue={updateValue} rowIndex={rowIndex} colIndex={colIndex}/>
          ))}
        </div>
        ))}
        <div className="submit-btn-conatiner">
        <button className="submit-btn2" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
};
