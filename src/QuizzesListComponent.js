import React from 'react';
import ReactDOM from 'react-dom';
import QuizElement from "./QuizElement";

export default function QuizzesListComponent({quiz}) {
    function handleQuiz() {
        ReactDOM.render(<QuizElement quiz = {quiz}/>, document.getElementById("root"));
    }
    return (

        <a onClick={handleQuiz} className="quiz-item-button">
            <span>{quiz.nameQuiz}</span>
            <span className="right-align">{quiz.submitted.toString() !== "0" ? "Grade: " + quiz.avgQuiz : "Not Completed"}</span>
        </a>

    )

}
