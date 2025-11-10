import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import ForgetPass from "../Pages/ForgetPass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/auth/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/auth/signin/forgetpassword",
        element: <ForgetPass></ForgetPass>,
      },
    ],
  },
]);
export default router;
