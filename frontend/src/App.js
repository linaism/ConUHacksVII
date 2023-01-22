import { useState } from "react";
import "./App.css";
import BarGraph from "./Components/BarGraph";
import { UserData } from "./Data";
import { Clock } from "./Components/Clock";

import axios from "axios";
import Header from "./Components/Header";
import Statistics from "./Components/Statistics";

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

function App() {
  const [userData, setUserData] = useState(UserData);
  const sortedData = userData.sort((a, b) => b.gain - a.gain);
  const chartData = {
    labels: sortedData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: sortedData.map((data) => data.gain),
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
  };

  return (
    <div className="App">
      <Header />
      <div className="rowC">
        <div className="col transactionGraphs">
          <Clock />
          <BarGraph chartData={chartData} />
        </div>
        <div className="col statistics">
          <Statistics />
        </div>
      </div>
      <div className="anomalies">
        
      </div>
    </div>
  );
}

export default App;
