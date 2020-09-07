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

const CommonConceptSelect = forwardRef((props, ref) => {
  const { register, getCommonConcepts } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValue(concept) {
        setSelectValue({ value: concept.id, label: concept.name });
      }
    }),
    [options]
  );

  useEffect(() => {
    if (register)
      register({
        name: "conceptId",
        value: selectValue ? selectValue.value : null
      });
  }, [register, selectValue]);

  useEffect(() => {
    getCommonConcepts().then(concepts => {
      const mappedConcepts = mapConcepts(concepts);
      setOptions(mappedConcepts);
    });
  }, [getConcepts]);

  const mapConcepts = concepts => {
    return concepts.map(c => {
      return { label: c.name, value: c.id };
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
  return { concepts: state.concepts };
}

const mapDispatchToProps = {
  getCommonConcepts: ConceptActions.getCommonConcepts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(CommonConceptSelect);
