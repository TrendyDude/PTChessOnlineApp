import React from 'react';

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
        </tr>

    )
}