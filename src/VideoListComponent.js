import React, {useState, useRef} from 'react';
import AdminVideos from "./AdminVideos";
import {Lessons} from "./AdminVideos";
import ReactDOM from "react-dom";
import LessonList from './LessonList';

export default function VideoListComponent({video}) {
    function editClick() {
        //ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
        var edit = document.getElementById(video.VideoId + "edit");
        var notEdit = document.getElementById(video.VideoId + "notEdit");
        edit.removeAttribute("hidden");
        notEdit.setAttribute("hidden", "hidden");

    }
    function saveClick() {
        //ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
        var edit = document.getElementById(video.VideoId + "edit");
        var notEdit = document.getElementById(video.VideoId + "notEdit");
        notEdit.removeAttribute("hidden");
        edit.setAttribute("hidden", "hidden");

        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlAddVideo',
            Payload: JSON.stringify({
                "videoId": video.VideoId,
                "videoFile": video.videoFile,
                "videoName": video.videoName,
                "videoUrl": video.videoUrl,
                "lessons_LessonId": video.LessonId,

            })
        };
        lambda.invoke(params, function (err, data) {
            if(err) {
                console.log(err);
                alert(JSON.stringify(err));

            } else {
                console.log("DOG Edited");
            }
        });
        ReactDOM.render(<AdminVideos/>, document.getElementById('root'));

    }
    function changeName() {
        video.videoName = videoNameRef.current.value;
    }
    function changeUrl() {
        video.videoUrl = videoUrlRef.current.value;
    }
    function changeLesson() {
        video.lessons_LessonId = videoLessonRef.current.value;
    }
    const videoNameRef = useRef();
    const videoUrlRef = useRef();
    const videoLessonRef = useRef();
    const today = new Date();
    return (

        <>
            <tr id={video.VideoId + "notEdit"}>
                <td>
                    {video.videoName}
                </td>
                <td>
                    {(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()}
                </td>
                <td>
                    {video.LessonId}
                </td>
                <td>
                    {video.videoUrl}
                </td>
                <td>
                    <button className="btn btn-primary" onClick={editClick}>Edit</button>
                </td>
                <td>
                    <button className="btn btn-dark" onClick={editClick}>Delete</button>
                </td>
            </tr>
            <tr id={video.VideoId + "edit"} hidden>
                <td colSpan="5">
                    <div className="card" >
                        <div className="card-header">Edit Video</div>
                        <div className="card-body">

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label>Name</label>
                                        <input className="form-control" type="text"
                                               onChange={changeName}
                                               ref={videoNameRef} defaultValue={video.videoName}/>
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Url</label>
                                        <input className="form-control" type="text"
                                               onChange={changeUrl}
                                               ref={videoUrlRef} defaultValue={video.videoUrl}/>

                                    </div>

                                    <div className="col-sm-3">
                                        <div className="row">
                                            <label>Lesson</label>
                                        </div>
                                        <div className="row">
                                            <select id="mySelect" ref={videoLessonRef}>
                                                <LessonList lessons = {Lessons} />
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <label>&nbsp;</label>
                                        <button className="btn btn-success" onClick={saveClick}>Save</button>

                                    </div>


                                </div>
                                <div className="row">&nbsp;</div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <label>&nbsp;</label>
                                        <iframe src={video.videoUrl}
                                                width="200" height="100"
                                                frameBorder='0'
                                                allow='autoplay; encrypted-media'
                                                allowFullScreen
                                                title='video'
                                        />



                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>

                </td>
            </tr>


        </>



    )


}