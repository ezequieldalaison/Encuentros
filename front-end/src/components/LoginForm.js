import React, {useState} from 'react';

import '../App.css';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import BaseForm from './BaseForm';
import InputValidated from './InputValidated';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useForm } from "react-hook-form";

const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [alert, setAlert] = useState({show: false, message: ''});

  const hideAlert = () => {
    setAlert({show: false, message: ''});
  }
  
  const showAlert = (message) => {
    setAlert({show: true, message: message});
    
    setTimeout(hideAlert, 5000);
  }

  const onSubmit = data => { 
      props.auth.login();
    
  };
  
  return (
    <Container fluid className="loginContainer">
      <BaseForm className="loginForm loginContainer"
                cancel={() => console.log('cancel')}
                submit={handleSubmit(onSubmit)}
                submitButtonText="Ingresar"
                cssFormClass="loginForm"
                showCancelButton={false}
                elements={() => (
                  <>
                  <Form.Group controlId="">
                    <Form.Label>Usuario</Form.Label>
                    <InputValidated register={register}
                                    name="userName" 
                                    type="text"
                                    isRequired
                                    minLength="8"
                                    error={errors.userName}
                    >
                    </InputValidated>
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>Contraseña</Form.Label>
                    <InputValidated register={register}
                                    name="password" 
                                    type="password"
                                    isRequired
                                    minLength="8"
                                    error={errors.password}
                    >
                    </InputValidated>
                  </Form.Group>
                  { alert.show ? 
                    <Alert className="fixed-bottom alert" variant='danger' onClose={() => hideAlert()} dismissible>
                      {alert.message}
                    </Alert> : null
                  }
                  </>
                )}
                >
      </BaseForm>
  </Container>
  );
}

export default LoginForm;