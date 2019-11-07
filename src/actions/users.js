export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION'

export let receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export let userAddQuestion = (question) => {
    return {
        type: USER_ADD_QUESTION,
        question,
    }
}

export let userAnswerQuestion = (qid, authedUser, answer) => {
    return {
        type: USER_ANSWER_QUESTION,
        qid,
        authedUser,
        answer,
    }
}