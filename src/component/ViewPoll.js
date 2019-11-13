import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorPage from './ErrorPage'
import { handleAnswerQuestion } from '../actions/shared'
import { formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class ViewPoll extends Component {
    state = {
        answer: '',
        qid: this.props.match.params.id,
        submitted: false
    }

    handleClick = (e) => {
        this.setState({
            answer: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answer = this.state.answer
        const qid = this.state.qid
        const { dispatch, authedUser } = this.props

        dispatch(handleAnswerQuestion(authedUser, qid, answer))

        this.setState(() => ({
            answer: '',
            submitted: true
        }))
    }

    render() {
        const { authedUser, users, questions } = this.props
        const qid = this.state.qid

        const question = questions[qid]
                            ? questions[qid]
                            : null

        const questionInfo = question 
                            ? formatQuestion(question, users[question.author], authedUser)
                            : null

        if (this.state.submitted)
        return <Redirect to={`/result/${qid}`}/>
        
        if (question === null){
            return <ErrorPage />
        }

        const {
            name, avatar, optionOne, optionTwo
          } = questionInfo

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
                        <label>
                            <input 
                                type='radio' 
                                name='option' 
                                value='optionOne' 
                                onClick={this.handleClick}/>
                                    {optionOne.text}
                        </label>
                        <p>OR</p>
                        <label>
                            <input 
                                type='radio' 
                                name='option' 
                                value='optionTwo' 
                                onClick={this.handleClick}/>
                                    {optionTwo.text}
                        </label>
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

function mapStateToProps ({authedUser, users, questions}) {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(ViewPoll)