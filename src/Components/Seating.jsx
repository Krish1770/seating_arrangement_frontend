import { useEffect, useState } from "react";
import axios from "axios";
import "./Seating.css";
import { Link } from "react-router-dom";


 const Seating = () => {

    const [isOutputGenerated,setIsOutput]=useState(false);

    const[outputArray,setOutputArray]=useState();
  const [layOut, setLayOut] = useState(null);

  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    loadLayOut();
  }, []);

  const [teamDetails, setteamDetails] = useState({});
  let mymap = new Map([
    ["A", 1],
    ["B", 2],
  ]);

  mymap.forEach((value) => {
    console.log("val > ", value);
  });
  const loadLayOut = async () => {
    console.log("a");
    const res = await axios.get("http://localhost:8080/Divum-layout");
    setLayOut(res);
    // console.log(res);
    // console.log(layOut.data.data.layOut);
    console.log("a");
  };

  const handleSubmit = async () => {
    let resMap = new Map();
    teamList.map((data) => {
      resMap.set(data.TeamName, data.TeamCount);
    });
    console.log("resMap >>", resMap);
    const res = await axios.post("http://localhost:8080/allocation", {
      companyName: "Divum",
      teamDtoList: teamList,
    });
    
        console.log("result",res)
        setIsOutput(true);
        setOutputArray(res.data.data.allocation);
    console.log(outputArray);
   
  };
  const handleCloseBtn = (index) => {
    let arr = [...teamList];
    arr = arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
    setTeamList(arr);
  };

  const handleAddTeam = () => {
    let arr = [...teamList];
    arr.push({
      TeamName: "",
      TeamCount: "",
    });
    setTeamList(arr);
    console.log(">>", arr);
  };

  const handleOnChange = (e, index) => {
    let arr = [...teamList];
    arr[index] = {
      ...arr[index],
      [e.target.name]: e.target.name === "TeamName" ? e.target.value: Number(e.target.value),
    };
    setTeamList(arr);
    console.log(arr);
  };
  return (
    <div className="seating">
      <div className="details">
      <h2>Divum Layout</h2>
      
        <table className="MyTable">
          <tbody>
       
            {layOut?.data?.data?.layOut.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((value, j) => {
                    return (
                      <td
                        key={j}
                        className="grid-box"
                        style={{
                          backgroundColor: value === 1 ? "grey" : "white",
                        }}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
             <h3>Enter the team names and their count below </h3>
        <button className="addBtn" onClick={handleAddTeam}>
          Add
        </button>
        {teamList &&
          teamList?.map((data, index) => {
            return (
              
                <div>
                  <input
                    type="text"
                    name="TeamName"
                    value={data.TeamName}
                    onChange={(e) => handleOnChange(e, index)}
                    placeholder="Enter Team Name"
                  />
                  <input
                    type="number"
                    name="TeamCount"
                    value={data.TeamCount}
                    placeholder="Enter Team Count"
                    onChange={(e) => handleOnChange(e, index)}
                  />
                  <button
                    className="crossBtn"
                    onClick={() => handleCloseBtn(index)}
                  >
                    X
                  </button>
                </div>
            
            );
          })}

        <button className="handleSubmit" onClick={handleSubmit}>
          submit
        </button>

       { isOutputGenerated &&  <table className="MyTable">
          <tbody>
            {outputArray.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((value, j) => {
                    return (
                      <td
                        key={j}
                        className="grid-box"
                        style={{
                          backgroundColor: layOut?.data?.data?.layOut[i][j] === 1 ? "grey" : "white",
                        }}
                      >
                       
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
 }
      </div>
    </div>
  );
};

export default Seating;
