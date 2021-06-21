import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col, Row } from 'react-bootstrap'
import { Nav } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        if (loginError == "") {
            setLoginError(props.logError);
        }
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {

            case 'email':
                setEmail(value);
                break;

            case 'password':
                setPassword(value);
                break;
        }
    }



    return (

        <Layout {...props.user}>
            <>

                <Row className="rowLogin">

                    <Col xl={5} lg={6} md={8} sm={10} xs={10}>

                        <div className="">
                            <h3>Login</h3>

                            {loginError != "" ? (<Alert className="alert alert-danger">{loginError} </Alert>) : null}

                            <Form id="loginForm" noValidate method="POST" action="login" >

                                <Form.Row>

                                    <Form.Group as={Col}>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" placeholder="Your Email Address"
                                            name="email" onChange={handleInputChange} value={email} />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>

                                    <Form.Group as={Col} >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Your Password"
                                            name="password" onChange={handleInputChange} value={password} />
                                    </Form.Group>
                                </Form.Row>

                                <div className="LogFunctions">
                                    <Button variant="primary" type="submit">Login </Button>
                                    <Nav >
                                        <Nav.Link href="/forgotPassword" className="forgotNav" >Forgot Password?</Nav.Link>
                                    </Nav>
                                </div>

                            </Form>

                            <div className="loginLinks">

                                <a href="/auth/Logingoogle" className="google">
                                    <GoogleLoginButton>
                                        <span>Login with Google</span>
                                    </GoogleLoginButton>
                                </a>

                                <a href="/auth/Loginfacebook" className="facebook">
                                    <FacebookLoginButton>
                                        <span>Login with Facebook</span>
                                    </FacebookLoginButton>

                                </a>

                            </div>



                        </div>

                    </Col>

                </Row>

            </>
        </Layout>

    )

}

export default Login;