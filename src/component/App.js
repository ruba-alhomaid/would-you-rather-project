import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Navbar from './Navbar'
import Login from './Login'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import LoadingBar from 'react-redux-loading'
import ViewPoll from './ViewPoll'
import Result from './Result'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return(
            <Router>
                <LoadingBar/>
                {this.props.authedUser === null
                    ? <Login/>
                    : this.props.loading === true
                        ? null
                        : <div style={{width:"100%"}}>
                            <Navbar authedUser={this.props.authedUser.id.name} authedUserAvatar={this.props.authedUser.id.avatarURL}/>
                            <Route path='/home' component={Home}/>
                            <Route path='/question/:id' component={Question}/>
                            <Route path='/new' component={NewQuestion}/>
                            <Route path='/leaderboard' component={Leaderboard}/>
                            <Route path='/viewpoll/:id' component={ViewPoll}/>
                            <Route path='/result/:id' component={Result}/>
                        </div>
                }
            </Router>
        )
    }
}

let mapStateToProps = ({ authedUser }) => {
    return {
        authedUser,
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App)