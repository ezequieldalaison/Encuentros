import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as AreaActions from "../../redux/actions/Common/AreaActions";

const AreaSelect = forwardRef((props, ref) => {
  const { register, getAreas, customOnChange, isMulti, setFormValue } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValues(areas) {
        if (areas)
          setSelectValue(
            areas.map(area => {
              return { value: area.id, label: area.name };
            })
          );
        else setSelectValue(null);
      },
      setValue(area) {
        if (area) setSelectValue({ value: area.id, label: area.name });
        else setSelectValue(null);
      }
    }),
    []
  );

  useEffect(() => {
    if (register) {
      if (isMulti) {
        const values = selectValue ? selectValue.map(x => x.value) : null;
        register({
          name: "areaIds",
          value: values
        });
        if (setFormValue) setFormValue("areaIds", values);
      } else {
        const value = selectValue ? selectValue.value : null;
        register({
          name: "areaId",
          value: value
        });
        if (setFormValue) setFormValue("areaId", value);
      }
    }
  }, [register, selectValue, isMulti, setFormValue]);

  useEffect(() => {
    getAreas().then(areas => {
      const mappedAreas = mapAreas(areas);
      setOptions(mappedAreas);
    });
  }, [getAreas]);

  const mapAreas = areas => {
    return areas.map(m => {
      return { label: m.name, value: m.id };
    });
  };

  const onChange = selectedOption => {
    setSelectValue(selectedOption);
    if (customOnChange) customOnChange(selectedOption.value);
  };

  const customStyles = {
    menuPortal: provided => ({
      ...provided,
      fontSize: "small"
    })
  };

  return (
    <Select
      isMulti={isMulti}
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
  return { areas: state.areas };
}

const mapDispatchToProps = {
  getAreas: AreaActions.getAreas
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(AreaSelect);
