export const STUDENTS_GRID = [
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
    Header: "e-mail",
    accessor: "email"
  },
  {
    Header: "Teléfono",
    accessor: "phoneNumber"
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
];

export const PROFESSIONALS_GRID = [
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
];

export const CLASSES_GRID = [
  {
    Header: "Alumno",
    accessor: "fullName",
    canSort: false
  },
  {
    Header: "Al día",
    accessor: "isUpToDate",
    canSort: false
  }
];

export const FEES_GRID = [
  {
    Header: "Alumno",
    accessor: "student.fullName"
  },
  {
    Header: "Mes",
    accessor: "month.name",
    canSort: false
  },
  {
    Header: "Modalidad",
    accessor: "feeType.name",
    canSort: false
  },
  {
    Header: "Fecha de Pago",
    accessor: "movement.date",
    canSort: false
  },
  {
    Header: "Importe",
    accessor: "movement.amount",
    canSort: false
  },
  {
    Header: "Estado",
    accessor: "movement.movementStatus.name",
    canSort: false
  }
];
