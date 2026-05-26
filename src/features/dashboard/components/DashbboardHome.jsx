import { useEffect } from "react";
import { StatsCard } from "./StatsCard.jsx";
import { RecentUsers } from "./RecentUsers.jsx";
import { PendingVerifications } from "./PendingVerifications.jsx";
import { RecentReports } from "./RecentReports.jsx";
import { RecentActivity } from "./RecentActivity.jsx";
import { DashboardSummary } from "./DashboardSummary.jsx";
import { useUserStore } from "../../users/Store/adminStore.js";
import { useServiceStore } from "../../users/Store/adminStore.js";
import { useVerificationStore } from "../../users/Store/adminStore.js";
import { useReportStore } from "../../users/Store/adminStore.js";

import TotalUsers from "../../../assets/icons/TotalUsers.svg";
import ServicesActive from "../../../assets/icons/ActiveJobs.svg";
import Verifications from "../../../assets/icons/Verifications.svg";
import Reports from "../../../assets/icons/Reports.svg";

export const DashboardHome = () => {
    const { users, getUsers } = useUserStore();
    const { services, fetchServices } = useServiceStore();
    const { verifications, getVerifications } = useVerificationStore();
    const { reports, getReports } = useReportStore();

    useEffect(() => {
        getUsers();
        fetchServices();
        getVerifications();
        getReports();
    }, []);

    const currentDate = new Date().toLocaleDateString("es-GT", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
    const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

    const totalUsers       = users.length;
    const activeServices   = services.filter(s => s.status === 'IN_PROGRESS').length;
    const pendingVerifs    = verifications.filter(v => v.status === 'PENDING').length;
    const openReports      = reports.filter(r => r.Status !== false).length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Panel de Control</h1>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatsCard
                    title="Total de Usuarios"
                    value={totalUsers}
                    subtitle="usuarios registrados"
                    color="green"
                    img={TotalUsers}
                    orientation="up"
                />
                <StatsCard
                    title="Trabajos Activos"
                    value={activeServices}
                    subtitle="en progreso"
                    color="blue"
                    img={ServicesActive}
                    orientation="up"
                />
                <StatsCard
                    title="Verificaciones Pendientes"
                    value={pendingVerifs}
                    subtitle="por revisar"
                    color="yellow"
                    img={Verifications}
                    orientation="down"
                />
                <StatsCard
                    title="Reportes Abiertos"
                    value={openReports}
                    subtitle="sin resolver"
                    color="red"
                    img={Reports}
                    orientation="down"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <RecentUsers />
                <PendingVerifications />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <RecentReports />
                <RecentActivity />
            </div>

            <DashboardSummary />
        </section>
    );
};