import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';
import App from "./App";
import './AdminVideos.css';
import EditVideos from "./EditVideos";
import Dashboard from "./Dashboard";
import {FirstName} from "./Login";


function AdminVideos() {
     return (

         <div lang="en">

             <title>AdminVideos</title>
             <div className="sidenav">
                 <h3> Welcome {FirstName}</h3>
                 <a onClick={gotoDashboard}>Dashboard</a>
                 <a href="#">Announcements</a>
                 <a href="#">Lessons</a>
                 <a href="#">Quizzes</a>
                 <a href="#">Videos</a>
                 <a href="#">Tactics</a>
             </div>

             <div className="content">

                 <div className="title">
                     <h1>AdminVideos</h1>
                 </div>
                 <div className="top">
                     <div id="sort">
                         <a href="#" className="active">ALL VIDEOS</a>
                         <a href="#">A-Z</a>
                         <a href="#">SORT BY DATE</a>
                        <input type="file" id="theFile"/>
                     </div>
                     <div className="upload">
                         <button onClick={() => performClick('theFile')}>Upload</button>
                     </div>
                 </div>
                 <div className="videos">
                     <svg width="1000" height="60">
                         <rect id="rect" width="1000" height="50" rx="15"/>
                         <foreignObject className="textInRect" x="0" y="0" width="100" height="50">
                             <button>Video 1</button>
                         </foreignObject>
                         <foreignObject className="uploadDate" x="300" y="15" width="200" height="50">
                             <h1>Uploaded: 1/2/2019</h1>
                         </foreignObject>
                         <foreignObject className="edit" x="850" y="0" width="100" height="50">
                             <button onClick={gotoEdit}>Edit</button>
                         </foreignObject>
                         <svg width="1000" height="60">
                             <circle className="circ" r="10" cx="950" cy="25" fill="red"/>
                             <foreignObject className="textInCirc" x="929" y="0" width="100" height="50">
                                 <button>X</button>
                             </foreignObject>
                         </svg>
                     </svg>
                     <svg width="1000" height="60">
                         <rect id="rect" width="1000" height="50" rx="15"/>
                         <foreignObject className="textInRect" x="0" y="0" width="100" height="50">
                             <button>Video 1</button>
                         </foreignObject>
                         <foreignObject className="uploadDate" x="300" y="15" width="200" height="50">
                             <h1>Uploaded: 1/2/2019</h1>
                         </foreignObject>
                         <foreignObject className="edit" x="850" y="0" width="100" height="50">
                             <button onClick={gotoEdit}>Edit</button>
                         </foreignObject>
                         <svg width="1000" height="60">
                             <circle className="circ" r="10" cx="950" cy="25" fill="red"/>
                             <foreignObject className="textInCirc" x="929" y="0" width="100" height="50">
                                 <button>X</button>
                             </foreignObject>
                         </svg>
                     </svg>
                 </div>
             </div>
         </div>
     );
}
function gotoEdit() {
    ReactDOM.render(<EditVideos/>, document.getElementById('root'));
}
function saveVideo() {

    const fs = require('fs');
    const AWS = require('aws-sdk');

    AWS.config.update({
    });


    var s3 = new AWS.S3();
    const path = require('path');
    const fileContent = fs.readFile(path.parse(document.getElementById('theFile').value));



    const params = {
        Bucket: 'Videos',
        Key: document.getElementById('theFile'), // File name you want to save as in S3
        Body: fileContent
    };
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}


function gotoDashboard() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function performClick(elemId) {
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, false);
    var elem = document.getElementById(elemId);
    alert(elem.value);
    saveVideo();

}

export default AdminVideos