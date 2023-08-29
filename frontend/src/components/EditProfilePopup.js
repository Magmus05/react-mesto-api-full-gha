import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, setValues, resetForm } =
    useFormAndValidation({
      name: currentUser.name,
      profession: currentUser.about,
    });

  React.useEffect(() => {
    setValues({ name: currentUser.name, profession: currentUser.about });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.profession);
    resetForm();
  }
  return (
    <>
      <PopupWithForm
        onClose={onClose}
        isOpen={isOpen}
        title="Редактировать профиль"
        name="editProfile"
        buttonText="Сохранить"
        onSubmit={handleSubmit}
      >
        <>
          <input
            className="popup__text popup__text_type_name "
            type="text"
            placeholder="Имя"
            name="name"
            required=""
            minLength={2}
            maxLength={40}
            value={values.name || " "}
            onChange={(e) => handleChange(e)}
          />
          <span className="popup__span popup__span_type_name-error">
            {errors.name}
          </span>
          <input
            className="popup__text popup__text_type_profession"
            type="text"
            placeholder="Профессия"
            name="profession"
            required=""
            minLength={2}
            maxLength={200}
            value={values.profession || " "}
            onChange={(e) => handleChange(e)}
          />
          <span className="popup__span popup__span_type_profession-error">
            {errors.profession}
          </span>
        </>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
