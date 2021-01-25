import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const CreateProject = (props) => {
    let history = useHistory();


    const [projectName, setProjectName] = useState("");
    const [projectAbstract, setProjectAbstract] = useState("");
    const [projectAuthor, setProjectAuthor] = useState("");
    const [projectTag, setProjectTag] = useState("");
    const [error, setError] = useState([""]);

    const createProjectUri = "/api/projects";

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "projectName":
                setProjectName(value);
                break;

            case "projectAbstract":
                setProjectAbstract(value);
                break;

            case "projectAuthor":
                setProjectAuthor(value);
                break;

            case "projectTag":
                setProjectTag(value);
                break;

        }
    }

    if (document.cookie == "") {
        history.push("/login");
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        var createProjectData = {
            "name": projectName,
            "abstract": projectAbstract,
            "authors": [projectAuthor],
            "tags": [projectTag]
        }


        fetch(createProjectUri,
            {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(createProjectData)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.status === "ok") {
                    console.log(data);
                    console.log(createProjectData);
                    history.push("/");
                }
                else {
                    setError(data.errors)
                    console.log(data.errors);

                }
            })
            .catch((error) => {
                console.log("Error: " + error);
            });

    }



    return (

        <Layout>
            <>

                <div className="mx-auto loginCenterDiv">
                    <h3>Submit Project</h3>

                    {error[0].length != 0 ? (
                        <Alert className="alert alert-danger"> {error.map((err) => (<p key={err}>{err}</p>))}</Alert>
                    ) : null}

                    <Form id="createProjectForm" onSubmit={handleSubmit}>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Project Name"
                                    name="projectName" value={projectName} onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Row>


                        <Form.Group >
                            <Form.Label>Project Abstract</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                name="projectAbstract" value={projectAbstract} onChange={handleInputChange} />
                        </Form.Group>


                        <Form.Row>

                            <Form.Group as={Col} >
                                <Form.Label>Author(s)</Form.Label>
                                <Form.Control type="text" placeholder="Enter author names (seperated by comma)"
                                    name="projectAuthor" value={projectAuthor} onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} >
                                <Form.Label>Tag(s)</Form.Label>
                                <Form.Control type="text" placeholder="Use # to tag project with different topics (e.g #javascript #mongodb)"
                                    name="projectTag" value={projectTag} onChange={handleInputChange} />
                            </Form.Group>
                        </Form.Row>


                        <Button variant="primary" type="submit">Continue </Button>

                    </Form>


                </div>

                <div className="pushCreateFooter">
                </div>

                {error[0].length != 0 ? (
                    <div className="projectError"></div>
                ) : null}
            </>
        </Layout>

    )

}

export default CreateProject;