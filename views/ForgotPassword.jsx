import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col, Row } from 'react-bootstrap'

const ForgotPassword = (props) => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setError(props.forgotError);
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {

            case 'email':
                setEmail(value);
                break;

        }
    }

    return (

        <Layout {...props.user}>
            <>

                <Row className="rowC">

                    <Col xl={6} lg={7} md={8} sm={10} xs={10}>

                        <div className="forgotPassword">
                            <h3>Forgot Password?</h3>

                            {error != "" ? (error != "Invalid Email address" || error != "An error occured, please refresh" ? (<Alert className="alert alert-success">{error} </Alert>) : (<Alert className="alert alert-danger">{error} </Alert>)) : (<Alert className="alert alert-primary">Enter the email address associated with your account </Alert>)}
                            <Form id="loginForm" noValidate method="POST" action="forgotPassword" >

                                <Form.Row>

                                    <Form.Group as={Col}>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email"
                                            name="email" onChange={handleInputChange} value={email} />
                                    </Form.Group>

                                </Form.Row>

                                <div className="form-group">
                                    <Button variant="primary" type="submit">Submit </Button>

                                </div>

                            </Form>

                        </div>

                    </Col>

                </Row>

            </>

        </Layout>

    )

}

export default ForgotPassword;