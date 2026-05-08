import Activity from "../../../assets/icons/Activity.svg";

const activities = [
    { text: "Nuevo usuario registrado: Laura Rincón", time: "Hace 4h", color: "bg-green-500" },
    { text: "Trabajo #614 marcado como completado", time: "Hace 5h", color: "bg-blue-500" },
    { text: "Reporte #19 creado por Carlos M.", time: "Hace 6h", color: "bg-red-500" },
    { text: "Verificación aprobada para Andrés Torres", time: "Hace 8h", color: "bg-green-500" },
    { text: "Usuario Miguel Ruiz suspendido", time: "Hace 10h", color: "bg-yellow-500" },
    { text: "8 nuevas solicitudes publicadas hoy", time: "Hace 12h", color: "bg-blue-500" }
];

export const RecentActivity = () => {
    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-end gap-2">
                <img src={Activity} alt="Activity" className="w-5 h-5" />
                <h3 className="font-bold text-[#0F172A]">
                    Actividad Reciente
                </h3>
            </div>

            <div className="px-5 py-4 space-y-5">
                {activities.map((activity) => (
                    <div key={activity.text} className="flex gap-3">
                        <span className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />

                        <div>
                            <p className="text-sm text-slate-700">
                                {activity.text}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
};