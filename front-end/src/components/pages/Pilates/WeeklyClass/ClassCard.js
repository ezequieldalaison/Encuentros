import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import GridBase from "../../../base/GridBase";
import { CLASSES_GRID } from "../../../helpers/GridHelper";
import Button from "react-bootstrap/Button";
import { FaPencilAlt } from "react-icons/fa";
import ClassModal from "./ClassModal";

const ClassCard = ({ date, classStudents, hour, instructor }) => {
  const columns = React.useMemo(() => CLASSES_GRID, []);
  const data = React.useMemo(() => classStudents, [classStudents]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ marginTop: "5px" }}>
        <Card.Header style={{ padding: "5px" }}>
          <Accordion.Toggle as="div" style={{ marginBottom: "0px" }}>
            <div style={{ float: "left" }}>
              <h6 style={{ margin: "0" }}>{hour}</h6>
            </div>
            <div style={{ float: "right" }}>
              <Button
                variant="link"
                style={{ padding: "0" }}
                onClick={handleShow}
              >
                <FaPencilAlt style={{ verticalAlign: "top" }} />
              </Button>
            </div>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse in={true}>
          <Card.Body style={{ padding: "5px" }}>
            <GridBase columns={columns} data={data} />
            <p style={{ fontSize: "small", margin: "0" }}>
              <b>Profesor:</b>{" "}
              {instructor ? instructor.fullName : "No Asignado"}
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <ClassModal
        date={date}
        hour={hour}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};

export default ClassCard;
