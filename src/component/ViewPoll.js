import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorPage from './ErrorPage'
import { handleAnswerQuestion } from '../actions/shared'
import { formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap'

class ViewPoll extends Component {
    state = {
        answer: '',
        qid: this.props.match.params.id,
        submitted: false
    }

    handleClick = (e) => {
        this.setState({
            answer: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answer = this.state.answer
        const qid = this.state.qid
        const { dispatch, authedUser } = this.props  
        
        dispatch(handleAnswerQuestion(qid, answer, authedUser))  

        this.setState(() => ({
            answer: '',
            submitted: true
        }))
    }

    render() {
        const { authedUser, users, questions } = this.props
        const qid = this.state.qid

        const question = questions[qid]
                            ? questions[qid]
                            : null

        const questionInfo = question 
                            ? formatQuestion(question, users[question.author], authedUser)
                            : null

        if (this.state.submitted)
        return <Redirect to={`/result/${qid}`}/>
        
        if (question === null){
            return <ErrorPage />
        }

        const {
            name, avatar, optionOne, optionTwo
          } = questionInfo

        return(
            <Container className='col d-flex mt-5 justify-content-center'>
                <Card bg="light" style={{ width: '34rem' }}>
                    <Card.Header><span>{name}</span> Asks:</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <img
                                    src={avatar}
                                    alt={`Avatar of ${name}`}
                                    width="200"
                                    height="200"
                                    className='avatar'/>
                            </Col>
                            <Col>
                                <Form className="mt-3" onSubmit={this.handleSubmit}>
                                    <div key='default-radio'>
                                        <Form.Check 
                                            type='radio'
                                            id='default-radio'
                                            label={optionOne.text}
                                            name='option' 
                                            value='optionOne' 
                                            onClick={this.handleClick}
                                        />
                                        <p className='mt-3'>OR</p>
                                        <Form.Check
                                            type='radio'
                                            id='default-radio'
                                            label={optionTwo.text}
                                            name='option' 
                                            value='optionTwo' 
                                            onClick={this.handleClick}
                                        />
                                    </div>
                                    <Button 
                                        className="mt-5 float-right"
                                        variant="info" 
                                        type="submit"
                                        disabled={this.state.answer === ''}>
                                            Submit
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}) {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(ViewPoll)