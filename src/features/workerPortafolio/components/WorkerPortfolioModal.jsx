// src/features/workerPortafolio/components/WorkerPortfolioModal.jsx
import { useState, useRef } from 'react';
import { StatusBadge, RoleBadge } from './WorkerPortfolioBadges.jsx';
import detail      from '../../../assets/icons/detail.svg';
import deny        from '../../../assets/icons/deny.svg';
import check       from '../../../assets/icons/check.svg';
import noAvailable from '../../../assets/icons/noAvailable.svg';

const getAvatar = (firstName = '', lastName = '') => {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    const colors = [
        'bg-orange-500', 'bg-teal-500', 'bg-pink-500',
        'bg-blue-500', 'bg-purple-500', 'bg-green-600'
    ];
    const index = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % colors.length;
    return { initials, color: colors[index] };
};

const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="text-sm font-semibold text-[#0F172A]">{value}</div>
    </div>
);

export const WorkerPortfolioModal = ({
    portfolio,
    onClose,
    onModerate,
    onUpdateImage
}) => {
    const [previewUrl, setPreviewUrl]     = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showImageEdit, setShowImageEdit] = useState(false);
    const fileInputRef = useRef(null);

    const firstName = portfolio.workerId?.firstName || '';
    const lastName  = portfolio.workerId?.lastName  || '';
    const { initials, color } = getAvatar(firstName, lastName);
    const isActive  = portfolio.status === 'ACTIVE';

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleImageConfirm = () => {
        if (!selectedFile) return;
        onUpdateImage(portfolio._id, selectedFile);
        setShowImageEdit(false);
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleImageCancel = () => {
        setShowImageEdit(false);
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white w-[95%] sm:w-full max-w-md rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#0F172A]">
                        <img src={detail} alt="Detalle" className="w-5 h-5" />
                        Detalle de Portafolio
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Imagen del trabajo */}
                    <div className="relative w-full h-52 bg-gray-100 rounded-2xl overflow-hidden">
                        {(previewUrl || portfolio.imageUrl) ? (
                            <img
                                src={previewUrl || portfolio.imageUrl}
                                alt="Trabajo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                                <img src={noAvailable} alt="Sin imagen" className="w-12 h-12" />
                                <p className="text-sm">Sin imagen</p>
                            </div>
                        )}

                        {/* Botón editar imagen */}
                        {!showImageEdit && (
                            <button
                                onClick={() => setShowImageEdit(true)}
                                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-semibold text-[#0F172A] shadow transition"
                            >
                                Cambiar imagen
                            </button>
                        )}
                    </div>

                    {/* Editor de imagen */}
                    {showImageEdit && (
                        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 space-y-3">
                            <p className="text-sm font-semibold text-blue-700">
                                Selecciona una nueva imagen
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp,image/avif"
                                onChange={handleFileChange}
                                className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-100 file:text-blue-700 file:font-semibold hover:file:bg-blue-200 transition"
                            />
                            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                                <button
                                    onClick={handleImageCancel}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleImageConfirm}
                                    disabled={!selectedFile}
                                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Confirmar imagen
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Avatar + datos del worker */}
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full ${color} text-white flex items-center justify-center font-bold text-lg shrink-0`}>
                            {initials}
                        </div>
                        <div>
                            <p className="font-bold text-[#0F172A]">
                                {firstName} {lastName}
                            </p>
                            <p className="text-sm text-gray-400">
                                {portfolio.workerId?.email}
                            </p>
                            <div className="mt-1">
                                <RoleBadge value={portfolio.workerId?.role} />
                            </div>
                        </div>
                    </div>

                    {/* Datos del registro */}
                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                        <DetailRow
                            label="Estado"
                            value={<StatusBadge value={portfolio.status} />}
                        />
                        <DetailRow
                            label="Publicado"
                            value={portfolio.createdAt
                                ? new Date(portfolio.createdAt).toLocaleString('es-GT', {
                                    day: '2-digit', month: 'short',
                                    hour: '2-digit', minute: '2-digit'
                                })
                                : '—'}
                        />
                        {portfolio.deletedAt && (
                            <DetailRow
                                label="Desactivado"
                                value={new Date(portfolio.deletedAt).toLocaleString('es-GT', {
                                    day: '2-digit', month: 'short',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            />
                        )}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-500">Descripción</p>
                            <p className="text-sm font-semibold text-[#0F172A]">
                                {portfolio.description || 'Sin descripción'}
                            </p>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => onModerate(portfolio)}
                            className={`py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                                isActive
                                    ? 'border border-red-300 text-red-500 hover:bg-red-50'
                                    : 'border border-green-300 text-green-600 hover:bg-green-50'
                            }`}
                        >
                            <img
                                src={isActive ? deny : check}
                                alt={isActive ? 'Desactivar' : 'Reactivar'}
                                className="w-4 h-4"
                            />
                            {isActive ? 'Desactivar' : 'Reactivar'}
                        </button>

                        <button
                            onClick={onClose}
                            className="py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-slate-800 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};