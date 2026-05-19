import JobIconG from "../../../assets/icons/JobIconG.svg";
import money from "../../../assets/icons/money.svg";
import date from "../../../assets/icons/date.svg";
import { useProposalActions } from "../hook/useSaveProposalActions.js";

export const ProposalModal = ({ proposal, onClose }) => {
    const { handleDeactivate } = useProposalActions();
    const { loading } = useProposalStore((state) => ({ loading: state.loading }));

    const canDeactivate = proposal.status !== "CANCELLED";

    const onDeactivate = () => {
        handleDeactivate(proposal.id, () => onClose());
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-[95%] sm:w-full max-w-xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                            <img src={JobIconG} alt="Propuesta" className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">#{proposal.id}</p>
                            <h2 className="font-bold text-[#0F172A]">{proposal.requestTitle}</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-5">
                    <div className="flex gap-3 flex-wrap">
                        <StatusBadge value={proposal.status} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoBox label="Trabajador" value={proposal.workerName} />
                        <InfoBox label="Solicitud" value={proposal.requestId} />
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400 mb-2">Mensaje</p>
                        <p className="text-sm text-slate-700">{proposal.message}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem
                            icon={<img src={money} alt="Precio" className="w-4 h-4" />}
                            label="Precio ofrecido"
                            value={proposal.formattedPrice}
                            color="text-green-500 bg-green-50"
                        />
                        <DetailItem
                            icon={<img src={date} alt="Fecha" className="w-4 h-4" />}
                            label="Fecha"
                            value={proposal.date}
                            color="text-blue-500 bg-blue-50"
                        />
                    </div>
                </div>

                {/* Acción de admin */}
                {canDeactivate && (
                    <div className="px-6 pb-6">
                        <button
                            onClick={onDeactivate}
                            className="w-full py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold hover:bg-red-100 transition"
                        >
                            Desactivar propuesta
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Sub-componentes ────────────────────────────────────────────────────────

const InfoBox = ({ label, value }) => (
    <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-xs text-gray-400 mb-2">{label}</p>
        <p className="font-semibold text-slate-700">{value}</p>
    </div>
);

const DetailItem = ({ icon, label, value, color }) => (
    <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-slate-700">{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ value }) => {
    if (value === "PENDING") return <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-600 text-xs font-semibold">● Pendiente</span>;
    if (value === "ACCEPTED") return <span className="px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600 text-xs font-semibold">● Aceptada</span>;
    if (value === "REJECTED") return <span className="px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs font-semibold">● Rechazada</span>;
    return <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold">● Cancelada</span>;
};