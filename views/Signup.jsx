import React, { useEffect, useState } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Container, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import GoogleButton from 'react-google-button';
import FacebookLogin from 'react-facebook-login';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const Signup = (props) => {

    const [programs, setPrograms] = useState([]);
    const [graduation, setGraduation] = useState([]);
    const [signupErrors, setSignupErrors] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [program, setProgram] = useState("");
    const [matricNumber, setMatricNumber] = useState("");
    const [graduationYear, setGraduationYear] = useState("");

    useEffect(() => {
        if (programs == "" && graduation == "") {
            setPrograms(props.programList);
            setGraduation(props.gradYears);
        }

        if (signupErrors.length < 1) {
            setSignupErrors(props.error);
            console.log(signupErrors);
        }

    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target;

        switch (name) {

            case 'firstName':
                setFirstName(value);
                break;

            case 'lastName':
                setLastName(value);
                break;

            case 'email':
                setEmail(value);
                break;

            case 'password':
                setPassword(value);
                break;

            case 'program':
                setProgram(value);
                break;

            case 'matricNumber':
                setMatricNumber(value);
                break;

            case 'graduationYear':
                setGraduationYear(value);
                break;
        }
    }

    const history = useHistory();


    return (

        <Layout {...props.user}>
            <>

                <Container>

                    <div className="mx-auto registerCenterContainer">
                        <h3>Sign up</h3>


                        {signupErrors != "" ? (
                            <Alert className="alert alert-danger">
                                {signupErrors.map(err => (<p key={err}>{err}</p>))}
                            </Alert>
                        ) : null}

                        <Form id="signupForm" noValidate method="POST" action="signup">

                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name"
                                        name="firstName" value={firstName} onChange={handleInputChange} />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name"
                                        name="lastName" value={lastName} onChange={handleInputChange} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Your Email Address"
                                        name="email" value={email} onChange={handleInputChange} />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Your Password"
                                        name="password" value={password} onChange={handleInputChange} />
                                </Form.Group>
                            </Form.Row>


                            <Form.Row>

                                <Col xs={6}>
                                    <Form.Group >
                                        <Form.Label>Program</Form.Label>
                                        <Form.Control as="select" name="program" onChange={handleInputChange}
                                            value={program}>
                                            {programs.map(program => (<option key={program}>{program}</option>))}

                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group >
                                        <Form.Label>Matric Number</Form.Label>
                                        <Form.Control placeholder="e.g 16/2016" type="text"
                                            name="matricNumber" value={matricNumber} onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group >
                                        <Form.Label>Graduation Year</Form.Label>
                                        <Form.Control as="select" name="graduationYear" onChange={handleInputChange}
                                            value={graduationYear}>

                                            {graduation.map(grad => (<option key={grad}>{grad}</option>))}


                                        </Form.Control>
                                    </Form.Group>
                                </Col>


                            </Form.Row>

                            <div className="form-group">
                                <Button variant="primary" type="submit" >Sign Up </Button>

                            </div>



                        </Form>

                        <div className="signUpLinks">

                            <a href="/auth/google" className="google">
                                <GoogleLoginButton>
                                    <span>Sign up with Google</span>
                                </GoogleLoginButton>
                            </a>

                            <a href="/auth/facebook" className="facebook">
                                <FacebookLoginButton>
                                    <span>Sign up with Facebook</span>
                                </FacebookLoginButton>

                            </a>

                        </div>

                    </div>

                    <div className="pushSignFooter">

                    </div>

                    {signupErrors != "" ? (
                        <div className="errorFooter"></div>
                    ) : null}

                </Container>

            </>
        </Layout>

    )

}

export default Signup;