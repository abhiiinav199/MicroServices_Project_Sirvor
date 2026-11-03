import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, //Parent Layout

    children: [
      {
        index: true, // "/" pe Home dikhega
        element: <Home />,
      },
      // aage jaake aur pages yahan add ho sakte hain:
      // { path: "login", element: <Login /> },
      // { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);
