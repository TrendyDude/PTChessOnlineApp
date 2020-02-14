import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Dashboard.css';
import App from "./App";
import './EditVideos.css';

function EditVideos() {
    return (
        <html lang="en">

        <head>
            <title>EditVideos</title>
        </head>

        <body>
        <div className="sidenav">
            <h3> Welcome </h3>
            <a href="#">Dashboard</a>
            <a href="#">Announcements</a>
            <a href="#">Lessons</a>
            <a href="#">Quizzes</a>
            <a href="#">Videos</a>
            <a href="#">Tactics</a>
        </div>

        <div className="content">

            <div className="title">
                <h1>EditVideos</h1>
            </div>
            <div className="text">
                <h1>Upload local files</h1>
            </div>
            <div className="Browse">
                <button>Browse</button>
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
                <button>Cancel</button>
            </div>
            <div className="save">
                <button>Save</button>
            </div>
        </div>



        </body>
        </html>
    );
}

export default EditVideos