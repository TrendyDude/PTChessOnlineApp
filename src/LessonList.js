import React from 'react';
import LessonListComponent from './LessonListComponent';

export default function LessonList({lessons}) {
    return (
        lessons.map(lesson => {
            return <LessonListComponent lesson = {lesson} />
        })
    )
}