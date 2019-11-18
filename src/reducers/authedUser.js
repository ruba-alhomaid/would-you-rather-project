import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from '../actions/authedUser'

 let authedUser = (state = null, action) => {
    switch(action.type) {
        case SET_AUTHED_USER:
            return action.id
    
        case LOGOUT_AUTHED_USER:
            return action.id
            
        default:
            return state
    }
}

export default authedUser