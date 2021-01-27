import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { FormControl, Button, Form, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

export default () => {

    let history = useHistory();
    var home;
    const usersUri = "/api/users";
    var uid;
    const [welcome, setWelcome] = useState("");
    var sign;

    if (window.location.href.split("3000")[1] == "/projects/submit") {
        sign = "true";
    }


    const handleLogout = () => {
        document.cookie = "uid=; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/";
        history.push("/");
    }

    if (window.location.href.split("3000")[1] === "/") {
        home = "/";
        useEffect(() => {

            if (document.cookie != "") {
                uid = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];
                let personalCookieUri = usersUri + "/" + uid;

                fetch(personalCookieUri,
                    {
                        "method": "GET"
                    })
                    .then(async (response) => {
                        var data = await response.json();
                        console.table(data)
                        setWelcome(data.firstname);
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                    });
            }
        }, [])

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
                    <Nav.Link href="/projects">Projects</Nav.Link>
                    <Nav.Link href="/projects/submit">Submit</Nav.Link>
                </Nav>

            </Nav>


            {(home === "/" && (document.cookie != "")) ? (
                <Nav className="justify-content-end">
                    <Nav.Link href="#" name="logout" onClick={handleLogout}>Logout</Nav.Link>
                    <Nav.Link href="#" name="welcome">Hi, {welcome}</Nav.Link>
                </Nav>
            )
                : (sign == "true") ? (
                    <Nav className="justify-content-end">
                        <Nav.Link href="#" ></Nav.Link>
                        <Nav.Link href="#" ></Nav.Link>
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
