import React, { useState, useRef, useEffect }  from 'react';
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
import RecentAnnouncementsList from "./RecentAnnouncementsList";
import Announcements from "./Announcements";
import DashboardAnnouncementList from "./DashboardAnnouncementList";
import Lesson from "./Lesson";

var loadedAnnouncements = false;



function Dashboard(){
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

    return(
            <div>
                <title>Dashboard</title>

                <div className="sidenav">
                    <h3> Welcome {User.FirstName.toString()}</h3>

                    <a onClick={clickDash}>Dashboard</a>
                    <a onClick={clickAnnouncementsTab}>Announcements</a>
                    <a onClick={clickLessons}>Lessons</a>
                    <a onClick={clickQuizzes}>Quizzes</a>
                    <a onClick={clickVideoTab}>Videos</a>
                    <a onClick={clickTacticTab}>Tactics</a>
                </div>

                <div className="content">

                    <div className="title">
                        <h1>Dashboard</h1>
                    </div>

                    <div className="top_section">
                        <div className="this_weeks_lesson">
                            <p id="headers">THIS WEEK'S LESSON:</p>
                            <p id="pink_titles">Moving Pieces</p>
                            <img src="https://image.freepik.com/free-vector/cartoon-character-playing-chess-game_29937-4044.jpg"/>
                        </div>
                        <div className="tactic">
                            <p id="headers">DAILY TACTICS:</p>
                            <img src="https://image.freepik.com/free-vector/cartoon-character-playing-chess-game_29937-4049.jpg" onClick={gotoChessTactic}/>
                        </div>
                    </div>

                    <div className="bottom_section">

                        <div className="to_do">
                            <p id="dark_headers">To Do:</p>

                            <div id="notes_background">
                                <div id="notes_item">
                                    <div id="date">
                                        <p>October 15, 2019</p>
                                    </div>
                                    <h1>Monday</h1>
                                </div>

                                <div id="notes_item">
                                    <div id="grey_text">
                                        <p>Due: Tomorrow, 11:59pm</p>
                                    </div>
                                    <p><strong>Quiz 1: Checkmate</strong></p>
                                </div>

                                <div id="notes_item">
                                    <div id="grey_text">
                                        <p>Due: Wednesday, 2:00pm</p>
                                    </div>
                                    <p><strong>Watch Lesson 2: Checkmate</strong></p>
                                </div>
                            </div>


                        </div>

                        <div className="announcement">
                            <p id="dark_headers">New Announcements:</p>
                            <DashboardAnnouncementList announcements={announcements} />
                        </div>
                    </div>

                </div>

            </div>
        );
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
    loadedAnnouncements = false;
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

function clickLessons() {
    ReactDOM.render(<Lesson/>, document.getElementById('root'));
}
export default Dashboard