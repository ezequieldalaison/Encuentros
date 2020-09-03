import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as WeeklyClassActions from "../../../../redux/actions/Pilates/WeeklyClassActions";
import * as ClassActions from "../../../../redux/actions/Pilates/ClassActions";
import DayClassCard from "./DayClassCard";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const WeeklyClassPage = ({ getClassesByWeek, classes }) => {
  const [week, setWeek] = useState(0);

  useEffect(() => {
    getClassesByWeek(week);
  }, [getClassesByWeek, week]);

  const addWeek = () => {
    setWeek(week + 1);
  };

  const subtractWeek = () => {
    setWeek(week - 1);
  };

  return (
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
            classes={classes.filter(c => c.day.id === 1)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Martes"
            classes={classes.filter(c => c.day.id === 2)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Miércoles"
            classes={classes.filter(c => c.day.id === 3)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Jueves"
            classes={classes.filter(c => c.day.id === 4)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Viernes"
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
  getWeeklyClasses: WeeklyClassActions.getWeeklyClasses,
  getClassesByWeek: ClassActions.getClassesByWeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyClassPage);
