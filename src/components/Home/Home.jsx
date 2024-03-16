import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import { CompanyName } from "../../CreateContext";

const Home = () => {
  const { companyName, setCompanyName } = useContext(CompanyName);
  const navigate = useNavigate();
  const [isCompanyPresent, setCompanyPresent] = useState(false);
  useEffect(() => {
    loadScreen();
  });

  const loadScreen = async () => {};

//   const handleYes = async () => {
//     const name=companyName
//     const res =await axios.get(`http://localhost:8080/layout/${name}`);
//     const result=handleResult(res)
//     navigate("/seating",{state:{layOut:result}});
//   };
// function handleResult(data){
//   return data
// }
const handleYes = async () => {
  const name = companyName;
  try {
      const res = await axios.get(`http://localhost:8080/layout/${name}`);
      const result = handleResult(res.data.data); 
      console.log()
      console.log(result.layOut)
      navigate("/seating", { state: { data: result.layOut ,flag:false,availableSpaces:result.availableSpaces} });
  } catch (error) {
      console.error("Error fetching layout:", error);
  }
};

function handleResult(data) {
  return data;
}
  const handleNo = async () => {
    navigate("/RegisterForm");
  };

  return (
    <div className="Home">
      <div className="Home-container">
        <div >
          <img src="" alt="" />
        </div>
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
