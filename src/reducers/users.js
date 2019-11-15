import { RECEIVE_USERS, USER_ADD_QUESTION, USER_ANSWER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case USER_ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: [...state[action.question.author].questions, action.question]
                }
            }
        case USER_ANSWER_QUESTION:
            return {
                ...state,
                [action.qid.id.id]: {
                    ...state[action.qid.id.id],
                    answers: {
                        ...state[action.qid.id.id].answers,
                        [action.id]: action.answer
                    }
                }
            }
        default:
            return state
    }
}