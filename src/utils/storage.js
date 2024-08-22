// eslint-disable-next-line import/no-anonymous-default-export
// export default {
//   add: (key, item) => localStorage.setItem(key, item),

//   fetch: (key) => localStorage.getItem(key),

//   remove: (key) => localStorage.removeItem(key),

//   clear: () => localStorage.clear(),
// };

export default {
  add: (key, item) => sessionStorage.setItem(key, item),

  fetch: (key) => sessionStorage.getItem(key),

  remove: (key) => sessionStorage.removeItem(key),

  clear: () => sessionStorage.clear(),
};

