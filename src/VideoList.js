import React from 'react';
import VideoListComponent from './VideoListComponent';

export default function VideoList({videos}) {
    return (
        videos.map(video => {
            return <VideoListComponent key={video.videoId} video = {video} />
        })
    )
}