import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import {User} from "./Login";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import './Announcements.css';
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";
import NewAnnouncement from "./NewAnnouncement";

function TeacherAnnouncements() {
    return (
        <div>
            <title>TeacherAnnouncements</title>

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
                    <h1>TeacherAnnouncements</h1>
                </div>
                    <div className="announcement1">
                        <svg width="1000" height="80">
                            <rect id="rect1" width="1000" height="70" rx="15"/>
                            <foreignObject className="newAnnouncements" x="5" y="12" width="1000" height="50">
                                <button onClick={createAnnouncement}>Create New Announcements</button>
                            </foreignObject>
                        </svg>
                    </div>
                    <div className="announcement1">
                        <h1>Past Announcements</h1>
                        <svg width="1000" height="80">
                            <rect id="rect" width="1000" height="70" rx="15"/>
                            <foreignObject className="textInRect" x="5" y="12" width="1000" height="50">
                                <button>Announcement 2</button>
                            </foreignObject>
                        </svg>
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
    ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));
}
function createAnnouncement() {
    ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
}


export default TeacherAnnouncements