import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Seating from "../components/Seating/Seating";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Seating />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
