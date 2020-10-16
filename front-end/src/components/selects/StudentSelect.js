import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect
} from "react";
import AsyncSelect from "react-select/async";
import { connect } from "react-redux";
import * as StudentActions from "../../redux/actions/Pilates/StudentActions";

const StudentSelect = forwardRef((props, ref) => {
  const { register, searchStudents, customOnChange, setFormValue } = props;
  const [selectValue, setSelectValue] = useState();

  useEffect(() => {
    if (register) {
      const p = {};
      p.name = "studentId";
      p.value = selectValue ? selectValue.value : null;
      register(p);
    }
  }, [register, selectValue]);

  useImperativeHandle(
    ref,
    () => ({
      setFreeStudent() {
        setSelectValue({ value: 0, label: "LIBRE" });
      },
      setValue(student) {
        if (student)
          setSelectValue({ value: student.id, label: student.fullName });
        else setSelectValue(null);
      }
    }),
    []
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
    setSelectValue(selectedOption);
    setFormValue("studentId", selectedOption.value);
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
