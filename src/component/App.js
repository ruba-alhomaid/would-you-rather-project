import React, { Component, Fragment } from 'react'
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

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return(
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.authedUser === null
                        ? <Route path='/login' component={Login}/>
                        : this.props.loading === true
                            ? null
                            : <div style={{width:"100%"}}>
                                <Navbar authedUser={this.props.authedUser.name} authedUserAvatar={this.props.authedUser.avatarURL}/>
                                <Route path='/home' component={Home}/>
                                <Route path='/question/:id' component={Question}/>
                                <Route path='/new' component={NewQuestion}/>
                                <Route path='/leaderboard' component={Leaderboard}/>
                            </div>
                    }
                </Fragment>
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