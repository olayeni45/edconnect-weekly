import React, { useState, useEffect } from 'react'
import { Transformation, Image } from 'cloudinary-react'
import Layout from './shared/Layout'
import { Row, Form, Container, Col } from 'react-bootstrap'

const Project = (props) => {

    const [projectName, setProjectName] = useState("");
    const [projectAbstract, setProjectAbstract] = useState("");
    const [projectAuthor, setProjectAuthor] = useState([""]);
    const [projectTag, setProjectTag] = useState([""]);
    const [createdBy, setCreatedBy] = useState("");

    const created = new Date(props.projectsOfId.createdAt).toLocaleDateString();
    const updated = new Date(props.projectsOfId.updatedAt).toLocaleDateString();

    const [url, setUrl] = useState("");
    useEffect(() => {
        setProjectName(props.projectsOfId.name);
        setProjectAbstract(props.projectsOfId.abstract);
        setProjectAuthor(props.projectsOfId.authors);
        setProjectTag(props.projectsOfId.tags);
        setCreatedBy(props.userOfId.firstname + " " + props.userOfId.lastname);
        setUrl(props.userOfId.url);
    }, [])

    return (

        <Layout {...props.user}>

            <>

                <Row className="topProjectRow">

                    <Col xl={9} lg={9} md={9} sm={9} xs={9}>
                        <h3 id="project_name">{projectName}</h3>

                        <div id="titleMargin"></div>

                        <Row className="projectRow">

                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>

                                <Row>

                                    <Col className="picturerow" xl={4} lg={4} md={5} sm={5} xs={5}>

                                        <div className="pictureFlex">
                                            <div className="projectCircle">
                                                <Image cloudName="edconnect" publicId={url} type="fetch">
                                                    <Transformation width="55" height="55" gravity="face" radius="max" crop="fill" fetchFormat="auto" />
                                                </Image>
                                            </div>
                                        </div>

                                        <div className="columnFlex">
                                            <p>Created By</p>
                                            <p className="bold createdBy" id="project_author">{createdBy}</p>
                                        </div>

                                    </Col>

                                    <Col className="columnFlex" xl={3} lg={3} md={3} sm={3} xs={3}>
                                        <p>Date Created</p>
                                        <p className="bold">{created}</p>
                                    </Col>

                                    <Col className="columnFlex" xl={3} lg={3} md={3} sm={3} xs={3}>
                                        <p>Last Updated</p>
                                        <p className="bold">{updated}</p>
                                    </Col>


                                </Row>

                            </Col>

                        </Row>

                        <div id="margin"></div>

                        <div className="content">

                            <Row>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12} className="firstProjectColumn">

                                    <h4>Project Abstract</h4>
                                    <hr />

                                    <div className="abstractDiv" id="project_abstract">
                                        {projectAbstract}</div>

                                    <div className="positioning">

                                        <Form.Group>
                                            <Form.Label>Comments</Form.Label>
                                            <Form.Control as="textarea"
                                                name="projectAbstract" />
                                        </Form.Group>

                                        <button type="button" className="btn btn-primary pushButton">Submit</button>
                                    </div>

                                </Col>

                                <Col xl={6} lg={6} md={12} sm={12} xs={12}>

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

                                </Col>

                            </Row>

                        </div>
                    </Col>

                    <Col></Col>

                </Row>

            </>

        </Layout>

    )

}

export default Project;