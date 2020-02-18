import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';
import App from "./App";
import './EditVideos.css';
import AdminVideos from "./AdminVideos";
import ChessTactic from "./ChessTactic";
import Dashboard from "./Dashboard";
import ReactFileReader from 'react-file-reader';

 var handleFile = (event) => {
     const content = event.target.result;
     console.log('file content',  content)
     alert(content);
     // You can set content in state and show it in render.
 };

 var handleChangeFile = (file) => {
     var fileData = new FileReader();
     fileData.onloadend = handleFile;
     fileData.readAsText(file);
};

function EditVideos() {
    return (
        <html lang="en">

        <head>
            <title>EditVideos</title>
        </head>

        <body>
        <div className="sidenav">
            <h3> Welcome </h3>
            <a onClick={clickDash}>DashBoard</a>
            <a href="#">Announcements</a>
            <a href="#">Lessons</a>
            <a href="#">Quizzes</a>
            <a onClick={clickVideoTab}>Videos</a>
            <a onClick={gotoChessTactic}>Tactics</a>
        </div>

        <div className="content">

            <div className="title">
                <h1>EditVideos</h1>
            </div>
            <div className="text">
                <h1>Upload local files</h1>
            </div>
            {/*<ReactFileReader handleFiles={this.handleFiles}>*/}
            {/*    <button className='btn'>Upload</button>*/}
            {/*</ReactFileReader>*/}
            <div className="Browse">
                < a href = "#" onClick ={performClick('theFile')} >Browse</a>
                    <input onChange={performClick('theFile')} type="file" id="theFile"/>
            </div>
            <div className="fileName">
                <p>Video 1</p>
                <h1>File size: 100mb</h1>
            </div>
            <div className="bottom">
                <div className="text">
                    <h1>URL Link Video</h1>
                </div>
                <p>Enter URL Below</p>
                <form>
                    <input id="URL" type="text" name="URL" placeholder="URL"/>
                </form>
            </div>
            <div className="cancel">
                <button onClick={clickVideoTab}>Cancel</button>
            </div>
            <div className="save">
                <button onClick={saveVideo}>Save</button>
            </div>
        </div>



        </body>
        </html>
    );
}


function saveVideo() {
    const fs = require('fs');
    const AWS = require('aws-sdk');

    AWS.config.update({
        accessKeyId: "AKIAYDF6HFIDYV7BBWUA",
        secretAccessKey: "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"
    });


    var s3 = new AWS.S3();
    const path = require('path');

    //const fileContent = fs.readFile(document.getElementById('theFile'));



    const params = {
        Bucket: 'Videos',
        Key: "video1", // File name you want to save as in S3
        Body: document.getElementById('theFile')
    };
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}




function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickVideoTab() {
    ReactDOM.render(<AdminVideos/>, document.getElementById('root'));
}

function gotoChessTactic() {
    ReactDOM.render(<ChessTactic/>, document.getElementById('root'));
}

function performClick(elemId) {
    var elem = document.getElementById(elemId);
    if(elem && document.createEvent) {
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, false);
    elem.dispatchEvent(evt);
    }
}

export default EditVideos