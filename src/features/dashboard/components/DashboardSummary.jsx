export const DashboardSummary = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6 py-5">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">
                            94%
                        </p>
                        <p className="text-xs text-gray-400">
                            Satisfacción
                        </p>
                    </div>

                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">
                            1,204
                        </p>
                        <p className="text-xs text-gray-400">
                            Trabajos completados
                        </p>
                    </div>

                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">
                            4.7
                        </p>
                        <p className="text-xs text-gray-400">
                            Calificación media
                        </p>
                    </div>

                    <div>
                        <p className="text-lg sm:text-xl font-bold text-[#0F172A]">
                            2,618
                        </p>
                        <p className="text-xs text-gray-400">
                            Usuarios verificados
                        </p>
                    </div>
                </div>

                <p className="text-xs text-gray-400">
                    Actualizado hace 5 min
                </p>
            </div>
        </div>
    );
};