import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ClassCard from "./ClassCard";

const DayClassCard = ({ dayName, weeklyClasses }) => {
  return (
    <Accordion>
      <Card border="secondary">
        <Card.Header style={{ padding: "5px" }}>
          <Accordion.Toggle as={Button} variant="link">
            <h6>{dayName}</h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse in={true}>
          <Card.Body style={{ padding: "5px" }}>
            {weeklyClasses.map(wc => (
              <ClassCard
                key={wc.id}
                students={wc.students}
                hour={wc.hour}
                instructor={wc.instructor}
              />
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default DayClassCard;
