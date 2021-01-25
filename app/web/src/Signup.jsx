import React, { useEffect, useState } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Container, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    const programListUri = "/api/programs";
    const gradYearsUri = "/api/graduationYears";
    const registerUri = "/api/register";

    const [programs, setPrograms] = useState([]);
    const [graduation, setGraduation] = useState([]);
    const [signupErrors, setSignupErrors] = useState([""]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [program, setProgram] = useState("");
    const [matric, setMatric] = useState("");
    const [graduationYear, setGraduationYear] = useState("");

    let history = useHistory();

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

            case 'matric':
                setMatric(value);
                break;

            case 'graduationYear':
                setGraduationYear(value);
                break;
        }
    }



    useEffect(() => {

        fetch(programListUri,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPrograms(data);

            })
            .catch((error) => {
                console.log("Error: ", error);
            });

        console.log(programs);
    }, [])

    useEffect(() => {

        fetch(gradYearsUri,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setGraduation(data)
            })
            .catch((error) => {
                console.log("Error: ", error);
            })

        console.log(graduation);
    }, [])

    const handleSubmit = event => {
        event.preventDefault();

        let formData = {
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "password": password,
            "matricNumber": matric,
            "program": program,
            "graduationYear": graduationYear
        };

        fetch(registerUri,
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                if (data.status === "ok") {
                    let key = "uid";
                    let value = data.data.id;
                    document.cookie = `${key}=${value};path=/;`;
                    history.push("/");
                }
                else {
                    setSignupErrors(data.errors);
                    console.log(signupErrors);
                }

            })
            .catch((error) => {
                console.log("Errors", error);
            });


    };


    return (

        <Layout>
            <>

                <Container>

                    <div className="mx-auto registerCenterContainer">
                        <h3>Sign up</h3>


                        {signupErrors[0].length != 0 ? (
                            <Alert className="alert alert-danger"> {signupErrors.map((err) => (<p key={err}>{err}</p>))}</Alert>
                        ) : null}

                        <Form id="signUpForm" noValidate onSubmit={handleSubmit}>

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
                                            name="matric" value={matric} onChange={handleInputChange} />
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


                    </div>

                    <div className="pushSignFooter">

                    </div>

                    {signupErrors[0].length != 0 ? (
                        <div className="errorFooter"></div>
                    ) : null}

                </Container>

            </>
        </Layout>

    )

}

export default Signup;