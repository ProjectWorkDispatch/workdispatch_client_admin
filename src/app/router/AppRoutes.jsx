import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";
import { DashboardHome } from "../../features/dashboard/components/DashbboardHome.jsx";
import { UsersHome } from "../../features/users/components/UsersHome.jsx";
import { JobsHome } from "../../features/jobs/components/JobsHome.jsx";
import { VerificationsHome } from "../../features/verifications/components/VerificationsHome.jsx";
import { ReportsHome } from "../../features/reports/components/ReportsHome.jsx";
import { ReviewsHome } from "../../features/reviews/components/ReviewsHomes.jsx";
import { CategoriesHome } from "../../features/categories/components/CategoriesHome.jsx";
import { ServiceRequestsHome } from "../../features/serviceRequests/components/ServiceRequestsHome.jsx";
import { ProposalsHome } from "../../features/proposals/components/ProposalsHome.jsx";
import { WorkerPortfolioHome } from "../../features/workerPortafolio/components/WorkerPortfolioHome.jsx";

export const AppRoutes = () => {

    return (
        <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<AuthPage />} />


            {/* PROTECTED + ROLE */}
            <Route path="/dashboard/" element={<DashboardPage />}>
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="usuarios" element={<UsersHome />} />
                <Route path="trabajos" element={<JobsHome />} />
                <Route path="verificaciones" element={<VerificationsHome />} />
                <Route path="reportes" element={<ReportsHome />} />
                <Route path="reviews" element={<ReviewsHome />} />
                <Route path="categories" element={<CategoriesHome />} />
                <Route path="solicitudes" element={<ServiceRequestsHome />} />
                <Route path="propuestas" element={<ProposalsHome />} />
                <Route path="portafolios" element={<WorkerPortfolioHome />} />
            </Route>


            {/* Ruta temporal para pruebas */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
}