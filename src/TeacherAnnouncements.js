import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Dashboard.css';
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import './Announcements.css';
import ChessTactic from "./ChessTactic";
import AdminVideos from "./AdminVideos";
import NewAnnouncement from "./NewAnnouncement";
import uuidv4 from 'uuid/v4';
import AnnouncementList from "./AnnouncementList";


function TeacherAnnouncements() {

    const descriptionRef = useRef();

    const [announcements, setAnnouncements] = useState([{idAnnouncement: uuidv4(), PostDate: "12/12/2012", Description: "Be Sure to do homework"}]);

    function handleAddAnnouncement(e){
        const description = descriptionRef.current.value

        if (description === '') {
            alert("All Fields Required");
        }
        setAnnouncements(prevAnnouncements => {
            return [...prevAnnouncements, { idAnnouncement: uuidv4(), PostDate: "CurrentTime", Description: description}]
        })
        descriptionRef.current.value = null;

    }

    return (
        <>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                      crossOrigin="anonymous" />
                <title>TeacherAnnouncements</title>

            </head>
            <body>
            <div>

                <div className="sidenav">
                    <h3> Welcome {this.state.FirstName.toString()}</h3>
                    <a onClick={clickDash}>Dashboard</a>
                    <a href="#">Announcements</a>
                    <a href="#">Lessons</a>
                    <a href="#">Quizzes</a>
                    <a onClick={clickVideoTab}>Videos</a>
                    <a href="#">Tactics</a>
                </div>
                <div className="content">
                    <div className="title">
                        <h1>TeacherAnnouncements</h1>
                    </div>
                    <div className="announcement1">
                        <svg width="1000" height="80">
                            <rect id="rect1" width="1000" height="70" rx="15"/>
                            <foreignObject className="newAnnouncements" x="5" y="12" width="1000" height="50">
                                <button onClick={createAnnouncement}>Create New Announcements</button>
                            </foreignObject>
                        </svg>
                    </div>

                    <div id="myDIV">
                        <div className="card">
                            <div className="card-header">Add New Announcement</div>
                            <div className="card-body">

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label>Announcement Content:</label>
                                            <textarea className="form-control" ref={descriptionRef} type="text" />
                                        </div>
                                        <div className="col-sm-4">

                                            <button className="btn btn-primary" onClick={handleAddAnnouncement}>Add Announcement</button>

                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-sm-8">
                            <table className="table table-striped table-sm">
                                <thead>

                                    <th>Date</th>
                                    <th>Announcement Content</th>

                                </thead>
                                <tbody>
                                    <AnnouncementList announcements = {announcements}/>
                                </tbody>
                            </table>

                        </div>
                    </div>

                    {/*<div className="announcement1">*/}
                    {/*    <h1>Past Announcements</h1>*/}
                    {/*    <svg width="1000" height="80">*/}
                    {/*        <rect id="rect" width="1000" height="70" rx="15"/>*/}
                    {/*        <foreignObject className="textInRect" x="5" y="12" width="1000" height="50">*/}
                    {/*            <button>Announcement 2</button>*/}
                    {/*        </foreignObject>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                </div>


            </div>

            </body>
        </>
    )
}

function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickTacticTab() {
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function clickVideoTab() {
    if (this.state.UserType.toString() === 'A')  {
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
function createAnnouncement() {
    //ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


export default TeacherAnnouncements