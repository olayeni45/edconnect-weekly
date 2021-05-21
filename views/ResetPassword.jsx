import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ResetPassword = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {

            case 'email':
                setEmail(value);
                break;

            case 'password':
                setPassword(value);

            case 'confirmPassword':
                setConfirmPassword(value);

        }
    }

    return (

        <Layout {...props.user}>
            <>

                <div className="mx-auto loginCenterDiv">
                    <h3>Reset Password</h3>


                    <Form id="loginForm" noValidate method="POST" action="resetPassword" >

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email"
                                    name="email" onChange={handleInputChange} value={email} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password"
                                    name="password" onChange={handleInputChange} value={password} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password"
                                    name="confirmPassword" onChange={handleInputChange} value={confirmPassword} />
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

export default ResetPassword;