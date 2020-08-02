import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GridBase from "./GridBase";
import Alert from "react-bootstrap/Alert";
import FormBase from "../base/FormBase";
import { useForm } from "react-hook-form";

const PageBase = ({
  grid,
  title,
  form: FormComponent,
  search: SearchComponent,
  alert,
  hideAlert,
  activate,
  inactivate,
  getEntity,
  setEntityUnderUpdate,
  ...props
}) => {
  const { data, columns } = grid;
  const [showSearchState, setShowSearchState] = useState(true);
  const [showGridState, setShowGridState] = useState(true);
  const [showFormState, setShowFormState] = useState(false);
  const { register, handleSubmit, errors, reset, setValue } = useForm();

  const onAdd = () => {
    setShowSearchState(false);
    setShowGridState(false);
    setShowFormState(true);

    setEntityUnderUpdate();
  };

  const onUpdate = id => {
    setShowSearchState(false);
    setShowGridState(false);
    setShowFormState(true);

    getEntity(id).then(entity => {
      setEntityUnderUpdate(entity);
      for (var key in entity) {
        setValue(key, entity[key], { shouldValidate: true });
      }
    });
  };

  const onCancelForm = () => {
    reset();
    setShowSearchState(true);
    setShowGridState(true);
    setShowFormState(false);
  };

  const toggleSearch = () => {
    setShowSearchState(!showSearchState);
  };

  const toggleGrid = () => {
    setShowGridState(!showGridState);
  };

  const onSubmit = data => {
    props.onSubmit(data);
    reset();
    setShowSearchState(true);
    setShowGridState(true);
    setShowFormState(false);
  };

  return (
    <Container style={{ fontSize: "small" }}>
      {SearchComponent ? (
        <Row style={{ marginTop: "25px" }}>
          <Col xs={12}>
            <Accordion>
              <Card border="secondary">
                <Card.Header style={{ padding: "5px" }}>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    onClick={toggleSearch}
                  >
                    <h6>Búsqueda</h6>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse in={showSearchState}>
                  <Card.Body></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      ) : null}
      <Row style={{ marginTop: "25px" }}>
        <Col xs={12}>
          <Accordion>
            <Card border="secondary">
              <Card.Header style={{ padding: "5px" }}>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  onClick={toggleGrid}
                >
                  <h6>{title}</h6>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse in={showGridState}>
                <Card.Body>
                  <GridBase
                    columns={columns}
                    data={data}
                    activate={activate}
                    inactivate={inactivate}
                    onUpdate={onUpdate}
                  />
                  <Row>
                    <Col xs={1} style={{ marginBottom: "5px" }}>
                      <Button onClick={onAdd}>Agregar</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>

      {FormComponent ? (
        <Row style={{ marginTop: "25px", marginBottom: "25px" }}>
          <Col xs={12}>
            <Accordion>
              <Card border="secondary">
                <Card.Header style={{ padding: "5px" }}>
                  <Accordion.Toggle as={Button} variant="link">
                    <h6>Formulario</h6>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse in={showFormState}>
                  <Card.Body>
                    <Container fluid>
                      <FormBase
                        cancel={onCancelForm}
                        submit={handleSubmit(onSubmit)}
                        submitButtonText="Guardar"
                        showCancelButton={true}
                        elements={() => (
                          <FormComponent
                            onSubmit={onSubmit}
                            register={register}
                            errors={errors}
                          />
                        )}
                      ></FormBase>
                    </Container>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      ) : null}

      {alert && alert.show ? (
        <Alert
          className="fixed-bottom alert"
          variant={alert.variant}
          onClose={() => hideAlert()}
          dismissible
        >
          {alert.message}
        </Alert>
      ) : null}
    </Container>
  );
};

export default PageBase;
