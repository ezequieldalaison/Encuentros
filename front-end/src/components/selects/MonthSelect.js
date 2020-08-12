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
  const { register, getMonths } = props;
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
      }
    }),
    [options]
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
      setOptions(mappedMonths);

      var month = mappedMonths.filter(x => x.value === getCurrentMonth());
      setSelectValue(month[0]);
    });
  }, [getMonths]);

  const mapMonths = months => {
    return months.map(m => {
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
      defaultValue={null}
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
