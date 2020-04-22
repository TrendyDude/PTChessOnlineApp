import React from 'react';
import IndividualTeacherQuizListComponent from './IndividualTeacherQuizListComponent';

export default function IndividualTeacherQuizList({quizzes}) {
    return (
        quizzes.map(quiz => {
            return <IndividualTeacherQuizListComponent key={quiz.idQuiz} quiz = {quiz} />
        })
    )
}