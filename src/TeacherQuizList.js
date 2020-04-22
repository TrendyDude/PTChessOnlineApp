import React from 'react';
import TeacherQuizListComponent from './TeacherQuizListComponent';

export default function TeacherQuizList({quizzes}) {
    return (
        quizzes.map(quiz => {
            return <TeacherQuizListComponent key={quiz.idQuiz} quiz = {quiz} />
        })
    )
}