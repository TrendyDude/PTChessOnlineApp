import React from 'react';
import ReactDOM from 'react-dom';
import IndividualTeacherQuiz from "./IndividualTeacherQuiz";

export default function QuizzesListComponent({quiz}) {
    function handleQuiz() {
        ReactDOM.render(<IndividualTeacherQuiz quiz = {quiz}/>, document.getElementById("root"));
    }
    return (

        <a onClick={handleQuiz} className="quiz-item-button">
            <span>{quiz.nameQuiz}</span>
            <span className="right-align">{"Grade: " + quiz.avgQuiz}</span>
        </a>

    )

}