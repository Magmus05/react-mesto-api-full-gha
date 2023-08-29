import React from "react";
class Api extends React.Component {
  constructor(props) {
    super(props);
    this._baseUrl = props.baseUrl;
    this.headers = props.headers;
  }
  getUserInformation() {
    return this._request(`${this._baseUrl}users/me`, {
      credentials: "include",
      headers: this.headers,
    });

    // return fetch(`${this._baseUrl}users/me`, {
    //   headers: this.headers,
    // }).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}cards`, {
      credentials: "include",
      headers: this.headers,
    });

    // return fetch(`${this._baseUrl}cards`, {
    // 	headers: this.headers
    // })
    // .then(this._checkResponse)
  }

  editProfileData(newName, newAbout) {
    return this._request(`${this._baseUrl}users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    });

    // return fetch(`${this._baseUrl}users/me`, {
    //   method: "PATCH",
    //   headers: this.headers,
    //   body: JSON.stringify({
    //     name: newName,
    //     about: newAbout,
    //   }),
    // }).then(this._checkResponse);
  }
  // в остальных местах оставлю запросы по старому, без функции _request, что бы оба метода были на виду.
  addNewCard(newData) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        name: newData.name,
        link: newData.link,
      }),
    }).then(this._checkResponse);
  }
  deleteMyCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  putLikeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }
}
export const api = new Api({
  baseUrl: "https://api.magmus05.studen.nomoreparties.co/",
  //baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65/",
  headers: {
    //authorization: "01c577aa-8668-46fe-928c-79fc4aa9c83a",
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
});
