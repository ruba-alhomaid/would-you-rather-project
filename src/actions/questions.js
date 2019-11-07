export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export let receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export let addQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export let answerQuestion = (qid, autheduser, answer) => {
    return {
        type: ANSWER_QUESTION,
        qid,
        autheduser,
        answer,
    }
}
