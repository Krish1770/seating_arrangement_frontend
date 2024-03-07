import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import { CompanyName } from "../../CreateContext";

const Home = () => {
  const { companyName, setCompanyName } = useContext(CompanyName);
  const navigate = useNavigate();
  const [isCompanyPresent, setCompanyPresent] = useState(false);
  console.log(companyName);
  useEffect(() => {
    loadScreen();
  });

  const loadScreen = async () => {};

  const handleYes = async () => {
    navigate("/seating");
  };

  const handleNo = async () => {
    navigate("/RegisterForm");
  };

  return (
    <div className="Home">
      <div className="Home-container">
        <h2 className="Home-Heading">Welcome Page</h2>

        <h3>enter the companyName</h3>
        <input
          type="text"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
        <h3>already registered the company</h3>

        <div className="Home-Buttons">
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleNo}>No</button>
          {/* <h4>Enter the companyName</h4>
        <input type="text" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
