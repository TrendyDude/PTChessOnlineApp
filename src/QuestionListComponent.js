import React from 'react';

export default function QuestionListComponent({Question}) {
    return (
        <tr>
            <td>
                {Question.QuestionNum}
            </td>
            <td>
                {Question.Question}
            </td>
            <td>
                {Question.CorrectAnswer}
            </td>
            <td>
                <button className="btn btn-primary">Edit</button>
            </td>

        </tr>

    )
}