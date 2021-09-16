const ID_API_TOKEN = 'token'
// eslint-disable-next-line camelcase
const space_name = 'spance_name'
const user = 'user'

export const getToken = () => ({
  token: window.localStorage.getItem(ID_API_TOKEN),
  authName: window.localStorage.getItem(space_name),
  authUser: window.localStorage.getItem(user),
})

// eslint-disable-next-line no-shadow
export const setToken = (token, space, user) => {
  window.localStorage.setItem(ID_API_TOKEN, token)
  window.localStorage.setItem(space_name, space)
  window.localStorage.setItem(user, user)
}

export const unsetToken = () => {
  window.localStorage.removeItem(ID_API_TOKEN)
  window.localStorage.removeItem(space_name)
}

export default { getToken, setToken, unsetToken }
