
export default class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)

  }

  getInitialCards() {
    return fetch(this._baseUrl + `/cards`, {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  deleteCards(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log('fsdf'))
  }
  addNewlike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  deletelikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log())
  }

  changeAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log("error1"))
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'c9823303-b55f-4738-a9da-237c09a74944',
    'Content-Type': 'application/json'
  }
});
