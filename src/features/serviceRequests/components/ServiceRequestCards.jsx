import view     from '../../../assets/icons/view.svg';
import JobIconG from '../../../assets/icons/JobIconG.svg';
import dateIcon from '../../../assets/icons/date.svg';
import money    from '../../../assets/icons/money.svg';
import { ServiceRequestStatusBadge } from './ServiceRequestStatusBadge.jsx';

export const ServiceRequestCards = ({ requests, onView }) => {
    if (requests.length === 0) {
        return (
            <div className="py-12 text-center text-gray-400 text-sm md:hidden">
                No se encontraron solicitudes.
            </div>
        );
    }

    return (
        <div className="grid md:hidden gap-3">
            {requests.map((req) => (
                <article
                    key={req._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                            <img src={JobIconG} alt="Solicitud" className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#0F172A] truncate">{req.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">#{req._id.slice(-6)}</p>
                        </div>
                        <button
                            onClick={() => onView(req)}
                            className="w-8 h-8 rounded-full flex items-center justify-center
                                       text-gray-400 hover:bg-gray-100 transition shrink-0"
                        >
                            <img src={view} alt="Ver" className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <ServiceRequestStatusBadge value={req.status} />
                        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold">
                            {req._categoryName}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <img src={money} alt="Presupuesto" className="w-3.5 h-3.5" />
                            <span className="font-semibold text-[#0F172A]">{req._budgetRange}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <img src={dateIcon} alt="Fecha" className="w-3.5 h-3.5" />
                            <span>{req._date}</span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500">
                        Cliente:{' '}
                        <span className="font-semibold text-[#0F172A]">{req._clientName}</span>
                    </p>
                </article>
            ))}
        </div>
    );
};