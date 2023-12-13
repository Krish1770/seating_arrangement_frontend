import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Seating from "./components/Seating/Seating";
import MainRoutes from "./routes/MainRoutes";
import { dividerClasses } from "@mui/material";
import NavBar from "./components/NavBar";

function App() {
  const [details, setDetails] = useState({
    // companyName:"Divum",
  });

  return (
    <div className="App">
      <NavBar />
      <MainRoutes />
    </div>
  );
}

export default App;
