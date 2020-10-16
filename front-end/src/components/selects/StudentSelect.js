import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback
} from "react";
import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import * as StudentActions from "../../redux/actions/Pilates/StudentActions";

const StudentSelect = forwardRef((props, ref) => {
  const { register, searchStudents, customOnChange, setFormValue } = props;
  const [selectValue, setSelectValue] = useState();

  const updateValues = useCallback(
    selectedOption => {
      setSelectValue(selectedOption);

      const value = selectedOption ? selectedOption.value : null;
      setFormValue("studentId", value);
    },
    [setFormValue]
  );

  useEffect(() => {
    if (register)
      register({
        name: "studentId",
        value: selectValue ? selectValue.value : null
      });
  }, [register, selectValue]);

  useImperativeHandle(
    ref,
    () => ({
      setFreeStudent() {
        updateValues({ value: 0, label: "LIBRE" });
      },
      setValue(student) {
        if (student)
          updateValues({ value: student.id, label: student.fullName });
        else updateValues(null);
      }
    }),
    [updateValues]
  );

  const promiseOptions = inputValue =>
    inputValue
      ? searchStudents({ fullName: inputValue }).then(students => {
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
    if (customOnChange) customOnChange(selectedOption);
    updateValues(selectedOption);
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: "9999 !important",
      position: "relative"
    })
  };

  return (
    <AsyncSelect
      styles={customStyles}
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
      value={selectValue}
      noOptionsMessage={() => "No se encontraron resultados"}
      placeholder="Seleccione..."
      isDisabled={props.isDisabled}
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
