import React from 'react';
import ReactDOM from "react-dom";
import ViewLesson from "./ViewLesson";

export default function LessonListComponent({lesson}) {
    function viewLesson() {
        ReactDOM.render(<ViewLesson lesson={lesson}/>, document.getElementById('root'));

    }
    return (
        <tr>
            <td>
                {lesson.LessonName}
            </td>
            <td>
                {lesson.Description}
            </td>
            <td>
                <button className="btn btn-success" onClick={viewLesson}>Complete</button>
            </td>
        </tr>
    )
}