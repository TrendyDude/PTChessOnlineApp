import React from 'react';

export default function LessonListComponent({lesson}) {
    return (
        <tr>
            <td>
                {lesson.LessonName}
            </td>
            <td>
                {lesson.Description}
            </td>
        </tr>
    )
}