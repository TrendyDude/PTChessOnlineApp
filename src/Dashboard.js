import React from 'react';
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


function Dashboard(){
        var dog  = User;
        return(
            <div>
                <title>Dashboard</title>

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

                            <div className="item1">
                                <div id="announcement_item">
                                    <p><strong>10/17/19</strong></p>
                                    <p>Hi class, remember to bring your pamphlet to class... </p>
                                </div>
                            </div>

                            <div className="item2">
                                <div id="announcement_item">
                                    <p><strong>10/15/19</strong></p>
                                    <p>Don't forget to do your homework! It's due by 11:59pm... </p>
                                </div>
                            </div>
                            <div className="item3">
                                <div id="announcement_item">
                                    <p><strong>10/11/19</strong></p>
                                    <p>I just want to say good job everyone in class today!... </p>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
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
export default Dashboard