import React from 'react';

export default function QuizListComponent({quiz}) {
    return (
        <tr>
            <td>
                {quiz.Name}
            </td>
            <td>
                {quiz.LessonID}
            </td>
            <td>
                <button className="btn btn-primary">Edit</button>
            </td>

        </tr>

    )
}