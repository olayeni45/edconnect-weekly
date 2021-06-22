import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Col, Container, Row } from 'react-bootstrap'

const Social = (props) => {

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

    const [error, setError] = useState();

    useEffect(() => {
        setProgramList(props.programList);
        setGradYears(props.gradYears);

        setFirstName(props.details[0].firstname);
        setLastName(props.details[0].lastname);
        setEmail(props.details[0].email);
    }, [])

    useEffect(() => {
        setError(props.error);
    })

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

        <Layout {...props.user}>

            <>

                <Row className="socialRow">

                    <Col xl={7} lg={7} md={7} sm={9} xs={9}>

                        <h4>Update your personal details</h4>

                        {error != "" ? (<Alert className="alert alert-danger">{error} <br /> </Alert>) : null}

                        <Form noValidate method="POST" action="/continue" id="createAccount">

                            <Row>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="First Name" value={firstName}
                                            onChange={handleInputChange} name="firstName" />
                                    </Form.Group>

                                </Col>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={lastName}
                                            onChange={handleInputChange} placeholder="Last Name"
                                            name="lastName" />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" value={email} readOnly
                                            onChange={handleInputChange} placeholder="Email address"
                                            name="email" />
                                    </Form.Group>
                                </Col>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Matric Number</Form.Label>
                                        <Form.Control type="text" placeholder="Matric Number"
                                            name="matric" />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Program</Form.Label>
                                        <Form.Control as="select" name="program" value={program} onChange={handleInputChange}>
                                            {programList.map(program => (<option key={program}>{program}</option>))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Graduation Year</Form.Label>
                                        <Form.Control as="select" name="year" value={year} onChange={handleInputChange}>
                                            {gradYears.map(grad => (<option key={grad}>{grad}</option>))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>


                            <Row>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Set password" value={password} onChange={handleInputChange}
                                            name="password" />
                                    </Form.Group>
                                </Col>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleInputChange}
                                            name="confirmPassword" />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Button variant="primary" type="submit" >Create account</Button>

                        </Form>

                    </Col>

                </Row>

            </>
        </Layout >

    )

}

export default Social;