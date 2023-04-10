import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./client/Home/HomePage"
import AnunciePage from "./client/Anunciar/Anuncie";
import DetailsUser from "./client/Home/detalhes/DetailsUser";
import PainelAdm from "./client/painel/Adm";
import LoginAdm from "./client/painel/LoginAdm";
import ProfilePage from "./client/profile/profile";

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login-adm" element={<LoginAdm isLoggedIn={false} setIsLoggedIn={function (value: React.SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        } } />} />
          <Route path="/administracao" element={<PainelAdm />} />
          <Route path="/detalhes" element={<DetailsUser acompanhante={null} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
      </Routes>
    </BrowserRouter>
  );
}