import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos, {Lessons, VideoConstructor} from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import './AdminQuizzes.css';


import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import NewQuizAdmin from "./NewQuizAdmin";
import QuizList from "./QuizList"
import uuidv4 from "uuid/v4";
import {load} from "dotenv";
export let SelectedQuiz;



var loadedQuizzes = false;

function AdminQuizzes(){

    function getQuizzes() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetAllQuizzes',
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                if(!(data.Payload.toString() === false.toString())){

                    var Objects = data.Payload.split('|');
                    //data.Payload.split('|')[0].split(',')[0].split('\"')[1]
                    //console.log(lessonObjects);
                    for (var i = 0; i < Objects.length; i++) {
                        var Attributes = Objects[i].split(',');
                        if (i == 0) {
                            Attributes[0] = Attributes[0].split('\"')[1];
                        }
                        if (i == Attributes.length - 1) {
                            Attributes[Attributes.length - 1] = Attributes[Attributes.length - 1].split('\"')[Attributes.length - 1];
                        }
                        console.log(Attributes);
                        setQuizzes(prevQuizzes => {
                            return [...prevQuizzes, {QuizID: Attributes[0],
                                LessonID: Attributes[1],
                                Name: Attributes[2]}]
                        });


                    }

                }
            }
        });
    }
    const [quizzes, setQuizzes] = useState([]);
    if (quizzes.length == 0 && loadedQuizzes != true) {
        loadedQuizzes = true;
        getQuizzes();

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

                  <title>
                      Admin Quizzes
                  </title>
        </head>
        <body>
            <div>


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
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="title">
                                <h1>Quizzes(Admin)</h1>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                            <div className="container">
                                <a onClick={clickNewQuiz} className="new-quiz-button">Create New Quiz</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="container">
                                <p id="pink_titles">Created Quizzes</p>
                            </div>
                        </div>
                    </div>






                    <div className="row">
                        <div className="col-sm-8">
                            <table className="table table-striped table-sm">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Quiz Name</th>
                                    <th>Lesson</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <QuizList quizzes = {quizzes}/>
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>




            </div>


        </body>
        </html>
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
    loadedQuizzes = false;
    ReactDOM.render(<NewQuizAdmin/>, document.getElementById('root'));
}

export default AdminQuizzes