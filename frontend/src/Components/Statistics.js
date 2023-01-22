import {React, useEffect} from 'react'
import './Statistics.css'

import axios from "axios";


let totalArr = [];
let cancelArr = [];
const getTotalTraded = async () => {
  await axios
    .get("http://127.0.0.1:5000/api/totaltraded")
    .then((response) => {
      //return response.data["symbols by time"];
      totalArr = response.data["Total Trades"];
      console.log(totalArr);
    })
    .catch((error) => {
      totalArr = [[]];
      console.log(error);
    });
};
const getTopTenCancel = async () => {
  await axios
    .get("http://127.0.0.1:5000/api/toptensymbolscancelled")
    .then((response) => {
      console.log("test");
      console.log(response.data);
      //return response.data["symbols by time"];
      cancelArr = response.data["Top 10"];
    })
    .catch((error) => {
      cancelArr = [[]];
      console.log(error);
    });
};

function Statistics({counter, setCounter}) {
  useEffect(() => {
    getTotalTraded();
    getTopTenCancel();
  }, []);
  return (
    <div className="stats">
        <div className='statsTitle'>STATISTICS</div>
        <div className='statsTitle'>Total Processed Trades</div>
        <div className='statsTitle'>{totalArr[counter]}</div>
        <div className='statsTitle'>Total Cancelled Trades</div>
        <div className='statsTitle'>{cancelArr[counter]}</div>
        {console.log(cancelArr)}
        
    </div>
  )
}

export default Statistics