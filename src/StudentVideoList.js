import React from 'react';
import StudentVideoListComponent from './StudentVideoListComponent';

export default function StudentVideoList({videos}) {
    return (
        videos.map(video => {
            return <StudentVideoListComponent key={video.videoId} video = {video} />
        })
    )
}