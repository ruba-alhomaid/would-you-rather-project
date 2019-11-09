import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ErrorPage from './ErrorPage'

class Question extends Component {
    render() {
        const question = this.props.question

        if (question === null){
            return <ErrorPage />
        }

        const {
            name, avatar, optionOne, optionTwo
          } = question

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
                    <button >View Poll</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
    const question = questions.hasOwnProperty(id)
                        ? questions[id]
                        : null

    return {
        authedUser,
        question: question 
                    ? formatQuestion(question, users[question.author], authedUser)
                    : null
    }
}

export default connect(mapStateToProps)(Question) 