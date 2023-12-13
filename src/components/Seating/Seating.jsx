import { useEffect, useState } from "react";
import axios from "axios";
import "./Seating.css";
import { Link } from "react-router-dom";
import { colorList } from "../../constants/colorList";

const Seating = () => {
  const [isOutputGenerated, setIsOutput] = useState(false);

  const [outputArray, setOutputArray] = useState();
  const [layOut, setLayOut] = useState(null);

  const [teamList, setTeamList] = useState([]);
  const [teamNameList, setTeamNameList] = useState([]);
  const [teamKeyList, setTeamKeyList] = useState([]);
  const [preference, setPreference] = useState(2);
  useEffect(() => {
    loadLayOut();
  }, []);

  const [teamDetails, setteamDetails] = useState({});
  let mymap = new Map([
    ["A", 1],
    ["B", 2],
  ]);
  const [result, setResult] = useState(null);
  mymap.forEach((value) => {
    console.log("val > ", value);
  });
  const loadLayOut = async () => {
    console.log("a");
    const res = await axios.get("http://localhost:8080/Divum-layout");
    setLayOut(res);
    console.log("a");
  };

  const handleSubmit = async () => {
    let arr = [];
    teamList.map((team) => {
      arr.push(team.TeamName);
    });
    setTeamNameList(arr);
    console.log(arr);
    const res = await axios.post("http://localhost:8080/allocation", {
      companyName: "Divum",
      teamDtoList: teamList,
      preference: preference,
    });
    console.log("result", res);
    setIsOutput(true);
    setResult(res);
    setOutputArray(res.data.data.allocation);
    console.log(outputArray);
    let teamKeyList = [];
    arr.map((teamName) => {
      teamKeyList.push(res.data.data.teamIds[teamName]);
    });
    console.log("key list", teamKeyList);
    setTeamKeyList(teamKeyList);
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
      [e.target.name]:
        e.target.name === "TeamName" ? e.target.value : Number(e.target.value),
    };
    setTeamList(arr);
    console.log(arr);
  };
  console.log("A2".includes("A"), teamKeyList);
  const handleReturnColor = (teamKeyValue) => {
    // let resColor = "grey";
    // resColor = teamKeyList.map((key, index) => {
    //   console.log("key >",teamKeyValue,key,teamKeyValue ? teamKeyValue.includes(key) : "NO");
    //   // if (teamKeyValue != null && teamKeyValue.includes(key)) {
    //   //   // return colorList[index];
    //   //   return "red";
    //   // }
    //   // return teamKeyValue ? teamKeyValue.includes(key) ? return "red" : ""
    //   if(teamKeyValue){
    //     console.log("Entered",teamKeyValue.includes(key));
    //     if(teamKeyValue.includes(key)){
    //       return "red";
    //     }
    //   }
    // });

    for (let i = 0; i < teamKeyList.length; i++) {
      if (teamKeyValue && teamKeyValue.includes(teamKeyList[i])) {
        return colorList[i];
      }
    }
    return "grey";
  };
  const handlePrefOnClick = (prefNum) => {
    setPreference(prefNum);
  };
  return (
    <div className="seating">
      <div className="container-1">
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
                          backgroundColor: value === 1 ? "#2ecc71" : "#f1f2f6",
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
        <div className="form-wrapper">
          <h2>Add Team</h2>
          <div className="btn-wrapper">
            <button className="add-btn" onClick={handleAddTeam}>
              + Add
            </button>
            <label className="radio-title">Count Priority :</label>
            <label className="radio-btn">
              <input
                type="radio"
                name="option"
                checked={preference === 2}
                onClick={() => handlePrefOnClick(2)}
              />
              ASC
            </label>
            <label className="radio-btn">
              <input
                type="radio"
                name="option"
                checked={preference === 1}
                onClick={() => handlePrefOnClick(1)}
              />
              DES
            </label>
            <label className="radio-btn">
              <input
                type="radio"
                name="option"
                checked={preference === 3}
                onClick={() => handlePrefOnClick(3)}
              />
              Random
            </label>
          </div>
          <div className="team-list-input-wrapper">
            <div className="team-list-container">
              {teamList &&
                teamList?.map((data, index) => {
                  return (
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="TeamName"
                        value={data.TeamName}
                        className="input-box"
                        onChange={(e) => handleOnChange(e, index)}
                        placeholder={"Enter Team " + (index + 1) + " Name"}
                      />
                      <input
                        type="number"
                        name="TeamCount"
                        value={data.TeamCount}
                        className="input-box"
                        placeholder={"Enter Team " + (index + 1) + " Count"}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                      <button
                        className="cross-btn"
                        onClick={() => handleCloseBtn(index)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="container-2">
        <div className="layout-wrapper">
          {isOutputGenerated && (
            <>
              <h2>Team Allocation Layout</h2>
              <table className="MyTable">
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
                                backgroundColor:
                                  layOut?.data?.data?.layOut[i][j] === 1
                                    ? handleReturnColor(value)
                                    : "#f1f2f6",
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
            </>
          )}
        </div>
        {isOutputGenerated && (
          <div className="team-key-continer">
            {teamNameList && <h2>Team Keys</h2>}
            <table className="team-key-list key-table">
              <thead>
                <th>Team Name</th>
                <th>Team Key</th>
              </thead>
              <tbody>
                {teamNameList &&
                  teamNameList.map((teamName) => {
                    return (
                      <tr>
                        <td>{teamName}</td>
                        <td>{result?.data?.data?.teamIds[teamName]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seating;
