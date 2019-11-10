import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { handleUserLogout } from '../actions/authedUser'
import { connect } from 'react-redux'

class Navbar extends Component {

    handleChange = () => {
        const { dispatch } = this.props
        dispatch(handleUserLogout())
    }

    render(){
        return(
            <div>
                <nav className='nav'>
                    <ul className='nav-list'>
                        <li key='home-nav'>
                            <NavLink to='/home' activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li key='new-question-nav'>
                            <NavLink to='/new' activeClassName='active'>
                                New Question
                            </NavLink>
                        </li>
                        <li key='leaderboard-nav'>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                Leaderboard
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='authed-user-info'>
                    <img 
                        src={this.props.authedUserAvatar}
                        alt={this.props.authedUser}
                        className='user-pic'/>
                    <p className='user-name'>{this.props.authedUser}</p>
                    <button 
                        className='logout-btn'
                        onClick={this.handleChange}>Sign out</button>
                </div>
            </div>
        )
    }
}

export default connect()(Navbar)