import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Register } from "./pages/home"
import { Layout } from "./pages/dashboard"
import Error from "./pages/error"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
