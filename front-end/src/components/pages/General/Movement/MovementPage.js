import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { MOVEMENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as MovementActions from "../../../../redux/actions/General/MovementActions";
import { getCurrentMonth } from "../../../helpers/DateHelper";
//import StudentForm from "./StudentForm";
//import StudentSearch from "./StudentSearch";
//import { toast } from "react-toastify";

const MovementPage = ({ movements, getMovementsByMonth }) => {
  const columns = React.useMemo(() => MOVEMENTS_GRID, []);

  useEffect(() => {
    getMovementsByMonth(getCurrentMonth())
      .then(c => console.log(c))
      .catch(d => {});
  }, [getMovementsByMonth]);

  const grid = {
    data: movements,
    columns: columns
  };

  return <PageBase grid={grid} title="Movimientos" />;
};

function mapStateToProps(state) {
  return {
    movements: state.movements
  };
}

const mapDispatchToProps = {
  getMovementsByMonth: MovementActions.getMovementsByMonth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovementPage);
