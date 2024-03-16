import React, { useContext, useState } from "react";
import "./LayoutDesign.css";
import axios from "axios";
import { Cell } from "./Cell";
import { CompanyName } from "../CreateContext";
import { layOut } from "../CreateContext";
import { useNavigate } from "react-router-dom";

export const LayoutDesign = ({ row, column }) => {
  const [arrayData, setArrayData] = useState({});

  const [count,setCount]=useState(0);
  const [newData,setNewData] = useState(null);
  const { companyName } = useContext(CompanyName);
  const navigate = useNavigate();
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

  const layOutDto = {
    companyName: companyName,
    row: row,
    column: column,
    layOut: dataArray,
  };
  const handleSubmit = async () => {
    const result=handleResult(layOutDto);
    const res = await axios.post("http://localhost:8080/layout", result);
    const ans = getCount();
    setCount(ans);
     
    
   
   
alert(ans);
    navigate("/seating",{state:{data:result,flag:true,availableSpaces:ans}})
  };
   
  const getCount= () =>
  {
    let total = 0;
    dataArray.map((value,i)=>
    {
  
      // {console.log(typeof(value))}
      let v=JSON.stringify(value);
     let x= v.length-v.replaceAll("1","").length
    //  console.log(count+" "+x)
     total+=x
    //  console.log(total)
     setNewData(total);
     
    })
    
    return total;
    
  }
  function handleResult(data){
    return data;
  }

  return (
    <div className="layout-page">
      {dataArray.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              updateValue={updateValue}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))}
        </div>
      ))}
      <div className="submit-btn-conatiner">
        <button className="submit-btn2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
