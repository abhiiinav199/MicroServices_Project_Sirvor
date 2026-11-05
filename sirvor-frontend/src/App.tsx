import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen w-full overflow-y-auto">
      <Navbar />
      <Outlet />
      <Toaster/>
    </div>
  );
};

export default App;
