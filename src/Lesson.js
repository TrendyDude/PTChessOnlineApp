import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import {User} from "./Login";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import './Lesson.css'
import ChessTactic from "./ChessTactic";
import AdminVideos, {Lessons} from "./AdminVideos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import Announcements from "./Announcements";
import ViewLesson from "./ViewLesson";
import LessonTableList from "./LessonTableList";

var loadedLessons = false;

function Lesson() {
    var user = User;
    function getLessons() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetLessonComponenents',
            Payload: JSON.stringify({
                groupId: user.GroupId

            })
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
                        if (lessonAttributes[0] < lessonAttributes[7]) {
                            setLessons(prevLessons => {
                                return [...prevLessons, {Lessons_LessonID: lessonAttributes[0],
                                    LessonName: lessonAttributes[1],
                                    Description: lessonAttributes[2],
                                    QuizID: lessonAttributes[3],
                                    VideoId: lessonAttributes[4],
                                    videoName: lessonAttributes[5],
                                    VideoURL: lessonAttributes[6]
                                }]
                            });
                        } else {
                            setCurrentLesson(prevLessons => {
                                return [...prevLessons, {Lessons_LessonID: lessonAttributes[0],
                                    LessonName: lessonAttributes[1],
                                    Description: lessonAttributes[2],
                                    QuizID: lessonAttributes[3],
                                    VideoId: lessonAttributes[4],
                                    videoName: lessonAttributes[5],
                                    VideoURL: lessonAttributes[6]
                                }]
                            });
                        }


                    }

                }
            }
        });
    }

    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState([]);
    if (lessons.length == 0 && loadedLessons != true) {
        loadedLessons = true;
        getLessons();

    }

    return (
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
                        <title>Lessons</title>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <label>
                            Current Lesson
                        </label>
                        <table>
                            <LessonTableList lessons={currentLesson} />
                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <label>
                            Previous Lessons
                        </label>
                        <table>
                            <LessonTableList lessons={lessons} />
                        </table>
                    </div>
                </div>
            </div>


            {/*<div className="content">*/}
            {/*    <div className="title">*/}
            {/*        <h1>Lessons</h1>*/}
            {/*    </div>*/}

            {/*    <div className="thisWeek">*/}
            {/*        <h1>This Week's Lesson</h1>*/}
            {/*    </div>*/}
            {/*    <div className="lesson">*/}
            {/*        <button onClick={clickViewLesson}>*/}
            {/*            <p>Due date</p>*/}
            {/*            <h1>lesson1</h1>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    <div className="incomplete">*/}
            {/*        <h1>Incomplete Lessons</h1>*/}
            {/*    </div>*/}
            {/*    <div className="lesson">*/}
            {/*        <button onClick={clickViewLesson}>*/}
            {/*            <p>Due date</p>*/}
            {/*            <h1>lesson2</h1>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    <div className="complete">*/}
            {/*        <h1>Completed Lessons</h1>*/}
            {/*    </div>*/}
            {/*    <div className="lesson">*/}
            {/*        <button onClick={clickViewLesson}>*/}
            {/*            <p>Due date</p>*/}
            {/*            <h1>lesson3</h1>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}



        </div>

        </body>
        </html>

    )
}

function clickViewLesson() {
    ReactDOM.render(<ViewLesson/>, document.getElementById('root'));
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

export default Lesson