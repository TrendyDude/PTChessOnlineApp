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
function getQuizzes() {
    const AWS = require('aws-sdk');
    const config = require('./config');
    AWS.config.region = "us-east-1";
    AWS.config.accessKeyId = config.accessKey;
    AWS.config.secretAccessKey = config.secretKey;
    var lambda = new AWS.Lambda();
    var params = {
        FunctionName: 'mysqlGetQuizzesForStudent',
        Payload: JSON.stringify({"username": User.UserName})
    };


    lambda.invoke(params, function (err, data) {
        if(err) {
            console.log(err);
            alert(JSON.stringify(err));
        } else {
            var QuizObjects = data.Payload.split('|');
            QuizObjects.forEach(function(quiz) {
                var vars = quiz.split(',');
                var quizId = vars[0];
                var quizName = vars[1];
                var params1 = {
                    FunctionName: 'mysqlGetQuizAvgForStudent',
                    Payload: JSON.stringify({"username": User.UserName, "quizId": parseInt(quizId)})
                };
                lambda.invoke(params1, function (err, data) {
                    if (err) {
                        console.log(err);
                        alert(JSON.stringify(err));
                    } else {
                        //TODO: Return Component with the avg grade for the specific quiz (ex: data = "33.3333%")
                    }
                });
            });
        }
    });
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