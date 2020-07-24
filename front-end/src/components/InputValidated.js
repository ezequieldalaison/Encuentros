import React from 'react';
import Form from 'react-bootstrap/Form';
import ValidationLabel from './ValidationLabel';

const InputValidated = ({
    register,
    name,
    type,
    error,
    isRequired,
    minLength}) => {
        let validationModel = {};

        if(isRequired) {
            validationModel.required = { value: true, message: 'Este campo es requerido' };
        }
        
        if(minLength) {
            validationModel.minLength = { value: minLength, message: `Debe tener al menos ${minLength} caracteres.` };
        }

        return (
            <>
            <Form.Control name={name} type={type} ref={register(validationModel)} />
            <ValidationLabel error={error}></ValidationLabel>
            </>
        );
}

export default InputValidated;