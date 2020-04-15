import React, {useState, useRef} from 'react';

export default function StudentVideoListComponent({video}) {


    return (

        <>
            <tr>
                <td>
                    {video.videoName}
                </td>
                <td>
                    <button className="btn btn-primary" onClick={video.selected = true}>Watch</button>
                </td>
            </tr>
        </>
    )
}