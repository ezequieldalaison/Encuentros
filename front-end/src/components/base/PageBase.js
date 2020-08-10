import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GridBase from "./GridBase";
import FormBase from "../base/FormBase";
import { useForm } from "react-hook-form";

const PageBase = ({
  grid,
  title,
  form: FormComponent,
  search: SearchComponent,
  activate,
  inactivate,
  getEntity,
  onSearch,
  setEntityUnderUpdate,
  ...props
}) => {
  const { data, columns } = grid;
  const [showSearchState, setShowSearchState] = useState(false);
  const [showGridState, setShowGridState] = useState(true);
  const [showFormState, setShowFormState] = useState(false);
  const addUpdateForm = useForm();
  const searchForm = useForm();

  const onAdd = () => {
    setShowSearchState(false);
    setShowGridState(false);
    setShowFormState(true);

    if (setEntityUnderUpdate) setEntityUnderUpdate();
  };

  const onUpdate = id => {
    setShowSearchState(false);
    setShowGridState(false);
    setShowFormState(true);

    getEntity(id).then(entity => {
      setEntityUnderUpdate(entity);
      for (var key in entity) {
        addUpdateForm.setValue(key, entity[key], { shouldValidate: true });
      }
    });
  };

  const onCancelForm = () => {
    addUpdateForm.reset();
    setShowSearchState(false);
    setShowGridState(true);
    setShowFormState(false);
  };

  const toggleSearch = () => {
    setShowSearchState(!showSearchState);
  };

  const toggleGrid = () => {
    setShowGridState(!showGridState);
  };

  const onSubmitForm = data => {
    props.onSubmit(data);
    addUpdateForm.reset();
    setShowSearchState(false);
    setShowGridState(true);
    setShowFormState(false);
  };

  const onSubmitSearch = data => {
    onSearch(data);
    setShowSearchState(false);
  };

  const onCancelSearch = () => {
    searchForm.reset();
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
                  <Card.Body>
                    <Container fluid>
                      <FormBase
                        cancel={onCancelSearch}
                        submit={searchForm.handleSubmit(onSubmitSearch)}
                        submitButtonText="Buscar"
                        showCancelButton={true}
                        cancelButtonText="Limpiar"
                        elements={() => (
                          <SearchComponent
                            onSubmit={onSubmitSearch}
                            register={searchForm.register}
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
                        submit={addUpdateForm.handleSubmit(onSubmitForm)}
                        submitButtonText="Guardar"
                        showCancelButton={true}
                        elements={() => (
                          <FormComponent
                            onSubmit={onSubmitForm}
                            register={addUpdateForm.register}
                            errors={addUpdateForm.errors}
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
    </Container>
  );
};

export default PageBase;
