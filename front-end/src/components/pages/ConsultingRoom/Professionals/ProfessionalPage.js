import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import * as ProfessionalActions from "../../../../redux/actions/ProfessionalActions";
import { connect } from "react-redux";
import ProfessionalForm from "./ProfessionalForm";
import { PROFESSIONALS_GRID } from "../../../helpers/GridHelper";

const ProfessionalPage = ({
  professionals,
  getProfessionals,
  saveProfessional,
  inactivateProfessional,
  activateProfessional
}) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  useEffect(() => {
    getProfessionals().catch(error => console.log("ERROR: " + error));
  }, [getProfessionals]);

  const columns = React.useMemo(() => PROFESSIONALS_GRID, []);

  const grid = {
    data: professionals,
    columns: columns
  };

  const hideAlert = () => {
    setAlert({ show: false, message: "", variant: "success" });
  };

  const onSubmit = data => {
    saveProfessional(data);
    setAlert({
      show: true,
      message: "El profesional se guardó correctamente",
      variant: "success"
    });
    setTimeout(hideAlert, 5000);
  };

  const inactivate = professionalId => {
    inactivateProfessional(professionalId);
  };

  const activate = professionalId => {
    activateProfessional(professionalId);
  };

  return (
    <PageBase
      grid={grid}
      title="Profesionales"
      form={ProfessionalForm}
      onSubmit={onSubmit}
      activate={activate}
      inactivate={inactivate}
      alert={alert}
      hideAlert={hideAlert}
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
