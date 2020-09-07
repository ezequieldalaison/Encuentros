import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { PWD_DAILY_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as ProfessionalWorkDayActions from "../../../../redux/actions/Pilates/ProfessionalWorkDayActions";
//import { toast } from "react-toastify";
import { getCurrentMonth } from "../../../helpers/DateHelper";
import ProfessionalWorkDaySearch from "./ProfessionalWorkDaySearch";

const ProfessionalWorkDayPage = ({
  professionalWorkDays,
  getProfessionalWorkDaysByMonth,
  getProfessionalWorkDaysByYear
}) => {
  useEffect(() => {
    getProfessionalWorkDaysByMonth(getCurrentMonth()).catch(d => {});
  }, [getProfessionalWorkDaysByMonth]);

  const columns = React.useMemo(() => PWD_DAILY_GRID, []);

  const grid = {
    data: professionalWorkDays,
    columns: columns
  };

  const search = data => {
    if (data.mode === "monthly")
      getProfessionalWorkDaysByMonth(data.monthId).catch(d => {});
    else if (data.mode === "anual")
      getProfessionalWorkDaysByYear(2020).catch(d => {});
  };

  return (
    <PageBase
      isUsingRef
      grid={grid}
      title="Profesores"
      //form={FeeForm}
      //onSubmit={onSubmit}
      search={ProfessionalWorkDaySearch}
      onSearch={search}
      hideCleanButton
      hideAddButton
    />
  );
};

function mapStateToProps(state) {
  return {
    professionalWorkDays: state.professionalWorkDays
  };
}

const mapDispatchToProps = {
  getProfessionalWorkDaysByMonth:
    ProfessionalWorkDayActions.getProfessionalWorkDaysByMonth,
  getProfessionalWorkDaysByYear:
    ProfessionalWorkDayActions.getProfessionalWorkDaysByYear
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalWorkDayPage);
