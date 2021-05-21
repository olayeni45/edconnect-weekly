import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

                <div className="mx-auto loginCenterDiv">
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

                <div className="pushFooter">
                </div>

            </>
        </Layout>

    )

}

export default ForgotPassword;