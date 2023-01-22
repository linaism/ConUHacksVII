import { useState } from "react";
import "./App.css";
import BarGraph from "./Components/BarGraph";
import { UserData } from "./Data";
import { Clock } from "./Components/Clock";

import axios from "axios";

function test() {
  axios
    .get("http://127.0.0.1:5000/sample")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// route to return top 10 success per second from all collections
function getTopTen() {
  axios
    .get("http://127.0.0.1:5000/api/top10")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// route to return top 10 success overall
function getTopTenOverall() {
  axios
    .get("http://127.0.0.1:5000/api/top10All")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.gain),
        backgroundColor: [
          "#765dd9",
          "#866ee6",
          "#8f78eb",
          "#9d88f2",
          "#a590f5",
          "#b29ffc",
          "#bcabff",
          "#c8baff",
          "#d4c9ff",
          "#dad2fc",
        ],
      },
    ],
  });

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={test}>Press</button>
        <button onClick={getTopTenOverall}>TopTenOverall</button>
        <button onClick={getTopTen}>TopTen</button>
      </header>
      <Clock />
      <div style={{ width: 1000 }}>
        <BarGraph chartData={userData} />
      </div>
    </div>
  );
}

export default App;
