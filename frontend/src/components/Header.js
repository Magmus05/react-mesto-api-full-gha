import React from "react";
import logoImg from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn, email, handleExit }) {
  const location = useLocation();
  return (
    <header className="header container">
      <img src={logoImg} alt="Логотип сайта." className="header__logo" />
      <div>
        {isLoggedIn && (
          <p className="header__link">
            {email}{" "}
            <Link className="header__link" to="/sign-in" onClick={handleExit}>
              Выйти
            </Link>
          </p>
        )}
        {!isLoggedIn && (
          <>
            {location.pathname !== "/sign-in" && (
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            )}

            {location.pathname !== "/sign-up" && (
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
