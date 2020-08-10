import React, { useState, forwardRef, useImperativeHandle } from "react";
import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import * as StudentActions from "../../redux/actions/Pilates/StudentActions";

const StudentSelect = forwardRef((props, ref) => {
  const [value, setValue] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setFreeStudent() {
        setValue({ value: 0, label: "LIBRE" });
      }
    }),
    []
  );

  const promiseOptions = inputValue =>
    inputValue
      ? props.searchStudents({ fullName: inputValue }).then(students => {
          const mappedStudents = mapStudents(students);
          return mappedStudents;
        })
      : [];

  const mapStudents = students => {
    return students.map(s => {
      return { label: `${s.name} ${s.lastName}`, value: s.id };
    });
  };

  const onChange = selectedOption => {
    if (props.customOnChange) props.customOnChange(selectedOption);
    setValue(selectedOption);
  };

  return (
    <AsyncSelect
      defaultValue={
        props.student
          ? {
              label: `${props.student.fullName}`,
              value: props.student.id
            }
          : null
      }
      loadOptions={promiseOptions}
      onChange={onChange}
      value={value}
      noOptionsMessage={() => "No se encontraron resultados"}
      placeholder="Seleccione..."
    />
  );
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  searchStudents: StudentActions.searchStudents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(StudentSelect);
