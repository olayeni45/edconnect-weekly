import React, { useEffect, useState } from 'react'
import Layout from './shared/Layout'
import { Jumbotron, Button, Container, Row, Card, Col } from 'react-bootstrap'

const Home = (props) => {

    const [apiResponse, setApiResponse] = useState("");
    const createProjectUri = "/api/projects";

    return (

        <Layout>
            <>

                <Jumbotron className="mx-auto" >
                    <h1>Welcome to Project Explorer</h1>
                    <p>
                        Project Explorer is a repository for final year projects across
                        all departments at your institution. You can submit your projects
                        and search for other projects submitted by others to learn from.
                </p>
                    <p>
                        <Button href="/signup" variant="primary" className="mr-2">Get Started</Button>
                        <Button href="/login" variant="secondary">Login</Button>
                    </p>
                </Jumbotron>

                <Container className="cardContainer mx-auto">


                </Container>



            </>
        </Layout>

    )

}

export default Home;