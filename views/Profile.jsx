import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Alert, Container, Col, Row } from 'react-bootstrap'

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

    const [picture, setPicture] = useState();
    const [imagepath, setImagepath] = useState("");

    const handlePicture = event => {
        const { name, files } = event.target;

        switch (name) {

            case 'picture':
                setPicture(files[0]);
                setImagepath(value);
        }
    }


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = event => {
        const { name, value, files } = event.target;

        switch (name) {

            case 'currentPassword':
                setCurrentPassword(value);
                break;

            case 'newPassword':
                setNewPassword(value);
                break;

            case 'confirmPassword':
                setConfirmPassword(files);
                break;

        }
    }

    const [profileError, setProfileError] = useState("");

    useEffect(() => {
        setProfileError(props.modifyError);
    }, [])

    const [success, setSuccess] = useState("");

    useEffect(() => {
        setSuccess(props.success);
    }, [])

    return (

        <Layout {...props.user} >
            <>
                <Container>

                    <Row className="rowProfile">

                        <Col xl={10} lg={10} md={10} sm={10} xs={10}>

                            <Row className="rowProfileName">

                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <div className="userDetails">
                                        <h3 className="profileName">{props.user.firstname} {props.user.lastname}</h3>
                                        <p className="text-secondary emailDiv">{props.user.email}</p>
                                    </div>
                                </Col>

                            </Row>


                            <div id="titleMargin"></div>

                            <Row className="projectStatus">
                                <Col className="columnFlex">
                                    <p className="bold">Program</p>
                                    <p className="boldP">{props.user.program}</p>
                                </Col>

                                <Col className="columnFlex">
                                    <p className="bold">Matriculation Number</p>
                                    <p className="boldP">{props.user.matricNumber}</p>
                                </Col>

                                <Col className="columnFlex">
                                    <p className="bold">Graduation Year</p>
                                    <p className="boldP">{props.user.graduationYear}</p>
                                </Col>


                            </Row>


                            <h4 className="marginTop">Update Profile</h4>
                            <hr />

                            {success != "" ? (success == "An error has occured, please try again." ? (<Alert className="alert alert-danger">{success} </Alert>) : (<Alert className="alert alert-success">{success} </Alert>)) : null}

                            <div className="profileForm">

                                <Row className="profileRow">

                                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>

                                        <Form noValidate method="POST" action="/profileUser?_method=PUT" encType="multipart/form-data" >

                                            <Row className="profileFormRow">
                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label >First Name</Form.Label>
                                                        <Form.Control type="text" value={firstName}
                                                            onChange={handleInputChange} name="firstName" />
                                                    </Form.Group>
                                                </Col>

                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control type="text" value={lastName}
                                                            onChange={handleInputChange} name="lastName" />
                                                    </Form.Group>
                                                </Col>

                                            </Row>

                                            <Row className="profileFormRow">

                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label>Email Address</Form.Label>
                                                        <Form.Control type="email" value={email}
                                                            readOnly name="email" />
                                                    </Form.Group>
                                                </Col>

                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label>Program</Form.Label>
                                                        <Form.Control as="select" name="program" value={program} onChange={handleInputChange} >
                                                            {programList.map(program => (<option key={program}>{program}</option>))}

                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>

                                            <Row className="profileFormRow">

                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label>Matric Number</Form.Label>
                                                        <Form.Control type="text" value={matric}
                                                            onChange={handleInputChange} name="matricNumber" />
                                                    </Form.Group>
                                                </Col>

                                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label>Graduation Year</Form.Label>
                                                        <Form.Control as="select" name="graduationYear" value={year} onChange={handleInputChange}>
                                                            {graduationYears.map(grad => (<option key={grad}>{grad}</option>))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>

                                            <Row className="profileFormRow">

                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Profile Picture</Form.Label>
                                                        <div className="profileUpdate form-control">
                                                            <input type="file" name="picture" accept=".png, .jpg, .jpeg" onChange={handlePicture} />
                                                        </div>

                                                    </Form.Group>
                                                </Col>

                                            </Row>

                                            <button type="submit" className="btn btn-primary profileBtn">Update Profile</button>

                                        </Form>


                                    </Col>


                                </Row>

                            </div>

                            <h4 className="marginTop">Change Password</h4>
                            <hr />

                            {profileError != "" ? (profileError == "Password Updated" ? (<Alert className="alert alert-success">{profileError} </Alert>) : (<Alert className="alert alert-danger">{profileError} </Alert>)) : null}

                            <div className="changePasswordForm">

                                <Row className="changePasswordRow">

                                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>

                                        <Form method="POST" action="/profilePassword?_method=PUT">

                                            <Row>
                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label >Current Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Current Password" required
                                                            onChange={handlePasswordChange} name="currentPassword" value={currentPassword} />
                                                    </Form.Group>
                                                </Col>

                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label>New Password</Form.Label>
                                                        <Form.Control type="password" placeholder="New Password" value={newPassword}
                                                            onChange={handlePasswordChange} name="newPassword" required />
                                                    </Form.Group>
                                                </Col>

                                                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                                    <Form.Group>
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                                                            onChange={handlePasswordChange} name="confirmPassword" required />
                                                    </Form.Group>
                                                </Col>

                                                <button type="submit" className="btn btn-primary changeBtn">Change Password</button>

                                            </Row>

                                        </Form>

                                    </Col>

                                    <Col></Col>

                                </Row>

                            </div>

                        </Col>

                    </Row>

                </Container>

            </>
        </Layout>

    )

}

export default Profile;