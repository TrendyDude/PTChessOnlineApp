import React from 'react';
import AdminVideos from "./AdminVideos";

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

    }
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
            </tr>
            <tr id={video.VideoId + "edit"} hidden>
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
                                <div className="row">
                                    <div className="col-sm-8">
                                        <label>&nbsp;</label>
                                        <video></video>

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