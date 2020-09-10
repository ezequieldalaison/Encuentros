import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as ConceptActions from "../../redux/actions/General/ConceptActions";

const CommonConceptSelect = forwardRef((props, ref) => {
  const { register, getCommonConcepts, areaId } = props;
  const [selectValue, setSelectValue] = useState();
  const [options, setOptions] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setValue(concept) {
        if (concept) setSelectValue({ value: concept.id, label: concept.name });
        else setSelectValue(null);
      }
    }),
    []
  );

  useEffect(() => {
    if (register)
      register({
        name: "conceptId",
        value: selectValue ? selectValue.value : null
      });
  }, [register, selectValue]);

  useEffect(() => {
    if (areaId)
      getCommonConcepts(areaId).then(concepts => {
        const mappedConcepts = mapConcepts(concepts);
        setOptions(mappedConcepts);
      });
  }, [getCommonConcepts, areaId]);

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
