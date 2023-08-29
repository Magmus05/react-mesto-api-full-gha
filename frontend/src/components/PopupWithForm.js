import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  onClose,
  isOpen,
  title,
  name,
  buttonText,
  onSubmit,
  children,
}) {
  usePopupClose(isOpen, onClose);
  //правильный обработчик Escape (оставлю тут для понимания обоих методов, сейчас обрабатывается хуком usePopupClose)
  // useEffect(() => {
  //   function closeByEscape(evt) {
  //     if(evt.key === 'Escape') {
  //       closeAllPopups();
  //     }
  //   }
  //   if(isOpen) { // навешиваем только при открытии
  //     document.addEventListener('keydown', closeByEscape);
  //    // тут оверлей навешиваем
  //     return () => {
  //       document.removeEventListener('keydown', closeByEscape);
  //      // тут оверлей удаляем
  //     }
  //   }
  // }, [isOpen])

  return (
    <div
      className={`popup popup_type_${name} close-popup popup-overlay ${
        isOpen ? "popup_opened" : ""
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
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__button popup__button_${name}`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
