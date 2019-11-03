import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleOptionOneChange = (e) => {
        const optionOne = e.target.value
        
        this.setState(() => ({
            optionOne
        }))
    }

    handleOptionTwoChange = (e) => {
        const optionTwo = e.target.value
        
        this.setState(() => ({
            optionTwo
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne } = this.state
        const { optionTwo } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.setState(() => ({
            optionOne: '',
            optionTwo: ''
        }))
    }

    render() {
        const { optionOne } = this.state
        const { optionTwo } = this.state

        return(
            <div>
                <h3>Create New Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <h6>Would you rather..</h6>
                    <input 
                        type="text" 
                        name="option-one"
                        placeholder="Enter Option One Text Here"
                        value={optionOne}
                        onChange={this.handleOptionOneChange}/>
                    <h6>OR</h6>
                    <input
                        type="text" 
                        name="option-two"
                        placeholder="Enter Option Two Text Here"
                        value={optionTwo}
                        onChange={this.handleOptionTwoChange}/>
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

export default connect()(NewQuestion)