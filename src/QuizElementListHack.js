import React from 'react';
import QuizElementHack from "./QuizElementHack";

export default function QuizElementListHack({quizzes}) {
    return (
        quizzes.map(quiz => {
            return <QuizElementHack quiz = {quiz} />
        })
    )
}