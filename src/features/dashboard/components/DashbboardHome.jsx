import { StatsCard } from "./StatsCard.jsx";
import { RecentUsers } from "./RecentUsers.jsx";
import { PendingVerifications } from "./PendingVerifications.jsx";
import { RecentReports } from "./RecentReports.jsx";
import { RecentActivity } from "./RecentActivity.jsx";
import { DashboardSummary } from "./DashboardSummary.jsx";

//Iconos :D
import TotalUsers from "../../../assets/icons/TotalUsers.svg";
import ServicesActive from "../../../assets/icons/ActiveJobs.svg";
import Verifications from "../../../assets/icons/Verifications.svg";
import Reports from "../../../assets/icons/Reports.svg";

export const DashboardHome = () => {
    const currentDate = new Date().toLocaleDateString("es-GT", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formattedDate =
        currentDate.charAt(0).toUpperCase() + currentDate.slice(1);


    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Panel de Control
                    </h1>
                    <p className="text-sm text-gray-500">
                        {formattedDate}
                    </p>
                </div>

                <div className="w-fit px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-600 text-sm font-medium">
                    ● Sistema operativo
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatsCard
                    title="Total de Usuarios"
                    value="3,842"
                    subtitle="+128 este mes"
                    color="green"
                    img={TotalUsers}
                    orientation="up"
                />

                <StatsCard
                    title="Trabajos Activos"
                    value="614"
                    subtitle="+43 esta semana"
                    color="blue"
                    img={ServicesActive}
                    orientation="up"
                />

                <StatsCard
                    title="Verificaciones Pendientes"
                    value="37"
                    subtitle="12 urgentes"
                    color="yellow"
                    img={Verifications}
                    orientation="down"
                />

                <StatsCard
                    title="Reportes Abiertos"
                    value="19"
                    subtitle="5 sin revisar"
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