import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./client/Home/HomePage"
import AnunciePage from "./client/Anunciar/Anuncie";
import DetailsUser from "./client/Home/detalhes/DetailsUser";

// @ts-ignore
// const PrivateRoute = ({ children, redirectTo }) => {
//   const isAuthenticated = localStorage.getItem("token") !== null;
//   console.log("isAuth: ", isAuthenticated);
//   return isAuthenticated ? children : <Navigate to={redirectTo} />;
// };

export function RoutesDefinided() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/anunciar" element={<AnunciePage />} />
          <Route path="/detalhes" element={<DetailsUser acompanhante={null} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
      </Routes>
    </BrowserRouter>
  );
}