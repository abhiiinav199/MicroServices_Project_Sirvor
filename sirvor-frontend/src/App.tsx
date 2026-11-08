import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((state: any) => state.auth.token)
  console.log(token);
  
  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen w-full overflow-y-auto">
      <Navbar />
      <Outlet />
      <Toaster/>
    </div>
  );
};

export default App;
