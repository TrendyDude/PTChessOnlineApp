import React from 'react';


export default function IndividualTeacherQuizListComponent({quiz}) {
    return (
        <a className="quiz-item-button">
            <span>{quiz.studentFirstName + " " + quiz.studentLastName}</span>
            <span className="right-align">{"Grade: " + quiz.avgQuiz}</span>
        </a>

    )

}
