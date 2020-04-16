import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos, {Lessons} from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import AdminQuizzes from "./AdminQuizzes";
import './NewQuizAdmin.css';
import LessonList from './LessonList';
import QuestionList from './QuestionList';



import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import QuizList from "./QuizList";
import uuidv4 from "uuid/v4";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";


var loadedLessons = false;
var loadedQuestions = false;
var quizMade = false;
var QuizID = 0;

function NewQuizAdmin(){
    var quizId = uuidv4();

    const questionRef = useRef();
    const choiceARef = useRef();
    const choiceBRef = useRef();
    const choiceCRef = useRef();
    const choiceDRef = useRef();
    const choiceERef = useRef();
    const correctAnswerRef = useRef();
    const questionNumRef = useRef();
    const lessonRef = useRef();
    const quizNameRef = useRef();

    var user = User;
    function getLessons() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetLessons',
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                if(!(data.Payload.toString() === false.toString())){

                    var lessonObjects = data.Payload.split('|');
                    //data.Payload.split('|')[0].split(',')[0].split('\"')[1]
                    console.log(lessonObjects);
                    for (var i = 0; i < lessonObjects.length; i++) {
                        var lessonAttributes = lessonObjects[i].split(',');
                        if (i == 0) {
                            lessonAttributes[0] = lessonAttributes[0].split('\"')[1];
                        }
                        if (i == lessonAttributes.length - 1) {
                            lessonAttributes[lessonAttributes.length - 1] = lessonAttributes[lessonAttributes.length - 1].split('\"')[lessonAttributes.length - 1];
                        }
                        console.log(lessonAttributes);

                        setLessons(prevLessons => {
                            return [...prevLessons, {LessonId: lessonAttributes[0],
                                LessonName: lessonAttributes[1],
                                Description: lessonAttributes[2]}]
                        });
                        Lessons.push({LessonId: lessonAttributes[0],
                            LessonName: lessonAttributes[1],
                            Description: lessonAttributes[2]});

                    }

                }
            }
        });
    }

    const [lessons, setLessons] = useState([]);
    const [questions, setQuestions] = useState([]);
    if (lessons.length == 0 && loadedLessons != true) {
        loadedLessons = true;
        getLessons();


    }

    function handleAddQuiz(e) {
        const QuizName = quizNameRef.current.value;
        const lessonId = lessonRef.current.value;
        QuizID = uuidv4();

        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlAddQuiz',
            Payload: JSON.stringify({
                "QuizId": QuizID,
                "Lessons_LessonID": lessonId,
                "Name": QuizName
            })
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));

            } else {
                console.log("DOG UPLOADED");
            }
        });
    }
    function handleAddQuestion(e){
        if (quizMade != true) {
            quizMade = true;
            handleAddQuiz(e)

        }
        const question = questionRef.current.value;
        const choiceA = choiceARef.current.value;
        const choiceB = choiceBRef.current.value;
        const choiceC = choiceCRef.current.value;
        const choiceD = choiceDRef.current.value;
        const choiceE = choiceERef.current.value;
        const lessonId = lessonRef.current.value.split(' ')[1];
        const id = uuidv4();
        const correctAnswer = correctAnswerRef.current.value;
        const questionNumber = questionNumRef.current.value;




        setQuestions(prevQuestions => {

            return [...prevQuestions, { QuestionID : id, Question : question, ChoiceA: choiceA, ChoiceB: choiceB, ChoiceC: choiceC, ChoiceD: choiceD, ChoiceE: choiceE, CorrectAnswer: correctAnswer, Quizzes_QuizID: 0, QuestionNum: questionNumber}]
        })
        //lessonId.current.value = null;
        questionRef.current.value = null;
        choiceARef.current.value = null;
        choiceBRef.current.value = null;
        choiceCRef.current.value = null;
        choiceDRef.current.value = null;
        choiceERef.current.value = null;
        correctAnswerRef.current.value = null;
        //questionNumber.current.value = null;



        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlAddQuestion',
            Payload: JSON.stringify({
                "QuestionID": id,
                "Question": question,
                "ChoiceA": choiceA,
                "ChoiceB": choiceB,
                "ChoiceC": choiceC,
                "ChoiceD": choiceD,
                "ChoiceE": choiceE,
                "CorrectAnswer": correctAnswer,
                "Quizzes_QuizID": QuizID,
                "QuestionNum": questionNumber


            })
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));

            } else {
                console.log("DOG UPLOADED");
            }
        });
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function GoBack() {
        ReactDOM.render(<AdminQuizzes/>, document.getElementById('root'));

    }

    return(
        <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                  crossOrigin="anonymous" />


        </head>
        <body>
            <div>


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
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="title">
                                <h1>New Quiz</h1>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                            <p className="extra-top-space">Which lesson is this quiz a part of?</p>
                            <div className="container">
                                <select id="LessonSelect" ref={lessonRef} className="select-css">
                                    <LessonList lessons={lessons}/>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <p className="extra-top-space">Quiz Name</p>
                            <div className="container">
                                <input className="form-control" ref={quizNameRef}/>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-sm-8">
                            <div className="container">
                                <a onClick={openModal} className="add-question-button">Add Question</a>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-sm-8">
                            <table className="table table-striped table-sm">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Question</th>
                                    <th>Content</th>
                                    <th>Correct Answer</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <QuestionList Questions={questions}/>
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <span onClick={closeModal} className="close">&times;</span>

                            <div className="container-modal-title">
                                <strong>New Question</strong>
                            </div>

                            <div className="container-modal">
                                <form>
                                    <label>
                                        <p id="pink_titles">
                                            What is the question?
                                        </p>
                                        <input type="text" className="question" name="myQuestion" ref={questionRef}/>

                                        <p id="pink_titles">Type your answer choices (mark the correct answer):</p>
                                        <span className="container-same-line">
                                    <input type="radio" id="answer-a" name="choices"/>
                                    <label className="align-right">A</label>
                                    <input type="text" className="answer" ref={choiceARef}/>

                                </span>
                                        <span className="container-same-line">
                                    <input type="radio" id="answer-b" name="choices"/>
                                    <label className="align-right">B</label>
                                    <input type="text" className="answer" ref={choiceBRef}/>
                                </span>
                                        <span className="container-same-line">
                                    <input type="radio" id="answer-c" name="choices"/>
                                    <label className="align-right">C</label>
                                    <input type="text" className="answer" ref={choiceCRef}/>
                                </span>
                                        <span className="container-same-line">
                                    <input type="radio" id="answer-d" name="choices"/>
                                    <label className="align-right">D</label>
                                    <input type="text" className="answer" ref={choiceDRef}/>
                                </span>
                                        <span className="container-same-line">
                                    <input type="radio" id="answer-d" name="choices"/>
                                    <label className="align-right">D</label>
                                    <input type="text" className="answer" ref={choiceERef}/>
                                </span>
                                        <span className="container-same-line">

                                    <label className="align-right">Correct Answer</label>
                                    <input type="text" className="answer" ref={correctAnswerRef}/>

                                </span>
                                        <span className="container-same-line">

                                    <label className="align-right">Question Number</label>
                                    <input type="text" className="answer" ref={questionNumRef}/>

                                </span>
                                        <div className="container-same-line">
                                            <a onClick={handleAddQuestion} className="done-button">Done</a>
                                        </div>


                                    </label>
                                </form>
                            </div>

                        </div>

                    </div>

                    <div className="bottom">
                        <button className="btn btn-primary" onClick={GoBack}>Save</button>
                        <a href="#" className="cancel-button">Cancel</a>
                    </div>
                </div>


            </div>


        </body>
        </html>
    );
}



// When the user clicks the button, open the modal
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function clickVideoTab() {
    if (User.UserType.toString() === 'A')  {
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Videos/>, document.getElementById('root'));
    }

}

function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}


function clickAnnouncementsTab() {
    ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));
}

function clickQuizzes() {
    if (User.UserType == "A") {
        ReactDOM.render(<AdminQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType == "S") {
        ReactDOM.render(<StudentQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType == "T") {
        ReactDOM.render(<TeacherQuizzes/>, document.getElementById('root'));

    }
}

export default NewQuizAdmin