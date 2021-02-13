import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { FormControl, Button, Form, Nav } from 'react-bootstrap'


export default (props) => {

    const [firstname, setFirstname] = useState("");
    console.log(props.firstname);
    if (firstname == "") {
        setFirstname(props.firstname);
        console.log(firstname);
    }

    return (

        <Navbar bg="primary" variant="dark" className="justify-content-between">

            <Nav className=" ">
                <Navbar.Brand href="/">Project Explorer</Navbar.Brand>

                <Form inline>
                    <FormControl type="text" placeholder="Search Projects" className="mr-2" />
                    <Button variant="outline-light" type="submit">Search</Button>
                </Form>

                <Nav>
                    <Nav.Link href="/project">Projects</Nav.Link>
                    <Nav.Link href="/projects/submit">Submit</Nav.Link>
                </Nav>

            </Nav>


            { (firstname != undefined) ? (
                <Nav className="justify-content-end">
                    <Nav.Link href="/logout" name="logout" >Logout</Nav.Link>
                    <Nav.Link href="" name="firstname" id="username">Hi, {firstname}</Nav.Link>
                </Nav>
            )
                :
                (<Nav className="justify-content-end">
                    <Nav.Link href="/signup" name="signup">Sign Up</Nav.Link>
                    <Nav.Link href="/login" name="login">Login</Nav.Link>
                </Nav>)}


        </Navbar>

    )

}
