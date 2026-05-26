export const ConversationCard = ({ conversation, active, onClick }) => {
    // Mostrar al otro participante, no al admin
    const user = conversation.user1Id?.role === 'ADMIN'
        ? conversation.user2Id
        : conversation.user1Id;

    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Usuario";

    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-5 py-4 border-b border-gray-100 transition ${active ? "bg-green-50" : "hover:bg-gray-50"
                }`}
        >
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {fullName.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-[#0F172A] truncate">{fullName}</h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                            {conversation.lastMessageAt
                                ? new Date(conversation.lastMessageAt).toLocaleDateString()
                                : ""}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">
                        {conversation.lastMessage || "Sin mensajes"}
                    </p>
                </div>
            </div>
        </button>
    );
};