import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as AreaActions from "../../redux/actions/Common/AreaActions";

const AreaMultiSelect = forwardRef((props, ref) => {
  const { register, getAreas } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValue(areas) {
        if (areas)
          setSelectValue(
            areas.map(area => {
              return { value: area.id, label: area.name };
            })
          );
        else setSelectValue(null);
      }
    }),
    []
  );

  useEffect(() => {
    if (register)
      register({
        name: "areaIds",
        value: selectValue ? selectValue.map(x => x.value) : null
      });
  }, [register, selectValue]);

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
  };

  const customStyles = {
    menuPortal: provided => ({
      ...provided,
      fontSize: "small"
    })
  };

  return (
    <Select
      isMulti
      menuPortalTarget={document.body}
      styles={customStyles}
      options={options}
      onChange={onChange}
      value={selectValue}
      noOptionsMessage={() => "No se encontraron resultados"}
      placeholder="Seleccione..."
      defaultValue={null}
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
)(AreaMultiSelect);
