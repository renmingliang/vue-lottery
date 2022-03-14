export const isPlainObj = val =>
  toString.call(val) === '[object Object]' && val !== null && !Array.isArray(val)
