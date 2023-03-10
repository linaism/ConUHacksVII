import { useState } from "react";
import "./App.css";
import BarGraph from "./Components/BarGraph";
import { UserData } from "./Data";
import { Clock } from "./Components/Clock";

import axios from "axios";
import Header from "./Components/Header";
import Statistics from "./Components/Statistics";
import Anomalies from "./Components/Anomalies";

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
function getTotalCancelledOverTime() {
  axios
    .get("http://127.0.0.1:5000/api/TotalCancelledOverTime")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

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
  const [userData, setUserData] = useState(UserData);
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Header />
      <div className="rowC">
        <div className="col transactionGraphs">
          <Clock counter = {counter}
          setCounter={setCounter}/>
          {/* <BarGraph chartData={chartData} /> */}
        </div>
        <div className="col statistics">
          <Statistics counter = {counter}
          setCounter={setCounter}/>
        </div>
      </div>
      <div className="anomalies">
        <Anomalies />
      </div>
    </div>
  );
}

export default App;
