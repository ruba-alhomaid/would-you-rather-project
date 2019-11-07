import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveQuestions, addQuestion, answerQuestion } from './questions'
import { receiveUsers, userAddQuestion, userAnswerQuestion } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'sarahedo'

export let handleInitialData = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}

export let handleAddQuestion = (optionOne, optionTwo) => {
    return (dispatch, getState) => {
        const { autheduser } = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: autheduser
        })
            .then((question) => {
                dispatch(userAddQuestion(question))
                dispatch(addQuestion(question))
            })
            .then(() => dispatch(hideLoading()))
    }
}

export let handleAnswerQuestion = (qid, answer) => {
    return (dispatch, getState) => {
        const { autheduser } = getState()
        dispatch(showLoading())
        return saveQuestionAnswer({
            autheduser,
            qid,
            answer
        })
            .then(() => {
                dispatch(userAnswerQuestion(qid, autheduser, answer))
                dispatch(answerQuestion(qid, autheduser, answer))
            })
            .then(() => dispatch(hideLoading()))
    }
}