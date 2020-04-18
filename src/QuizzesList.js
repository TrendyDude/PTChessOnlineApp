import React from 'react';
import QuizzesListComponent from './QuizzesListComponent';

export default function QuizzesList({quizzes}) {
    return (
        quizzes.map(quiz => {
            return <QuizzesListComponent key={quiz.idQuiz} quiz = {quiz} />
        })
    )
}