import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Tabs, Tab, Card } from 'react-bootstrap'
import Question from './Question'

class Home extends Component {
    render() {
        return(
            <Container className='col d-flex mt-3 justify-content-center'>
                <Card style={{ width: '35rem' }}>
                    <Tabs defaultActiveKey="unanswered-questions" className="justify-content-center nav">
                        <Tab eventKey="unanswered-questions" title="Unanswered Questions">
                                { this.props.unansweredIds.map((id) => (
                                        <Question qid={id}/>
                                ))}
                        </Tab>
                        <Tab eventKey="answered-questions" title="Answered Questions">
                                { this.props.answeredIds.map((id) => (
                                        <Question qid={id}/>
                                ))}
                        </Tab>
                    </Tabs>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }) {

    const questionsIds = Object.keys(questions)
                            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)

    const user = ( authedUser && users.hasOwnProperty(authedUser.id.id) )
                    ? users[authedUser.id.id]
                    : { answers: {} }
    const authedUserAnswers = (user !== undefined) ? Object.keys(user.answers) : []

    const unansweredIds = questionsIds.filter((question) => 
                                authedUserAnswers.includes(question) ? null : question)        
    const answeredIds = questionsIds.filter((question) => 
                                authedUserAnswers.includes(question) ? question : null)
    return {
        unansweredIds,
        answeredIds,
        authedUserAnswers
    }
}

export default connect(mapStateToProps)(Home)