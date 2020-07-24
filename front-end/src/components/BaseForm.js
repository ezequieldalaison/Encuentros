import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BaseForm = ({
    cancel,
    submit,
    submitButtonText,
    elements,
    cssFormClass,
    showCancelButton}) => {

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
      <>
        <Form onSubmit={handleSubmit} className={cssFormClass}>
            {elements()}

            <Button variant="primary" type="submit">
                {submitButtonText}
            </Button>
            <Button variant="secondary" 
                    onClick={handleCancel}
                    style={{ visibility: showCancelButton ? 'visible': 'hidden'}}
            >
                Cancelar
            </Button>
        </Form>
      </>
  );
};

export default BaseForm;