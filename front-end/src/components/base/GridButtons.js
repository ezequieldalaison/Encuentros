import React from "react";
import { Button } from "react-bootstrap";

const EditButton = props => (
  <Button
    variant="link"
    onClick={() => props.onUpdate(props.id)}
    style={{
      fontSize: "small",
      padding: "0",
      marginRight: "5px"
    }}
  >
    Editar
  </Button>
);

const DeleteButton = props => (
  <Button
    variant="link"
    onClick={() => props.onDelete(props.id)}
    style={{
      fontSize: "small",
      padding: "0",
      marginRight: "5px"
    }}
  >
    Eliminar
  </Button>
);

const ActivateInactivateButton = props => (
  <Button
    variant="link"
    onClick={() =>
      props.isActive ? props.inactivate(props.id) : props.activate(props.id)
    }
    style={{ fontSize: "small", padding: "0" }}
  >
    {props.isActive ? "Inactivar" : "Activar"}
  </Button>
);

const PaidPendingButton = props => (
  <Button
    variant="link"
    onClick={() =>
      props.isPaid ? props.setPending(props.id) : props.setPaid(props.id)
    }
    style={{ fontSize: "small", padding: "0" }}
  >
    {props.isPaid ? "Pendiente" : "Pago"}
  </Button>
);

export {
  EditButton,
  DeleteButton,
  ActivateInactivateButton,
  PaidPendingButton
};
