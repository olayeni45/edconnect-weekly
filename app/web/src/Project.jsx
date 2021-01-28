import React, { useState, useEffect } from 'react'
import Layout from './shared/Layout'

import { Row, Form } from 'react-bootstrap'

const Project = (props) => {

    var projectId = window.location.href.split("/project/")[1];
    const projectUri = "/api/projects" + "/" + projectId;

    var usersApi;
    const [projectName, setProjectName] = useState("");
    const [projectAbstract, setProjectAbstract] = useState("");
    const [projectAuthor, setProjectAuthor] = useState([""]);
    const [projectTag, setProjectTag] = useState([""]);
    const [createdBy, setCreatedBy] = useState("");

    useEffect(() => {

        fetch(projectUri,
            {
                method: "GET"
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                usersApi = data.createdBy;
                console.log(usersApi);
                setProjectName(data.name);
                setProjectAbstract(data.abstract);
                setProjectAuthor(data.authors);
                setProjectTag(data.tags);

                const usersUri = "/api/users" + "/" + usersApi;
                console.log(usersUri);

                fetch(usersUri,
                    {
                        method: "GET"
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        setCreatedBy(data.firstname + " " + data.lastname);
                        console.log(createdBy);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                    })

            })
            .catch((error) => {
                console.log("Error", error);
            })

    }, [])


    return (

        <Layout>

            <>

                <div className="viewCenterContainer">

                    <h3 id="project_name">{projectName}</h3>

                    <div id="titleMargin"></div>

                    <div className="projectStatusContainer">

                        <div className="project">

                            <div className="statusFlex">

                                <div className="columnFlex">
                                    <p>Created By</p>
                                    <p className="bold createdBy" id="project_author">{createdBy}</p>
                                </div>

                                <div className="columnFlex">
                                    <p>Date Created</p>
                                    <p className="bold">2020-09-04</p>
                                </div>

                                <div className="columnFlex">
                                    <p>Last Updated</p>
                                    <p className="bold">2020-09-04</p>
                                </div>

                            </div>

                        </div>

                        <div id="btnFlex">
                            <a className="btn btn-primary" href="#" role="button">Edit Project</a>
                        </div>

                    </div>

                    <div id="margin"></div>

                    <div className="content">

                        <Row>

                            <div className="viewCol">

                                <h4>Project Abstract</h4>
                                <hr />

                                <div className="abstractDiv" id="project_abstract">
                                    {projectAbstract}</div>

                                <div className="positioning">

                                    <Form.Group >
                                        <Form.Label>Comments</Form.Label>
                                        <Form.Control as="textarea"
                                            name="projectAbstract" />
                                    </Form.Group>

                                    <button type="button" className="btn btn-primary pushButton">Submit</button>
                                </div>

                            </div>

                            <div className="viewCol">

                                <h4>Project Details</h4>
                                <hr />

                                <div className="card firstCard">
                                    <div className="card-header">
                                        Author(s)</div>
                                    <div className="card-body authorsName" id="project_authors">

                                        {(projectAuthor.map((auth) => (
                                            <div key={auth}>
                                                <p>{auth}</p>

                                            </div>
                                        )))}

                                    </div>
                                    <div className="card-footer" id="project_tags">
                                        {projectTag.map((tag) => (
                                            <div key={tag}>
                                                <p>{tag}</p>

                                            </div>

                                        ))}
                                    </div>
                                </div>

                                <br />

                                <div id="viewmarginBottom"></div>

                                <div className="card">
                                    <div className="card-header bold">
                                        Project Files
                            </div>
                                    <div className="card-body">

                                        <p className="card-text centerText">No file uploaded yet</p>

                                    </div>
                                </div>





                            </div>

                        </Row>

                    </div>



                </div>

            </>

        </Layout>

    )

}

export default Project;