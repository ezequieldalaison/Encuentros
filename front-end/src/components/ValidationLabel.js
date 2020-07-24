import React from 'react';
import Form from 'react-bootstrap/Form';

const ValidationLabel = (props) => {
    return (
        <Form.Label style={{ visibility: props.error ? 'visible': 'hidden'}}
                    className="validationLabel"
        >
            {props.error ? props.error.message : ''}
        </Form.Label>
    );
}

export default ValidationLabel;