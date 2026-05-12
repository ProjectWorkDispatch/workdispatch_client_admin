import { useState } from "react";
import { VerificationStatsCard } from "./VerificationStatsCard";
import { VerificationsTable } from "./VerificationsTable";
import { VerificationModal } from "./VerificationModal";
import pending from "../../../assets/icons/pending.svg";

const initialVerifications = [
    {
        initials: "JC",
        name: "Jhon Castillo",
        email: "jhon.c@email.com",
        role: "Trabajador",
        documentType: "DPI",
        documentNumber: "1023456789",
        sentAt: "23 mar, 03:00 a. m.",
        urgency: "Alta",
        status: "Pendiente",
        reviewNote: "",
        color: "bg-orange-500"
    },
    {
        initials: "PS",
        name: "Paola Suárez",
        email: "paola.s@email.com",
        role: "Trabajador",
        documentType: "DPI",
        documentNumber: "4512378901",
        sentAt: "23 mar, 01:00 a. m.",
        urgency: "Media",
        status: "Pendiente",
        reviewNote: "",
        color: "bg-teal-500"
    },
    {
        initials: "RP",
        name: "Ramiro Peña",
        email: "ramiro.p@email.com",
        role: "Trabajador",
        documentType: "DPI",
        documentNumber: "8901234567",
        sentAt: "22 mar, 11:00 p. m.",
        urgency: "Baja",
        status: "Pendiente",
        reviewNote: "",
        color: "bg-pink-500"
    },
    {
        initials: "DC",
        name: "Diana Castro",
        email: "diana.c@email.com",
        role: "Cliente",
        documentType: "DPI",
        documentNumber: "2345678901",
        sentAt: "22 mar, 09:00 p. m.",
        urgency: "Media",
        status: "Pendiente",
        reviewNote: "",
        color: "bg-orange-600"
    },
    {
        initials: "LR",
        name: "Laura Rincón",
        email: "laura.r@email.com",
        role: "Trabajador",
        documentType: "DPI",
        documentNumber: "6677889900",
        sentAt: "23 mar, 02:00 a. m.",
        urgency: "Alta",
        status: "Pendiente",
        reviewNote: "",
        color: "bg-orange-500"
    },
    {
        initials: "VL",
        name: "Valentina López",
        email: "valentina.l@email.com",
        role: "Cliente",
        documentType: "DPI",
        documentNumber: "3344556677",
        sentAt: "22 mar, 10:00 p. m.",
        urgency: "Media",
        status: "Pendiente",
        reviewNote: "",
        color: "bg-orange-500"
    },
    {
        initials: "AT",
        name: "Andrés Torres",
        email: "andres.t@email.com",
        role: "Trabajador",
        documentType: "DPI",
        documentNumber: "9876543210",
        sentAt: "22 mar, 04:00 a. m.",
        urgency: "Baja",
        status: "Aprobado",
        reviewNote: "Documento claro y legible.",
        color: "bg-blue-500"
    },
    {
        initials: "CM",
        name: "Carlos Mendoza",
        email: "carlos.m@email.com",
        role: "Cliente",
        documentType: "PASSPORT",
        documentNumber: "AB123456",
        sentAt: "21 mar, 04:00 a. m.",
        urgency: "Baja",
        status: "Aprobado",
        reviewNote: "Documento válido y datos coinciden.",
        color: "bg-pink-500"
    },
    {
        initials: "MÁ",
        name: "Miguel Ángel Ruiz",
        email: "miguel.r@email.com",
        role: "Trabajador",
        documentType: "DPI",
        documentNumber: "1122334455",
        sentAt: "20 mar, 04:00 a. m.",
        urgency: "Alta",
        status: "Rechazado",
        reviewNote: "Imagen borrosa. Solicitar reenvío.",
        color: "bg-teal-500"
    }
];

