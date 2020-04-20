import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import {User} from "./Login";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import './Lesson.css'
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import Announcements from "./Announcements";
import ViewLesson from "./ViewLesson";

function Lesson() {
    return (
        <div>
            <title>Lessons</title>

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
                    <h1>Lessons</h1>
                </div>

                <div className="thisWeek">
                    <h1>This Week's Lesson</h1>
                </div>
                <div className="lesson">
                    <button onClick={clickViewLesson}>
                        <p>Due date</p>
                        <h1>lesson1</h1>
                    </button>
                </div>
                <div className="incomplete">
                    <h1>Incomplete Lessons</h1>
                </div>
                <div className="lesson">
                    <button onClick={clickViewLesson}>
                        <p>Due date</p>
                        <h1>lesson2</h1>
                    </button>
                </div>
                <div className="complete">
                    <h1>Completed Lessons</h1>
                </div>
                <div className="lesson">
                    <button onClick={clickViewLesson}>
                        <p>Due date</p>
                        <h1>lesson3</h1>
                    </button>
                </div>
            </div>



        </div>
    )
}

function clickViewLesson() {
    ReactDOM.render(<ViewLesson/>, document.getElementById('root'));
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
    if (User.UserType === "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));

    }
    else if (User.UserType === "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }
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

export default Lesson