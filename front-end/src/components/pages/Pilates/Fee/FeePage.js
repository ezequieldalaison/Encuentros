import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { FEES_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";

const FeePage = () => {
  const columns = React.useMemo(() => FEES_GRID, []);

  const grid = {
    data: [],
    columns: columns
  };

  return <PageBase grid={grid} title="Coutas" />;
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeePage);
