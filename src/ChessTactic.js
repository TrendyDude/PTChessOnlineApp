import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Videos.css';
import './Dashboard.css';
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import {FirstName} from "./Login";

function ChessTactic() {
    return (
        <div lang="en">

            <title>ChessTactic</title>

        <body>
        <div className="sidenav">
            <h3> Welcome {FirstName}</h3>
            <a onClick={clickDash}>Dashboard</a>
            <a href="#">Announcements</a>
            <a href="#">Lessons</a>
            <a href="#">Quizzes</a>
            <a onClick={clickVideoTab}>Videos</a>
            <a href="#">Tactics</a>
        </div>
        <div className="content">
            <iframe src={"https://livetactics.chessbase.com"} width="80%" height={"80%"}> Tactic </iframe>
        </div>
        </body>
        </div>
    )
}
function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickVideoTab() {
    ReactDOM.render(<Videos/>, document.getElementById('root'));
}

export default ChessTactic;