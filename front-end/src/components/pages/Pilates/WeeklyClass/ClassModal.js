import React, { useEffect } from "react";
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
  useEffect(() => {
    if (show) {
      getWeeklyClass(weeklyClassId).then(wc => console.log(wc));
    }
  }, [getWeeklyClass, show, weeklyClassId]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Clase con ID {loading}</Modal.Title>
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
