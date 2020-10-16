import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as MonthActions from "../../redux/actions/Common/MonthActions";
import { getCurrentMonth } from "../helpers/DateHelper";

const MonthSelect = forwardRef((props, ref) => {
  const { register, getMonths, addOptionAll, setFormValue } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  const updateValues = useCallback(
    selectedOption => {
      setSelectValue(selectedOption);

      const value = selectedOption ? selectedOption.value : null;
      setFormValue("monthId", value);
    },
    [setFormValue]
  );

  useImperativeHandle(
    ref,
    () => ({
      setValue(month) {
        if (month) updateValues({ value: month.id, label: month.name });
        else {
          month = options.filter(x => x.value === getCurrentMonth());
          updateValues(month[0]);
        }
      },
      getValue() {
        return selectValue;
      }
    }),
    [options, selectValue, updateValues]
  );

  useEffect(() => {
    if (register)
      register({
        name: "monthId",
        value: selectValue ? selectValue.value : null
      });
  }, [register, selectValue]);

  useEffect(() => {
    getMonths().then(months => {
      const mappedMonths = mapMonths(months);
      if (addOptionAll) mappedMonths.unshift({ label: "TODOS", value: "0" });
      setOptions(mappedMonths);

      var month = mappedMonths.filter(x => x.value === getCurrentMonth());
      updateValues(month[0]);
    });
  }, [getMonths, addOptionAll, updateValues]);

  const mapMonths = months => {
    return months.map(m => {
      return { label: m.name, value: m.id };
    });
  };

  const onChange = selectedOption => {
    updateValues(selectedOption);
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
  return { months: state.months };
}

const mapDispatchToProps = {
  getMonths: MonthActions.getMonths
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(MonthSelect);
