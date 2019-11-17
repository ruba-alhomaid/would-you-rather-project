import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'
import { Container, Card, Button, Form } from 'react-bootstrap'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        submitted: false
    }

    handleChange = (e) => {
        e.preventDefault()
        const option = e.target.value
        e.persist()
        this.setState(() => ({
            [e.target.name]: option
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            submitted: true
        }))
    }

    render() {

        if (this.state.submitted)
            return <Redirect to='/home'/>

        const { optionOne } = this.state
        const { optionTwo } = this.state

        return(
            <Container className='col d-flex mt-5 justify-content-center'>
                <Card bg="light" style={{ width: '34rem' }}>
                    <Card.Header>Create New Question</Card.Header>
                    <Card.Body>
                        <Card.Title>Would you rather..</Card.Title>
                        <Form className="mt-3" onSubmit={this.handleSubmit}>
                            <Form.Control 
                                type="text" 
                                name="optionOne"
                                placeholder="Enter Option One Text Here"
                                value={optionOne}
                                onChange={this.handleChange}
                            />
                            <p className='mt-3 text-center'>OR</p>
                            <Form.Control 
                                type="text" 
                                name="optionTwo"
                                placeholder="Enter Option Two Text Here"
                                value={optionTwo}
                                onChange={this.handleChange}
                            />
                            <Button 
                                className="mt-5 float-right"
                                variant="info" 
                                type="submit"
                                disabled={( optionOne === '' ) || ( optionTwo === '' )}
                                block>
                                    Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)