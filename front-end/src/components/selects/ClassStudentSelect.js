import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import StudentSelect from "./StudentSelect";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ClassStudentSelect = ({
  classStudent,
  index,
  cleanStudent,
  ...props
}) => {
  const childRef = useRef();
  const [isIndividualClass, setIsIndividualClass] = useState(
    classStudent.isIndividualClass
  );

  const clean = () => {
    setIsIndividualClass(false);
    cleanStudent(index);
    childRef.current.setFreeStudent();
  };

  const onChangeClassStudent = selectedOption => {
    props.onChangeClassStudent(selectedOption, isIndividualClass, index);
  };

  const onChangeIsIndividualClass = event => {
    setIsIndividualClass(event.target.checked);
    props.onChangeIsIndividualClass(event.target.checked, index);
  };

  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      Clase individual
    </Tooltip>
  );

  return (
    <Row style={{ marginBottom: "5px" }}>
      <Col xs={10} style={{ paddingRight: "10px" }}>
        <StudentSelect
          ref={childRef}
          student={classStudent.student}
          customOnChange={onChangeClassStudent}
        />
      </Col>
      <Col xs={1} style={{ padding: "0px" }}>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <div style={{ display: "inline-block" }}>
            <Form.Check
              type="checkbox"
              name="isIndividualClass"
              style={{ marginTop: "20%", marginLeft: "20%" }}
              onChange={onChangeIsIndividualClass}
              checked={isIndividualClass}
              disabled={
                classStudent &&
                classStudent.student &&
                classStudent.student.id > 0
                  ? true
                  : false
              }
            />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={1} style={{ padding: "0px" }}>
        <Button variant="link" style={{ padding: "0" }} onClick={clean}>
          <AiFillDelete style={{ verticalAlign: "middle" }} />
        </Button>
      </Col>
    </Row>
  );
};

export default ClassStudentSelect;
