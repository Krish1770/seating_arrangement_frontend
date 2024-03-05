import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";

const Home=()=>
{
    const [isCompanyPresent,setCompanyPresent]=useState(false);

useEffect(()=>
{
    loadScreen();
})

const loadScreen=async()=>
{

};

return (
    <div className="Home">
    <div className="Home-container">
        <h2>already registered the company</h2>
        <div className="Home-input">
            <h4>Enter the companyName</h4>
        <input type="text" />
        </div>
    </div>
    </div>
)
};


export default Home;