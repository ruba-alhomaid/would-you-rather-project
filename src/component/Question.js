import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ErrorPage from './ErrorPage'
import { Link } from 'react-router-dom'

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
            <div className='question'>
                <h1><span>{name}</span> Says:</h1>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='question-info'>
                    <div>
                        <h1>Would You Rather...</h1>
                        <p>{optionOne.text}</p>
                        <p>OR</p>
                        <p>{optionTwo.text}</p>
                    </div>
                    { isItAnswered 
                        ? <Link to={`/result/${qid}`} className='toQuestion'>View Poll</Link>
                        : <Link to={`/viewpoll/${qid}`} className='toQuestion'>View Poll</Link>
                        }
                </div>
            </div>
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