import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'

class Question extends Component {
    render() {
        const question = this.props

        if (question === null){
            return <p>This question doesn't existed</p>
        }

        const {
            name, avatar, timestamp, optionOne, optionTow
          } = question

        return(
            <div className='question'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='question-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        <p>{optionOne}</p>
                        <p>{optionTow}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, {id}) {
    const question = questions.hasOwnProperty(id)
                        ? questions[id]
                        : ''

    return {
        authedUser,
        question: question 
                    ? formatQuestion(question, users[question.author], authedUser)
                    : null
    }
}

export default connect(mapStateToProps)(Question) 