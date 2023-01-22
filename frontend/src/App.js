import logo from './logo.svg';
import './App.css';
import ReactSlider from 'react-slider'
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

function App() {

  //const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        
        <Slider 

        />
        <button onClick={test}>Press</button>

      </header>
    </div>
  );
}

export default App;
