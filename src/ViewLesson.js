import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import {User} from "./Login";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import Announcements from "./Announcements";
import Lesson from "./Lesson";
import './ViewLesson.css'
import QuizElement from "./QuizElement";

var videoSelected = true;
var quizSelected = false;
var tacticSelected = false;
var loadedQuizzes = false;

export default function ViewLesson({lesson}) {
    //mysqlGetSingleQuizForUserWithLessonId
    function getQuizzes() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetSingleQuizForUserWithLessonId',
            Payload: JSON.stringify({"username": User.UserName, "lessonId": lesson.Lessons_LessonID})
        };


        lambda.invoke(params, function (err, data1) {
            if (err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                var objectThing = data1.Payload.toString();
                var vars = objectThing.split(',');
                var quizId = vars[0];
                var quizName = vars[1];
                var submitted = vars[2];
                setQuiz(prevQuizzes => {
                    return [...prevQuizzes, {idQuiz: quizId,
                        nameQuiz: quizName,
                        avgQuiz: "N/A",
                        userQuiz: User.UserName,
                        submitted: submitted,
                        isLesson: true
                    }]
                });
                    // var params1 = {
                    //     FunctionName: 'mysqlGetQuizAvgForStudent',
                    //     Payload: JSON.stringify({"username": User.UserName, "quizId": parseInt(quizId)})
                    // };
                    // lambda.invoke(params1, function (err, data2) {
                    //     if (err) {
                    //         console.log(err);
                    //         alert(JSON.stringify(err));
                    //     } else {
                    //         setQuiz(prevQuizzes => {
                    //             return [...prevQuizzes, {idQuiz: quizId,
                    //                 nameQuiz: quizName,
                    //                 avgQuiz: data2.Payload,
                    //                 userQuiz: User.UserName,
                    //                 submitted: submitted,
                    //                 isLesson: true
                    //             }]
                    //         })
                    //     }
                    // });

            }
        });
    }

    const [quiz, setQuiz] = useState([]);
    if (quiz.length == 0 && loadedQuizzes != true) {
        loadedQuizzes = true;
        getQuizzes();
    }
    function videoSelect() {
        //console.log("clicked");
        videoSelected = true;
        quizSelected = false;
        tacticSelected = false;
        document.getElementById("button1").className = "btn btn-info";
        document.getElementById("videoRow").removeAttribute("hidden");
        document.getElementById("button2").className = "btn btn-secondary";
        document.getElementById("quizRow").setAttribute("hidden", "hidden");
        document.getElementById("button3").className = "btn btn-secondary";
        document.getElementById("tacticRow").setAttribute("hidden", "hidden");

    }
    function quizSelect() {
        videoSelected = false;
        quizSelected = true;
        tacticSelected = false;
        document.getElementById("button1").className = "btn btn-secondary";
        document.getElementById("videoRow").setAttribute("hidden", "hidden");
        document.getElementById("button2").className = "btn btn-info";
        document.getElementById("quizRow").removeAttribute("hidden");
        document.getElementById("button3").className = "btn btn-secondary";
        document.getElementById("tacticRow").setAttribute("hidden", "hidden");

    }
    function tacticSelect() {
        videoSelected = false;
        quizSelected = false;
        tacticSelected = true;
        document.getElementById("button1").className = "btn btn-secondary";
        document.getElementById("videoRow").setAttribute("hidden", "hidden");
        document.getElementById("button2").className = "btn btn-secondary";
        document.getElementById("quizRow").setAttribute("hidden", "hidden");
        document.getElementById("button3").className = "btn btn-info";
        document.getElementById("tacticRow").removeAttribute("hidden");

    }

    return (

        <html>
            <head>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>

                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                          crossOrigin="anonymous" />
                </head>
            </head>
            <body>
                <div>
                    <title>ViewLessons</title>


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
                        <div className="title">
                            <h1>{lesson.LessonName}</h1>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="btn-group btn-group-toggle d-flex justify-content-center" data-toggle="buttons">
                                    <label id="button1" className="btn btn-info">

                                        <input type="radio" name="options" id="option1" autoComplete="off" onClick={videoSelect}/>
                                        Video
                                    </label>
                                    <label id="button2" className="btn btn-secondary">
                                        <input type="radio" name="options" id="option2" autoComplete="off" onClick={quizSelect}/>
                                        Quiz
                                    </label>
                                    <label  id="button3" className="btn btn-secondary">
                                        <input type="radio" name="options" id="option3" autoComplete="off" onClick={tacticSelect} />
                                        Tactics
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="videoRow">
                            <div className="col-sm-8">
                                <div className="row">
                                    <h3>{lesson.videoName}</h3>
                                </div>
                                <div className="row">

                                    <iframe src={lesson.VideoURL}
                                            width="600" height="400"
                                            frameBorder='0'
                                            allow='autoplay; encrypted-media'
                                            allowFullScreen
                                            title='video'
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="row" hidden id="quizRow">
                            <div className="col-sm-8">

                                <QuizElement quiz = {quiz[0]} />
                            </div>
                        </div>
                        <div className="row" hidden id="tacticRow">
                            <div className="col-sm-8">

                                <iframe src={"https://livetactics.chessbase.com"} width="600" height="400" frameBorder='0'>

                                </iframe>


                            </div>
                        </div>
                        {/*<div className="dueDate">*/}
                        {/*    <h1>Due Date</h1>*/}
                        {/*</div>*/}
                        {/*<div className="box">*/}
                        {/*    <svg x="0" y="0" width="2500" height="800">*/}
                        {/*        <rect x="5" y="5" width="250" height="500"/>*/}
                        {/*        <rect x="255" y="5" width="800" height="500"/>*/}
                        {/*        <foreignObject x="7" y="125" width="300" height="400">*/}
                        {/*            <div className="active">*/}
                        {/*                <button>Video</button>*/}
                        {/*            </div>*/}
                        {/*            <button>Quiz</button>*/}
                        {/*            <button>Tactics</button>*/}
                        {/*        </foreignObject>*/}
                        {/*        <foreignObject x="301" y="0" width="300" height="400">*/}
                        {/*            <p>element goes here</p>*/}
                        {/*        </foreignObject>*/}
                        {/*    </svg>*/}
                        {/*</div>*/}
                    </div>



                </div>

            </body>
        </html>

    )
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
    if (User.UserType == "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));

    }
    else if (User.UserType == "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }
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