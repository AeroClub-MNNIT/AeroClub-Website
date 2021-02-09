import React, { useEffect, useState } from "react";
import { Accordion, Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ProjForm from "./ProjForm";

export default function Dashprojects(props) {
  const [projects, setProjects] = useState([]);
  const [numProj, setnumProj] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    fetch("/api/my/projects", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });
  }, [props.r]);

  return (
    <div>
      <div className="container" style={{ minHeight: "60vh" }}>
        <Accordion>
          {projects.map((project) => {
            let badge;
            if (project.status === "Ongoing")
              badge = (
                <span class="badge badge-pill badge-warning">
                  {project.status}
                </span>
              );
            else if (project.status === "Completed")
              badge = (
                <span class="badge badge-pill badge-success">
                  {project.status}
                </span>
              );
            return (
              <Card key={project._id}>
                <Card.Header style={{ cursor: "pointer" }}>
                  <Accordion.Toggle as={Card.Header} eventKey={project._id}>
                    <div>
                      {project.title}
                      <em className="float-right">{badge}</em>
                    </div>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={project._id}>
                  <Card.Body>
                    <div className="p-3">
                      <div>
                        <div>Members</div>
                        {props.user._id == project.leader ? (
                          <Button
                            onClick={() => {
                              setModalShow(true);
                            }}
                          >
                            Invite
                          </Button>
                        ) : (
                          <span></span>
                        )}

                        <ul>
                          {project.members.map((member) => {
                            let badge;
                            if (member.accepted && member.leader) {
                              badge = <span>👑</span>;
                            } else if (member.accepted) {
                              badge = (
                                <span class="badge badge-pill badge-success">
                                  Member
                                </span>
                              );
                            } else {
                              if (member.user._id === props.user._id) {
                                badge = <spna></spna>;
                              } else
                                badge = (
                                  <span class="badge badge-pill badge-warning">
                                    Invited
                                  </span>
                                );
                            }
                            return (
                              <li>
                                {member.user.name}
                                <em className="float-right">{badge}</em>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  projectId={project._id}
                  r={props.r}
                  setr={props.setr}
                />
              </Card>
            );
          })}
          <Card key="newProj">
            <Card.Header style={{ cursor: "pointer" }}>
              <Accordion.Toggle as={Card.Header} eventKey="newProj">
                <h6>Create New Project</h6>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="newProj">
              <Card.Body>
                <ProjForm setr={props.setr} r={props.r} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const [email, setemail] = useState("");
  const projectId = props.projectId;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter email to invite.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            fetch(`/api/projects/invite`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
              body: JSON.stringify({
                email: email,
                projectId: projectId,
              }),
            }).then((res) => {
              console.log(res);
              props.onHide();
              if (res.status == 200) {
                toast.success("USER INVITED");
                props.setr(props.r + 1);
              } else {
                res.json().then((data) => {
                  toast.error(data.error);
                });
              }
            });
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}