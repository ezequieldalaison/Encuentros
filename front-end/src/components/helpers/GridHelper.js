import { formatFullDate, getMonthName } from "./DateHelper";

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
    Header: "customButtons:edit|activateInactivate",
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
    Header: "Áreas",
    accessor: "areasNames",
    canSort: false
  },
  {
    Header: "Activo",
    accessor: "isActive",
    canSort: false
  },
  {
    Header: "customButtons:edit|activateInactivate",
    accessor: "",
    canSort: false
  }
];

export const CLASSES_GRID = [
  {
    Header: "Alumno",
    accessor: "student.fullName",
    canSort: false
  },
  {
    Header: "Al día",
    accessor: "student.isUpToDate",
    canSort: false
  },
  {
    Header: "Ind.",
    accessor: "isIndividualClass",
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
    accessor: data => formatFullDate(data.movement.date),
    canSort: false
  },
  {
    Header: "Importe",
    accessor: data => {
      return `$${data.movement.amount}`;
    },
    canSort: false
  },
  {
    Header: "Estado",
    accessor: "movement.movementStatus.name",
    canSort: false
  }
];

export const MOVEMENTS_GRID = [
  {
    Header: "Fecha",
    accessor: data => formatFullDate(data.date)
  },
  {
    Header: "Concepto",
    accessor: "concept.name"
  },
  {
    Header: "Monto",
    accessor: "amount"
  },
  {
    Header: "Comentarios",
    accessor: "comments"
  },
  {
    Header: "Estado",
    accessor: "movementStatus.name"
  }
];

export const WEEKLY_CLASSES_GRID = [
  {
    Header: "id",
    accessor: "id"
  },
  {
    Header: "Día",
    accessor: "day.name"
  },
  {
    Header: "Hora",
    accessor: "hour"
  },
  {
    Header: "Activa",
    accessor: "isActive"
  },
  {
    Header: "customButtons:edit|activateInactivate",
    accessor: "",
    canSort: false
  }
];

export const PWD_DAILY_GRID = [
  {
    Header: "id",
    accessor: "id"
  },
  {
    Header: "Profesor",
    accessor: "professional.fullName"
  },
  {
    Header: "Fecha",
    accessor: data =>
      data.id > 0 ? formatFullDate(data.date) : getMonthName(data.date)
  },
  {
    Header: "Cantidad de horas",
    accessor: "quantityHours"
  }
];

export const PROFESSIONAL_PAYMENTS = [
  {
    Header: "id",
    accessor: "id"
  },
  {
    Header: "Profesor",
    accessor: "professional.fullName"
  },
  {
    Header: "Mes",
    accessor: "month.name"
  },
  {
    Header: "Cantidad de Horas",
    accessor: "quantityHours"
  },
  {
    Header: "Monto",
    accessor: "movement.amount"
  },
  {
    Header: "customButtons:edit|delete",
    accessor: "",
    canSort: false
  }
];
