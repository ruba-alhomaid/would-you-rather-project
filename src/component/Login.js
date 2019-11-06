import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/authedUser'

class Login extends Component {
    state = {
        userToLogin: ''
    }

    handleChange = (e) => {
        const selectedUser = e.target.value
        this.setState({
            userToLogin: selectedUser
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { userToLogin } = this.state

        userToLogin ? handleUserLogin(userToLogin) : alert('Select a user!')
    }

    render() {
        return(

        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)