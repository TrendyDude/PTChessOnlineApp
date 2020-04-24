import React, {useState, useRef} from 'react';
import ReactDOM from "react-dom";
import AdminLessons from "./AdminLessons";

export default function AdminLessonListComponent({lesson}) {
    function editClick() {
        //ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
        var edit = document.getElementById(lesson.LessonId + "edit");
        var notEdit = document.getElementById(lesson.LessonId  + "notEdit");
        edit.removeAttribute("hidden");
        notEdit.setAttribute("hidden", "hidden");

    }
    function saveClick() {
        //ReactDOM.render(<NewAnnouncement/>, document.getElementById('root'));
        var edit = document.getElementById(lesson.LessonId  + "edit");
        var notEdit = document.getElementById(lesson.LessonId  + "notEdit");
        notEdit.removeAttribute("hidden");
        edit.setAttribute("hidden", "hidden");

        const AWS = require('aws-sdk');
        const config = require('./config');
        AWS.config.region = "us-east-1";
        AWS.config.accessKeyId = config.accessKey;
        AWS.config.secretAccessKey = config.secretKey;
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'mysqlAddLesson',
            Payload: JSON.stringify({
                "lessonId": lesson.LessonId,
                "lessonName": lesson.LessonName,
                "description1": lesson.Description,


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
        ReactDOM.render(<AdminLessons/>, document.getElementById('root'));


    }
    function changeName() {
        lesson.LessonName = lessonNameRef.current.value;
    }
    function changeId() {
        lesson.LessonId = lessonIdRef.current.value;
    }
    function changeDescription() {
        lesson.Description = lessonDescriptionRef.current.value;
    }
    const lessonNameRef = useRef();
    const lessonIdRef = useRef();
    const lessonDescriptionRef = useRef();
    return (
        <>
            <tr id={lesson.LessonId + "notEdit"}>
                <td>
                    {lesson.LessonName}
                </td>
                <td>
                    {lesson.Description}
                </td>
                <td>
                    <button className="btn btn-primary" onClick={editClick}>Edit</button>
                </td>
            </tr>
            <tr id={lesson.LessonId + "edit"} hidden>
                <td colSpan="5">
                    <div className="card" >
                        <div className="card-header">Edit Lesson</div>
                        <div className="card-body">

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label>Lesson Id</label>
                                        <input className="form-control" type="text"
                                               onChange={changeId}
                                               ref={lessonIdRef} defaultValue={lesson.LessonId}/>
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Name</label>
                                        <input className="form-control" type="text"
                                               onChange={changeName}
                                               ref={lessonNameRef} defaultValue={lesson.LessonName}/>

                                    </div>
                                    <div className="col-sm-3">
                                        <label>Description</label>
                                        <input className="form-control" type="text"
                                               onChange={changeDescription}
                                               ref={lessonDescriptionRef} defaultValue={lesson.Description}/>

                                    </div>




                                    <div className="col-sm-3">
                                        <label>&nbsp;</label>
                                        <button className="btn btn-success" onClick={saveClick}>Save</button>

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