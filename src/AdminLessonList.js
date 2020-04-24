import React from 'react';
import AdminLessonListComponent from './AdminLessonListComponent';

export default function AdminLessonList({lessons}) {
    return (
        lessons.map(lesson => {
            return <AdminLessonListComponent lesson = {lesson} />
        })
    )
}