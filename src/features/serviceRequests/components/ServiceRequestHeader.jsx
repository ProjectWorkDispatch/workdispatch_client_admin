// src/features/serviceRequests/components/ServiceRequestHeader.jsx
import JobIconG from '../../../assets/icons/JobIconG.svg';

export const ServiceRequestHeader = ({ openCount, loading, onRefresh }) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <img src={JobIconG} alt="Trabajos" className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Trabajos</h1>
                    <p className="text-sm text-gray-500">
                        Administración de solicitudes y trabajos en ejecución
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                    <span>{openCount} abiertas</span>
                </div>

                <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="px-4 py-2 rounded-full bg-[#0F172A] text-white text-sm font-medium
                               hover:bg-[#1e293b] transition disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {loading ? 'Cargando...' : 'Actualizar'}
                </button>
            </div>
        </div>
    );
};