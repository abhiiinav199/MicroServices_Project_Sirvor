import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Signup from "../features/auth/pages/Signup";
import { NotFound } from "../pages/NotFound";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import Login from "../features/auth/pages/Login";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, //Parent Layout
    errorElement: <NotFound />, // Catches routing errors and 404s

    children: [
      {
        index: true, // "/" pe Home dikhega
        element: <Home />,
      },
      // aage jaake aur pages yahan add ho sakte hain:
      { path: "signup", element: <Signup /> },
      {path: "verify-otp" , element:<VerifyOtp/>},
      {path: "login", element:<Login/>},
      {path: "forgot-password", element:<ForgotPassword/>}
      // { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);