export const VerificationsHome = () => {
    const [verifications, setVerifications] = useState(initialVerifications);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [urgencyFilter, setUrgencyFilter] = useState("Todas");
    const [selectedVerification, setSelectedVerification] = useState(null);

    const handleApprove = (documentNumber) => {
        const note = "Documento claro y legible.";

        setVerifications((prevVerifications) =>
            prevVerifications.map((verification) =>
                verification.documentNumber === documentNumber
                    ? {
                        ...verification,
                        status: "Aprobado",
                        reviewNote: note
                    }
                    : verification
            )
        );

        if (selectedVerification?.documentNumber === documentNumber) {
            setSelectedVerification((prev) => ({
                ...prev,
                status: "Aprobado",
                reviewNote: note
            }));
        }
    };

    const handleReject = (documentNumber) => {
        const note = "Imagen borrosa. Solicitar reenvío.";

        setVerifications((prevVerifications) =>
            prevVerifications.map((verification) =>
                verification.documentNumber === documentNumber
                    ? {
                        ...verification,
                        status: "Rechazado",
                        reviewNote: note
                    }
                    : verification
            )
        );

        if (selectedVerification?.documentNumber === documentNumber) {
            setSelectedVerification((prev) => ({
                ...prev,
                status: "Rechazado",
                reviewNote: note
            }));
        }
    };

    const filteredVerifications = verifications.filter((verification) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            verification.name.toLowerCase().includes(searchText) ||
            verification.email.toLowerCase().includes(searchText) ||
            verification.documentNumber.toLowerCase().includes(searchText);

        let matchStatus = true;

        if (statusFilter !== "Todos") {
            matchStatus = verification.status === statusFilter;
        }

        let matchUrgency = true;

        if (urgencyFilter !== "Todas") {
            matchUrgency = verification.urgency === urgencyFilter;
        }

        return matchSearch && matchStatus && matchUrgency;
    });

    const totalRequests = verifications.length;
    const pendingRequests = verifications.filter((item) => item.status === "Pendiente").length;
    const approvedRequests = verifications.filter((item) => item.status === "Aprobado").length;
    const rejectedRequests = verifications.filter((item) => item.status === "Rechazado").length;

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">
                        Verificaciones
                    </h1>
                    <p className="text-sm text-gray-500">
                        Revisión y aprobación de identidades de usuarios
                    </p>
                </div>

                <div className="w-fit px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-600 text-sm font-medium flex items-center gap-2">
                    <img src={pending} alt="Pendiente" className="w-4 h-4" />
                    <span>{pendingRequests} pendientes de revisión</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <VerificationStatsCard
                    value={totalRequests}
                    label="Total solicitudes"
                    color="text-[#0F172A]"
                />

                <VerificationStatsCard
                    value={pendingRequests}
                    label="Pendientes"
                    color="text-yellow-500"
                />

                <VerificationStatsCard
                    value={approvedRequests}
                    label="Aprobados"
                    color="text-green-500"
                />

                <VerificationStatsCard
                    value={rejectedRequests}
                    label="Rechazados"
                    color="text-red-500"
                />
            </div>

            <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre, correo o número de documento..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                    />

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-400">
                                Estado:
                            </span>

                            <FilterButton
                                text="Todos"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Pendiente"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Aprobado"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <FilterButton
                                text="Rechazado"
                                current={statusFilter}
                                setFilter={setStatusFilter}
                            />

                            <span className="text-xs text-gray-400 ml-2">
                                Urgencia:
                            </span>

                            <FilterButton
                                text="Todas"
                                current={urgencyFilter}
                                setFilter={setUrgencyFilter}
                            />

                            <FilterButton
                                text="Alta"
                                current={urgencyFilter}
                                setFilter={setUrgencyFilter}
                            />

                            <FilterButton
                                text="Media"
                                current={urgencyFilter}
                                setFilter={setUrgencyFilter}
                            />

                            <FilterButton
                                text="Baja"
                                current={urgencyFilter}
                                setFilter={setUrgencyFilter}
                            />
                        </div>

                        <p className="text-xs text-gray-400">
                            {filteredVerifications.length} solicitudes
                        </p>
                    </div>
                </div>

                <VerificationsTable
                    verifications={filteredVerifications}
                    totalVerifications={verifications.length}
                    pendingRequests={pendingRequests}
                    onView={setSelectedVerification}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </article>

            {selectedVerification && (
                <VerificationModal
                    verification={selectedVerification}
                    onClose={() => setSelectedVerification(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </section>
    );
};

const FilterButton = ({ text, current, setFilter }) => {
    const active = current === text;

    return (
        <button
            onClick={() => setFilter(text)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${active
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {text}
        </button>
    );
};