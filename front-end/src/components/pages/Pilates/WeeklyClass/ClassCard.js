import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import GridBase from "../../../base/GridBase";
import { CLASSES_GRID } from "../../../helpers/GridHelper";
import { Button } from "react-bootstrap";

const ClassCard = ({ students, hour, instructor }) => {
  const columns = React.useMemo(() => CLASSES_GRID, []);
  const data = React.useMemo(() => students, [students]);

  return (
    <Card style={{ marginTop: "5px" }}>
      <Card.Header style={{ padding: "5px" }}>
        <Accordion.Toggle as="label" style={{ marginBottom: "0px" }}>
          <h6 style={{ margin: "0" }}>{hour}</h6>
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: "15px" }}
          ></Button>
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
  );
};

export default ClassCard;
