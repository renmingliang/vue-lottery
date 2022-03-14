export const STORAGE_KEY = 'mta_login_status'

export function getToken(key = STORAGE_KEY) {
  return localStorage.getItem(key)
}

export function setToken(value, expired = 6000 * 150) {
  localStorage.setItem(STORAGE_KEY, value)
  if (expired) {
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY)
    }, expired)
  }
}

export function removeToken() {
  localStorage.removeItem(STORAGE_KEY)
}

export function clearToken() {
  localStorage.clear()
}
