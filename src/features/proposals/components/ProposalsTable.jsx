import view from "../../../assets/icons/view.svg";
import JobIconG from "../../../assets/icons/JobIconG.svg";
import date from "../../../assets/icons/date.svg";

export const ProposalsTable = ({
    proposals,
    onViewProposal
}) => {
    return (
        <div>
            {/* ── Tabla desktop ── */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-300 text-sm">
                    <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="text-left font-semibold px-5 py-4">Solicitud</th>
                            <th className="text-left font-semibold px-5 py-4">Trabajador</th>
                            <th className="text-left font-semibold px-5 py-4">Precio</th>
                            <th className="text-left font-semibold px-5 py-4">Estado</th>
                            <th className="text-left font-semibold px-5 py-4">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {proposals.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-5 py-10 text-center text-gray-400">
                                    No se encontraron propuestas.
                                </td>
                            </tr>
                        ) : (
                            proposals.map((proposal) => (
                                <tr key={proposal.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 min-w-64">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                                                <img src={JobIconG} alt="Propuesta" className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-[#0F172A] truncate">
                                                    {proposal.requestTitle}
                                                </p>
                                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                    <img src={date} alt="Fecha" className="w-3 h-3" />
                                                    {proposal.date}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-700">{proposal.workerName}</td>
                                    <td className="px-5 py-4 font-semibold text-[#0F172A] whitespace-nowrap">
                                        {proposal.formattedPrice}
                                    </td>
                                    <td className="px-5 py-4">
                                        <StatusBadge value={proposal.status} />
                                    </td>
                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => onViewProposal(proposal)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition"
                                        >
                                            <img src={view} alt="Ver" className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Vista de CARDS Mobile ── */}
            <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50/50">
                {proposals.length === 0 ? (
                    <p className="px-5 py-10 text-center text-sm text-gray-400 font-medium">No se encontraron propuestas.</p>
                ) : (
                    proposals.map((proposal) => (
                        <div 
                            key={proposal.id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {/* Cabecera: Icono + Título de Solicitud + Estado */}
                            <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-white">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                        <img src={JobIconG} className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm text-[#0F172A] truncate leading-tight">
                                            {proposal.requestTitle}
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                                            <img src={date} className="w-2.5 h-2.5 opacity-60" />
                                            {proposal.date}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge value={proposal.status} />
                            </div>

                            {/* Cuerpo: Detalles de la propuesta */}
                            <div className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4 py-1">
                                    <div className="pr-2 border-r border-gray-50">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Trabajador</p>
                                        <p className="text-sm font-semibold text-[#0F172A] truncate">
                                            {proposal.workerName}
                                        </p>
                                    </div>
                                    <div className="pl-2">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Precio Ofertado</p>
                                        <p className="text-sm font-bold text-green-600">
                                            {proposal.formattedPrice}
                                        </p>
                                    </div>
                                </div>

                                {/* Botón de Acción Principal */}
                                <button 
                                    onClick={() => onViewProposal(proposal)}
                                    className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-[#0F172A] rounded-xl flex items-center justify-center gap-2 transition-colors border border-gray-100 font-semibold text-sm"
                                >
                                    <img src={view} className="w-4 h-4 opacity-70" />
                                    Ver detalles de la propuesta
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ value }) => {
    // Definimos estilos base para reducir repetición
    const baseClasses = "px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap border uppercase tracking-tight";
    
    if (value === "PENDING") {
        return (
            <span className={`${baseClasses} bg-yellow-50 border-yellow-100 text-yellow-600`}>
                ● Pendiente
            </span>
        );
    }
    if (value === "ACCEPTED") {
        return (
            <span className={`${baseClasses} bg-green-50 border-green-100 text-green-600`}>
                ● Aceptada
            </span>
        );
    }
    if (value === "REJECTED") {
        return (
            <span className={`${baseClasses} bg-red-50 border-red-100 text-red-600`}>
                ● Rechazada
            </span>
        );
    }
    return (
        <span className={`${baseClasses} bg-gray-50 border-gray-100 text-gray-600`}>
            ● Cancelada
        </span>
    );
};