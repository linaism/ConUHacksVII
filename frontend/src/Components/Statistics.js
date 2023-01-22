import {React, useEffect} from 'react'
import './Statistics.css'

import axios from "axios";


let totalArr = [];
const getTotalTraded = async () => {
  await axios
    .get("http://127.0.0.1:5000/api/totaltraded")
    .then((response) => {
      //return response.data["symbols by time"];
      totalArr = response.data;
      console.log(totalArr);
    })
    .catch((error) => {
      totalArr = [[]];
      console.log(error);
    });
};

function Statistics({counter, setCounter}) {
  useEffect(() => {
    getTotalTraded();
  }, []);
  return (
    <div className="stats">
        <div className='statsTitle'>STATISTICS</div>
        <div>{totalArr[counter]}</div>
        {console.log(counter)}
        
    </div>
  )
}

export default Statistics