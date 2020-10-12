import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as MovementStatusActions from "../../redux/actions/General/MovementStatusActions";

const MovementStatusSelect = forwardRef((props, ref) => {
  const { register, getMovementStatuses, addOptionAll } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValue(movementStatus) {
        if (movementStatus)
          setSelectValue({
            value: movementStatus.id,
            label: movementStatus.name
          });
        else setSelectValue(null);
      },
      getValue() {
        return selectValue;
      }
    }),
    [selectValue]
  );

  useEffect(() => {
    if (register)
      register({
        name: "movementStatusId",
        value: selectValue ? selectValue.value : null
      });
  }, [register, selectValue]);

  useEffect(() => {
    getMovementStatuses().then(movementStatuses => {
      const mappedMovementStatuses = mapMovementStatuses(movementStatuses);
      if (addOptionAll)
        mappedMovementStatuses.unshift({ label: "TODOS", value: "0" });
      setOptions(mappedMovementStatuses);
    });
  }, [getMovementStatuses, addOptionAll]);

  const mapMovementStatuses = movementStatuses => {
    return movementStatuses.map(m => {
      return { label: m.name, value: m.id };
    });
  };

  const onChange = selectedOption => {
    setSelectValue(selectedOption);
    if (props.onChange) props.onChange(selectedOption);
  };

  const customStyles = {
    menuPortal: provided => ({
      ...provided,
      fontSize: "small"
    })
  };

  return (
    <Select
      menuPortalTarget={document.body}
      styles={customStyles}
      options={options}
      onChange={onChange}
      value={selectValue}
      noOptionsMessage={() => "No se encontraron resultados"}
      placeholder="Seleccione..."
      defaultValue={null}
      isDisabled={props.isDisabled}
    />
  );
});

function mapStateToProps(state) {
  return { movementStatuses: state.movementStatuses };
}

const mapDispatchToProps = {
  getMovementStatuses: MovementStatusActions.getMovementStatuses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(MovementStatusSelect);
