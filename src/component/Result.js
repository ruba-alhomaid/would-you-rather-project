import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import ErrorPage from './ErrorPage'

class Result extends Component {
    render() {
        const question = this.props.question

        if (question === null){
            return <ErrorPage />
        }

        const {name, avatar, optionOne, optionTwo} = question
        const optionOneVotes = optionOne.votes.length
        const optionTwoVotes = optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOnePercentage = (optionOneVotes / totalVotes * 100).toFixed(2)
        const optionTwoPercentage = (optionTwoVotes / totalVotes * 100).toFixed(2)

        return(
            <div className='result'>
                <h1>Asked by <span>{name}</span></h1>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='question-result'>
                    <div>
                        <h1>Result:</h1>
                        <p>{optionOne.text}</p>
                        <p>{optionOnePercentage}</p>
                        <p>${optionOneVotes} out of ${totalVotes} votes</p>
                        <p>OR</p>
                        <p>{optionTwo.text}</p>
                        <p>{optionTwoPercentage}</p>
                        <p>${optionTwoVotes} out of ${totalVotes} votes</p>
                    </div>
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

export default connect(mapStateToProps)(Result)