import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./pages/login";
import Register from "./pages/register";
import Categories from "./pages/categories";
import Word from "./pages/words";
import UpdateUser from "./pages/updateUser";
import AddWord from "./pages/addWords";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/categories",
    element: <Categories/>
  },
  {
    path: "/category/:id",
    element: <Word/>
  },
  {
    path: "*",
    element: <h1>Not found</h1>,
  },
  {
    path: "update-user",
    element: <UpdateUser/>
  }, 
  {
    path: "/category/:id/words",
    element: <AddWord/>
  },
  {
    path: "/home",
    element: <Home/>,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);