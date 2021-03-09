import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ProjForm from "./ProjForm";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Dashprojects(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const user = useSelector(state => state.user);
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/isSignedIn`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("jwtToken");
          toast.warn(data.error);
          history.push("/user/login");
        }
      });
  }, []);

  return (
    <div>
      <div className="container" style={{ minHeight: "60vh" }}>
        <Accordion>
          {user?.projects?.map((project) => {
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
                        {user._id === project.leader ? (
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
                                badge = (
                                  <span class="badge badge-pill badge-warning">
                                    Invited
                                  </span>
                                );
                            }
                            return (
                              <li>
                                {member.user?.name}
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
                <ProjForm />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
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
              props.onHide();
              if (res.status == 200) {
                toast.success("USER INVITED");
                res.json().then((data) => {
                  console.log(data.updatedProject);
                  dispatch({type: "INVITE_USER", payload: data.updatedProject})
                });
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