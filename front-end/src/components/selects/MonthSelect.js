import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as MonthActions from "../../redux/actions/Common/MonthActions";
import { getCurrentMonth } from "../helpers/DateHelper";

const MonthSelect = forwardRef((props, ref) => {
  const { register, getMonths, addOptionAll, setFormValue } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValue(month) {
        if (month) setSelectValue({ value: month.id, label: month.name });
        else {
          month = options.filter(x => x.value === getCurrentMonth());
          setSelectValue(month[0]);
        }
      },
      getValue() {
        return selectValue;
      }
    }),
    [options, selectValue]
  );

  useEffect(() => {
    if (register) {
      const value = selectValue ? selectValue.value : null;
      register({
        name: "monthId",
        value: value
      });
      if (setFormValue) setFormValue("monthId", value);
    }
  }, [register, selectValue, setFormValue]);

  useEffect(() => {
    getMonths().then(months => {
      const mappedMonths = mapMonths(months);
      if (addOptionAll) mappedMonths.unshift({ label: "TODOS", value: "0" });
      setOptions(mappedMonths);

      var month = mappedMonths.filter(x => x.value === getCurrentMonth());
      setSelectValue(month[0]);
    });
  }, [getMonths, addOptionAll]);

  const mapMonths = months => {
    return months.map(m => {
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
