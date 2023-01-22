import { useState } from 'react';
import './App.css';
import BarGraph from './Components/BarGraph';
import { UserData } from './Data'
import {Clock} from './Components/Clock';

import axios from 'axios';

function test(){
  axios.get('http://127.0.0.1:5000/sample')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      label: "Users Gained",
      data: UserData.map((data) => data.gain), 
      backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"]
    }]
  })

  return (
    <div className="App">
      <Clock/>
      <div style={{width: 1000}}>
        <BarGraph chartData={userData} />
      </div>
    </div>
  );
}

export default App;
