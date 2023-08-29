import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
import okImg from "../images/OK.png";
import errorImg from "../images/Error.png";

function InfoTooltip({ onClose, isInfoTooltip }) {
  usePopupClose(isInfoTooltip.isOpen, onClose);

  return (
    <div
      className={`popup popup_type_${
        isInfoTooltip.name
      } close-popup popup-overlay ${
        isInfoTooltip.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close popup-close-button"
          type="button"
          onClick={onClose}
        >
          <span className="sr-only">Закрыть</span>
        </button>
        <div className="popup__form">
          <img
            className="popup__image"
            src={isInfoTooltip.name === "OK" ? okImg : errorImg}
            alt={isInfoTooltip.name}
          />

          <h2 className="popup__title_error">{isInfoTooltip.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
