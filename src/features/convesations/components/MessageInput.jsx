export const MessageInput = () => {
    return (
        <div className="p-5 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />

                <button className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition">
                    Enviar
                </button>
            </div>
        </div>
    );
};
