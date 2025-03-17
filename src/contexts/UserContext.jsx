import { createContext, useState} from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [isTableAvail, setIsTableAvail] = useState(false);

  const value = {
    isTableAvail,
    setIsTableAvail,
  };

  return (
    <UserContext.Provider value={value}> {props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
