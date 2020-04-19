import React, { useState, useRef, useEffect } from 'react';
//import Knockout from './bower_components/knockout';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';
import App from "./App";
import './AdminVideos.css';
import VideoList from './VideoList';

import Dashboard from "./Dashboard";
import {User, UserConstructor} from "./Login";
import uuidv4 from 'uuid/v4';
import LessonList from './LessonList';
import ChessTactic from "./ChessTactic";
import Videos from "./Videos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import Announcements from "./Announcements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
export let Lessons;


Lessons = [];

// export function VideoConstructor(videoId, videoFile, videoName, videoUrl, lessonId) {
//     this.VideoId = videoId;
//     this.VideoFile = videoFile;
//     this.VideoName = videoName;
//     this.VideoUrl = videoUrl;
//     this.LessonId = lessonId;
// }
var loadedVideos = false;
var loadedLessons = false;

function AdminVideos() {


    const videoUrlRef = useRef();
    const videoNameRef = useRef();
    const videoLessonRef = useRef();

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
    if (lessons.length == 0 && loadedLessons != true) {
        loadedLessons = true;
        getLessons();


    }
    function handleAddVideo(e){
        const videoUrl = videoUrlRef.current.value
        const videoName = videoNameRef.current.value;
        const lessonId = videoLessonRef.current.value.split(' ')[1];
        const id = uuidv4();
        const vidfile = "NewFile"

        if (videoUrl === '' || videoName === '') {
            alert("All Fields Required");
        }
        setVideos(prevVideos => {

            return [...prevVideos, { VideoId: id, videoFile: vidfile, videoName: videoName,  videoUrl: videoUrl, LessonId: lessonId}]
        })
        //lessonId.current.value = null;
        videoUrlRef.current.value = null;
        videoNameRef.current.value = null;
        console.log(videoUrl);


        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlAddVideo',
            Payload: JSON.stringify({
                "videoId": id,
                "videoFile": vidfile,
                "videoName": videoName,
                "videoUrl": videoUrl,
                "lessons_LessonId": lessonId,

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
    const [videos, setVideos] = useState([]);
    if (videos.length == 0 && loadedVideos != true) {
        loadedVideos = true;
        getVideos();

    }
    function getVideos() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetVideos',
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                if(!(data.Payload.toString() === false.toString())){
                    console.log(data.Payload);
                    var videoObjects = data.Payload.split('|');
                    //data.Payload.split('|')[0].split(',')[0].split('\"')[1]
                    console.log(videoObjects);
                    for (var i = 0; i < videoObjects.length; i++) {
                        var videoAttributes = videoObjects[i].split(',');
                        if (i == 0) {
                            videoAttributes[0] = videoAttributes[0].split('\"')[1];
                        }
                        if (i == videoObjects.length - 1) {
                            videoAttributes[4] = videoAttributes[4].split('\"')[0];
                        }
                        console.log(videoAttributes);
                        setVideos(prevVideos => {
                            return [...prevVideos, {VideoId: videoAttributes[0],
                                videoFile: videoAttributes[1],
                                videoName: videoAttributes[2],
                                videoUrl: videoAttributes[3],
                                LessonId: videoAttributes[4]}]
                        });


                    }
                }
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

                 <title>Admin Videos</title>

             </head>
             <body>
             <div>

                 <body>

                 <div className="sidenav">
                     <h3> Welcome {User.FirstName.toString()}</h3>

                     <a onClick={gotoDashboard}>Dashboard</a>
                     <a onClick={clickAnnouncementsTab}>Announcements</a>
                     <a href="#">Lessons</a>
                     <a onClick={clickQuizzes}>Quizzes</a>
                     <a onClick={clickVideoTab}>Videos</a>
                     <a onClick={clickTacticTab}>Tactics</a>
                 </div>

                 <div className="content">

                     <div className="title">
                         <h1>AdminVideos</h1>
                     </div>




                     <div className="row">

                         <div className="card">
                             <div className="card-header">Add New Video</div>
                             <div className="card-body">

                                 <div className="form-group">
                                     <div className="row">
                                         <div className="col-sm-3">
                                             <label>Name</label>
                                             <input className="form-control" ref={videoNameRef} type="text" />
                                         </div>
                                         <div className="col-sm-3">
                                             <label>Url</label>
                                             <input className="form-control" ref={videoUrlRef} type="text" />

                                         </div>
                                         <div className="col-sm-3">
                                             <div className="row">
                                                 <label>Lesson</label>
                                             </div>
                                             <div className="row">
                                                 <select id="mySelect" ref={videoLessonRef}>
                                                     <LessonList lessons = {lessons} />
                                                 </select>
                                             </div>

                                         </div>
                                         <div className="col-sm-3">

                                             <button className="btn btn-primary" onClick={handleAddVideo}>Add Video</button>

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
                                 <thead className="thead-dark">
                                 <tr>
                                     <th>Video Name</th>
                                     <th>Upload Date</th>
                                     <th>Lesson</th>
                                     <th>Url</th>
                                     <th></th>
                                     <th></th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 <VideoList videos = {videos}/>
                                 </tbody>
                             </table>

                         </div>
                     </div>

                     <div className="modal" tabIndex="-1" role="dialog" id="EditVideoModal">
                         <div className="modal-dialog" role="document">
                             <div className="modal-content">
                                 <div className="modal-header">
                                     <h5 className="modal-title">Modal title</h5>
                                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                         <span aria-hidden="true">&times;</span>
                                     </button>
                                 </div>
                                 <div className="modal-body">
                                     <div className="form-group">
                                         <div className="row">
                                             <div className="col-sm-4">
                                                 <label>Name</label>
                                                 <input className="form-control" type="text" />
                                             </div>
                                             <div className="col-sm-4">
                                                 <label>Url</label>
                                                 <input className="form-control" type="text" />

                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="modal-footer">
                                     <button type="button" className="btn btn-primary">Save changes</button>
                                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                     </button>
                                 </div>
                             </div>
                         </div>
                     </div>











                     <div className="videos">


                     </div>
                 </div>
                 </body>

             </div>

             </body>
             </html>


         </>

     );
}



function gotoDashboard() {
    loadedVideos = false;
    loadedLessons = false;
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {
    loadedVideos = false;
    loadedLessons = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickVideoTab() {
    loadedVideos = false;
    loadedLessons = false;
    if (User.UserType.toString() === 'A')  {
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Videos/>, document.getElementById('root'));
    }

}

function clickAnnouncementsTab() {

    loadedVideos = false;
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
    loadedVideos = false;
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

export default AdminVideos