import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import CreateGroup from './CreateGroup'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <button onClick={gotoLogin}> Start </button>
      </header>
    </div>
  );
}
function gotoLogin() {
    ReactDOM.render(<Login/>, document.getElementById('root'));
}



export default App;
