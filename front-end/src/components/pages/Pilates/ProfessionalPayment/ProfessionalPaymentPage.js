import React from "react";
import { PROFESSIONAL_PAYMENTS } from "../../../helpers/GridHelper";
import PageBase from "../../../base/PageBase";
import ProfessionalPaymentForm from "./ProfessionalPaymentForm";

const ProfessionalPaymentPage = () => {
  const columns = React.useMemo(() => PROFESSIONAL_PAYMENTS, []);

  const grid = {
    data: [],
    columns: columns
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <PageBase
      grid={grid}
      title="Pago Profesores"
      form={ProfessionalPaymentForm}
      onSubmit={onSubmit}
    />
  );
};

export default ProfessionalPaymentPage;
