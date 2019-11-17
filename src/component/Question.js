import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ErrorPage from './ErrorPage'
import { Link } from 'react-router-dom'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'

class Question extends Component {
    render() {
        const question = this.props.question
        const answers = this.props.answers
        const qid = this.props.qid
        const { name, avatar, optionOne, optionTwo} = question
        let isItAnswered

        if (answers[qid] === undefined)
            isItAnswered = false 
        else
            isItAnswered = true

        if (qid === null){
            return <ErrorPage />
        }

        return(
            <Container className='col d-flex mt-3 justify-content-center'>
                <Card bg="light" style={{ width: '34rem' }}>
                    <Card.Header><span>{name}</span> Says:</Card.Header>
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
                                <Card.Title>Would You Rather...</Card.Title>
                                <Card.Text>{optionOne.text}</Card.Text>
                                <Card.Text>OR</Card.Text>
                                <Card.Text>{optionTwo.text}</Card.Text>
                                { isItAnswered 
                                    ? <Link to={`/result/${qid}`} className='toQuestion'>
                                        <Button variant="info">View Poll</Button></Link>
                                    : <Link to={`/viewpoll/${qid}`} className='toQuestion'>
                                        <Button variant="info">View Poll</Button></Link>
                                    }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, {qid}) {
    const question = questions.hasOwnProperty(qid)
                        ? questions[qid]
                        : null
    const answers = authedUser.id.answers

    return {
        authedUser,
        answers,
        qid,
        question: question 
                    ? formatQuestion(question, users[question.author], authedUser)
                    : null
    }
}

export default connect(mapStateToProps)(Question) 