import React, {useState} from 'react';
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
import QuizzesList from "./QuizzesList";
import {parseExpression} from "@babel/parser";
import QuizElement from "./QuizzesListComponent";

var loadedQuizzes = false;

function StudentQuizzes(){
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


        lambda.invoke(params, function (err, data1) {
            if (err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                var objectThing = data1.Payload.toString();
                var QuizObjects = objectThing.substring(1, objectThing.length - 1).split("|");
                QuizObjects.forEach(function (quiz) {
                    var vars = quiz.split(',');
                    var quizId = vars[0];
                    var quizName = vars[1];
                    var params1 = {
                        FunctionName: 'mysqlGetQuizAvgForStudent',
                        Payload: JSON.stringify({"username": User.UserName, "quizId": parseInt(quizId)})
                    };
                    lambda.invoke(params1, function (err, data2) {
                        if (err) {
                            console.log(err);
                            alert(JSON.stringify(err));
                        } else {
                            setQuiz(prevQuizzes => {
                                return [...prevQuizzes, {idQuiz: quizId, nameQuiz: quizName, avgQuiz: data2.Payload, userQuiz: User.UserName}]
                            })
                        }
                    });
                });
            }
        });
    }
    const [quizzes, setQuiz] = useState([]);
    if (quizzes.length === 0 && loadedQuizzes !== true) {
        loadedQuizzes = true;
        getQuizzes();
    }
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
                    <p id="pink_titles">Quizzes</p>
                    <QuizzesList quizzes = {quizzes}/>
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