import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Seating from "../components/Seating/Seating";

import Home from "../components/Home/Home";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import {CompanyName} from "../CreateContext";
const MainRoutes = () => {
  const[companyName,setCompanyName]=useState("")
  return (
    <BrowserRouter>
    <CompanyName.Provider value={{companyName,setCompanyName}}>
      <Routes>
        <Route path="/seating" element={<Seating />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/RegisterForm" element={<RegisterForm/>}/>
      </Routes>
      </CompanyName.Provider>
    </BrowserRouter>
  );
};

export default MainRoutes;
