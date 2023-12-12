import logo from './logo.svg';
import './App.css';

import React,{useState} from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Seating from './Components/Seating';

function App() {

  const [details,setDetails]=useState(
    {
      // companyName:"Divum",
    });
  
  return (

    <BrowserRouter>
    <Routes>
      <Route
      path='/'
      element={
        <Seating
          // details={details}
          // setDetails={setDetails}
        ></Seating>
      }
      >

      </Route>


    </Routes>
    
    </BrowserRouter>
  
  );
}

export default App;
