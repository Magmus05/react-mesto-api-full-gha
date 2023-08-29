import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";
function ImagePopup({ isOpen, onClose, card }) {
  usePopupClose(isOpen, onClose);

  return (
    <div
      className={`popup popup-foto popup-foto_type_foto close-popup popup-overlay ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup-foto__wrapper">
        <button
          className="popup-foto__close popup-close-button"
          type="button"
          onClick={onClose}
        >
          <span className="sr-only">Закрыть</span>
        </button>
        <img
          className="popup-foto__image"
          alt={`${card.name}`}
          src={`${card.link}`}
        />
        <p className="popup-foto__image-name">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
