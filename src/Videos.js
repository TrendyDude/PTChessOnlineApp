import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Videos.css';
import Dashboard from "./Dashboard";
import './Dashboard.css';
import {User, UserConstructor} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import AdminQuizzes from "./AdminQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import StudentQuizzes from "./StudentQuizzes";

import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import StudentVideoList from "./StudentVideoList";
import Announcements from "./Announcements";


var loadedVideos = false;

function Videos() {


    const [videos, setVideos] = useState([]);
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
                                LessonId: videoAttributes[4],
                                selected: false
                            }]
                        });


                    }
                }
            }
        });

    }

    if (videos.length == 0 && loadedVideos != true) {
        loadedVideos = true;
        getVideos();

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
            <title>Videos</title>

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
                    <h1>Videos</h1>
                </div>


                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <tbody>
                                <StudentVideoList videos={videos} />
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </body>
        </html>

    );
}



function clickDash() {
    loadedVideos = false;
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {
    loadedVideos = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickVideoTab() {
    loadedVideos = false;
    if (User.UserType.toString() === 'A')  {
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Videos/>, document.getElementById('root'));
    }

}

function gotoChessTactic() {
    loadedVideos = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickAnnouncementsTab() {
    loadedVideos = false;
    if (User.UserType == "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));

    }
    else if (User.UserType == "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }
}
function clickQuizzes() {
    loadedVideos = false;
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


export default Videos