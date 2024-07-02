// eslint-disable-next-line import/no-anonymous-default-export
export default {
  add: (key, item) => localStorage.setItem(key, item),

  fetch: (key) => localStorage.getItem(key),

  remove: (key) => localStorage.removeItem(key),

  clear: () => localStorage.clear(),
};
