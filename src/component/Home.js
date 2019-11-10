import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
    render() {
        return(
            <div className="tab-content" id="myTabContent">
                <div title="Unanswered Questions">
                    <ul className="questionList">
                        { this.props.unansweredIds.map((id) => (
                            <li key={id} className="question">
                                <Question id={id}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div title="Answered Questions">
                    <ul className="questionList">
                        { this.props.answeredIds.map((id) => (
                            <li key={id} className="question">
                                <Question id={id}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }) {

    const questionsIds = Object.keys(questions)
                            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)

    const user = ( authedUser && users.hasOwnProperty(authedUser) )
                    ? users[authedUser]
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