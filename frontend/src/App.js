import './App.css';
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

// route to return top 10 success per second from all collections
function getTopTen(){
  axios.get('http://127.0.0.1:5000/api/top10')
  .then(response => {
    console.log(response.data);
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
}

// route to return top 10 success overall
function getTopTenOverall(){
  axios.get('http://127.0.0.1:5000/api/top10All')
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
}

//  route to return top 10 success per second from certain collection
function getTopTenSuccessCertainCollection(){
  axios.get('http://127.0.0.1:5000/api/TopTenSuccessSeconds/<collection>')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

// all data from any collection
function getAllSpecificCollection(collection){
  axios.get('http://127.0.0.1:5000/api/alldata/$collection')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}



function App() {
  

  return (
    <div className="App">
      <Clock/>
      <div style={{width: 1000}}>
        
      </div>
        <button onClick={getTopTenOverall}>TopTenOverall</button>
        <button onClick={getTopTen}>TopTen</button>
        <button onClick={getAllSpecificCollection("Aequitas")}>AllSpecificCollection</button>
        <button onClick={getTopTenSuccessCertainCollection("Aequitas")}>Top Ten Success Certain Collection</button>


    </div>
  );
}

export default App;
