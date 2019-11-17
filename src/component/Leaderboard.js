import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Row, Col } from 'react-bootstrap'

const score = (user) => {
    return (Object.keys(user.answers).length + user.questions.length)
}

class Leaderboard extends Component {
    render(){
        const { users } = this.props
        const usersList = Object.keys(users).map((id) => users[id])

        usersList.sort((user1, user2) => score(user2) - score(user1))

        return(
            <Container className='col d-flex justify-content-center'>
                <ul className='leaderboardList list-unstyled'>
                    {usersList.map((user) => {
                        const { id, name, avatarURL } = user
                        return(
                            <li key={id}>
                                <Card bg="light" className='mt-3' style={{ width: '30rem'}}>
                                    <Card.Header className="font-weight-bold">{ name }</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <img
                                                    src={avatarURL}
                                                    alt={`Avatar of ${name}`}
                                                    width="200"
                                                    height="200"
                                                    className='avatar'/>
                                            </Col>
                                            <Col className='text-center mt-4'>
                                                <Card.Text>Answered Questions: {Object.keys(user.answers).length}</Card.Text>
                                                <Card.Text>Created Questions: {Object.keys(user.questions).length}</Card.Text>
                                                <Card.Text className="font-weight-bold text-info">SCORE</Card.Text>
                                                <Card.Title className="font-weight-bold text-info">{score(user)}</Card.Title>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </li>
                        )
                    })}
                </ul>
            </Container>
        )
    }
}

function mapStateToProps ({ users }) {
    return{
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)