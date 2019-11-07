import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
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
                    <p className='user-name'>{this.props.authedUser}</p>
                    <img 
                        src={this.props.authedUserAvatar}
                        alt={this.props.authedUser}
                        className='user-pic'/>
                </div>
            </div>
        )
    }
}

export default Navbar