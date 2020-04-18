import React from 'react';
import QuizListComponent from './QuizListComponent';

export default function quizList({quizzes}) {
    return (
        quizzes.map(quiz => {
            return <QuizListComponent key={quiz.QuizID} quiz = {quiz} />
        })
    )
}