import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col } from 'react-bootstrap'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

const Login = (props) => {
    let history = useHistory();
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

    const facebookRedirect = () => {
        history.push('/auth/facebook');
    }

    const responseFacebook = (response) => {
        console.log(response);
    }

    return (

        <Layout {...props.user}>
            <>

                <div className="mx-auto loginCenterDiv">
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

                    <div className="customLogin">
                        <Nav >
                            <Nav.Link href="/auth/facebook" >Facebook</Nav.Link>
                        </Nav>
                        <GoogleLoginButton onClick={() => { history.push('/auth/google') }} />
                        <FacebookLoginButton onClick={facebookRedirect} />
                    </div>

                </div>

                <div className="pushFooter">
                </div>

            </>
        </Layout>

    )

}

export default Login;