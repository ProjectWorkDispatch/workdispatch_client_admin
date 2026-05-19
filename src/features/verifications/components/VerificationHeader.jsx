// src/features/verifications/components/VerificationHeader.jsx
import pending from '../../../assets/icons/pending.svg';

export const VerificationHeader = ({ pendingCount }) => {
    return (
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
                <span>{pendingCount} pendientes de revisión</span>
            </div>
        </div>
    );
};