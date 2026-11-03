import { Outlet } from "react-router-dom"
import Navbar from "./components/layout/Navbar"

const App = () => {
  return (
    <div className="bg-[#0B0B0F] text-white h-screen w-screen overflow-y-auto">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App