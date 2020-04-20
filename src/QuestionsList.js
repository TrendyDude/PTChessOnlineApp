import React from 'react';
import QuestionsListComponent from './QuestionsListComponent';

export default function QuestionsList({questions}) {
    return (
        questions.map(question => {
            return <QuestionsListComponent key={question.idQuestion} question = {question} />
        })
    )
}