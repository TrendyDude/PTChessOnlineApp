import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import AdminQuizzes from "./AdminQuizzes";
import './NewQuizAdmin.css';



import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";



function NewQuizAdmin(){
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
                    <h1>New Quiz</h1>
                </div>

                <p className="extra-top-space">Which lesson is this quiz a part of?</p>
                <div className="container">
                    <select class="select-css">
                        <option>Select your lesson from below</option>
                        <option>Lesson 6</option>
                        <option>Lesson 7</option>
                        <option>Lesson 8</option>
                    </select>
                </div>

                <div className="container">
                    <a href="#" className="add-question-button">Add Question</a>
                </div>

                <div className="bottom">
                    <a href="#" className="save-button">Save</a>
                    <a href="#" className="cancel-button">Cancel</a>
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

export default NewQuizAdmin