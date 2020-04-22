import React from 'react';
import './StudentSingleQuiz.css'
export default function TeacherQuizListComponent({quiz}) {
    return (
        <a href="#" className="quiz-item-button">
            <span>{quiz.nameQuiz}</span>
            <span className="right-align">Class Average: {quiz.avgQuiz}</span>
        </a>
    )
}