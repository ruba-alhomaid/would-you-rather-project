import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ErrorPage from './ErrorPage'
import { Container, Card, Row, Col, ProgressBar, Badge } from 'react-bootstrap'

class Result extends Component {
    render() {
        const { authedUser, users, questions } = this.props
        const qid = this.props.match.params.id

        const question = questions[qid]
                ? questions[qid]
                : null

        const questionInfo = question 
                ? formatQuestion(question, users[question.author], authedUser)
                : null 

        if (question === null){
            return <ErrorPage />
        }

        const {name, avatar, optionOne, optionTwo} = questionInfo
        const optionOneVotes = optionOne.votes.length
        const optionTwoVotes = optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOnePercentage = (optionOneVotes / totalVotes * 100).toFixed(2)
        const optionTwoPercentage = (optionTwoVotes / totalVotes * 100).toFixed(2)
        const authedUserOption = users[authedUser.id].answers[qid]

        return(
            <Container className='col d-flex mt-5 justify-content-center'>
                <Card bg="light" style={{ width: '34rem' }}>
                    <Card.Header>Asked by <span>{name}</span></Card.Header>
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
                                <Card.Title>Result:</Card.Title>
                                <p>
                                    {optionOne.text} 
                                    {authedUserOption === 'optionOne' 
                                        ? <Badge className='text-danger'>You Voted</Badge> 
                                        : null}
                                </p>
                                <ProgressBar striped variant="info" now={optionOnePercentage} label={`${optionOnePercentage}%`}/>
                                <small className="text-muted">{optionOneVotes} out of {totalVotes} votes</small>

                                <p className='mt-3'>
                                    {optionTwo.text} 
                                    {authedUserOption === 'optionTwo' 
                                        ? <Badge className='text-danger'>You Voted</Badge> 
                                        : null}
                                </p>
                                <ProgressBar striped variant="info" now={optionTwoPercentage} label={`${optionTwoPercentage}%`}/>
                                <small className="text-muted">{optionTwoVotes} out of {totalVotes} votes</small>
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

export default connect(mapStateToProps)(Result)