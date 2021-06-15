import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col, Container, Row } from 'react-bootstrap'

const ContinueSignup = (props) => {

    const [programList, setProgramList] = useState([]);
    const [gradYears, setGradYears] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [matric, setMatric] = useState("");
    const [program, setProgram] = useState("");
    const [year, setYear] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState([]);

    useEffect(() => {
        setProgramList(props.programList);
        setGradYears(props.gradYears);

        setFirstName(props.details[0].firstname);
        setLastName(props.details[0].lastname);
        setEmail(props.details[0].email);

        if (error.length < 1) {
            setError(props.error);
            console.log("Error from continue signup", error);
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

            case 'program':
                setProgram(value);
                break;

            case 'matric':
                setMatric(value);
                break;

            case 'year':
                setYear(value);
                break;

            case 'password':
                setPassword(value);
                break;

            case 'confirmPassword':
                setConfirmPassword(value);
                break;

        }
    }


    return (

        <Layout {...props.user} >
            <>
                <Container>

                    <div className="updateDetails">

                        <h4>Update your personal details</h4>

                        {error != "" ? (
                            <Alert className="alert alert-danger">
                                {error.map(error => (<p key={error}>{error}</p>))}
                            </Alert>
                        ) : null}

                        <Form noValidate method="POST" action="/continue" id="createAccount">

                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" value={firstName}
                                        onChange={handleInputChange} name="firstName" />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lastName}
                                        onChange={handleInputChange} placeholder="Last Name"
                                        name="lastName" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" value={email} readOnly
                                        onChange={handleInputChange} placeholder="Email address"
                                        name="email" />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Matric Number</Form.Label>
                                    <Form.Control type="text" placeholder="Matric Number"
                                        name="matric" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Program</Form.Label>
                                    <Form.Control as="select" name="program" value={program} onChange={handleInputChange}>
                                        {programList.map(program => (<option key={program}>{program}</option>))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Graduation Year</Form.Label>
                                    <Form.Control as="select" name="year" value={year} onChange={handleInputChange}>
                                        {gradYears.map(grad => (<option key={grad}>{grad}</option>))}
                                    </Form.Control>
                                </Form.Group>

                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Set password" value={password} onChange={handleInputChange}
                                        name="password" />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleInputChange}
                                        name="confirmPassword" />
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" type="submit" >Create account</Button>

                        </Form>

                        <div className="pushSignFooter">

                        </div>

                    </div>

                </Container>

            </>
        </Layout >

    )

}

export default ContinueSignup;