import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfoContext, setUserInfoContext] = useState(null);
  return (
    <UserContext.Provider value={{ userInfoContext, setUserInfoContext }}>
      {children}
    </UserContext.Provider>
  );
}
