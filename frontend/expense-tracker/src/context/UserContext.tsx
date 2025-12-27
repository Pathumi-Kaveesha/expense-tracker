import { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // Function to update user data
  const updateUser = (userData: any) => {
    setUser(userData);
  };

  // Function to clear user data (logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
