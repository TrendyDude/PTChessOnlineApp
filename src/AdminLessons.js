import React, { useState, useRef, useEffect } from 'react';

import ReactDOM from 'react-dom';

import './App.css';
import './Dashboard.css';


import AdminVideos from "./AdminVideos";

import Dashboard from "./Dashboard";
import {User, UserConstructor} from "./Login";

import ChessTactic from "./ChessTactic";
import Videos from "./Videos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import Announcements from "./Announcements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import Lesson from "./Lesson";
import AdminLessonList from "./AdminLessonList";


var loadedLessons = false;

function AdminLessons() {


    const lessonNameRef = useRef();
    const lessonDescriptionRef = useRef();
    const idRef = useRef();

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


                    }

                }
            }
        });
    }

    const [lessons, setLessons] = useState([]);
    if (lessons.length == 0 && loadedLessons != true) {
        loadedLessons = true;
        getLessons();


    }
    function handleAddLesson(e){
        const lessonName = lessonNameRef.current.value
        const lessonDescription = lessonDescriptionRef.current.value;
        const lessonId = idRef.current.value;




        setLessons(prevVideos => {

            return [...prevVideos, { LessonId: idRef, LessonName: lessonName, Description: lessonDescription}]
        })
        //lessonId.current.value = null;
        lessonNameRef.current.value = null;
        lessonDescriptionRef.current.value = null;
        idRef.current.value = null;


        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlAddLesson',
            Payload: JSON.stringify({
                "lessonId": lessonId,
                "lessonName": lessonName,
                "description1": lessonDescription,

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

    return (
        <>
            <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous" />

                <title>Admin Lessons</title>

            </head>
            <body>
            <div>

                <body>

                <div className="sidenav">
                    <h3> Welcome {User.FirstName.toString()}</h3>

                    <a onClick={gotoDashboard}>Dashboard</a>
                    <a onClick={clickAnnouncementsTab}>Announcements</a>
                    <a onClick={clickLessons}>Lessons</a>
                    <a onClick={clickQuizzes}>Quizzes</a>
                    <a onClick={clickVideoTab}>Videos</a>
                    <a onClick={clickTacticTab}>Tactics</a>
                </div>

                <div className="content">

                    <div className="title">
                        <h1>Admin Lessons</h1>
                    </div>




                    <div className="row">

                        <div className="card">
                            <div className="card-header">Add New Lesson</div>
                            <div className="card-body">

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <label>Id</label>
                                            <input className="form-control" ref={idRef} type="text" />
                                        </div>
                                        <div className="col-sm-3">
                                            <label>Name</label>
                                            <input className="form-control" ref={lessonNameRef} type="text" />
                                        </div>
                                        <div className="col-sm-3">
                                            <label>Description</label>
                                            <input className="form-control" ref={lessonDescriptionRef} type="text" />

                                        </div>
                                        <div className="col-sm-3">

                                            <button className="btn btn-primary" onClick={handleAddLesson}>Add Lesson</button>

                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>

                    </div>

                    <div className="row">&nbsp;</div>
                    <div className="row">
                        <div className="col-sm-8">
                            <table className="table table-striped table-sm">
                                <thead>
                                <tr>
                                    <th>Lesson Name</th>
                                    <th>Description</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <AdminLessonList lessons = {lessons}/>
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
                </body>

            </div>

            </body>
            </html>


        </>

    );
}

function clickLessons() {

    loadedLessons = false;
    if (User.UserType === "A") {
        ReactDOM.render(<AdminLessons/>, document.getElementById('root'));

    }
    else if (User.UserType === "S") {
        ReactDOM.render(<Lesson/>, document.getElementById('root'));
    }
}

function gotoDashboard() {

    loadedLessons = false;
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {

    loadedLessons = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickVideoTab() {

    loadedLessons = false;
    if (User.UserType.toString() === 'A')  {
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Videos/>, document.getElementById('root'));
    }

}

function clickAnnouncementsTab() {


    loadedLessons = false;
    if (User.UserType === "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));
    } else if (User.UserType === "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }
    else {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));

    }
}

function clickQuizzes() {

    loadedLessons = false;
    if (User.UserType === "A") {
        ReactDOM.render(<AdminQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType == "S") {
        ReactDOM.render(<StudentQuizzes/>, document.getElementById('root'));

    }
    else if (User.UserType == "T") {
        ReactDOM.render(<TeacherQuizzes/>, document.getElementById('root'));

    }
}

export default AdminLessons