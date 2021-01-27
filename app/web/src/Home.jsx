import React, { useEffect, useState } from 'react'
import Layout from './shared/Layout'
import { Link } from 'react-router-dom'
import { Jumbotron, Button, Row, Card, Col } from 'react-bootstrap'

const Home = (props) => {

    const createProjectUri = "/api/projects";
    const [project, setProject] = useState([]);

    useEffect(() => {

        fetch(createProjectUri,
            {
                method: "GET",
                headers: { 'Content-type': 'application/json' }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                setProject(data);

            })
            .catch((error) => {
                console.log("Error: ", error);
            });

    }, [])


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

                <div className="cardContainer mx-auto">

                    <div>

                        <Row className="showcase">

                            {project.slice(0, 4).map((projects) => (
                                <Col key={projects.name}>
                                    <Card className="indexCard">
                                        <Card.Body>
                                            <h5>
                                                <Link to={`/projects/${projects.id}`}>{projects.name}</Link></h5>
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