import React, { useEffect, useState } from 'react'
import { Transformation, Image } from 'cloudinary-react'
import Navbar from 'react-bootstrap/Navbar'
import { FormControl, Button, Form, Nav } from 'react-bootstrap'


export default ({ firstname, url }) => {


    return (

        <Navbar bg="primary" variant="dark" className="justify-content-between" >

            <Nav className=" ">
                <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search Projects" className="mr-2" />
                    <Button variant="outline-light" type="submit">Search</Button>
                </Form>

                <Nav>
                    <Nav.Link href="/project" className="headerNav">Projects</Nav.Link>
                    <Nav.Link href="/projects/submit" className="headerNav">Submit</Nav.Link>
                </Nav>

            </Nav>

            {
                (firstname != undefined) ? (
                    <Nav className="justify-content-end">
                        <Nav.Link href="/logout" name="logout" className="headerNav" >Logout</Nav.Link>
                        <Nav.Link href="/profile" name="firstname" id="username" className="headerNav">Hi, {firstname}</Nav.Link>
                        <div className="profilePictureCircle">

                            <Image cloudName="edconnect" publicId={url} type="fetch">
                                <Transformation width="43" height="43" gravity="face" radius="max" crop="fill" fetchFormat="auto" />
                            </Image>
                        </div>
                    </Nav>
                )
                    :
                    (<Nav className="justify-content-end">
                        <Nav.Link href="/signup" name="signup" className="headerNav">Sign Up</Nav.Link>
                        <Nav.Link href="/login" name="login" className="headerNav">Login</Nav.Link>
                    </Nav>)
            }


        </Navbar>

    )

}
