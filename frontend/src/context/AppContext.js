import React, { useState } from "react"

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState("")

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        cart,
        setCart,
        loggedIn,
        setLoggedIn,
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContext
