import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import ClassCard from "./ClassCard";
import {
  formatDateWithoutYear,
  isToday,
  isLowerThanToday
} from "../../../helpers/DateHelper";
import { AiFillSave } from "react-icons/ai";
import ProfessionalWorkDayModal from "./ProfessionalWorkDayModal";

const DayClassCard = ({ dayId, dayName, classes }) => {
  const [date, setDate] = useState();
  const [color, setColor] = useState();
  const [showCloseClassButton, setShowCloseClassButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const onSavePWD = () => {
    handleClose();
    isToday(classes[0].date) ? setColor("dark") : setColor("secondary");
    setShowCloseClassButton(false);
  };

  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (classes && classes[0]) {
      setDate(classes[0].date);
      if (isToday(classes[0].date)) setColor("dark");
      else if (classes[0].isClosed) setColor("secondary");
      else if (isLowerThanToday(classes[0].date)) setColor("danger");
      else setColor("light");

      setShowCloseClassButton(
        isLowerThanToday(classes[0].date) && !classes[0].isClosed
      );
    }
  }, [classes]);

  useEffect(() => {}, [color]);

  return (
    <>
      <Card border="secondary" bg={color}>
        <Card.Header style={{ padding: "5px", height: "35px" }}>
          <Accordion.Toggle as="div">
            <div style={{ float: "left" }}>
              <h6
                style={{ color: color !== "light" ? "white" : "#007bff" }}
              >{`${dayName} ${
                date ? " - " + formatDateWithoutYear(date) : ""
              }`}</h6>
            </div>
            {showCloseClassButton ? (
              <div style={{ float: "right" }}>
                <Button variant="link" style={{ padding: "0" }}>
                  <AiFillSave
                    style={{ verticalAlign: "top" }}
                    onClick={handleShow}
                  />
                </Button>
              </div>
            ) : null}
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
                professional={c.professional}
              />
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <ProfessionalWorkDayModal
        date={date}
        dayId={dayId}
        show={showModal}
        handleClose={handleClose}
        onSavePWD={onSavePWD}
      />
    </>
  );
};

export default DayClassCard;
