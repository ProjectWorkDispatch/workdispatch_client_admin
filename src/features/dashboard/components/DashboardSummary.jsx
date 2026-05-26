import { useUserStore, useServiceStore } from "../../users/Store/adminStore.js";

export const DashboardSummary = () => {
    const { users } = useUserStore();
    const { services } = useServiceStore();

    const completed  = services.filter(s => s.status === 'COMPLETED').length;
    const cancelled  = services.filter(s => s.status === 'CANCELLED').length;
    const totalDone  = completed + cancelled;
    const satisfaction = totalDone > 0 ? Math.round((completed / totalDone) * 100) : 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6 py-5">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">{satisfaction}%</p>
                        <p className="text-xs text-gray-400">Satisfacción</p>
                    </div>
                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">{completed}</p>
                        <p className="text-xs text-gray-400">Trabajos completados</p>
                    </div>
                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">{services.length}</p>
                        <p className="text-xs text-gray-400">Total de servicios</p>
                    </div>
                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">{users.length}</p>
                        <p className="text-xs text-gray-400">Usuarios totales</p>
                    </div>
                </div>
                <p className="text-xs text-gray-400">Datos en tiempo real</p>
            </div>
        </div>
    );
};