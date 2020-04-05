import React from 'react';

export default function LessonListComponent({lesson}) {
    return (
        <option>Lesson {lesson.LessonId}</option>
    )
}