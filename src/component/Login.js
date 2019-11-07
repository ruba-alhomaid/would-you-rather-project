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

        userToLogin 
            ? handleUserLogin(userToLogin) 
            : alert('Select a user!')
    }

    render() {
        const { users } = this.props
        const { userToLogin } = this.state
        
        return(
            <div>
                <div className='form-header'>
                    <h1 className='form-title'>Welcome to the Would You Rather App !</h1>
                    <p className='form-subtitle'>Please sign in to continue</p>
                </div>
                <div className='form-body'>
                    <form onSubmit={this.handleLogin}>
                        <div className='form-login'>
                            <img
                                src={userToLogin === ''
                                        ? 'https://cdn4.vectorstock.com/i/thumb-large/15/78/male-avatar-profile-picture-green-earth-volunteer-vector-5351578.jpg'
                                        : users[userToLogin].avatarURL}
                                alt={users[userToLogin]}
                                className='user-avatar'/>
                            <select className='select-user'
                                    onChange={(e) => this.handleChange}>
                                    <option value=''>Select user..</option>
                                    {
                                        Object.keys(users).map((user) => (
                                            <option className='option' key={user.id} value={user}>
                                                {user}
                                            </option>
                                        ))
                                    }
                            </select>
                        </div>
                        <button className='login-button' type='submit'>SIGN IN</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)