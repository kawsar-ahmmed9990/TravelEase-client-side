import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import ForgetPass from "../Pages/ForgetPass";
import AllVehicles from "../Components/AllVehicles/AllVehicles";
import MyVehicles from "../Components/MyVehicles/MyVehicles";
import MyBooking from "../Components/MyBooking/MyBooking";
import AddVehicles from "../Components/AddVehicles/AddVehicles";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allvehicles",
        element: <AllVehicles></AllVehicles>,
      },
      {
        path: "/addvehicles",
        element: (
          <PrivateRoute>
            <AddVehicles></AddVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "/myvehicles",
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "/mybooking",
        element: (
          <PrivateRoute>
            <MyBooking></MyBooking>
          </PrivateRoute>
        ),
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
