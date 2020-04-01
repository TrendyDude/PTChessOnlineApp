import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import './AdminQuizzes.css';
import TeacherQuizAvg from "./TeacherQuizAvg";
import TeacherQuizzes from "./TeacherQuizzes";

import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import './TeacherQuizzes.css'
import StudentSingleQuiz from "./StudentSingleQuiz";


function StudentQuizzes(){
    return(
        <div>
            <title>Student Quizzes</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>

                <a onClick={clickDash}>Dashboard</a>
                <a onClick={clickAnnouncementsTab}>Announcements</a>
                <a href="#">Lessons</a>
                <a onClick={clickStudentQuizzes}>Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a onClick={clickTacticTab}>Tactics</a>
            </div>

            <div className="content">
                <div className="title">
                    <h1>Quizzes (Student)</h1>
                </div>

                <div className="container">
                    <p id="pink_titles">Incomplete Quizzes</p>
                    <a onClick={clickStudentSingleQuiz} className="quiz-item-button">
                        <span>Lesson 4: Quiz</span>
                    </a>
                    <p id="pink_titles">Completed Quizzes</p>
                    <a href="#" className="quiz-item-button">
                        <span>Lesson 1: Quiz</span>
                        <span className="right-align">Grade: 85</span>
                    </a>

                    <a href="#" className="quiz-item-button">
                        <span>Lesson 2: Quiz</span>
                        <span className="right-align">Grade: 95</span>
                    </a>

                    <a href="#" className="quiz-item-button">
                        <span>Lesson 3: Quiz</span>
                        <span className="right-align">Grade: 80</span>
                    </a>
                </div>

            </div>




        </div>
    );
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

function clickQuizzesTeacher() {
    ReactDOM.render(<TeacherQuizzes/>, document.getElementById('root'));
}

function clickSingleQuizTeacher(){
    ReactDOM.render(<TeacherQuizAvg/>, document.getElementById('root'));
}

function clickStudentQuizzes(){
    ReactDOM.render(<StudentQuizzes/>, document.getElementById('root'));
}

function clickStudentSingleQuiz(){
    ReactDOM.render(<StudentSingleQuiz/>, document.getElementById('root'));
}

export default StudentQuizzes