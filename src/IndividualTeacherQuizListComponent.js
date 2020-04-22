import React from 'react';


export default function IndividualTeacherQuizListComponent({quiz}) {
    return (
        <a className="quiz-item-button">
            <span>{quiz.studentFirstName + " " + quiz.studentLastName}</span>
            <span className="right-align">{quiz.submitted === "0" ? "Not Submitted" : "Grade: " + quiz.avgQuiz}</span>
        </a>

    )

}
