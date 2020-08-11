import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { FEES_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as FeeActions from "../../../../redux/actions/Pilates/FeeActions";
import FeeForm from "./FeeForm";

const FeePage = ({ fees, getFeesPerMonth }) => {
  useEffect(() => {
    getFeesPerMonth(1);
  }, [getFeesPerMonth]);

  const columns = React.useMemo(() => FEES_GRID, []);

  const grid = {
    data: fees,
    columns: columns
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <PageBase grid={grid} title="Cuotas" form={FeeForm} onSubmit={onSubmit} />
  );
};

function mapStateToProps(state) {
  return {
    fees: state.fees
  };
}

const mapDispatchToProps = {
  getFeesPerMonth: FeeActions.getFeesPerMonth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeePage);
