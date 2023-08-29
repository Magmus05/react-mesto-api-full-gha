import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ImagePopup from "./ImagePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../../src/contexts/CurrentUserContext.js";
import { DataCards } from "../../src/contexts/DataCards.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as Auth from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState({ isOpen: false });
  const [cards, setCards] = React.useState([]);

  // _______________Авторизация, Регистрация__________________
  React.useEffect(() => {
    handleTokenCheck();
    //eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  function handleRegistration(email, password) {
    Auth.register(email, password)
      .then((res) => {
        navigate("/sign-in", { replace: true });
        setInfoTooltip({
          isOpen: true,
          title: "Вы успешно зарегистрировались!",
          name: "OK",
        });
      })
      .catch((err) => {
        console.log(`Ошибка ${err.status}, ${err.statusText}`);
        setInfoTooltip({
          isOpen: true,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          name: "Errore",
        });
      });
  }

  function handleLogin(email, password, setFormValue) {
    Auth.authorize(email, password)
      .then((data) => {
          setFormValue({ email: "", password: "" });
          setIsLoggedIn(true);
          handleTokenCheck()
          navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка ${err.status}, ${err.statusText}`);
        setInfoTooltip({
          isOpen: true,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          name: "Errore",
        });
      });
  }

  function handleTokenCheck() {

      Auth.checkToken()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);


            api.getUserInformation()
            .then((intialData) => {
              setCurrentUser(intialData);
            })
            .catch((err) => console.log(`Ошибка ${err}`));

            api.getInitialCards()
            .then((intialData) => {
              setCards(intialData);
            })
            .catch((err) => console.log(`Ошибка ${err}`));




            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err.status}, ${err.statusText}`)
          // setInfoTooltip({
          //   isOpen: true,
          //   title: `Ошибка ${err.status}, ${err.statusText}`,
          //   name: "Errore",
          // });
        });
    
  }
  function handleExit() {
    Auth.logout()
    .then((res) => {
      console.log(res);
      if (res) {
        setIsLoggedIn(false);
        navigate("/sign-in", { replace: true });
      }
    })
    .catch((err) => console.log(`Ошибка ${err.status}, ${err.statusText}`));
  }

  // ____________________Карточки и пользователь___________________
  // React.useEffect(() => {
  //   api
  //     .getUserInformation()
  //     .then((intialData) => {
  //       setCurrentUser(intialData);
  //     })
  //     .catch((err) => console.log(`Ошибка ${err}`));
  // }, [setCurrentUser]);


  // React.useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((intialData) => {
  //       setCards(intialData);
  //     })
  //     .catch((err) => console.log(`Ошибка ${err}`));
  // }, [setCards]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке

    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    } else {
      api
        .putLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteMyCard(card._id)
      .then(() => {
        setCards((state) => {
          const newState = state.filter((c) => {
            return c._id !== card._id;
          });
          return newState;
        });
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleUpdateUser(newName, newAbout) {
    api
      .editProfileData(newName, newAbout)
      .then((newDataProfile) => {
        setCurrentUser(newDataProfile);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .updateAvatar(avatarLink)
      .then((newDataProfile) => {
        setCurrentUser(newDataProfile);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleAddPlaceSubmit(newCard, clearInputValue) {
    api
      .addNewCard(newCard)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
        clearInputValue();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltip(false);
  }

  function onEditProfile() {
    setEditProfilePopupOpen(true);
  }
  function onAddPlace() {
    setAddPlacePopupOpen(true);
  }
  function onEditAvatar() {
    setEditAvatarPopupOpen(true);
  }
  function onCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }
  function onDeletCard() {
    setDeleteCardPopupOpen(true);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <DataCards.Provider value={cards}>
          <Header
            isLoggedIn={isLoggedIn}
            email={localStorage.getItem("userEmail")}
            handleExit={handleExit}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  onEditProfile={onEditProfile}
                  onAddPlace={onAddPlace}
                  onEditAvatar={onEditAvatar}
                  onCardClick={onCardClick}
                  onDeletCard={onDeletCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/sign-up"
              element={<Register handleRegistration={handleRegistration} />}
            />
          </Routes>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmitNewCard={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            isOpen={isDeleteCardPopupOpen}
            onClose={() => {
              closeAllPopups();
            }}
            title="Вы уверены?"
            name="deletCard"
            buttonText="Да"
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={() => {
              closeAllPopups();
            }}
            card={selectedCard}
          />
          <InfoTooltip isInfoTooltip={isInfoTooltip} onClose={closeAllPopups} />
        </DataCards.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
