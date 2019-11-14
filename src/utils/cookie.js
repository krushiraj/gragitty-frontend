export const setCookie = (name, value, expires) => {
  let date = new Date()
  date.setTime(date.getTime() + (expires || 86400000))
  document.cookie = `${name}=${value};expires=${date.toGMTString()}`
}

export const getCookie = (name, defaultValue) => {
  for(const cookie of document.cookie.split(';')) {
    if (cookie.startsWith(name)) {
      return cookie.split('=')[1]
    }
  }
  return defaultValue || null
}

export const deleteCookie = (name) => {
  setCookie(name, '', -10);
}