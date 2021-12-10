import React, { createContext, useState, useContext } from "react";

const MenuContext = createContext();

export default function MenuProvider({ children }) {
  const [openMenu, setOpenMenu] = useState('50px');
  const [nameLogo, setNameLogo] = useState('Login');

  return (
    <MenuContext.Provider
      value={{
        openMenu, setOpenMenu,
        nameLogo, setNameLogo,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  const { 
    openMenu, nameLogo, 
    setOpenMenu, setNameLogo, 
  } = context;
  return { 
    openMenu, nameLogo, 
    setOpenMenu, setNameLogo,
  };
}