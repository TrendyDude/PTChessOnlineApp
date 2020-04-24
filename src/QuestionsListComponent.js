import React from 'react';
import './StudentSingleQuiz.css'
export default function QuestionsListComponent({question}) {

    return (

        <div className="row">
            <div className="col-sm-8">

                    <p id="dark_headers">{question.questionContents}</p>
                    <div className="btn-group">
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="radio" id="A" name={question.idQuestion} value="A" className="answers_buttons"/>
                                <label htmlFor="A"> A. {question.A.toString().replace('"', '')} </label><br/>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="radio" id="B" name={question.idQuestion} value="B" className="answers_buttons"/>
                                <label htmlFor="B"> B. {question.B.toString().replace('"', '')} </label><br/>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="radio" id="C" name={question.idQuestion} value="C" className="answers_buttons"/>
                                <label htmlFor="C"> C. {question.C.toString().replace('"', '')} </label><br/>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="radio" id="D" name={question.idQuestion} value="D" className="answers_buttons"/>
                                <label htmlFor="D"> D. {question.D.toString().replace('"', '')} </label><br/>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="radio" id="E" name={question.idQuestion} value="E" className="answers_buttons"/>
                                <label htmlFor="E"> E. {question.E.toString().replace('"', '')} </label><br/>

                            </div>
                        </div>
                    </div>


            </div>
        </div>




    )

}