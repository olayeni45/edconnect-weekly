import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col, Row } from 'react-bootstrap'

const ResetPassword = (props) => {

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

                <Row className="resetRow">

                    <Col xl={7} lg={7} md={8} sm={11} xs={11}>

                        <h3>Reset Password</h3>

                        {resetPasswordError != "" ? (resetPasswordError == "New Password set, You can now login." ? (<Alert className="alert alert-success">{resetPasswordError} </Alert>) : (<Alert className="alert alert-danger">{resetPasswordError} </Alert>)) : null}

                        <Form id="resetForm" method="POST" action="resetPassword" >


                            <Row>

                                <Col xl={10} lg={10} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email"
                                            required name="email" onChange={handleInputChange} value={email} />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row>

                                <Col xl={10} lg={10} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" placeholder="New Password" value={newPassword}
                                            onChange={handleInputChange} name="newPassword" required />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row>

                                <Col xl={10} lg={10} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                                            onChange={handleInputChange} name="confirmPassword" required />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Button variant="primary" type="submit">Submit </Button>

                        </Form>


                    </Col>

                </Row>


            </>
        </Layout>

    )

}

export default ResetPassword;