import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import * as StudentActions from "../../redux/actions/Pilates/StudentActions";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StudentSelect = ({
  searchStudents,
  student,
  index,
  onChangeStudent,
  cleanStudent
}) => {
  const [value, setValue] = useState();

  const mapStudents = students => {
    return students.map(s => {
      return { label: `${s.name} ${s.lastName}`, value: s.id };
    });
  };

  const promiseOptions = inputValue =>
    inputValue
      ? searchStudents({ fullName: inputValue }).then(students => {
          const mappedStudents = mapStudents(students);
          return mappedStudents;
        })
      : [];

  const clean = () => {
    cleanStudent(index);
    setValue({ value: 0, label: "LIBRE" });
  };

  const onChange = selectedOption => {
    onChangeStudent(selectedOption, index);
    setValue(selectedOption);
  };

  return (
    <Row style={{ marginBottom: "5px" }}>
      <Col xs={11} style={{ paddingRight: "10px" }}>
        <AsyncSelect
          defaultValue={{
            label: `${student.fullName}`,
            value: student.id
          }}
          loadOptions={promiseOptions}
          noOptionsMessage={() => "No se encontraron resultados"}
          onChange={onChange}
          value={value}
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

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  searchStudents: StudentActions.searchStudents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSelect);
