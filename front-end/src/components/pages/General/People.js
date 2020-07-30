import React, { useEffect, useState } from "react";
import PageBase from "../../base/PageBase";
import * as PeopleActions from "../../../redux/actions/PeopleActions";
import { connect } from "react-redux";
import PeopleForm from "./PeopleForm";

const People = ({
  people,
  getPeople,
  savePerson,
  inactivatePerson,
  activatePerson
}) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  useEffect(() => {
    console.log("useEffect");
    getPeople().catch(error => console.log("ERROR: " + error));
  }, [getPeople]);

  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id"
      },
      {
        Header: "Nombre",
        accessor: "name"
      },
      {
        Header: "Apellido",
        accessor: "lastName"
      },
      {
        Header: "Nº de Documento",
        accessor: "documentNumber"
      },
      {
        Header: "e-mail",
        accessor: "email"
      },
      {
        Header: "Teléfono",
        accessor: "phoneNumber"
      },
      {
        Header: "Porcentaje de arreglo",
        accessor: "percentage",
        canSort: false
      },
      {
        Header: "Activo",
        accessor: "isActive",
        canSort: false
      },
      {
        Header: "-",
        accessor: "",
        canSort: false
      }
    ],
    []
  );

  const grid = {
    data: people,
    columns: columns
  };

  const hideAlert = () => {
    setAlert({ show: false, message: "", variant: "success" });
  };

  const onSubmit = data => {
    savePerson(data);
    setAlert({
      show: true,
      message: "El profesional se guardó correctamente",
      variant: "success"
    });
    setTimeout(hideAlert, 5000);
  };

  const inactivate = personId => {
    inactivatePerson(personId);
  };

  const activate = personId => {
    activatePerson(personId);
  };

  return (
    <PageBase
      grid={grid}
      title="Personas"
      form={PeopleForm}
      onSubmit={onSubmit}
      activate={activate}
      inactivate={inactivate}
      alert={alert}
      hideAlert={hideAlert}
    />
  );
};

function mapStateToProps(state) {
  return {
    people: state.people
  };
}

const mapDispatchToProps = {
  getPeople: PeopleActions.getPeople,
  savePerson: PeopleActions.savePerson,
  inactivatePerson: PeopleActions.inactivatePerson,
  activatePerson: PeopleActions.activatePerson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
