import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveQuestions, addQuestion, answerQuestion } from './questions'
import { receiveUsers, userAddQuestion, userAnswerQuestion } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

export let handleInitialData = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}

export let handleAddQuestion = (optionOne, optionTwo, authedUser) => {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
            .then((question) => {
                dispatch(userAddQuestion(question))
                dispatch(addQuestion(question))
            })
            .then(() => dispatch(hideLoading()))
    }
}

export let handleAnswerQuestion = (qid, answer, authedUser) => {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(() => {
                dispatch(answerQuestion(qid, authedUser, answer))
                dispatch(userAnswerQuestion(qid, authedUser, answer))
            })
            .then(() => dispatch(hideLoading()))
    }
}