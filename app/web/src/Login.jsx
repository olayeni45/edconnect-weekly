import React, { useState } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const loginUri = "/api/login";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    let history = useHistory();

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


    const handleSubmit = (event) => {

        event.preventDefault();

        let loginData = {
            "email": email,
            "password": password
        };

        fetch(loginUri,
            {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(loginData)
            })
            .then(async (res) => {
                let data = await res.json()
                if (res.status === 200) {
                    let key = "uid";
                    let value = data.data.id;
                    document.cookie = `${key}=${value};path=/;`;
                    history.push("/");

                } else {
                    setLoginError('Invalid email/password');
                }
            })


    };



    return (

        <Layout>
            <>

                <div className="mx-auto loginCenterDiv">
                    <h3>Login</h3>

                    {loginError !== " " ? (<Alert className="alert alert-danger">{loginError} </Alert>) : null}

                    <Form id="loginForm" noValidate onSubmit={handleSubmit}>

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