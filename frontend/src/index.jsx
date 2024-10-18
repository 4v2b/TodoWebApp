import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, { loader as todoLoader } from "./routes/Root";
import ErrorPage from "./error-page";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login, { loader as accountLoader } from "./routes/Login";
import TodoList, { loader as listLoader } from "./components/TodoList";
import { getToken } from "./utils/storageHelpers";
import Register from "./routes/Register";

function isAuthenticated() {
  return !!getToken()
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
    children: [{
      path: "/",
      element: <Root />,
      loader: todoLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "todo/:listId",
          element: <TodoList />,
          loader: listLoader,
          errorElement: <ErrorPage />
        }
      ]
    }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);