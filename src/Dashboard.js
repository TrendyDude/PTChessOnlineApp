import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';
import App from "./App";



function Dashboard() {
    return (
        <html lang="en">

        <head>
            <title>Dashboard</title>
        </head>

        <body>
            <div className="sidenav">
                <h3> Welcome </h3>
                <a onClick={clickDash}>Dashboard</a>
                <a href="#">Announcements</a>
                <a href="#">Lessons</a>
                <a href="#">Quizzes</a>
                <a href="#">Videos</a>
                <a href="#">Tactics</a>
            </div>

            <div className="content">

                <div className="title">
                    <h1>Dashboard</h1>
                </div>

                <div className="top_section">
                    <div className="this_weeks_lesson">
                        <p id="headers">THIS WEEK'S LESSON:</p>
                        <p id="pink_titles">Moving Pieces</p>
                        <svg width="300" height="120">
                            <rect id="rect1" width="300" height="120" rx="15"/>
                        </svg>
                    </div>
                    <div className="tactic">
                        <p id="headers">DAILY TACTICS:</p>
                        <p id="pink_titles">Pawns</p>
                        <svg width="300" height="120">
                            <rect id="rect1" width="300" height="120" rx="15"/>
                        </svg>
                    </div>
                </div>

                <div className="bottom_section">
                    <div className="to_do">
                        <p id="dark_headers">To Do:</p>
                        <svg width="350" height="200">
                            <rect id="todo_rect" width="350" height="200" rx="15"/>
                        </svg>
                    </div>
                    <div className="announcement">
                        <p id="dark_headers">New Announcements:</p>
                        <svg width="400" height="50">
                            <rect id="rect1" width="400" height="50" rx="15"/>
                        </svg>
                        <svg width="400" height="50">
                            <rect id="rect1" width="400" height="50" rx="15"/>
                        </svg>
                        <svg width="400" height="50">
                            <rect id="rect1" width="400" height="50" rx="15"/>
                        </svg>
                    </div>
                </div>

            </div>

        </body>
        </html>
    );
}
function clickDash() {
    alert(Window.UserType);
}

export default Dashboard