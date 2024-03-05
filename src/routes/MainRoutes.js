import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Seating from "../components/Seating/Seating";

import Home from "../components/Home/Home";
const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Seating />} />
        <Route path="/home" element={<Home/>}/>
        {/* <Route path="/Layout" element={}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
