import React from 'react';
import LessonTableListComponent from './LessonTableListComponent';

export default function LessonList({lessons}) {
    return (
        lessons.map(lesson => {
            return <LessonTableListComponent lesson = {lesson} />
        })
    )
}