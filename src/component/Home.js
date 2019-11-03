import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
    render() {
        console.log(this.props.authedUserAnswers)
        return(
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Unanswered Questions</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Answered Questions</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        { this.props.unansweredIds.map((id) => (
                            <li key={id}>
                                <Question id={id}/>
                            </li>
                        ))}
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        { this.props.answeredIds.map((id) => (
                            <li key={id}>
                                <Question id={id}/>
                            </li>
                        ))}
                    </div>
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

    const unansweredIds = questionsIds.filter((id) => 
                                authedUserAnswers.includes(id))
    const answeredIds = questionsIds.filter((id) => 
                                authedUserAnswers.includes(id))

    return {
        unansweredIds,
        answeredIds,
        authedUserAnswers
    }
}

export default connect(mapStateToProps)(Home)