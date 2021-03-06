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
  isSearchUsingRef,
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
  setPaid,
  setPending,
  ...props
}) => {
  const { data, columns } = grid;
  const [showSearchState, setShowSearchState] = useState(false);
  const [showGridState, setShowGridState] = useState(true);
  const [showFormState, setShowFormState] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const addUpdateForm = useForm();
  const addUpdateFormRef = useRef();
  const searchForm = useForm();
  const searchFormRef = useRef();

  const onAdd = () => {
    setShowSearchState(false);
    setShowGridState(false);
    setShowFormState(true);

    if (setEntityUnderUpdate) setEntityUnderUpdate();
  };

  const onUpdate = id => {
    getEntity(id).then(entity => {
      if (props.canEditDelete && !props.canEditDelete(entity, false)) {
        return;
      }

      setShowSearchState(false);
      setShowGridState(false);
      setShowFormState(true);
      setEntityUnderUpdate(entity);

      if (addUpdateFormRef.current && addUpdateFormRef.current.setSelectValue)
        addUpdateFormRef.current.setSelectValue(entity);

      for (var key in entity) {
        addUpdateForm.setValue(key, entity[key], { shouldValidate: true });
      }
    });
  };

  const onDelete = id => {
    if (props.canEditDelete) {
      getEntity(id).then(entity => {
        if (!props.canEditDelete(entity, true)) {
          return;
        }

        setDeleteId(id);
        setShowDeleteModal(true);
      });
    } else {
      setDeleteId(id);
      setShowDeleteModal(true);
    }
  };

  const onConfirmDelete = () => {
    props.onDelete(deleteId).catch(e => console.log(e));
    setShowDeleteModal(false);
  };

  const onCancelForm = () => {
    if (addUpdateFormRef.current && addUpdateFormRef.current.cleanSelects)
      addUpdateFormRef.current.cleanSelects();
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
        if (addUpdateFormRef.current) addUpdateFormRef.current.cleanSelects();
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
    if (searchFormRef.current && searchFormRef.current.cleanSelects)
      searchFormRef.current.cleanSelects();

    searchForm.reset({});
  };

  const inactivateBase = entityId => {
    inactivate(entityId).catch(e => console.log(e));
  };

  const activateBase = entityId => {
    activate(entityId).catch(e => console.log(e));
  };

  const setPaidBase = entityId => {
    setPaid(entityId).catch(e => console.log(e));
  };

  const setPendingBase = entityId => {
    setPending(entityId).catch(e => console.log(e));
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
                            {...(isSearchUsingRef && { ref: searchFormRef })}
                            onSubmit={onSubmitSearch}
                            register={searchForm.register}
                            setFormValue={searchForm.setValue}
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
                    setPaid={setPaidBase}
                    setPending={setPendingBase}
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
                            {...(isUsingRef && { ref: addUpdateFormRef })}
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
