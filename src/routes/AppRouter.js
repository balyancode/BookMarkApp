import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../Containers/Auth";
import Home from "../Containers/Home/Home";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoutes";

const AppRouter = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="home"
          element={
            <ProtectedRoute>
                 <Home/>
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  };
  
  export default AppRouter;