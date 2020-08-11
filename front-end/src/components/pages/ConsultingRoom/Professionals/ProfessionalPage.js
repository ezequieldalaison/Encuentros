import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import * as ProfessionalActions from "../../../../redux/actions/ProfessionalActions";
import { connect } from "react-redux";
import ProfessionalForm from "./ProfessionalForm";
import { PROFESSIONALS_GRID } from "../../../helpers/GridHelper";
import { toast } from "react-toastify";

const ProfessionalPage = ({
  professionals,
  getProfessionals,
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
    if (professionalUnderUpdate) {
      data = { ...professionalUnderUpdate, ...data };
    }
    saveProfessional(data).then(() =>
      toast.success("El profesional se guardó correctamente")
    );
  };

  const inactivate = professionalId => {
    inactivateProfessional(professionalId).then(() =>
      toast.success("El profesional se inactivó correctamente")
    );
  };

  const activate = professionalId => {
    activateProfessional(professionalId).then(() =>
      toast.success("El profesional se activó correctamente")
    );
  };

  return (
    <PageBase
      grid={grid}
      title="Profesionales"
      form={ProfessionalForm}
      onSubmit={onSubmit}
      activate={activate}
      inactivate={inactivate}
      setEntityUnderUpdate={setProfessionalUnderUpdate}
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
  saveProfessional: ProfessionalActions.saveProfessional,
  inactivateProfessional: ProfessionalActions.inactivateProfessional,
  activateProfessional: ProfessionalActions.activateProfessional
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalPage);
