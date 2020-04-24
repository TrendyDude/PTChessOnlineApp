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


import {User, UserConstructor} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import TeacherQuizList from "./TeacherQuizList";
import './TeacherQuizzes.css'
import Lesson from "./Lesson";
import AdminLessons from "./AdminLessons";

var loadedQuizzes = false;

function TeacherQuizzes(){
    var user = User;
    var groupId = user.GroupId;
    console.log(groupId);
    function getQuizzes() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetQuizzesForGroup',
            Payload: JSON.stringify({"groupId": groupId})
        };


        lambda.invoke(params, function (err, data) {
            if (err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                var QuizObjects = data.Payload.toString().split('|');
                QuizObjects.forEach(function (quiz) {

                    var vars = quiz.split(',');
                    var quizId = parseInt(vars[0].toString().replace('"',''));
                    var quizName = vars[1];
                    var params1 = {
                        FunctionName: 'mysqlGetQuizAvgForGroup',
                        Payload: JSON.stringify({"groupId": groupId, "quizId": quizId})
                    };
                    lambda.invoke(params1, function (err, data2) {
                        if (err) {
                            console.log(err);
                            alert(JSON.stringify(err));
                        } else {
                            var results = data2.Payload.toString();
                            var vars = results.split(',');
                            setQuiz(prevQuizzes => {
                                return [...prevQuizzes, {
                                    idQuiz: quizId,
                                    nameQuiz: vars[0].replace('"', ''),
                                    avgQuiz: vars[1].replace('"', ''),
                                    groupId: groupId
                                }]
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
            <title>Teacher Quizzes</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>

                <a onClick={clickDash}>Dashboard</a>
                <a onClick={clickAnnouncementsTab}>Announcements</a>
                <a onClick={clickLessons}>Lessons</a>
                <a onClick={clickQuizzesTeacher}>Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a onClick={clickTacticTab}>Tactics</a>
            </div>

            <div className="content">
                <div className="title">
                    <h1>Quizzes(Teacher)</h1>
                </div>

                <div className="container">
                    <TeacherQuizList quizzes = {quizzes}/>
                    {loadedQuizzes = false}
                </div>

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

export default TeacherQuizzes