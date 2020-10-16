import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as FeeTypeActions from "../../redux/actions/Pilates/FeeTypeActions";

const FeeTypeSelect = forwardRef((props, ref) => {
  const { register, getFeeTypes, customOnChange, setFormValue } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  const updateValues = useCallback(
    selectedOption => {
      setSelectValue(selectedOption);

      const value = selectedOption ? selectedOption.value : null;
      setFormValue("feeTypeId", value);
    },
    [setFormValue]
  );

  useImperativeHandle(
    ref,
    () => ({
      setValue(feeType) {
        if (feeType) updateValues({ value: feeType.id, label: feeType.name });
        else updateValues(null);
      }
    }),
    [updateValues]
  );

  useEffect(() => {
    if (register)
      register({
        name: "feeTypeId",
        value: selectValue ? selectValue.value : null
      });
  }, [register, selectValue]);

  useEffect(() => {
    getFeeTypes().then(feeTypes => {
      const mappedFeeTypes = mapFeeTypes(feeTypes);
      setOptions(mappedFeeTypes);
    });
  }, [getFeeTypes]);

  const mapFeeTypes = feeTypes => {
    return feeTypes.map(m => {
      return { label: m.name, value: m.id };
    });
  };

  const onChange = selectedOption => {
    if (customOnChange) customOnChange(selectedOption);
    updateValues(selectedOption);
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
    />
  );
});

function mapStateToProps(state) {
  return {
    feeTypes: state.feeTypes
  };
}

const mapDispatchToProps = {
  getFeeTypes: FeeTypeActions.getFeeTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(FeeTypeSelect);
