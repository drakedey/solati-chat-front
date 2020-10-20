import React, { useState, useContext, useEffect } from 'react';

import ReactModal from 'react-modal';

import { UserContext } from '../../providers/User';

import { getUserByUsername, doLogin, doRegister } from '../../api/user';

import './styles.css';

const VERIFY_NAME = 'VERIFY_NAME';
const DO_LOGIN = 'DO_LOGIN';
const DO_REGISTER = 'DO_REGISTER';

const AuthenticationModal = (props) => {
  const { data, login } = useContext(UserContext);
  const [open, setOpen] = useState(!Boolean(data.token));
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formStatus, setFormStatus] = useState(VERIFY_NAME);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setOpen(!Boolean(data.token));
    if (!Boolean(data.token)) {
      setFormStatus(VERIFY_NAME)
    }
  }, [data.token])

  const getButtonText = (match) => {
    if (match === VERIFY_NAME) return 'Verificar nombre de usuario';
    if (match === DO_LOGIN) return 'Iniciar sesion';
    if (match === DO_REGISTER) return 'Registrate';
  };

  const handleInputChange = (event) => {
    if (event.target) {
      const { name } = event.target;
      const { value } = event.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleVerifyName = async () => {
    try {
      if (!formValues.username) return;
      await getUserByUsername(formValues.username);
      setFormStatus(DO_LOGIN);
    } catch (err) {
      setFormStatus(DO_REGISTER);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await doLogin(formValues.username, formValues.password);
      login(data.data)
      setOpen(false)
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setFormError('Credenciales invalidas');
        }
      }
    }
  };

  const handleRegister = async () => {
    try {
      const { username, password } = formValues;
      const data = await doRegister({ username, password });
      login(data.data);
      setOpen(false);
    } catch (err) {
      if (err.response) {
        if (err.response) {
          setFormError(err.response.data.error);
        }
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    switch (formStatus) {
      case VERIFY_NAME:
        await handleVerifyName();
        break;
      case DO_LOGIN:
        await handleLogin();
        break;
      case DO_REGISTER:
        await handleRegister();
        break;
    }
  };

  return (
    <ReactModal isOpen={open} contentLabel="test" className="Modal">
      <h2 className="title">Bienvenido a Conversor de monedas</h2>
      <div className="form_container">
        <form className="form" onSubmit={handleSubmit}>
          <span className="input_container">
            <input
              type="text"
              className="input_login"
              placeholder="ingrese nombre de usuario"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              disabled={formStatus === DO_LOGIN || formStatus === DO_REGISTER}
            />
            {(formStatus === DO_LOGIN || formStatus === DO_REGISTER) && (
              <input
                type="password"
                className="input_login"
                placeholder="ingrese contraseña"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            )}
            {!!formError.length && <span className="error">{formError}</span>}
          </span>

          <div className="submit_button_container">
            <button className="submit_button">
              {getButtonText(formStatus)}
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AuthenticationModal;
