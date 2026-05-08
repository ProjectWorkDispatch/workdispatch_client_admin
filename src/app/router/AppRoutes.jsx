import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";
import { DashboardHome } from "../../features/dashboard/components/DashbboardHome.jsx";
import { UsersHome } from "../../features/users/components/UsersHome.jsx";

export const AppRoutes = ()=> {

    return(
        <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<AuthPage/>} />


            {/* PROTECTED + ROLE */}
            <Route path="/dashboard/" element={<DashboardPage />}>
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="usuarios" element={<UsersHome />} />
            </Route>


            {/* Ruta temporal para pruebas */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
}