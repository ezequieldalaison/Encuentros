import React, { useState, forwardRef, useImperativeHandle } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GridBase from "./GridBase";
import Alert from "react-bootstrap/Alert";

const PageBase = forwardRef(
  ({ grid, title, form: FormComponent, onSubmit, alert, hideAlert }, ref) => {
    const { data, columns } = grid;
    const [showSearchState, setShowSearchState] = useState(true);
    const [showGridState, setShowGridState] = useState(true);
    const [showFormState, setShowFormState] = useState(false);

    useImperativeHandle(ref, () => ({
      showForm(value) {
        alert("showForm from Child");
        setShowFormState(value);
      }
    }));

    const onAdd = () => {
      setShowSearchState(false);
      setShowGridState(false);
      setShowFormState(true);
    };

    const toggleSearch = () => {
      setShowSearchState(!showSearchState);
    };

    const toggleGrid = () => {
      setShowGridState(!showGridState);
    };

    return (
      <Container>
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
                    <Row>
                      <Col xs={10}></Col>
                      <Col xs={1} style={{ marginBottom: "5px" }}>
                        <Button onClick={onAdd}>Agregar</Button>
                      </Col>
                    </Row>
                    <GridBase columns={columns} data={data} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>

        {FormComponent ? (
          <Row style={{ marginTop: "25px" }}>
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
                      <FormComponent onSubmit={onSubmit} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        ) : null}

        {alert.show ? (
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
  }
);

export default PageBase;
