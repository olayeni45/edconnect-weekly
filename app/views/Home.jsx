import React, { useEffect, useState } from 'react'
import Layout from './shared/Layout'

import { Jumbotron, Button, Row, Card, Col } from 'react-bootstrap'

const Home = (props) => {

    const [project, setProject] = useState([]);

    return (

        <Layout {...props.user}>
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

                <div className="cardContainer mx-auto">

                    <div>

                        <Row className="showcase">

                            {props.projects.slice(0, 4).map((projects) => (
                                <Col key={projects.name}>
                                    <Card className="indexCard">
                                        <Card.Body>
                                            <h5>
                                                <a href={`/project/${projects.id}`}>{projects.name} </a>
                                            </h5>
                                            <Card.Subtitle className="mb-2 text-muted">{projects.authors}</Card.Subtitle>
                                            <Card.Text>
                                                {projects.abstract}</Card.Text>
                                            <Card.Link href="#">{projects.tags}</Card.Link>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}




                        </Row>



                    </div>

                </div>



            </>
        </Layout>

    )

}

export default Home;