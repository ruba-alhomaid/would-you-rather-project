import { _getUser } from '../utils/_DATA'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER'

export let setAuthedUser = (id) => {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export let logoutAuthedUser = () => {
    return {
        type: LOGOUT_AUTHED_USER,
        id: ''
    }
}

export let handleUserLogin = (id) => {
    return(dispatch) => {
         _getUser(id).then((user) => {
            dispatch(setAuthedUser(user))
        })
    }
}

export let handleUserLogout = () => {
    return(dispatch) => {
        dispatch(logoutAuthedUser())
        window.location.href= '/home'
    }
}

