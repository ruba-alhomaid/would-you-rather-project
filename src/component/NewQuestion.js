import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        submitted: false
    }

    handleChange = (e) => {
        e.preventDefault()
        const option = e.target.value
        e.persist()
        this.setState(() => ({
            [e.target.name]: option
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            submitted: true
        }))
    }

    render() {

        if (this.state.submitted)
            return <Redirect to='/home'/>

        const { optionOne } = this.state
        const { optionTwo } = this.state

        return(
            <div>
                <h3>Create New Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <h6>Would you rather..</h6>
                    <input 
                        type="text" 
                        name="optionOne"
                        placeholder="Enter Option One Text Here"
                        value={optionOne}
                        onChange={this.handleChange}/>
                    <h6>OR</h6>
                    <input
                        type="text" 
                        name="optionTwo"
                        placeholder="Enter Option Two Text Here"
                        value={optionTwo}
                        onChange={this.handleChange}/>
                    <button
                        className='btn'
                        type='submit'
                        disabled={( optionOne === '' ) || ( optionTwo === '' )}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)