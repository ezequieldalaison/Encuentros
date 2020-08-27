import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as WeeklyClassActions from "../../../../redux/actions/Pilates/WeeklyClassActions";
import * as ClassActions from "../../../../redux/actions/Pilates/ClassActions";
import DayClassCard from "./DayClassCard";

const WeeklyClassPage = ({
  weeklyClasses,
  getWeeklyClasses,
  getClassesByWeek
}) => {
  useEffect(() => {
    getWeeklyClasses();
    getClassesByWeek(0).then(classes => console.log(classes));
  }, [getWeeklyClasses, getClassesByWeek]);

  return (
    <Container
      style={{ maxWidth: "100%", marginTop: "25px", marginBottom: "25px" }}
    >
      <Row>
        <Col>
          <DayClassCard
            dayName="Lunes"
            weeklyClasses={weeklyClasses.filter(wc => wc.day.id === 1)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Martes"
            weeklyClasses={weeklyClasses.filter(wc => wc.day.id === 2)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Miércoles"
            weeklyClasses={weeklyClasses.filter(wc => wc.day.id === 3)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Jueves"
            weeklyClasses={weeklyClasses.filter(wc => wc.day.id === 4)}
          />
        </Col>
        <Col>
          <DayClassCard
            dayName="Viernes"
            weeklyClasses={weeklyClasses.filter(wc => wc.day.id === 5)}
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
  getWeeklyClasses: WeeklyClassActions.getWeeklyClasses,
  getClassesByWeek: ClassActions.getClassesByWeek
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyClassPage);
