import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Videos.css';
import './Dashboard.css';
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import {User} from "./Login";
import Lesson from "./Lesson";
import TeacherAnnouncements from "./TeacherAnnouncements";
import Announcements from "./Announcements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import AdminLessons from "./AdminLessons";

function ChessTactic() {
    return (
        <div lang="en">

            <title>ChessTactic</title>

        <body>
        <div className="sidenav">
            <h3> Welcome {User.FirstName.toString()}</h3>
            <a onClick={clickDash}>Dashboard</a>
            <a onClick={clickAnnouncementsTab}>Announcements</a>
            <a onClick={clickLessons}>Lessons</a>
            <a onClick={clickQuizzes}>Quizzes</a>
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
function clickAnnouncementsTab() {


    if (User.UserType === "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));
    } else if (User.UserType === "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }
    else {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));

    }
}
function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}
function clickLessons() {
    if (User.UserType === "A") {
        ReactDOM.render(<AdminLessons/>, document.getElementById('root'));

    }
    else if (User.UserType === "S") {
        ReactDOM.render(<Lesson/>, document.getElementById('root'));
    }
}

function clickVideoTab() {
    ReactDOM.render(<Videos/>, document.getElementById('root'));
}
function clickQuizzes() {

    if (User.UserType === "A") {
        ReactDOM.render(<AdminQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType === "S") {
        ReactDOM.render(<StudentQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType === "T") {
        ReactDOM.render(<TeacherQuizzes/>, document.getElementById('root'));

    }
}

export default ChessTactic;