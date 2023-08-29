import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(0);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <>
      <PopupWithForm
        onClose={onClose}
        isOpen={isOpen}
        title="Обновить аватар"
        name="newAvatar"
        buttonText="Сохранить"
        onSubmit={handleSubmit}
        children={
          <>
            <input
              className="popup__text popup__text_type_link-Avatar"
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              required=""
              ref={avatarRef}
            />
            <span className="popup__span popup__span_newAvatar popup__span_type_link-error" />
          </>
        }
      />
    </>
  );
}

export default EditProfilePopup;
