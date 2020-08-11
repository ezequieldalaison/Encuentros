import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as FeeTypeActions from "../../redux/actions/Pilates/FeeTypeActions";

const FeeTypeSelect = forwardRef((props, ref) => {
  const { register, getFeeTypes } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValue(feeType) {
        if (feeType) setSelectValue({ value: feeType.id, label: feeType.name });
        else setSelectValue(null);
      }
    }),
    []
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
    setSelectValue(selectedOption);
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      value={selectValue}
      noOptionsMessage={() => "No se encontraron resultados"}
      placeholder="Seleccione..."
    />
  );
});

function mapStateToProps(state) {
  return {};
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
