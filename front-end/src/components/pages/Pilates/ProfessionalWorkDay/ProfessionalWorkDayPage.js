import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import { PWD_DAILY_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as ProfessionalWorkDayActions from "../../../../redux/actions/Pilates/ProfessionalWorkDayActions";
import { toast } from "react-toastify";
import { getCurrentMonth } from "../../../helpers/DateHelper";
import ProfessionalWorkDaySearch from "./ProfessionalWorkDaySearch";
import ProfessionalWorkDayForm from "./ProfessionalWorkDayForm";

const ProfessionalWorkDayPage = ({
  professionalWorkDays,
  getProfessionalWorkDaysByMonth,
  getProfessionalWorkDaysByYear,
  getProfessionalWorkDay,
  saveProfessionalWorkDay,
  deleteProfessionalWorkDay
}) => {
  const [
    professionalWorkDayUnderUpdate,
    setProfessionalWorkDayUnderUpdate
  ] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfessionalWorkDaysByMonth(getCurrentMonth()).catch(d => {});
  }, [getProfessionalWorkDaysByMonth]);

  useEffect(() => {
    setIsEditing(!!professionalWorkDayUnderUpdate);
  }, [professionalWorkDayUnderUpdate]);

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

  const getEntity = professionalWorkDayId => {
    return getProfessionalWorkDay(professionalWorkDayId).then(
      professionalWorkDay => {
        return professionalWorkDay;
      }
    );
  };

  const onSubmit = data => {
    if (professionalWorkDayUnderUpdate) {
      data = { ...professionalWorkDayUnderUpdate, ...data };
    }

    return saveProfessionalWorkDay(data).then(m =>
      toast.success("Las horas se guardaron correctamente")
    );
  };

  const onDelete = id => {
    return deleteProfessionalWorkDay(id).then(m =>
      toast.success("Las horas se eliminaron correctamente")
    );
  };

  return (
    <PageBase
      isUsingRef
      grid={grid}
      title="Horas Profesores"
      search={ProfessionalWorkDaySearch}
      onSearch={search}
      hideCleanButton
      form={ProfessionalWorkDayForm}
      getEntity={getEntity}
      setEntityUnderUpdate={setProfessionalWorkDayUnderUpdate}
      isEditing={isEditing}
      onSubmit={onSubmit}
      onDelete={onDelete}
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
    ProfessionalWorkDayActions.getProfessionalWorkDaysByYear,
  getProfessionalWorkDay: ProfessionalWorkDayActions.getProfessionalWorkDay,
  saveProfessionalWorkDay: ProfessionalWorkDayActions.saveProfessionalWorkDay,
  deleteProfessionalWorkDay:
    ProfessionalWorkDayActions.deleteProfessionalWorkDay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalWorkDayPage);
