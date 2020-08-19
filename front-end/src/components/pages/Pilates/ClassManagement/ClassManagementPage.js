import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { WEEKLY_CLASSES_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as WeeklyClassActions from "../../../../redux/actions/Pilates/WeeklyClassActions";
import { toast } from "react-toastify";
import ClassManagementSearch from "./ClassManagementSearch";

const ClassManagementPage = ({
  weeklyClasses,
  getWeeklyClasses,
  inactivateWeeklyClass,
  activateWeeklyClass,
  searchWeeklyClasses
}) => {
  useEffect(() => {
    getWeeklyClasses();
  }, [getWeeklyClasses]);

  const columns = React.useMemo(() => WEEKLY_CLASSES_GRID, []);

  const grid = {
    data: weeklyClasses,
    columns: columns
  };

  const inactivate = weeklyClassId => {
    return inactivateWeeklyClass(weeklyClassId).then(() =>
      toast.success("La clase se inactivó correctamente")
    );
  };

  const activate = weeklyClassId => {
    return activateWeeklyClass(weeklyClassId).then(() =>
      toast.success("La clase se activó correctamente")
    );
  };

  //   const onSubmit = data => {
  //     if (studentUnderUpdate) {
  //       data = { ...studentUnderUpdate, ...data };
  //     }

  //     return saveWeeklyClass(data).then(() => {
  //       toast.success("El alumno se guardó correctamente");
  //     });
  //   };

  //   const getEntity = studentId => {
  //     return getWeeklyClass(studentId).then(student => {
  //       return student;
  //     });
  //   };

  const search = data => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getWeeklyClasses();
    } else {
      searchWeeklyClasses(data);
    }
  };

  return (
    <PageBase
      grid={grid}
      title="Clases"
      activate={activate}
      inactivate={inactivate}
      search={ClassManagementSearch}
      onSearch={search}
    />
  );
};

function mapStateToProps(state) {
  return {
    weeklyClasses: state.weeklyClasses
  };
}

const mapDispatchToProps = {
  inactivateWeeklyClass: WeeklyClassActions.inactivateWeeklyClass,
  activateWeeklyClass: WeeklyClassActions.activateWeeklyClass,
  getWeeklyClasses: WeeklyClassActions.getWeeklyClasses,
  searchWeeklyClasses: WeeklyClassActions.searchWeeklyClasses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassManagementPage);
