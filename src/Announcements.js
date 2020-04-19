import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import {User} from "./Login";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import './Announcements.css'
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";
import TeacherAnnouncements from "./TeacherAnnouncements";
import AdminQuizzes from "./AdminQuizzes";
import StudentQuizzes from "./StudentQuizzes";
import TeacherQuizzes from "./TeacherQuizzes";
import StudentAnnouncementList from "./StudentAnnouncementList";

var loadedAnnouncements = false;

function Announcements() {
    var user = User;
    function getAnnouncements() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetAnnouncements',
            Payload: JSON.stringify({
                "groupId": User.groupId
            })
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                if(!(data.Payload.toString() === false.toString())){
                    console.log(data.Payload);
                    var annoucementObjects = data.Payload.split('|');
                    //data.Payload.split('|')[0].split(',')[0].split('\"')[1]
                    console.log(annoucementObjects);
                    for (var i = 0; i < annoucementObjects.length; i++) {
                        var announcementAttributes = annoucementObjects[i].split(',');
                        if (i == 0) {
                            announcementAttributes[0] = announcementAttributes[0].split('\"')[1];
                        }
                        if (i == annoucementObjects.length - 1) {
                            announcementAttributes[4] = announcementAttributes[4].split('\"')[0];
                        }
                        console.log(announcementAttributes);
                        if (announcementAttributes[3] == user.GroupId) {
                            setAnnouncements(prevAnnouncements => {
                                return [...prevAnnouncements, {idAnnouncement: announcementAttributes[0],
                                    PostDate: announcementAttributes[1],
                                    Description: announcementAttributes[2]}]
                            });
                        }

                    }
                }
            }
        });

    }
    const [announcements, setAnnouncements] = useState([]);
    if (announcements.length == 0 && loadedAnnouncements != true) {
        loadedAnnouncements = true;
        getAnnouncements();
    }
    return (
        <div>
            <title>Announcements</title>

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
                    <h1>Announcements</h1>
                </div>
                <div className="row">
                    <div className="col-sm-9">
                        <table>
                            <tbody>
                                <StudentAnnouncementList announcements={announcements} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}

function clickDash() {
    loadedAnnouncements = false;
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {
    loadedAnnouncements = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickVideoTab() {
    loadedAnnouncements = false;
    if (User.UserType.toString() === 'A')  {
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
    } else {
        ReactDOM.render(<Videos/>, document.getElementById('root'));
    }

}

function gotoChessTactic() {
    loadedAnnouncements = false;
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickAnnouncementsTab() {
    loadedAnnouncements = false;
    if (User.UserType == "T") {
        ReactDOM.render(<TeacherAnnouncements/>, document.getElementById('root'));

    }
    else if (User.UserType == "S") {
        ReactDOM.render(<Announcements/>, document.getElementById('root'));
    }
}

function clickQuizzes() {
    loadedAnnouncements = false;
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


export default Announcements