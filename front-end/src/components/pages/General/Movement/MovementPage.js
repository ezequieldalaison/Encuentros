import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import { MOVEMENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as MovementActions from "../../../../redux/actions/General/MovementActions";
import { getCurrentMonth } from "../../../helpers/DateHelper";
import MovementForm from "./MovementForm";
import { toast } from "react-toastify";

const MovementPage = ({
  getMovement,
  movements,
  getMovementsByMonth,
  saveMovement,
  deleteMovement
}) => {
  const [movementUnderUpdate, setMovementUnderUpdate] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const columns = React.useMemo(() => MOVEMENTS_GRID, []);

  useEffect(() => {
    getMovementsByMonth(getCurrentMonth()).catch(d => {});
  }, [getMovementsByMonth]);

  useEffect(() => {
    setIsEditing(!!movementUnderUpdate);
  }, [movementUnderUpdate]);

  const grid = {
    data: movements,
    columns: columns
  };

  const onSubmit = data => {
    if (movementUnderUpdate) {
      data = { ...movementUnderUpdate, ...data };
    }

    data.movementStatusId = data.isPaid ? 2 : 1;
    return saveMovement(data).then(m =>
      toast.success("El movimiento se guardó correctamente")
    );
  };

  const canEditDelete = (movement, isDelete) => {
    if (!movement.concept.isCommon) {
      if (isDelete) toast.error("No se puede eliminar este movimiento");
      else toast.error("No se puede modificar este movimiento");
    }
    return movement.concept.isCommon;
  };

  const getEntity = movementId => {
    return getMovement(movementId).then(movement => {
      movement.isPaid = movement.movementStatusId === 2;
      return movement;
    });
  };

  const onDelete = id => {
    return deleteMovement(id).then(m =>
      toast.success("El movimiento se eliminó correctamente")
    );
  };

  return (
    <PageBase
      isUsingRef
      grid={grid}
      title="Movimientos"
      form={MovementForm}
      onSubmit={onSubmit}
      canEditDelete={canEditDelete}
      getEntity={getEntity}
      setEntityUnderUpdate={setMovementUnderUpdate}
      isEditing={isEditing}
      onDelete={onDelete}
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
  saveMovement: MovementActions.saveMovement,
  getMovement: MovementActions.getMovement,
  deleteMovement: MovementActions.deleteMovement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovementPage);
