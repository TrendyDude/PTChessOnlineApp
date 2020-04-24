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
import StudentQuizzes from "./StudentQuizzes";
import './StudentSingleQuiz.css'
import './NewQuizAdmin.css'
import Lesson from "./Lesson";
import AdminLessons from "./AdminLessons";

function StudentSingleQuiz(){
    return(
        <div>
            <title>Student Quizzes</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>

                <a onClick={clickDash}>Dashboard</a>
                <a onClick={clickAnnouncementsTab}>Announcements</a>
                <a onClick={clickLessons}>Lessons</a>
                <a onClick={clickStudentQuizzes}>Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a onClick={clickTacticTab}>Tactics</a>
            </div>

            <div className="content">
                <div className="title">
                    <h1>Lesson 4: Quiz</h1>
                </div>

                <div className="container">
                    <form>
                        <p id="dark_headers">Question 1: What is the difference between a rook and a pawn?</p>
                        <input type="radio" id="choice-a" name="question-1"/>
                        <label htmlFor="choice-a" className="radio-label">Choice A</label><br/>

                        <input type="radio" id="choice-b" name="question-1"/>
                        <label htmlFor="choice-b" className="radio-label">Choice B</label><br/>

                        <input type="radio" id="choice-c" name="question-1"/>
                        <label htmlFor="choice-c" className="radio-label">Choice C</label><br/>

                        <input type="radio" id="choice-d" name="question-1"/>
                        <label htmlFor="choice-d" className="radio-label">Choice D</label><br/>


                        <p id="dark_headers">Question 2: What is a fork?</p>
                        <input type="radio" id="choice-a" name="question-2"/>
                        <label htmlFor="choice-a" className="radio-label">Choice A</label><br/>

                        <input type="radio" id="choice-b" name="question-2"/>
                        <label htmlFor="choice-b" className="radio-label">Choice B</label><br/>

                        <input type="radio" id="choice-c" name="question-2"/>
                        <label htmlFor="choice-c" className="radio-label">Choice C</label><br/>

                        <input type="radio" id="choice-d" name="question-2"/>
                        <label htmlFor="choice-d" className="radio-label">Choice D</label><br/>
                    </form>
                </div>

            </div>

            <div className="bottom">
                <a href="#" className="cancel-button" onClick={saveClick}>Save</a>
                <a href="#" className="save-button" >Submit</a>

            </div>


        </div>
    );
}

function clickLessons() {
    if (User.UserType === "A") {
        ReactDOM.render(<AdminLessons/>, document.getElementById('root'));

    }
    else if (User.UserType === "S") {
        ReactDOM.render(<Lesson/>, document.getElementById('root'));
    }
}

function saveClick() {
    ReactDOM.render(<StudentQuizzes/>, document.getElementById('root'));
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

export default StudentSingleQuiz