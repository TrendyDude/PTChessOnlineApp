import React, { useState, useRef } from 'react';
//import Knockout from 'knockout';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';
import App from "./App";
import './AdminVideos.css';
import VideoList from './VideoList';
import EditVideos from "./EditVideos";
import Dashboard from "./Dashboard";
import {User} from "./Login";
import uuidv4 from 'uuid/v4';













function AdminVideos() {
    // var AWS = require("aws-sdk");
    // AWS.config.update({
    //     region: "us-east-2",
    //
    //     endpoint: "https://dynamodb.us-east-2.amazonaws.com"
    // });
    //
    // var ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
    // var params = {
    //     TableName: "Users",
    //     Select: "ALL_ATTRIBUTES",
    // };
    // //Call DynamoDB to read the item from the table
    // ddb.scan(params, function(err, data) {
    //     if (err) {
    //         alert(JSON.stringify(err));
    //     } else {
    //         if (data.Items.length === 1){
    //
    //         }
    //         for(var i = 0; i < data.Count; i++) {
    //             //var video = Video(data.Items[1])
    //         }
    //     }
    // });
    const videoUrlRef = useRef();
    const videoNameRef = useRef();
    function VideoConstructor(videoId, videoFile, videoName, videoUrl) {
        this.VideoId = videoId;
        this.VideoFile = videoFile;
        this.VideoName = videoName;
        this.VideoUrl = videoUrl;
    }
    function handleAddVideo(e){
        const videoUrl = videoUrlRef.current.value
        const videoName = videoNameRef.current.value;
        if (videoUrl === '' || videoName === '') {
            alert("All Fields Required");
        }
        setVideos(prevVideos => {
            return [...prevVideos, { videoId: uuidv4(), videoName: videoName, videoFile: "FADF", videoUrl: videoUrl}]
        })
        videoUrlRef.current.value = null;
        videoNameRef.current.value = null;
        console.log(videoUrl);
    }

    var video1 = new VideoConstructor(12,"poop.jpg", "video1", "poop.com" );
    var video2 = new VideoConstructor(13,"dog.jpg", "video2", "dog.com" );

    var Videos = [Object];
    Videos.push(video1);
    Videos.push(video2);
    const [videos, setVideos] = useState([{videoId: 12, videoName: "video1", videoUrl: "poop.com", videoFile: "poop.jpg"}]);

     return (
         <>
             <html>
             <head>
                 <meta charSet="utf-8" />
                 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                       integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                       crossOrigin="anonymous" />

                 <title>AdminVideos</title>

             </head>
             <body>
             <div>

                 <body>

                 <div className="sidenav">
                     <h3> Welcome {User.FirstName.toString()}</h3>
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
                     {/*<div className="top">*/}
                     {/*    <div id="sort">*/}
                     {/*        <a href="#" className="active">ALL VIDEOS</a>*/}
                     {/*        <a href="#">A-Z</a>*/}
                     {/*        <a href="#">SORT BY DATE</a>*/}
                     {/*        <input type="file" id="theFile"/>*/}
                     {/*    </div>*/}
                     {/*    <div className="upload">*/}
                     {/*        <button onClick={() => performClick('theFile')}>Upload</button>*/}
                     {/*    </div>*/}
                     {/*</div>*/}




                     <div className="row">

                         <div className="card">
                             <div className="card-header">Add New Video</div>
                             <div className="card-body">

                                 <div className="form-group">
                                     <div className="row">
                                         <div className="col-sm-4">
                                             <label>Name</label>
                                             <input className="form-control" ref={videoNameRef} type="text" />
                                         </div>
                                         <div className="col-sm-4">
                                             <label>Url</label>
                                             <input className="form-control" ref={videoUrlRef} type="text" />

                                         </div>
                                         <div className="col-sm-4">

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
                                     <th>FileName</th>
                                     <th>Url</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 <VideoList videos = {videos}/>
                                 </tbody>
                             </table>

                         </div>
                     </div>











                     <div className="videos">

                         {/*<svg width="1000" height="60">*/}
                         {/*    <rect id="rect" width="1000" height="50" rx="15"/>*/}
                         {/*    <foreignObject className="textInRect" x="0" y="0" width="100" height="50">*/}
                         {/*        <button>Video 1</button>*/}
                         {/*    </foreignObject>*/}
                         {/*    <foreignObject className="uploadDate" x="300" y="15" width="200" height="50">*/}
                         {/*        <h1>Uploaded: 1/2/2019</h1>*/}
                         {/*    </foreignObject>*/}
                         {/*    <foreignObject className="edit" x="850" y="0" width="100" height="50">*/}
                         {/*        <button onClick={gotoEdit}>Edit</button>*/}
                         {/*    </foreignObject>*/}
                         {/*    <svg width="1000" height="60">*/}
                         {/*        <circle className="circ" r="10" cx="950" cy="25" fill="red"/>*/}
                         {/*        <foreignObject className="textInCirc" x="929" y="0" width="100" height="50">*/}
                         {/*            <button>X</button>*/}
                         {/*        </foreignObject>*/}
                         {/*    </svg>*/}
                         {/*</svg>*/}
                         {/*<svg width="1000" height="60">*/}
                         {/*    <rect id="rect" width="1000" height="50" rx="15"/>*/}
                         {/*    <foreignObject className="textInRect" x="0" y="0" width="100" height="50">*/}
                         {/*        <button>Video 1</button>*/}
                         {/*    </foreignObject>*/}
                         {/*    <foreignObject className="uploadDate" x="300" y="15" width="200" height="50">*/}
                         {/*        <h1>Uploaded: 1/2/2019</h1>*/}
                         {/*    </foreignObject>*/}
                         {/*    <foreignObject className="edit" x="850" y="0" width="100" height="50">*/}
                         {/*        <button onClick={gotoEdit}>Edit</button>*/}
                         {/*    </foreignObject>*/}
                         {/*    <svg width="1000" height="60">*/}
                         {/*        <circle className="circ" r="10" cx="950" cy="25" fill="red"/>*/}
                         {/*        <foreignObject className="textInCirc" x="929" y="0" width="100" height="50">*/}
                         {/*            <button>X</button>*/}
                         {/*        </foreignObject>*/}
                         {/*    </svg>*/}
                         {/*</svg>*/}
                     </div>
                 </div>
                 </body>

             </div>

             </body>
             </html>


         </>

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