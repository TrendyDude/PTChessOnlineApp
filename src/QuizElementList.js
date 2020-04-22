import React from 'react';
import QuizElement from "./QuizElement";

export default function QuizElementList({quizzes}) {
    return (
        quizzes.map(quiz => {
            return <QuizElement quiz = {quiz} />
        })
    )
}