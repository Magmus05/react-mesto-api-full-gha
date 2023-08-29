import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";
// import {useForm} from "../hooks/useForm.js";

function AddPlacePopup({ isOpen, onClose, onSubmitNewCard }) {
  // const {values, handleChange, setValues} = useForm({name:"", link:""})
  const { values, handleChange, errors, setValues, resetForm } =
    useFormAndValidation({ name: "", link: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitNewCard({ name: values.name, link: values.link }, clearInputValue);
    resetForm();
  }

  function clearInputValue() {
    setValues({ name: "", link: "" });
  }
  return (
    <>
      <PopupWithForm
        onClose={onClose}
        isOpen={isOpen}
        title="Новое место"
        name="createCard"
        buttonText="Создать"
        onSubmit={handleSubmit}
      >
        <>
          {/* вместо children вставил разметку между тегами компоонента */}
          <input
            className="popup__text popup__text_type_name-card"
            type="text"
            placeholder="Название"
            name="name"
            required=""
            minLength={2}
            maxLength={50}
            value={values.name || ""}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <span className="popup__span popup__span_type_name-error">
            {errors.name}
          </span>
          <input
            className="popup__text popup__text_type_link-card"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required=""
            value={values.link || ""}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <span className="popup__span popup__span_type_link-error">
            {errors.link}
          </span>
        </>
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
