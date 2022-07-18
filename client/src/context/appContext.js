import React, { useReducer, useContext } from "react"
import axios from "axios"
import reducer from "./reducer"
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  TOGGLE_SIDEBAR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from "./actions"

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  user: user ? JSON.parse(user) : null,
  token: token,
}

const url = "http://localhost:5000/api/v1/auth"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Alert Settings
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 2500)
  }
  //--------------------------
  //toggleNavbar
  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  const userSetup = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`${url}/${endPoint}`, currentUser)
      const { user, token } = data

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (err) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        toggleSideBar,
        userSetup,
        logoutUser,
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
