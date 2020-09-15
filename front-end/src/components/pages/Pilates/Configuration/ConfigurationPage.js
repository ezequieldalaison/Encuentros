import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as FeeTypeActions from "../../../../redux/actions/Pilates/FeeTypeActions";
import InputValidated from "../../../common/InputValidated";
import { useForm } from "react-hook-form";
import FormBase from "../../../base/FormBase";
import { toast } from "react-toastify";

const ConfigurationPage = ({ feeTypes, getFeeTypes, updateFeeTypes }) => {
  const { register, errors, handleSubmit } = useForm();
  useEffect(() => {
    getFeeTypes();
  }, [getFeeTypes]);

  const onSubmit = data => {
    var feeTypesToUpdate = feeTypes.map(ft => {
      return { id: ft.id, name: ft.name, amount: data[ft.id] };
    });

    updateFeeTypes(feeTypesToUpdate).then(p =>
      toast.success("Las modalidades se actualizaron correctamente")
    );
  };

  return (
    <Container style={{ fontSize: "small" }}>
      <Row style={{ marginTop: "25px" }}>
        <Col xs={12}>
          <Accordion defaultActiveKey="0">
            <Card border="secondary">
              <Card.Header style={{ padding: "5px" }}>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <h6>Modalidades</h6>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <FormBase
                    submit={handleSubmit(onSubmit)}
                    submitButtonText="Guardar"
                    showCancelButton={false}
                    elements={() => (
                      <Row>
                        {feeTypes.map(x => (
                          <Col key={x.id}>
                            <Form.Label>{x.name}</Form.Label>
                            <InputValidated
                              register={register}
                              name={x.id}
                              type="number"
                              isRequired
                              error={errors[x.id]}
                              defaultValue={x.amount}
                            ></InputValidated>
                          </Col>
                        ))}
                      </Row>
                    )}
                  ></FormBase>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    feeTypes: state.feeTypes
  };
}

const mapDispatchToProps = {
  getFeeTypes: FeeTypeActions.getFeeTypes,
  updateFeeTypes: FeeTypeActions.updateFeeTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationPage);
