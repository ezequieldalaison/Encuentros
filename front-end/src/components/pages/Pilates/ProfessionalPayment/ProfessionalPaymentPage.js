import React, { useEffect, useState } from "react";
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
  getProfessionalPaymentsPerMonth,
  getProfessionalPayment,
  deleteProfessionalPayment
}) => {
  const columns = React.useMemo(() => PROFESSIONAL_PAYMENTS, []);
  const [paymentUnderUpdate, setPaymentUnderUpdate] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfessionalPaymentsPerMonth(getCurrentMonth());
  }, [getProfessionalPaymentsPerMonth]);

  useEffect(() => {
    setIsEditing(!!paymentUnderUpdate);
  }, [paymentUnderUpdate]);

  const search = data => {
    getProfessionalPaymentsPerMonth(data.monthId);
  };

  const grid = {
    data: professionalPayments,
    columns: columns
  };

  const onSubmit = data => {
    if (paymentUnderUpdate) {
      data = { ...paymentUnderUpdate, ...data };
    }

    return saveProfessionalPayment(data).then(e =>
      toast.success("El pago se guardó correctamente")
    );
  };

  const getEntity = professionalPaymentId => {
    return getProfessionalPayment(professionalPaymentId).then(
      professionalPayment => {
        console.log(professionalPayment);
        return professionalPayment;
      }
    );
  };

  const onDelete = id => {
    return deleteProfessionalPayment(id).then(p =>
      toast.success("El pago se eliminó correctamente")
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
      getEntity={getEntity}
      setEntityUnderUpdate={setPaymentUnderUpdate}
      isEditing={isEditing}
      onDelete={onDelete}
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
    ProfessionalPaymentActions.getProfessionalPaymentsPerMonth,
  getProfessionalPayment: ProfessionalPaymentActions.getProfessionalPayment,
  deleteProfessionalPayment:
    ProfessionalPaymentActions.deleteProfessionalPayment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalPaymentPage);
