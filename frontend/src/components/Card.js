import React from "react";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext.js";

function Card({card, onCardClick, onDeletCard, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <article className="element">
      <img
        className="element__image"
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={() => {
          onCardClick(card);
        }}
      />
      {card.owner === currentUser._id && (
        <button
          className="element__delete"
          type="subbmit"
          onClick={() => {
            onCardDelete(card);
          }}
        >
          <span className="sr-only">Закрыть</span>
        </button>
      )}
      <div className="element__info">
        <h2 className="element__title overflow-text">{card.name}</h2>
        <div className="element__like">
          <button
            className={`element__like-button ${
              card.likes.some((i) => i === currentUser._id) &&
              "element__like-button_active"
            }`}
            type="button"
            onClick={() => {
              onCardLike(card);
            }}
          >
            <span className="sr-only">лайк</span>
          </button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
