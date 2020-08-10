import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentSelect from "./StudentSelect";

const WeeklyClassStudentSelect = ({
  student,
  index,
  onChangeStudent,
  cleanStudent
}) => {
  const childRef = useRef();

  const clean = () => {
    cleanStudent(index);
    childRef.current.setFreeStudent();
  };

  const onChangeWeeklyClassStudent = selectedOption => {
    onChangeStudent(selectedOption, index);
  };

  return (
    <Row style={{ marginBottom: "5px" }}>
      <Col xs={11} style={{ paddingRight: "10px" }}>
        <StudentSelect
          ref={childRef}
          student={student}
          customOnChange={onChangeWeeklyClassStudent}
        />
      </Col>
      <Col style={{ padding: "0px" }}>
        <Button variant="link" style={{ padding: "0" }} onClick={clean}>
          <AiFillDelete style={{ verticalAlign: "middle" }} />
        </Button>
      </Col>
    </Row>
  );
};

export default WeeklyClassStudentSelect;
