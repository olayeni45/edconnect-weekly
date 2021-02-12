import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col } from 'react-bootstrap'

const Login = (props) => {

    const loginUri = "/api/login";
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

        <Layout>
            <>

                <div className="mx-auto loginCenterDiv">
                    <h3>Login</h3>

                    {loginError !== " " ? (<Alert className="alert alert-danger">{loginError} </Alert>) : null}

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

                        <div className="form-group">
                            <Button variant="primary" type="submit">Login </Button>
                        </div>



                    </Form>


                </div>

                <div className="pushFooter">
                </div>

            </>
        </Layout>

    )

}

export default Login;