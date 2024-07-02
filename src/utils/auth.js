import storage from "./storage";
import jwt from "./jwt";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isAuthenticated: () => {
    const token = storage.fetch("token");
    if (token) {
      const decoded = jwt.decode(token.slice(6));
      const { exp } = decoded;
      if (exp && Date.now() <= exp * 1000) {
        return true;
      } else {
        storage.clear();
        return false;
      }
    } else {
      return false;
    }
  },
};
