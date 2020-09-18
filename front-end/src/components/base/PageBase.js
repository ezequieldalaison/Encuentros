import React, { useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GridBase from "./GridBase";
import FormBase from "../base/FormBase";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";

const PageBase = ({
  isUsingRef,
  grid,
  title,
  form: FormComponent,
  search: SearchComponent,
  activate,
  inactivate,
  getEntity,
  onSearch,
  setEntityUnderUpdate,
  hideCleanButton,
  hideAddButton,
  isEditing,
  ...props
}) => {
  const { data, columns } = grid;
  const [showSearchState, setShowSearchState] = useState(false);
  const [showGridState, setShowGridState] = useState(true);
  const [showFormState, setShowFormState] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const addUpdateForm = useForm();
  const searchForm = useForm();
  const childFormRef = useRef();

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

      if (childFormRef.current && childFormRef.current.setSelectValue)
        childFormRef.current.setSelectValue(entity);

      for (var key in entity) {
        addUpdateForm.setValue(key, entity[key], { shouldValidate: true });
      }
    });
  };

  const onDelete = id => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const onConfirmDelete = () => {
    props.onDelete(deleteId).catch(e => console.log(e));
    setShowDeleteModal(false);
  };

  const onCancelForm = () => {
    if (childFormRef.current && childFormRef.current.cleanSelects)
      childFormRef.current.cleanSelects();
    addUpdateForm.reset({});
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
    props
      .onSubmit(data)
      .then(() => {
        if (childFormRef.current) childFormRef.current.cleanSelects();
        addUpdateForm.reset({});
        setShowSearchState(false);
        setShowGridState(true);
        setShowFormState(false);
      })
      .catch(e => console.log(e));
  };

  const onSubmitSearch = data => {
    onSearch(data);
    setShowSearchState(false);
  };

  const onCancelSearch = () => {
    searchForm.reset({});
  };

  const inactivateBase = studentId => {
    inactivate(studentId).catch(e => console.log(e));
  };

  const activateBase = studentId => {
    activate(studentId).catch(e => console.log(e));
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
                        showCancelButton={!hideCleanButton}
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
                    activate={activateBase}
                    inactivate={inactivateBase}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                  {hideAddButton ? null : (
                    <Row>
                      <Col xs={1} style={{ marginBottom: "5px" }}>
                        <Button onClick={onAdd}>Agregar</Button>
                      </Col>
                    </Row>
                  )}
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
                            {...(isUsingRef && { ref: childFormRef })}
                            onSubmit={onSubmitForm}
                            register={addUpdateForm.register}
                            errors={addUpdateForm.errors}
                            setFormValue={addUpdateForm.setValue}
                            control={addUpdateForm.control}
                            watch={addUpdateForm.watch}
                            isEditing={isEditing}
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

      <Modal show={showDeleteModal} backdrop="static" keyboard={false}>
        <Modal.Body>¿Está seguro que desea eliminar?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirmDelete}>
            Aceptar
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PageBase;
