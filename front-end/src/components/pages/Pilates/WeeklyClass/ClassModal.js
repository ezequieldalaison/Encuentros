import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as WeeklyClassActions from "../../../../redux/actions/Pilates/WeeklyClassActions";
import { connect } from "react-redux";
import CustomSpinner from "../../../common/CustomSpinner";

const ClassModal = ({
  weeklyClassId,
  loading,
  show,
  handleClose,
  getWeeklyClass
}) => {
  const [weeklyClass, setWeeklyClass] = useState();

  useEffect(() => {
    if (show) {
      getWeeklyClass(weeklyClassId).then(wc => setWeeklyClass(wc));
    }
  }, [getWeeklyClass, show, weeklyClassId]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              {weeklyClass ? `${weeklyClass.day.name} ${weeklyClass.hour}` : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress
  };
}

const mapDispatchToProps = {
  getWeeklyClass: WeeklyClassActions.getWeeklyClass
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassModal);
