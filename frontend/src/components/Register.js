import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ handleRegistration }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(formValue.email, formValue.password);
  }

  return (
    <div className="login">
      <p className="login__title">Регистрация</p>
      <AuthForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValueEmail={formValue.email}
        formValuePassword={formValue.password}
        buttonText="Зарегистрироваться"
        link={
          <p className="login__link">
            Уже зарегистрированы?
            <Link className="login__link_hover" to="/sign-in">
              Войти
            </Link>
          </p>
        }
      />

      {/* <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__text"
          required
          id="email"
          placeholder="Email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          className="login__text"
          required
          id="password"
          placeholder="Пароль"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
        />
        <button className="login__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="login__link">
          Уже зарегистрированы?
          <Link className="login__link_hover" to="/sign-in">
            Войти
          </Link>
        </p>
      </form> */}
    </div>
  );
}

export default Register;
