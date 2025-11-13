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
import VehicleDetails from "../Components/VehicleDetails/VehicleDetails";
import UpdateVehicle from "../Components/UpdateVehicle/UpdateVehicle";
import ErrorPage from "../Pages/ErrorPage";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/vehicledetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://travelease-server-side-omega.vercel.app/vehicles/${params.id}`
          ),
        element: (
          <PrivateRoute>
            {" "}
            <VehicleDetails></VehicleDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/updatevehicle/:id",
        loader: ({ params }) =>
          fetch(
            `https://travelease-server-side-omega.vercel.app/updatevehicle/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <UpdateVehicle></UpdateVehicle>
          </PrivateRoute>
        ),
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
        element: (
          <PublicRoute>
            <SignUp></SignUp>
          </PublicRoute>
        ),
      },
      {
        path: "/auth/signin",
        element: (
          <PublicRoute>
            <SignIn></SignIn>
          </PublicRoute>
        ),
      },
      {
        path: "/auth/signin/forgetpassword",
        element: <ForgetPass></ForgetPass>,
      },
    ],
  },
]);
export default router;
