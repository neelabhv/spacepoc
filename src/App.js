
import './App.css';
import DisplayData from './DisplayData.js';

function App() {
  return (
    <div className="App">
      {window.history.pushState("spaceX","/spaceX")}
      <DisplayData/>
    </div>
  );
}

export default App;
