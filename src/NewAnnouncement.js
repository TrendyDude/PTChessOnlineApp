import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import './Announcements.css';
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import './newAnnouncement.css';

function NewAnnouncement() {
    return (
        <div>
            <title>newAnnouncements</title>

            <div className="sidenav">
                <h3> Welcome {this.state.FirstName.toString()}</h3>
                <a onClick={clickDash}>Dashboard</a>
                <a href="#">Announcements</a>
                <a href="#">Lessons</a>
                <a href="#">Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a href="#">Tactics</a>
            </div>
            <div className="content">
                <div className="title">
                    <h1>New Announcement</h1>
                </div>
                <div className="newAnnouncementText">
                    <h1>Title:</h1>
                </div>
                <div className="titleTextBox">
                    <textarea type="text" id="AnnouncementTitle" name="Title"/>
                </div>
                <div className="newAnnouncementText">
                    <h1>Message:</h1>
                </div>
                <div className="contentTextBox">
                    <textarea type="text" id="AnnouncementTitle" name="Title"/>
                </div>
                <div className="cancelButton">
                    <button>CANCEL</button>
                </div>
                <div className="saveButton">
                    <button>SAVE</button>
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
    if (this.state.UserType.toString() === 'A')  {
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



export default NewAnnouncement