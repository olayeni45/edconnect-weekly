import React, { useEffect, useState } from 'react'
import { Transformation, Image } from 'cloudinary-react'
import Navbar from 'react-bootstrap/Navbar'
import { FormControl, Button, Form, Nav } from 'react-bootstrap'

export default (props) => {

    const [url, setUrl] = useState("");
    const [firstname, setFirstName] = useState("");

    useEffect(() => {
        setUrl(props.url);
        setFirstName(props.firstname);
    }, []);

    return (

        <Navbar bg="primary" variant="dark" expand="lg">

            <Navbar.Brand href="/">Project Explorer</Navbar.Brand>

            <Navbar.Toggle aria-controls="collapse-navbar" />

            <Navbar.Collapse id="collapse-navbar">

                <Nav>

                    <Form inline>
                        <FormControl type="text" placeholder="Search Projects" className="mr-2 searchForm" />
                        <Button variant="outline-light" type="submit" className="mr-2 searchButton">Search</Button>
                    </Form>

                    <Nav.Link href="/projects/submit" className="headerNav">Create Project</Nav.Link>

                </Nav>

                {
                    (firstname != undefined) ? (

                        <Nav className="ml-auto">

                            <Nav.Link href="/logout" name="logout" className="headerNav" >Logout</Nav.Link>

                            <div className="NamePicture">
                                <Nav.Link href="/profile" name="firstname" id="username" className="headerNav Hi">Hi, {firstname}</Nav.Link>
                                <div className="profilePictureCircle">
                                    <Image cloudName="edconnect" publicId={url} type="fetch">
                                        <Transformation width="43" height="43" gravity="face" radius="max" crop="fill" fetchFormat="auto" />
                                    </Image>
                                </div>
                            </div>

                        </Nav>
                    )
                        :
                        (<Nav className="ml-auto">
                            <Nav.Link href="/signup" name="signup" className="headerNav">Sign Up</Nav.Link>
                            <Nav.Link href="/login" name="login" className="headerNav">Login</Nav.Link>
                        </Nav>)
                }


            </Navbar.Collapse>

        </Navbar>

    )

}
