import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import {User} from "./Login";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import './Announcements.css'
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";

function Announcements() {
    return (
        <div>
            <title>Announcements</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>
                <a onClick={clickDash}>Dashboard</a>
                <a href="#">Announcements</a>
                <a href="#">Lessons</a>
                <a href="#">Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a href="#">Tactics</a>
            </div>
            <div className="content">
                <div className="title">
                    <h1>Announcements</h1>
                </div>
                <div className="leftside">
                    <div className="announcement1">
                        <h1>Date</h1>
                        <svg width="500" height="80">
                            <rect id="rect1" width="450" height="70" rx="15"/>
                            <foreignObject className="textInRectActive" x="5" y="12" width="200" height="50">
                            <button>Announcement 1</button>
                            </foreignObject>
                        </svg>
                    </div>
                    <div className="announcement1">
                        <h1>Date</h1>
                        <svg width="500" height="80">
                            <rect id="rect" width="450" height="70" rx="15"/>
                            <foreignObject className="textInRect" x="5" y="12" width="200" height="50">
                                <button>Announcement 2</button>
                            </foreignObject>
                        </svg>
                    </div>
                </div>
                <div className="rightside">
                    <h1>Announcement Title</h1>
                    <p>Announcement Text</p>
                </div>
            </div>


        </div>
    )
}

function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickVideoTab() {
    if (User.UserType.toString() === 'A')  {
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Videos/>, document.getElementById('root'));
    }

}

function gotoChessTactic() {
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickAnnouncementsTab() {
    ReactDOM.render(<Announcements/>, document.getElementById('root'));
}



export default Announcements