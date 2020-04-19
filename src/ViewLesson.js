import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import {User} from "./Login";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import Announcements from "./Announcements";
import Lesson from "./Lesson";
import './ViewLesson.css'

function ViewLesson() {
    return (
        <div>
            <title>ViewLessons</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>
                <a onClick={clickDash}>Dashboard</a>
                <a onClick={clickAnnouncementsTab}>Announcements</a>
                <a href="#">Lessons</a>
                <a onClick={clickQuizzes}>Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a onClick={clickTacticTab}>Tactics</a>
            </div>
            <div className="content">
                <div className="title">
                    <h1>Lesson 1</h1>
                </div>
                <div className="dueDate">
                    <h1>Due Date</h1>
                </div>
                <div className="box">
                    <svg x="0" y="0" width="2500" height="800">
                        <rect x="5" y="5" width="250" height="500"/>
                        <rect x="255" y="5" width="800" height="500"/>
                        <foreignObject x="7" y="125" width="300" height="400">
                            <div className="active">
                                <button>Video</button>
                            </div>
                            <button>Quiz</button>
                            <button>Tactics</button>
                        </foreignObject>
                        <foreignObject x="301" y="0" width="300" height="400">
                            <p>element goes here</p>
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
    if (User.UserType == "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));

    }
    else if (User.UserType == "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }
}

function clickQuizzes() {
    if (User.UserType == "A") {
        ReactDOM.render(<AdminQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType == "S") {
        ReactDOM.render(<StudentQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType == "T") {
        ReactDOM.render(<TeacherQuizzes/>, document.getElementById('root'));

    }
}

export default ViewLesson