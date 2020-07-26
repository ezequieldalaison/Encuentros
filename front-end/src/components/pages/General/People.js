import React from "react";
import PageBase from "../../base/PageBase";

const People = () => {
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
        Header: "Área/s",
        accessor: "areas",
        canSort: false
      }
    ],
    []
  );

  const grid = {
    data: [],
    columns: columns
  };

  return <PageBase grid={grid} title="Personas" />;
};

export default People;
