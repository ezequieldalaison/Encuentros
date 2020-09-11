import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { MOVEMENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as MovementActions from "../../../../redux/actions/General/MovementActions";
import { getCurrentMonth } from "../../../helpers/DateHelper";
import MovementForm from "./MovementForm";
//import StudentSearch from "./StudentSearch";
//import { toast } from "react-toastify";

const MovementPage = ({ movements, getMovementsByMonth, saveMovement }) => {
  const columns = React.useMemo(() => MOVEMENTS_GRID, []);

  useEffect(() => {
    getMovementsByMonth(getCurrentMonth()).catch(d => {});
  }, [getMovementsByMonth]);

  const grid = {
    data: movements,
    columns: columns
  };

  const onSubmit = data => {
    data.movementStatusId = data.isPaid ? 2 : 1;
    return saveMovement(data).catch(e => console.log(e));
  };

  return (
    <PageBase
      isUsingRef
      grid={grid}
      title="Movimientos"
      form={MovementForm}
      onSubmit={onSubmit}
    />
  );
};

function mapStateToProps(state) {
  return {
    movements: state.movements
  };
}

const mapDispatchToProps = {
  getMovementsByMonth: MovementActions.getMovementsByMonth,
  saveMovement: MovementActions.saveMovement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovementPage);
