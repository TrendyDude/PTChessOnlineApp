import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import './AdminQuizzes.css';


import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import NewQuizAdmin from "./NewQuizAdmin";



function AdminQuizzes(){
    return(
        <div>
            <title>Admin Quizzes</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>

                <a onClick={clickDash}>Dashboard</a>
                <a onClick={clickAnnouncementsTab}>Announcements</a>
                <a href="#">Lessons</a>
                <a onClick={clickQuizzesAdmin}>Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a onClick={clickTacticTab}>Tactics</a>
            </div>

            <div className="content">
                <div className="title">
                    <h1>Quizzes(Admin)</h1>
                </div>
                <div className="container">
                    <a onClick={clickNewQuiz} className="new-quiz-button">Create New Quiz</a>
                </div>

                <div className="container">
                    <p id="pink_titles">Created Quizzes</p>
                </div>

                <div className="container">
                    <a href="#" className="quiz-item-button">Lesson 1: Quiz (20 Questions)</a>
                    <a href="#" className="quiz-item-button">Lesson 2: Quiz (20 Questions)</a>
                    <a href="#" className="quiz-item-button">Lesson 3: Quiz (20 Questions)</a>
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

function clickQuizzesAdmin() {
    ReactDOM.render(<AdminQuizzes/>, document.getElementById('root'));
}

function clickNewQuiz() {
    ReactDOM.render(<NewQuizAdmin/>, document.getElementById('root'));
}

export default AdminQuizzes