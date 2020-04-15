import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Videos.css';
import Dashboard from "./Dashboard";
import './Dashboard.css';
import {User, UserConstructor} from "./Login";
import StudentVideoList from "./StudentVideoList";

var loadedVideos = false;

function Videos() {


    const [videos, setVideos] = useState([]);
    function getVideos() {
        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlGetVideos',
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));
            } else {
                if(!(data.Payload.toString() === false.toString())){
                    console.log(data.Payload);
                    var videoObjects = data.Payload.split('|');
                    //data.Payload.split('|')[0].split(',')[0].split('\"')[1]
                    console.log(videoObjects);
                    for (var i = 0; i < videoObjects.length; i++) {
                        var videoAttributes = videoObjects[i].split(',');
                        if (i == 0) {
                            videoAttributes[0] = videoAttributes[0].split('\"')[1];
                        }
                        if (i == videoObjects.length - 1) {
                            videoAttributes[4] = videoAttributes[4].split('\"')[0];
                        }
                        console.log(videoAttributes);
                        setVideos(prevVideos => {
                            return [...prevVideos, {VideoId: videoAttributes[0],
                                videoFile: videoAttributes[1],
                                videoName: videoAttributes[2],
                                videoUrl: videoAttributes[3],
                                LessonId: videoAttributes[4],
                                selected: false
                            }]
                        });


                    }
                }
            }
        });

    }

    function getSelectedVideo() {
        var videoResult;
        for (var i = 0; i < videos.length; i++) {
            if (videos[i].selected) {
                videoResult = videos[i];
            }
        }
        return videoResult;
    }

    if (videos.length == 0 && loadedVideos != true) {
        loadedVideos = true;
        getVideos();

    }
    return (
        <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                  crossOrigin="anonymous" />


        </head>
        <body>
            <title>Videos</title>

            <div className="sidenav">
                <h3> Welcome {User.FirstName.toString()}</h3>
                <a onClick={clickDash}>Dashboard</a>
                <a href="#">Announcements</a>
                <a href="#">Lessons</a>
                <a href="#">Quizzes</a>
                <a onClick={clickVideoTab}>Videos</a>
                <a href="#">Tactics</a>
            </div>

            <div className="content">
                <div className="title">
                    <h1>Videos</h1>
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <video src={getSelectedVideo() == null ? null : getSelectedVideo().videoUrl}></video>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <table className="table">
                            <tbody>
                                <StudentVideoList videos={videos} />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/*<div id="top_video">*/}
                {/*    <div id="tab_nav">*/}
                {/*        <a href="#" className="active">RESUME WATCHING</a>*/}
                {/*        <a href="#">RECENTLY WATCHED</a>*/}
                {/*        <a href="#">FAVORITES</a>*/}
                {/*    </div>*/}

                {/*    <div id="vid_row">*/}
                {/*        <div id="vid_col">*/}
                {/*            <svg width="220" height="120">*/}
                {/*                <rect id="rect" width="220" height="120" rx="15" />*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div id="bottom_video">*/}
                {/*    <div id="tab_nav">*/}
                {/*        <a href="#" className="active">NEW VIDEOS</a>*/}
                {/*        <a href="#">ALL VIDEOS</a>*/}
                {/*    </div>*/}

                {/*    <div id="vid_row">*/}
                {/*        <div id="vid_col">*/}
                {/*            <svg width="220" height="120">*/}
                {/*                <rect id="rect" width="220" height="120" rx="15" />*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*        <div id="vid_col">*/}
                {/*            <svg width="220" height="120">*/}
                {/*                <rect id="rect" width="220" height="120" rx="15" />*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*        <div id="vid_col">*/}
                {/*            <svg width="220" height="120">*/}
                {/*                <rect id="rect" width="220" height="120" rx="15" />*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*        <div id="vid_col">*/}
                {/*            <svg width="220" height="120">*/}
                {/*                <rect id="rect" width="220" height="120" rx="15" />*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div id="vid_row">*/}
                {/*        <div id="vid_col">*/}
                {/*            <svg width="220" height="120">*/}
                {/*                <rect id="rect" width="220" height="120" rx="15" />*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*</div>*/}

            </div>
        </body>
        </html>

    );
}



function clickDash() {
    ReactDOM.render(<Dashboard/>, document.getElementById('root'));
}

function clickVideoTab() {
    ReactDOM.render(<Videos/>, document.getElementById('root'));
}


export default Videos