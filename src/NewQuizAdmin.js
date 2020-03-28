import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Videos from "./Videos";
import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import AdminQuizzes from "./AdminQuizzes";
import './NewQuizAdmin.css';



import {User} from "./Login";
import TeacherAnnouncements from "./TeacherAnnouncements";



function NewQuizAdmin(){
    return(
        <div>
            <title>Admin Quizzes</title>

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
                <div className="title">
                    <h1>New Quiz</h1>
                </div>

                <p className="extra-top-space">Which lesson is this quiz a part of?</p>
                <div className="container">
                    <select class="select-css">
                        <option>Select your lesson from below</option>
                        <option>Lesson 6</option>
                        <option>Lesson 7</option>
                        <option>Lesson 8</option>
                    </select>
                </div>

                <div className="container">
                    <a onClick={openModal} className="add-question-button">Add Question</a>
                </div>

                <div className="container">
                    <a className="question-item-button">Question 1: What is the difference between a rook and a pawn?</a>
                    <a className="question-item-button">Question 2: What is a fork?</a>
                </div>

                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span onClick={closeModal} className="close">&times;</span>

                        <div className="container-modal-title">
                            <strong>New Question</strong>
                        </div>

                        <div className="container-modal">
                            <form>
                                <label>
                                    <p id="pink_titles">
                                        What is the question?
                                    </p>
                                    <input type="text" className="question" name="myQuestion"/>

                                    <p id="pink_titles">Type your answer choices (mark the correct answer):</p>
                                    <span className="container-same-line">
                                        <input type="radio" id="answer-a" name="choices"/>
                                        <label className="align-right">A</label>
                                        <input type="text" className="answer"/>

                                    </span>
                                    <span className="container-same-line">
                                        <input type="radio" id="answer-b" name="choices"/>
                                        <label className="align-right">B</label>
                                        <input type="text" className="answer"/>
                                    </span>
                                    <span className="container-same-line">
                                        <input type="radio" id="answer-c" name="choices"/>
                                        <label className="align-right">C</label>
                                        <input type="text" className="answer"/>
                                    </span>
                                    <span className="container-same-line">
                                        <input type="radio" id="answer-d" name="choices"/>
                                        <label className="align-right">D</label>
                                        <input type="text" className="answer"/>
                                    </span>
                                    <div className="container-same-line">
                                        <a onClick={closeModal} className="done-button">Done</a>
                                    </div>



                                </label>
                            </form>
                        </div>

                    </div>

                </div>

                <div className="bottom">
                    <a href="#" className="save-button">Save</a>
                    <a href="#" className="cancel-button">Cancel</a>
                </div>
            </div>




        </div>
    );
}



// When the user clicks the button, open the modal
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
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

function clickQuizzesAdmin() {
    ReactDOM.render(<AdminQuizzes/>, document.getElementById('root'));
}

export default NewQuizAdmin