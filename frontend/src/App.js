
import './App.css';
import Slider from './slider';
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

// route to return top 10 success per second from all collections
function getTopTen(){
  axios.get('http://127.0.0.1:5000/api/top10')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

// route to return top 10 success overall
function getTopTenOverall(){
  axios.get('http://127.0.0.1:5000/api/top10All')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}



function App() {

  //const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        
        <Slider 

        />
        <button onClick={test}>Press</button>
        <button onClick={getTopTenOverall}>TopTenOverall</button>
        <button onClick={getTopTen}>TopTen</button>



      </header>
    </div>
  );
}

export default App;
