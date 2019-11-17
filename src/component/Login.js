import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Container, Form, Card, Button } from 'react-bootstrap'

class Login extends Component {
    state = {
        userToLogin: '',
        loggedin: false
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
        const { dispatch } = this.props

        userToLogin 
            ? dispatch(handleUserLogin(userToLogin)) && 
                this.setState(() => ({ 
                    loggedin: true 
                }))
            : alert('Select a user!')
    
    }

    render() {
        const { users } = this.props
        const { userToLogin } = this.state

        if (this.state.loggedin)
            return <Redirect to='/home'/>
        
        return(
            <Container className='col d-flex mt-5 justify-content-center'>
                <Card bg="light" className="text-center" style={{ width: '25rem' }}>
                    <Card.Header>
                        <h3 className='form-title'>Welcome to the Would You Rather App !</h3>
                        <p className='form-subtitle'>Please sign in to continue</p>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleLogin}>
                            <Form.Row className="justify-content-center">
                                <img
                                    src={userToLogin === ''
                                            ? 'https://i.pinimg.com/originals/ac/3d/ac/ac3dac7df065a5a708822232e65cbb15.png'
                                            : users[userToLogin].avatarURL}
                                    width="200"
                                    height="200"
                                    alt={users[userToLogin]}
                                    className="align-self-center mr-3"/>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Form.Group controlId="formSignIn">
                                    <Form.Label>Sign In</Form.Label>
                                    <Form.Control as="select" onChange={this.handleChange}>
                                        <option value=''>Select user..</option>
                                        {
                                            Object.values(users).map((user) => (
                                                <option className='option' key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Button variant="info" type="submit" block>SIGN IN</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)