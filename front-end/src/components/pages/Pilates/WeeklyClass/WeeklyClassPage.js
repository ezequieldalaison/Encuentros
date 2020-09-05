import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as ClassActions from "../../../../redux/actions/Pilates/ClassActions";
import DayClassCard from "./DayClassCard";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import CustomSpinner from "../../../common/CustomSpinner";

const WeeklyClassPage = ({ getClassesByWeek, classes }) => {
  const [week, setWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getClassesByWeek(week).then(resp => setIsLoading(false));
  }, [getClassesByWeek, week]);

  const addWeek = () => {
    setWeek(week + 1);
  };

  const subtractWeek = () => {
    setWeek(week - 1);
  };

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <Container
      style={{ maxWidth: "100%", marginTop: "5px", marginBottom: "25px" }}
    >
      <Row style={{ marginBottom: "5px" }}>
        <Col xs={1}>
          <Button
            variant="link"
            style={{ padding: "0", float: "left" }}
            onClick={subtractWeek}
          >
            <FaArrowCircleLeft></FaArrowCircleLeft>
          </Button>
        </Col>
        <Col xs={10}></Col>
        <Col xs={1}>
          <Button
            variant="link"
            style={{ padding: "0", float: "right" }}
            onClick={addWeek}
            className="pull-right float-right"
          >
            <FaArrowCircleRight></FaArrowCircleRight>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <DayClassCard
            dayName="Lunes"
            dayId={1}
            classes={classes.filter(c => c.day.id === 1)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Martes"
            dayId={2}
            classes={classes.filter(c => c.day.id === 2)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Miércoles"
            dayId={3}
            classes={classes.filter(c => c.day.id === 3)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Jueves"
            dayId={4}
            classes={classes.filter(c => c.day.id === 4)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Viernes"
            dayId={5}
            classes={classes.filter(c => c.day.id === 5)}
          />
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    classes: state.classes
  };
}

const mapDispatchToProps = {
  getClassesByWeek: ClassActions.getClassesByWeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyClassPage);
