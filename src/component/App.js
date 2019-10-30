import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Navbar from './Navbar'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return(
            <Router>
                <Fragment>
                    <div className='container'>
                        <Navbar/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={Home}/>
                                <Route path='/question/:id' component={Question}/>
                                <Route path='/new' component={NewQuestion}/>
                                <Route path='/leaderboard' component={Leaderboard}/>
                            </div>}
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App)