import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";

import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import AdminQuizzes from "./AdminQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import Announcements from "./Announcements";
import Dashboard from "./Dashboard";
import QuestionsList from "./QuestionsList";

var loadedQuestions = false;
var pageLoaded = false;
export default function QuizElement({quiz}) {

    function makeTheQuiz() {
        if (quiz != null) {
            if (quiz.isLesson) {

                document.getElementById("quizzesPage").setAttribute("hidden", "hidden");
                document.getElementById("lessonsPage").removeAttribute("hidden");

            }
        }
    }


    function getQuestions() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetQuestions',
            Payload: JSON.stringify({
                "quizId": quiz.idQuiz
            })
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                if(!(data.Payload.toString() === false.toString())){
                    var questionObjects = data.Payload.split('|');
                    //data.Payload.split('|')[0].split(',')[0].split('\"')[1]
                    for (var i = 0; i < questionObjects.length; i++) {
                        var questionAttributes = questionObjects[i].split(',');
                        if (i === 0) {
                            questionAttributes[0] = questionAttributes[0].split('\"')[1];
                        }
                        if (i === questionObjects.length - 1) {
                            questionAttributes[questionObjects.length - 1] = questionAttributes[questionObjects.length - 1].split('\"')[0];
                        }
                        console.log(questionAttributes);
                        setQuestions(prevQuestions => {
                            return [...prevQuestions, {idQuestion: questionAttributes[0],
                                questionContents: questionAttributes[1],
                                A: questionAttributes[2],
                                B: questionAttributes[3],
                                C: questionAttributes[4],
                                D: questionAttributes[5],
                                E: questionAttributes[6]}]
                        });


                    }
                }
                let params1 = {
                    FunctionName: 'mysqlGetStudentAnswers',
                    Payload: JSON.stringify({
                        "quizId": quiz.idQuiz,
                        "user": quiz.userQuiz
                    })
                };
                lambda.invoke(params1, function (err, data1) {
                    if (err) {
                        console.log(err);
                        alert(JSON.stringify(err));
                    } else {
                        let answersStr = data1.Payload.toString().replace('\"', '').replace('"', '');
                        let answers = answersStr.split(',');
                        var choices = document.getElementsByClassName("answers_buttons");
                        alert(choices.length);
                        for (var i = 0; i < answers.length; i++) {
                            for (var j = i * 5; j < i * 5 + 5; j++) {
                                if (choices[j].id === answers[i].replace('"', '')) {
                                    choices[j].checked = 'checked';
                                    break;
                                }
                            }

                            for (var j = answers.length * 5 + i * 5; j < answers.length * 5 + i * 5 + 5; j++) {
                                if (choices[j].id === answers[i].replace('"', '')) {
                                    choices[j].checked = 'checked';
                                    break;
                                }
                            }

                        }
                    }
                });
            }
        });

    }
    function saveClick() {
        var choices = document.getElementsByClassName("answers_buttons");
        var answers = {};
        var i = 1;
        var max = choices.length/10;
        var itemsSeen = 0;
        var choiceSelected = false;
        var j = 0;
        var anothervar = max * 5 + j;
        while (i <= max) {
            if (choices[j].checked === true && document.getElementById("quizzesPage").hidden) {
                answers[i.toString()] =  choices[j].id;
                choiceSelected = true;
            }
            if (choices[anothervar].checked === true && document.getElementById("lessonsPage").hidden) {
                answers[i.toString()] =  choices[anothervar].id;
                choiceSelected = true;
            }
            itemsSeen++;
            if (itemsSeen === 5) {
                i++;
                itemsSeen = 0;
                if (choiceSelected === false) {
                    answers[i.toString()] = "";
                }
            }
            j++;
            anothervar++;

        }
        answers = JSON.stringify(answers);
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var submitted = 0;
        if (quiz.submitted.toString() !== "0") {
            submitted = 1
        }
        var params = {
            FunctionName: 'mysqlSaveAnswers',
            Payload: JSON.stringify({
                "quizId": quiz.idQuiz,
                "user": quiz.userQuiz,
                "answers": answers,
                "submitted": submitted
            })
        };
        lambda.invoke(params, function (err, data) {
            if (err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                alert("Answers Saved!");
                loadedQuestions = false;
                ReactDOM.render(<StudentQuizzes/>, document.getElementById('root'));
            }
        });
    }
    function submitClick() {
        quiz.submitted = 1;
        saveClick();
    }
    const [questions, setQuestions] = useState([]);
    if (questions.length === 0 && loadedQuestions !== true) {
        loadedQuestions = true;
        if (quiz != null) {
            getQuestions();
        }
    }
    return (
        <>
            <div id="lessonsPage" hidden>
                <title>{quiz.nameQuiz}</title>
                <div className="content">
                    <QuestionsList questions = {questions}/>
                </div>
                <div className="bottom">
                    <a href="#" className="cancel-button" onClick={saveClick}>Save</a>
                    <a href="#" className="save-button" onClick={submitClick}>Submit</a>

                </div>
            </div>
            <div id="quizzesPage">
                <title>{quiz.nameQuiz}</title>
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
                    <QuestionsList questions = {questions}/>
                </div>
                <div className="bottom">
                    <a href="#" className="cancel-button" onClick={saveClick}>Save</a>
                    <a href="#" className="save-button" onClick={submitClick}>Submit</a>

                </div>
            </div>
            <script>makeTheQuiz()</script>
        </>

    );




}
function clickDash() {
    loadedQuestions = false;
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {
    loadedQuestions = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickVideoTab() {
    loadedQuestions = false;
    if (User.UserType.toString() === 'A')  {
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Videos/>, document.getElementById('root'));
    }

}

function gotoChessTactic() {
    loadedQuestions = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickAnnouncementsTab() {
    loadedQuestions = false;
    if (User.UserType === "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));
    } else if (User.UserType === "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }

}

function clickQuizzes() {
    loadedQuestions = false;
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




