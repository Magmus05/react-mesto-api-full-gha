import React from "react";
import AuthForm from "./AuthForm";

function Login({ handleLogin }) {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password, setFormValue);
  }

  return (
    <div className="login">
      <p className="login__title">Вход</p>
      <AuthForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValueEmail={formValue.email}
        formValuePassword={formValue.password}
        buttonText="Войти"
        link=""
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
          Войти
        </button>
      </form> */}
    </div>
  );
}

export default Login;
