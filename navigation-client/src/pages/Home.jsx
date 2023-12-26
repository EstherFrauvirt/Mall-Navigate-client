import React from 'react'
import Login from '../components/Login'
import { Col, Container, Row } from 'react-bootstrap'

export default function Home() {
    return (
        <div><h1>Welcome to navigation</h1>
            <br />
            <br />
            <Container>
                <Row>
                    <Col><Login /></Col>
                </Row>
            </Container>



        </div>
    )
}