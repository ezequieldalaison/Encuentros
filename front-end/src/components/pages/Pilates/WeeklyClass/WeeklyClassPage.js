import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as WeeklyClassActions from "../../../../redux/actions/Pilates/WeeklyClassActions";
import DayClassCard from "./DayClassCard";

const WeeklyClassPage = ({ weeklyClasses, getWeeklyClasses }) => {
  useEffect(() => {
    getWeeklyClasses();
  }, [getWeeklyClasses]);

  return (
    <Container
      style={{ maxWidth: "100%", marginTop: "25px", marginBottom: "25px" }}
    >
      <Row>
        <Col>
          <DayClassCard
            dayName="Lunes"
            weeklyClasses={weeklyClasses.filter(wc => wc.dayId === 1)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Martes"
            weeklyClasses={weeklyClasses.filter(wc => wc.dayId === 2)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Miércoles"
            weeklyClasses={weeklyClasses.filter(wc => wc.dayId === 3)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Jueves"
            weeklyClasses={weeklyClasses.filter(wc => wc.dayId === 4)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Viernes"
            weeklyClasses={weeklyClasses.filter(wc => wc.dayId === 5)}
          />
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    weeklyClasses: state.weeklyClasses
  };
}

const mapDispatchToProps = {
  getWeeklyClasses: WeeklyClassActions.getWeeklyClasses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyClassPage);
