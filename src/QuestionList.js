import React from 'react';
import QuestionListComponent from './QuestionListComponent';

export default function QuestionList({Questions}) {
    return (
        Questions.map(Question => {
            return <QuestionListComponent key={Question.QuestionID} Question = {Question} />
        })
    )
}