import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import * as ProfessionalActions from "../../../../redux/actions/Common/ProfessionalActions";
import { connect } from "react-redux";
import ProfessionalForm from "./ProfessionalForm";
import { PROFESSIONALS_GRID } from "../../../helpers/GridHelper";
import { toast } from "react-toastify";

const ProfessionalPage = ({
  professionals,
  getProfessionals,
  getProfessional,
  saveProfessional,
  inactivateProfessional,
  activateProfessional
}) => {
  const [professionalUnderUpdate, setProfessionalUnderUpdate] = useState();
  useEffect(() => {
    getProfessionals();
  }, [getProfessionals]);

  const columns = React.useMemo(() => PROFESSIONALS_GRID, []);

  const grid = {
    data: professionals,
    columns: columns
  };

  const onSubmit = data => {
    console.log(data);

    if (professionalUnderUpdate) {
      data = { ...professionalUnderUpdate, ...data };
    }
    return saveProfessional(data).then(() =>
      toast.success("El profesional se guardó correctamente")
    );
  };

  const inactivate = professionalId => {
    return inactivateProfessional(professionalId).then(() =>
      toast.success("El profesional se inactivó correctamente")
    );
  };

  const activate = professionalId => {
    return activateProfessional(professionalId).then(() =>
      toast.success("El profesional se activó correctamente")
    );
  };

  const getEntity = professionalId => {
    return getProfessional(professionalId).then(professional => {
      return professional;
    });
  };

  return (
    <PageBase
      isUsingRef
      grid={grid}
      title="Profesionales"
      form={ProfessionalForm}
      onSubmit={onSubmit}
      activate={activate}
      inactivate={inactivate}
      setEntityUnderUpdate={setProfessionalUnderUpdate}
      getEntity={getEntity}
    />
  );
};

function mapStateToProps(state) {
  return {
    professionals: state.professional
  };
}

const mapDispatchToProps = {
  getProfessionals: ProfessionalActions.getProfessionals,
  getProfessional: ProfessionalActions.getProfessional,
  saveProfessional: ProfessionalActions.saveProfessional,
  inactivateProfessional: ProfessionalActions.inactivateProfessional,
  activateProfessional: ProfessionalActions.activateProfessional
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalPage);
