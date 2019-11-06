import React, { Component } from 'react'
import { connect } from 'react-redux'

const score = (user) => {
    return (Object.keys(user.answers).length + user.questions.length)
}

class Leaderboard extends Component {
    render(){
        const { users } = this.props
        const usersList = Object.keys(users).map((id) => users[id])

        usersList.sort((user1, user2) => score(user2) - score(user1))

        return(
            <ul className='leaderboard-list'>
                {usersList.map((user) => {
                    const { id, name, avatarURL } = user
                    return(
                        <li key={id}>
                            <div>
                                <img alt={name} src={avatarURL} className='user-avatar'/>
                                <div>{ name }</div>
                                <div className='answeredq-title'>Answered Questions</div>
                                <div className='answeredq-value'>{ Object.keys(user.answers).length }</div>
                                <div className='createdq-title'>Created Questions</div>
                                <div className='createdq-value'>{ Object.keys(user.questions).length }</div>
                                <div className='score-title'>SCORE</div>
                                <div className='score-value'>{ score(user) }</div>
                            </div>
                        </li>
                )})}
            </ul>

        )
    }
}

function mapStateToProps ({ users }) {
    return{
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)