import React, { Component } from 'react'
import { handleUserLogout } from '../actions/authedUser'
import { connect } from 'react-redux'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'

class NavBar extends Component {

    handleChange = () => {
        const { dispatch } = this.props
        dispatch(handleUserLogout())
    }

    render(){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">Would You Rather!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/new">New Question</Nav.Link>
                        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                    </Nav>
                    <Form inline>
                        <img
                            src={this.props.authedUserAvatar}
                            alt={this.props.authedUser}
                            width="55"
                            height="55"
                            className="d-inline-block align-top"
                            />
                        <Navbar.Text className='ml-2'>
                            {this.props.authedUser}
                        </Navbar.Text>
                        <Button variant="info" size="sm" className='ml-2' onClick={this.handleChange}>Sign out</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect()(NavBar)
