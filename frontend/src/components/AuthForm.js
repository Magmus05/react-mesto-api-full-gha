import React from "react";

function AuthForm({
  handleSubmit,
  handleChange,
  formValueEmail,
  formValuePassword,
  buttonText,
  link,
}) {
  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <input
        className="login__text"
        required
        id="email"
        placeholder="Email"
        name="email"
        type="email"
        value={formValueEmail}
        onChange={handleChange}
      />
      <input
        className="login__text"
        required
        id="password"
        placeholder="Пароль"
        name="password"
        type="password"
        value={formValuePassword}
        onChange={handleChange}
      />
      <button className="login__button" type="submit">
        {buttonText}
      </button>
      {link}
    </form>
  );
}

export default AuthForm;
