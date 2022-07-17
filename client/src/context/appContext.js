import React, { useReducer, useContext } from "react"
import reducer from "./reducer"
import { DISPLAY_ALERT, CLEAR_ALERT, TOGGLE_SIDEBAR } from "./actions"

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  user: null,
  token: null,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 2500)
  }

  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        toggleSideBar,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
