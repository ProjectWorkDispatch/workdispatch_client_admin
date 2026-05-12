import EyeB from "../../../assets/icons/EyeB.svg";
import deny from "../../../assets/icons/deny.svg";
import check from "../../../assets/icons/check.svg";

export const VerificationsTable = ({
    verifications,
    totalVerifications,
    pendingRequests,
    onView,
    onApprove,
    onReject
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-225 w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="text-left font-medium px-5 py-4">
                            Solicitante
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Rol
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Documento
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Enviado
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Urgencia
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Estado ^
                        </th>

                        <th className="text-left font-medium px-5 py-4">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {verifications.length === 0 ? (
                        <tr>
                            <td
                                colSpan="7"
                                className="px-5 py-10 text-center text-gray-400"
                            >
                                No se encontraron solicitudes.
                            </td>
                        </tr>
                    ) : (
                        verifications.map((verification) => (
                            <tr
                                key={verification.documentNumber}
                                className={`border-t border-gray-100 hover:bg-gray-50 transition ${verification.urgency === "Alta" && verification.status === "Pendiente"
                                    ? "border-l-2 border-l-red-400"
                                    : ""
                                    }`}
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-9 h-9 rounded-full ${verification.color} text-white flex items-center justify-center text-xs font-bold`}
                                        >
                                            {verification.initials}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-[#0F172A]">
                                                {verification.name}
                                            </p>

                                            <p className="text-xs text-gray-400 wrap-break-words">
                                                {verification.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <RoleBadge value={verification.role} />
                                </td>

                                <td className="px-5 py-4">
                                    <p className="text-[#0F172A]">
                                        {verification.documentNumber}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {verification.documentType}
                                    </p>
                                </td>

                                <td className="px-5 py-4 text-gray-500">
                                    {verification.sentAt}
                                </td>

                                <td className="px-5 py-4">
                                    <UrgencyBadge value={verification.urgency} />
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge value={verification.status} />
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            onClick={() => onView(verification)}
                                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center"
                                            title="Ver detalle">
                                            <img src={EyeB} alt="Ver detalle" className="w-4 h-4" />
                                        </button>

                                        {verification.status === "Pendiente" && (
                                            <>
                                                <button
                                                    onClick={() => onApprove(verification.documentNumber)}
                                                    className="w-8 h-8 rounded-full bg-green-50 text-green-500 hover:bg-green-100 flex items-center justify-center"
                                                    title="Aprobar">
                                                    <img src={check} alt="Aprobar" className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => onReject(verification.documentNumber)}
                                                    className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"
                                                    title="Rechazar">
                                                    <img src={deny} alt="Rechazar" className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                    Mostrando {verifications.length} de {totalVerifications} solicitudes
                    <span className="text-yellow-600 font-semibold">
                        {" "}· {pendingRequests} pendientes de revisión
                    </span>
                </p>

                <p className="text-xs text-green-600 font-semibold">
                    Aprobar actualiza el estado del usuario en tiempo real
                </p>
            </div>
        </div>
    );
};

const RoleBadge = ({ value }) => {
    if (value === "Cliente") {
        return (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                Cliente
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
            Trabajador
        </span>
    );
};

const UrgencyBadge = ({ value }) => {
    if (value === "Alta") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Alta
            </span>
        );
    }

    if (value === "Media") {
        return (
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
                Media
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
            Baja
        </span>
    );
};

const StatusBadge = ({ value }) => {
    if (value === "Aprobado") {
        return (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                Aprobado
            </span>
        );
    }

    if (value === "Rechazado") {
        return (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                Rechazado
            </span>
        );
    }

    return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
            Pendiente
        </span>
    );
};