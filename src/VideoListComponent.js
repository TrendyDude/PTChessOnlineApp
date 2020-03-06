import React from 'react';
import AdminVideos from "./AdminVideos";

export default function VideoListComponent({video}) {
    return (
        <tr>
            <td>
                {video.videoName}
            </td>
            <td>
                {video.videoId}
            </td>
            <td>
                {video.videoFile}
            </td>
            <td>
                {video.videoUrl}
            </td>
            <td>
                <button className="btn btn-primary" onClick={AdminVideos.SelectedVideo = {video}}>Edit</button>
            </td>
        </tr>

    )
}