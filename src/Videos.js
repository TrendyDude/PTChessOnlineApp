import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Videos.css';
import Dashboard from "./Dashboard";
import './Dashboard.css';
import {FirstName} from "./Login";

function Videos() {
    return (
        <div lang="en">


            <title>Videos</title>

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
            <div className="title">
                <h1>Videos</h1>
            </div>

            <div id="top_video">
                <div id="tab_nav">
                    <a href="#" className="active">RESUME WATCHING</a>
                    <a href="#">RECENTLY WATCHED</a>
                    <a href="#">FAVORITES</a>
                </div>

                <div id="vid_row">
                    <div id="vid_col">
                        <svg width="220" height="120">
                            <rect id="rect" width="220" height="120" rx="15" />
                        </svg>
                    </div>
                </div>
            </div>

            <div id="bottom_video">
                <div id="tab_nav">
                    <a href="#" className="active">NEW VIDEOS</a>
                    <a href="#">ALL VIDEOS</a>
                </div>

                <div id="vid_row">
                    <div id="vid_col">
                        <svg width="220" height="120">
                            <rect id="rect" width="220" height="120" rx="15" />
                        </svg>
                    </div>
                    <div id="vid_col">
                        <svg width="220" height="120">
                            <rect id="rect" width="220" height="120" rx="15" />
                        </svg>
                    </div>
                    <div id="vid_col">
                        <svg width="220" height="120">
                            <rect id="rect" width="220" height="120" rx="15" />
                        </svg>
                    </div>
                    <div id="vid_col">
                        <svg width="220" height="120">
                            <rect id="rect" width="220" height="120" rx="15" />
                        </svg>
                    </div>
                </div>

                <div id="vid_row">
                    <div id="vid_col">
                        <svg width="220" height="120">
                            <rect id="rect" width="220" height="120" rx="15" />
                        </svg>
                    </div>
                </div>





            </div>





        </div>



        </div>
    );
}



function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickVideoTab() {
    ReactDOM.render(<Videos/>, document.getElementById('root'));
}


export default Videos