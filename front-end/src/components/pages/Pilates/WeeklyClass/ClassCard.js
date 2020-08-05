import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import GridBase from "../../../base/GridBase";
import { CLASSES_GRID } from "../../../helpers/GridHelper";
import Button from "react-bootstrap/Button";
import { FaPencilAlt } from "react-icons/fa";
import ClassModal from "./ClassModal";

const ClassCard = ({ weeklyClassId, students, hour, instructor }) => {
  const columns = React.useMemo(() => CLASSES_GRID, []);
  const data = React.useMemo(() => students, [students]);
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
              {instructor
                ? `${instructor.name} ${instructor.lastName}`
                : "No Asignado"}
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <ClassModal
        weeklyClassId={weeklyClassId}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};

export default ClassCard;
