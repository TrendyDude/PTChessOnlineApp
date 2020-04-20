import React, {useState, useRef} from 'react';
import LessonList from "./LessonList";
import {Lessons} from "./AdminVideos";

export default function StudentVideoListComponent({video}) {
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
    }


    return (

        <>
            <tr id={video.VideoId + "notEdit"}>
                <td>
                    {video.videoName}
                </td>
                <td>
                    <button className="btn btn-primary" onClick={editClick}>Watch</button>
                </td>
            </tr>
            <tr id={video.VideoId + "edit"} hidden>
                <td>
                    <iframe src={video.videoUrl}
                            width="600" height="400"
                            frameBorder='0'
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            title='video'
                    />
                </td>
                <td>
                    <button className="btn btn-dark" onClick={saveClick}>Done</button>
                </td>
            </tr>

        </>
    )
}