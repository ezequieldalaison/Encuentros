import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ClassCard from "./ClassCard";
import { formatDateWithoutYear, isToday } from "../../../helpers/DateHelper";

const DayClassCard = ({ dayName, classes }) => {
  return (
    <Accordion>
      <Card
        border="secondary"
        bg={
          classes && classes[0] && isToday(classes[0].date) ? "dark" : "light"
        }
      >
        <Card.Header style={{ padding: "5px" }}>
          <Accordion.Toggle as={Button} variant="link">
            <h6>{`${dayName} ${
              classes && classes[0]
                ? " - " + formatDateWithoutYear(classes[0].date)
                : ""
            }`}</h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse in={true}>
          <Card.Body style={{ padding: "5px" }}>
            {classes.map(c => (
              <ClassCard
                key={c.day.id + "-" + c.hour}
                date={c.date}
                hour={c.hour}
                classStudents={c.classStudents}
                instructor={c.instructor}
              />
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default DayClassCard;
