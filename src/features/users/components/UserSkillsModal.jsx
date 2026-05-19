export const UserSkillsModal = ({ user, onClose }) => {
    
    const skills = user.skills || [];

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl scale-in-center">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="font-bold text-xl text-slate-800">Habilidades Profesionales</h2>
                        <p className="text-sm text-slate-400">{user.firstName} {user.lastName}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-300 hover:text-slate-500 text-2xl">×</button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {skills.length > 0 ? (
                        skills.map((s, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-semibold text-slate-700">{s.name}</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                                    {s.experienceYears} años exp.
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-400 italic">Este usuario aún no tiene habilidades cargadas.</p>
                        </div>
                    )}
                </div>
                
                <button 
                    onClick={onClose} 
                    className="w-full mt-8 py-4 bg-[#0F172A] text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};