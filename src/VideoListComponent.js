import React from 'react';
import AdminVideos from "./AdminVideos";

export default function VideoListComponent({video}) {
    function editClick() {
        //ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
        var edit = document.getElementById(video.videoId + "edit");
        var notEdit = document.getElementById(video.videoId + "notEdit");
        edit.removeAttribute("hidden");
        notEdit.setAttribute("hidden", "hidden");

    }
    function saveClick() {
        //ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
        var edit = document.getElementById(video.videoId + "edit");
        var notEdit = document.getElementById(video.videoId + "notEdit");
        notEdit.removeAttribute("hidden");
        edit.setAttribute("hidden", "hidden");

    }

    return (

        <>
            <tr id={video.videoId + "notEdit"}>
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
                    <button className="btn btn-primary" onClick={editClick}>Edit</button>
                </td>
            </tr>
            <tr id={video.videoId + "edit"} hidden>
                <td colSpan="3">
                    <div className="card" >
                        <div className="card-header">Edit Video</div>
                        <div className="card-body">

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label>Name</label>
                                        <input className="form-control" type="text" value={video.videoName}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Url</label>
                                        <input className="form-control" type="text" value={video.videoUrl}/>

                                    </div>
                                    <div className="col-sm-4">
                                        <label>&nbsp;</label>
                                        <button className="btn btn-primary" onClick={saveClick}>Save Video</button>

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