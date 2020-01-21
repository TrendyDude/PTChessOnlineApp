import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <button onClick={ReactDOM.render(<Dashboard />, document.getElementById('root'))}> Start </button>
      </header>
    </div>
  );
}



export default App;
