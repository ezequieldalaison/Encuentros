import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import { FEES_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as FeeActions from "../../../../redux/actions/Pilates/FeeActions";
import FeeForm from "./FeeForm";
import { toast } from "react-toastify";
import FeeSearch from "./FeeSearch";
import { getCurrentMonth } from "../../../helpers/DateHelper";

const FeePage = ({ fees, searchFees, saveFee, getFee, deleteFee }) => {
  const [feeUnderUpdate, setFeeUnderUpdate] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    searchFees({ monthId: getCurrentMonth() });
  }, [searchFees]);

  useEffect(() => {
    setIsEditing(!!feeUnderUpdate);
  }, [feeUnderUpdate]);

  const columns = React.useMemo(() => FEES_GRID, []);

  const grid = {
    data: fees,
    columns: columns
  };

  const onSubmit = data => {
    if (feeUnderUpdate) {
      data = { ...feeUnderUpdate, ...data };
    }

    return saveFee(data).then(() => {
      toast.success("El pago de la cuota se guardó correctamente");
    });
  };

  const search = data => {
    console.log(data);
    searchFees(data);
  };

  const getEntity = feeId => {
    return getFee(feeId).then(fee => {
      return fee;
    });
  };

  const onDelete = id => {
    return deleteFee(id).then(m =>
      toast.success("El pago de la cuota se eliminó correctamente")
    );
  };

  return (
    <PageBase
      isUsingRef
      isSearchUsingRef
      grid={grid}
      title="Cuotas"
      form={FeeForm}
      onSubmit={onSubmit}
      search={FeeSearch}
      onSearch={search}
      setEntityUnderUpdate={setFeeUnderUpdate}
      isEditing={isEditing}
      getEntity={getEntity}
      onDelete={onDelete}
    />
  );
};

function mapStateToProps(state) {
  return {
    fees: state.fees
  };
}

const mapDispatchToProps = {
  searchFees: FeeActions.searchFees,
  saveFee: FeeActions.saveFee,
  getFee: FeeActions.getFee,
  deleteFee: FeeActions.deleteFee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeePage);
