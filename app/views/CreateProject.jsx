import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'


const CreateProject = (props) => {

    const [name, setName] = useState("");
    const [abstract, setAbstract] = useState("");
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        if (error.length < 1) {
            setError(props.createErr);
        }
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "name":
                setName(value);
                break;

            case "abstract":
                setAbstract(value);
                break;

            case "authors":
                setAuthors(value);
                break;

            case "tags":
                setTags(value);
                break;

        }
    }

    return (

        <Layout>
            <>

                <div className="mx-auto loginCenterDiv">
                    <h3>Submit Project</h3>

                    {error[0] != "" ? (
                        <Alert className="alert alert-danger"> {error.map((err) => (<p key={err}>{err}</p>))}</Alert>
                    ) : null}

                    <Form id="createProjectForm" method="POST" action="/projects/submit">

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Project Name"
                                    name="name" value={name} onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Row>


                        <Form.Group >
                            <Form.Label>Project Abstract</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                name="abstract" value={abstract} onChange={handleInputChange} />
                        </Form.Group>


                        <Form.Row>

                            <Form.Group as={Col} >
                                <Form.Label>Author(s)</Form.Label>
                                <Form.Control type="text" placeholder="Enter author names (seperated by comma)"
                                    name="authors" value={authors} onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} >
                                <Form.Label>Tag(s)</Form.Label>
                                <Form.Control type="text" placeholder="Use # to tag project with different topics (e.g #javascript #mongodb)"
                                    name="tags" value={tags} onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Row>


                        <Button variant="primary" type="submit">Continue </Button>

                    </Form>


                </div>

                <div className="pushCreateFooter">
                </div>

                {error[0] != "" ? (
                    <div className="projectError"></div>
                ) : null}
            </>
        </Layout>

    )

}

export default CreateProject;