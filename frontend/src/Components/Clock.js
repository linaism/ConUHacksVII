import React, { useState, useEffect } from "react";
import BarGraph from "./BarGraph";
import axios from "axios";
import "./Clock.css";
import playLogo from '../Assets/play-button.png'

let UserData = [[]];
let CancelData = [[]];
// route to return top 10 success per second from all collections
const getTopTen = async () => {
  await axios
    .get("http://127.0.0.1:5000/api/top10")
    .then((response) => {
      //console.log("test");
      console.log(response.data);
      //return response.data["symbols by time"];
      UserData = response.data["symbols by time"];
    })
    .catch((error) => {
      UserData = [[]];
      console.log(error);
    });
};

const getTopTenCancelledPerSecond = async () => {
  await axios
    .get("http://127.0.0.1:5000/api/toptensymbolscancelledpersecond")
    .then((response) => {
      //console.log("test");
      console.log(response.data);
      //return response.data["symbols by time"];
      CancelData = response.data["Top 10"];
    })
    .catch((error) => {
      CancelData = [[]];
      console.log(error);
    });
};


function Clock({counter, setCounter}) {
    const [time, setTime] = useState("9:28:00");
    

  function play() {
    setTransactionData(newTransactionData);
    setCancellationData(newCancellationData);
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const [hours, minutes, seconds] = prevTime.split(":").map(Number);
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;
        if (newSeconds === 60) {
          newSeconds = 0;
          newMinutes += 1;
        }
        if (newMinutes === 60) {
          newMinutes = 0;
          newHours += 1;
        }
        if (newHours === 9 && newMinutes === 32) {
          clearInterval(interval);
        }
        return `${newHours}:${newMinutes}:${newSeconds}`;
      });
      setCounter((prevCounter) => {
        const input = UserData[prevCounter];
        const cancelInput = CancelData[prevCounter];

        const newData = {
          labels: [],
          datasets: [
            {
              label: "Transactions Completed",
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
              borderWidth: 1,
              data: [],
            },
          ],
        };

        input.forEach((element) => {
          newData.labels.push(element[0]);
          newData.datasets[0].data.push(element[1]);
        });

        const newCancellationData = {
          labels: [],
          datasets: [
            {
              label: "Transactions Cancelled",
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
              borderWidth: 1,
              data: [],
            },
          ],
        };
        cancelInput.forEach((element) => {
          newCancellationData.labels.push(element[0]);
          newCancellationData.datasets[0].data.push(element[1]);
        });

        setTransactionData(newData);
        setCancellationData(newCancellationData);
        if (prevCounter < 240) {
          return prevCounter + 1;
        }
        return prevCounter;
      });
    }, 1000);
    return () => clearInterval(interval);
  }

  //FOR THE TRANSACTION BAR GRAPH
  const [transactionData, setTransactionData] = useState({
    labels: [],
    datasets: [
      {
        label: "Transactions Completed",
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
        borderWidth: 1,
        data: [],
      },
    ],
  });

  //FOR THE TRANSITION BAR GRAPH
  const [cancellationData, setCancellationData] = useState({
    labels: [],
    datasets: [
      {
        label: "Transactions Cancelled",
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
        borderWidth: 1,
        data: [],
      },
    ],
  });
  const input = UserData[0];
  const cancelInput = CancelData[0];
  const newTransactionData = {
    labels: [],
    datasets: [
      {
        label: "Transactions Completed",
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
        borderWidth: 1,
        data: [],
      },
    ],
  };
  input.forEach((element) => {
    newTransactionData.labels.push(element[0]);
    newTransactionData.datasets[0].data.push(element[1]);
  });

  const newCancellationData = {
    labels: [],
    datasets: [
      {
        label: "Transactions Cancelled",
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
        borderWidth: 1,
        data: [],
      },
    ],
  };
  cancelInput.forEach((element) => {
    newCancellationData.labels.push(element[0]);
    newCancellationData.datasets[0].data.push(element[1]);
  });

  useEffect(() => {
    getTopTen();
    getTopTenCancelledPerSecond();
  }, []);

    return (
        <div className='parent'>
            <div className='col'>
                <div className='playB row'>
                    <img className="buttonClass" onClick={play} src={playLogo} alt="Play" />
                </div>
                <div className="combo row">
                    <div className='info row'>
                        <div className="clockDate"> 06/01/2023</div>
                        <div className="clockTime">{time}</div>
                    </div>
                    <div className='row'>
                        <div className="marketTitle"> Market Status </div>
                        <div className="marketStatus"> 
                        {counter < 120 ? (
                            <div className='marketClosed'> Closed </div>
                        ) : (
                            <div className='marketOpen'> Open </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='graphz'>
                <div className='TRProcessedTitle'>Transactions Processed</div>
                <BarGraph chartData={transactionData} />
                <div className='TRCancelledTitle'>Transactions Cancelled</div>
                <BarGraph chartData={cancellationData} />
            </div>
        </div>
  );
}
export { Clock };
