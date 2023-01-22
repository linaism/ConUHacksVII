import { useState } from 'react';
import './App.css';
import BarGraph from './Components/BarGraph';
import { UserData } from './Data'

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
      <div style={{width: 1000}}>
        <BarGraph chartData={userData} />
      </div>
    </div>
  );
}

export default App;
