import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as ParametersActions from "../../redux/actions/Common/ParameterActions";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const ParameterCard = ({
  parameters,
  getParametersByAreaId,
  updateParameter,
  areaId
}) => {
  useEffect(() => {
    getParametersByAreaId(areaId).catch(e => console.log(e));
  }, [getParametersByAreaId, areaId]);

  const onChangeValue = (parameterId, value) => {
    parameters = parameters.map(p =>
      p.id !== parameterId ? p : { ...p, value }
    );
  };

  const onSaveParameter = parameterId => {
    const parameter = parameters.find(p => p.id === parameterId);
    updateParameter(parameter)
      .then(r => toast.success("El parámetro se guardó correctamente"))
      .catch(e => console.log(e));
  };

  return (
    <Accordion defaultActiveKey="0">
      <Card border="secondary">
        <Card.Header style={{ padding: "5px" }}>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <h6>Parámetros</h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {parameters.map(p => (
              <Row key={p.id}>
                <Col xs={3}>{p.name}</Col>
                <Col xs={3}>
                  <Form.Control
                    name={p.name}
                    type={"number"}
                    defaultValue={p.value}
                    onChange={e => onChangeValue(p.id, e.target.value)}
                  />
                </Col>
                <Col xs={1}>
                  <Button
                    variant="link"
                    style={{ padding: "0" }}
                    onClick={() => {
                      onSaveParameter(p.id);
                    }}
                  >
                    <FaCheck style={{ verticalAlign: "middle" }} />
                  </Button>
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

function mapStateToProps(state) {
  return {
    parameters: state.parameters
  };
}

const mapDispatchToProps = {
  getParametersByAreaId: ParametersActions.getParametersByAreaId,
  updateParameter: ParametersActions.updateParameter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterCard);
