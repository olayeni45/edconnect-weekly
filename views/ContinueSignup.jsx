import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col } from 'react-bootstrap'

const ContinueSignup = (props) => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {

            case 'email':
                setEmail(value);
                break;

            case 'newPassword':
                setNewPassword(value);
                break;

            case 'confirmPassword':
                setConfirmPassword(value);
                break;

        }
    }

    const [resetPasswordError, setResetPasswordError] = useState("");

    useEffect(() => {
        setResetPasswordError(props.resetPasswordError);
    }, [])

    return (

        <Layout {...props.user}>
            <>

                <div className="mx-auto loginCenterDiv">
                    <h3>Reset Password</h3>

                    {resetPasswordError != "" ? (resetPasswordError == "New Password set, You can now login." ? (<Alert className="alert alert-success">{resetPasswordError} </Alert>) : (<Alert className="alert alert-danger">{resetPasswordError} </Alert>)) : null}

                    <Form id="loginForm" method="POST" action="resetPassword" >

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email"
                                    required name="email" onChange={handleInputChange} value={email} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="New Password" value={newPassword}
                                    onChange={handleInputChange} name="newPassword" required />
                            </Form.Group>

                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                                    onChange={handleInputChange} name="confirmPassword" required />
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

export default ContinueSignup;