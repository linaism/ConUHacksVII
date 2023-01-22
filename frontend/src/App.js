import { useState } from 'react';
import './App.css';
import BarGraph from './Components/BarGraph';
import { UserData } from './Data'

function App() {
  const [userData, setUserData] = useState(UserData)

  const sortedData = userData.sort((a, b) => b.gain - a.gain);

  const chartData = {
    labels: sortedData.map((data) => data.year),
    datasets: [{
      label: "Users Gained",
      data: sortedData.map((data) => data.gain), 
      backgroundColor: ["#765dd9", "#866ee6", "#8f78eb", "#9d88f2", "#a590f5", "#b29ffc", "#bcabff", "#c8baff", "#d4c9ff", "#dad2fc"]
    }]
  }

  return (
    <div className="App">
      <div style={{width: 1000}}>
        <BarGraph chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
