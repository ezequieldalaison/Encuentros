import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormBase from "../../base/FormBase";
import InputValidated from "../../InputValidated";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";

const PeopleForm = props => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = data => {
    props.onSubmit(data);
    reset();
  };

  return (
    <Container fluid>
      <FormBase
        cancel={() => console.log("cancel")}
        submit={handleSubmit(onSubmit)}
        submitButtonText="Guardar"
        showCancelButton={true}
        elements={() => (
          <>
            <Form.Group>
              <Row>
                <Col xs={4}>
                  <Form.Label>Nombre</Form.Label>
                  <InputValidated
                    register={register}
                    name="name"
                    type="text"
                    isRequired
                    error={errors.name}
                  ></InputValidated>
                </Col>
                <Col xs={4}>
                  <Form.Label>Apellido</Form.Label>
                  <InputValidated
                    register={register}
                    name="lastName"
                    type="text"
                    isRequired
                    error={errors.lastName}
                  ></InputValidated>
                </Col>
                <Col xs={4}>
                  <Form.Label>Nº de Documento</Form.Label>
                  <InputValidated
                    register={register}
                    name="documentNumber"
                    type="number"
                    isRequired
                    error={errors.documentNumber}
                  ></InputValidated>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col xs={4}>
                  <Form.Label>e-mail</Form.Label>
                  <InputValidated
                    register={register}
                    name="email"
                    type="text"
                    error={errors.email}
                  ></InputValidated>
                </Col>
                <Col xs={4}>
                  <Form.Label>Teléfono</Form.Label>
                  <InputValidated
                    register={register}
                    name="phoneNumber"
                    type="text"
                    error={errors.phoneNumber}
                  ></InputValidated>
                </Col>
                <Col xs={4}>
                  <Form.Label>Porcentaje de arreglo</Form.Label>
                  <InputValidated
                    register={register}
                    name="percentage"
                    type="number"
                    isRequired
                    error={errors.percentage}
                  ></InputValidated>
                </Col>
              </Row>
            </Form.Group>
          </>
        )}
      ></FormBase>
    </Container>
  );
};

export default PeopleForm;
