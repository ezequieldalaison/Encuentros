import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as ProfessionalActions from "../../redux/actions/General/ProfessionalActions";

const ProfessionalSelect = forwardRef((props, ref) => {
  const {
    register,
    getProfessionalsByArea,
    areaId,
    isPopUp,
    setFormValue
  } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValue(professional) {
        if (professional)
          setSelectValue({
            value: professional.id,
            label: professional.fullName
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
    if (register) {
      const value = selectValue ? selectValue.value : null;
      register({
        name: "professionalId",
        value: value
      });
      if (setFormValue) setFormValue("professionalId", value);
    }
  }, [register, selectValue, setFormValue]);

  useEffect(() => {
    getProfessionalsByArea(areaId).then(professionals => {
      const mappedProfessionals = mapProfessionals(professionals);
      setOptions(mappedProfessionals);
    });
  }, [getProfessionalsByArea, areaId]);

  const mapProfessionals = professionals => {
    return professionals.map(m => {
      return { label: m.fullName, value: m.id };
    });
  };

  const onChange = selectedOption => {
    if (props.onChange) props.onChange(selectedOption);
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
      styles={customStyles}
      menuPortalTarget={isPopUp ? null : document.body}
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
  return { professionals: state.professionals };
}

const mapDispatchToProps = {
  getProfessionalsByArea: ProfessionalActions.getProfessionalsByArea
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(ProfessionalSelect);
