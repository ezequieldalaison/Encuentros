import React, { useEffect } from "react";
import { PROFESSIONAL_PAYMENTS } from "../../../helpers/GridHelper";
import PageBase from "../../../base/PageBase";
import ProfessionalPaymentForm from "./ProfessionalPaymentForm";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as ProfessionalPaymentActions from "../../../../redux/actions/Pilates/ProfessionalPaymentActions";
import { getCurrentMonth } from "../../../helpers/DateHelper";
import ProfessionalPaymentSearch from "./ProfessionalPaymentSearch";

const ProfessionalPaymentPage = ({
  professionalPayments,
  saveProfessionalPayment,
  getProfessionalPaymentsPerMonth
}) => {
  const columns = React.useMemo(() => PROFESSIONAL_PAYMENTS, []);

  useEffect(() => {
    getProfessionalPaymentsPerMonth(getCurrentMonth());
  }, [getProfessionalPaymentsPerMonth]);

  const search = data => {
    getProfessionalPaymentsPerMonth(data.monthId);
  };

  const grid = {
    data: professionalPayments,
    columns: columns
  };

  const onSubmit = data => {
    return saveProfessionalPayment(data).then(e =>
      toast.success("El pago se guardó correctamente")
    );
  };

  return (
    <PageBase
      isUsingRef
      grid={grid}
      title="Pago Profesores"
      form={ProfessionalPaymentForm}
      onSubmit={onSubmit}
      search={ProfessionalPaymentSearch}
      onSearch={search}
    />
  );
};

function mapStateToProps(state) {
  return {
    professionalPayments: state.professionalPayments
  };
}

const mapDispatchToProps = {
  saveProfessionalPayment: ProfessionalPaymentActions.saveProfessionalPayment,
  getProfessionalPaymentsPerMonth:
    ProfessionalPaymentActions.getProfessionalPaymentsPerMonth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalPaymentPage);
