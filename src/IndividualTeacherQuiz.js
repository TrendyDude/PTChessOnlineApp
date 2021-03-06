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
import IndividualTeacherQuizList from "./IndividualTeacherQuizList";
import TeacherQuizzes from "./TeacherQuizzes";
import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import './TeacherQuizzes.css'
import Lesson from "./Lesson";
import AdminLessons from "./AdminLessons";

var loadedQuizzes = false;

export default function IndividualTeacherQuiz({quiz}){
    function getQuizzes() {
        var groupId = quiz.groupId;
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetStudentsForGroup',
            Payload: JSON.stringify({"groupId": groupId})
        };

        lambda.invoke(params, function (err, data) {
            if (err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                var StudentObjects = data.Payload.toString().split('|');
                StudentObjects.forEach(function (student) {

                    var vars = student.split(',');
                    var studentUser = vars[0].toString().replace('"','');
                    var studentFirstName = vars[1].toString().replace('"','');
                    var studentLastName = vars[2].toString().replace('"','');
                    var params1 = {
                        FunctionName: 'mysqlGetQuizAvgForStudent',
                        Payload: JSON.stringify({"username": studentUser, "quizId": quiz.idQuiz})
                    };
                    lambda.invoke(params1, function (err, data2) {
                        if (err) {
                            console.log(err);
                            alert(JSON.stringify(err));
                        } else {

                            var results = data2.Payload.toString().split(',');

                            setQuiz(prevQuizzes => {
                                return [...prevQuizzes, {
                                    idQuiz: quiz.idQuiz,
                                    nameQuiz: quiz.nameQuiz,
                                    avgQuiz: results[0].replace('"', ''),
                                    studentUser: studentUser,
                                    studentFirstName: studentFirstName,
                                    studentLastName: studentLastName,
                                    submitted: results[1].replace('"', '')
                                }]
                            })
                        }
                    });
                });
            }
        });
    }
    const [studentQuizzes, setQuiz] = useState([]);
    if (studentQuizzes.length === 0 && loadedQuizzes !== true) {
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
                    <IndividualTeacherQuizList quizzes = {studentQuizzes}/>
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