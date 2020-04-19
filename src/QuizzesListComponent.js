import React from 'react';

export default function QuizzesListComponent({quiz}) {
    return (

        <a href="#" className="quiz-item-button">
            <span>{quiz.nameQuiz}</span>
            <span className="right-align">Grade: {quiz.avgQuiz}</span>
        </a>

    )
}