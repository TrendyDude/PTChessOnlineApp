import React from 'react';
import './StudentSingleQuiz.css'
export default function QuestionsListComponent({question}) {

    return (
        <div className="container">
            <p id="dark_headers">{question.questionContents}</p>
            <div className="btn-group">
                <input type="radio" id="A" name={question.idQuestion} value="A"/>
                <label htmlFor="A"> A. {question.A} </label><br/>
                <input type="radio" id="B" name={question.idQuestion} value="B"/>
                <label htmlFor="B"> B. {question.B} </label><br/>
                <input type="radio" id="C" name={question.idQuestion} value="C"/>
                <label htmlFor="C"> C. {question.C} </label><br/>
                <input type="radio" id="D" name={question.idQuestion} value="D"/>
                <label htmlFor="D"> D. {question.D} </label><br/>
                <input type="radio" id="E" name={question.idQuestion} value="E"/>
                <label htmlFor="E"> E. {question.E} </label><br/>
            </div>
        </div>

    )

}