import React from "react";
import Card from "./Card";
import { DataCards } from "../../src/contexts/DataCards.js";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeletCard,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(DataCards);

  return (
    <main>
      <section className="profile container">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <div className="profile__avatar-editImage" />
          <img
            src={`${currentUser.avatar}`}
            alt="фотография автора."
            className="profile__avatar-image"
          />
        </div>
        <div className="profile__info">
          <div className="profile__user-data">
            <h1 className="profile__name overflow-text">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            >
              <span className="sr-only">Редактировать</span>
            </button>
          </div>
          <p className="profile__profession overflow-text">
            {currentUser.about}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <span className="sr-only">Добавить</span>
        </button>
      </section>
      <section className="elements container" aria-label="Карточки с местами">
        {cards.map((card, i) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onDeletCard={onDeletCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
