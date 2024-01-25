import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { MyAppContext } from "../context/appContext";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(MyAppContext);

  return (isLoggedIn) ? <Outlet /> : <Navigate to={"/login"} replace/>;
};
