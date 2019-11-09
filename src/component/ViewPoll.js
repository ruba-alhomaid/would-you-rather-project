import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorPage from './ErrorPage'
import { handleAnswerQuestion } from '../actions/shared'
import { formatQuestion } from '../utils/helpers'

class ViewPoll extends Component {
    state = {
        answer: '',
        submitted: false
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState(() => ({
            answer: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answer = this.state.answer
        const { dispatch, authedUser, question } = this.props

        dispatch(handleAnswerQuestion(authedUser, question.id, answer))

        this.setState(() => ({
            answer: '',
            submitted: true
        }))
    }

    render() {
        const question = this.props.question

        if (question === null){
            return <ErrorPage />
        }

        const {
            name, avatar, optionOne, optionTwo
          } = question

        return(
            <div className='view-poll'>
                <h1><span>{name}</span> Asks:</h1>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <form className='answer-question' onSubmit={this.handleSubmit}>
                    <div>
                        <h1>Would You Rather...</h1>
                        <input 
                            type='radio' 
                            name='option' 
                            value='optionOne' 
                            onChange={this.handleChange}>
                                {optionOne.text}
                        </input>
                        <p>OR</p>
                        <input 
                            type='radio' 
                            name='option' 
                            value='optionTwo' 
                            onChange={this.handleChange}>
                                {optionTwo.text}
                        </input>
                    </div>
                    <button
                        className='btn'
                        type='submit'
                        disabled={this.state.answer === ''}>
                        Submit
                    </button>
                </form>
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

export default connect(mapStateToProps)(ViewPoll)