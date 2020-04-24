import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import './AdminQuizzes.css';

import TeacherQuizzes from "./TeacherQuizzes";
import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";
import './TeacherQuizAvg.css';
import './NewQuizAdmin.css';
import Lesson from "./Lesson";
import AdminLessons from "./AdminLessons";


function TeacherQuizAvg(){
    return(
        <div>
            <title>Teacher Quizzes</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>

                <a onClick={clickDash}>Dashboard</a>
                <a onClick={clickAnnouncementsTab}>Announcements</a>
                <a onClick={clickLessons}>Lessons</a>
                <a onClick={clickQuizzesTeacher}>Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a onClick={clickTacticTab}>Tactics</a>
            </div>

            <div className="content">
                <div className="title">
                    <h1>Lesson 1: Quiz (Teacher)</h1>
                </div>

                <div className="container">
                    <table>
                        <tr>
                            <th className="name">Name</th>
                            <th colSpan="2" className="grade">Grade</th>
                        </tr>
                        <tr>
                            <td>Bob</td>
                            <td>90</td>
                        </tr>
                        <tr>
                            <td>Anna</td>
                            <td>98</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>70</td>
                        </tr>
                        <tr>
                            <td>Lisa</td>
                            <td>86</td>
                        </tr>
                        <tr>
                            <td>Jerry</td>
                            <td>80</td>
                        </tr>
                    </table>
                </div>

                <div className="bottom">
                    <a onClick={clickQuizzesTeacher} className="cancel-button">Back</a>
                </div>

            </div>


        </div>
    );
}

function clickLessons() {
    if (User.UserType === "A") {
        ReactDOM.render(<AdminLessons/>, document.getElementById('root'));

    }
    else if (User.UserType === "S") {
        ReactDOM.render(<Lesson/>, document.getElementById('root'));
    }
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

function clickQuizzesTeacher() {
    ReactDOM.render(<TeacherQuizzes/>, document.getElementById('root'));
}

export default TeacherQuizAvg