import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Container, Col } from 'react-bootstrap'

const Profile = (props) => {

    const [programList, setProgramList] = useState([]);
    const [graduationYears, setGraduationYears] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [matric, setMatric] = useState("");
    const [program, setProgram] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        setProgramList(props.programList);
        setGraduationYears(props.gradYears);
        setFirstName(props.user.firstname);
        setLastName(props.user.lastname);
        setEmail(props.user.email);
        setMatric(props.user.matricNumber);
        setProgram(props.user.program);
        setYear(props.user.graduationYear);
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

            case 'program':
                setProgram(value);
                break;

            case 'matricNumber':
                setMatric(value);
                break;

            case 'graduationYear':
                setYear(value);
                break;

        }
    }



    return (

        <Layout {...props.user} >
            <>

                <Container>

                    <div className="profileContainer">

                        <div className="userDetails">
                            <h3>{props.user.firstname} {props.user.lastname}</h3>
                            <p className="text-secondary emailDiv">{props.user.email}</p>
                        </div>

                        <div id="titleMargin"></div>

                        <div className="projectStatusContainer">

                            <div className="project">

                                <div className="statusFlex">

                                    <div className="columnFlex">
                                        <p className="bold">Program</p>
                                        <p>{props.user.program}</p>
                                    </div>



                                    <div className="columnFlex">
                                        <p className="bold">Matriculation Number</p>
                                        <p>{props.user.matricNumber}</p>
                                    </div>



                                    <div className="columnFlex">
                                        <p className="bold">Graduation Year</p>
                                        <p>{props.user.graduationYear}</p>
                                    </div>

                                </div>

                            </div>

                        </div>



                        <h4 className="marginTop">Update Profile</h4>
                        <hr />

                        <div className="formMiddle">

                            <Form noValidate method="PUT" action="profile">

                                <Form.Row>

                                    <Form.Group as={Col} >
                                        <Form.Label >First Name</Form.Label>
                                        <Form.Control type="text" value={firstName}
                                            onChange={handleInputChange} name="firstName" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={lastName}
                                            onChange={handleInputChange} name="lastName" />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" value={email}
                                            onChange={handleInputChange} name="email" />
                                    </Form.Group>

                                    <Form.Group as={Col} >

                                        <Form.Label>Program</Form.Label>
                                        <Form.Control as="select" name="program" value={program} onChange={handleInputChange} >
                                            {programList.map(program => (<option key={program}>{program}</option>))}

                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>


                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Matric Number</Form.Label>
                                        <Form.Control type="text" value={matric}
                                            onChange={handleInputChange} name="matricNumber" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label>Graduation Year</Form.Label>
                                        <Form.Control as="select" name="graduationYear" value={year} onChange={handleInputChange}>
                                            {graduationYears.map(grad => (<option key={grad}>{grad}</option>))}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>

                                    <Form.Group as={Col}>
                                        <Form.Label>Profile Picture</Form.Label>
                                        <div className="profileUpdate form-control">
                                            <Form.File />
                                        </div>

                                    </Form.Group>
                                </Form.Row>

                                <button type="button" className="btn btn-primary profileBtn">Update Profile</button>

                            </Form>
                        </div>


                        <h4 className="marginTop">Change Password</h4>
                        <hr />

                        <div className="passwordForm">

                            <Form noValidate method="PUT" action="profile">

                                <Form.Row>

                                    <Form.Group as={Col} >
                                        <Form.Label >Current Password</Form.Label>
                                        <Form.Control type="text" placeholder="Current Password"
                                            name="currentpwd" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="text" placeholder="New Password"
                                            name="newpwd" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="text" placeholder="Confirm Password"
                                            name="confirmpwd" />
                                    </Form.Group>

                                </Form.Row>

                                <button type="button" className="btn btn-primary profileBtn">Change Password</button>

                            </Form>
                        </div>


                    </div>


                </Container>

            </>
        </Layout>

    )

}

export default Profile;