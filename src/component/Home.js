import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
    render() {
        console.log(this.props.authedUserAnswers)
        return(
            <div>
                {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Unanswered Questions</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Answered Questions</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        { this.props.unansweredQ.map((question) => (
                            <li key={question.id}>
                                <div>{question}</div>
                            </li>
                        ))}
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        { this.props.questionIds.map((id) => (
                            <li key={id}>
                                <div>Questions Id: {id}</div>
                            </li>
                        ))}
                    </div>
                </div> */}
            </div>
        )
    }
}

function mapStateToProps ({ users, questions, authedUser }) {

    // questionsIds = Object.keys(questions)
    const user = ( authedUser && users.hasOwnProperty(authedUser) )
                    ? users[authedUser]
                    : { answers: {} }
    const authedUserAnswers = (user !== undefined) ? Object.keys(user.answers) : []

    // const unansweredIds = questionsIds.filter((id) => authedUserAnswers.includes(id)
    //                         .sort((a,b) => questions[b].timestamp - questions[a].timestamp))
    // const answeredIds = questionsIds.filter((id) => authedUserAnswers.includes(id)
    //                         .sort((a,b) => questions[b].timestamp - questions[a].timestamp))

    return {
        // unansweredIds,
        // answeredIds,
        authedUserAnswers
    }
}

export default connect(mapStateToProps)(Home)