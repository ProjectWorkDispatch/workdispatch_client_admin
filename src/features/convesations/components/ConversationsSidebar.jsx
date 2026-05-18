import { ConversationCard } from "./ConversationCard";

import { useMemo, useState } from "react";

export const ConversationsSidebar = ({
    conversations,
    selectedConversation,
    setSelectedConversation
}) => {
    const [search, setSearch] = useState("");

    const filteredConversations = useMemo(() => {
        const text = search.toLowerCase().trim();

        if (!text) {
            return conversations;
        }

        return conversations.filter((conversation) => {
            return (
                conversation.user.name
                    .toLowerCase()
                    .includes(text) ||
                conversation.user.email
                    .toLowerCase()
                    .includes(text) ||
                conversation.lastMessage
                    .toLowerCase()
                    .includes(text)
            );
        });
    }, [search, conversations]);

    return (
        <aside className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-[#0F172A]">
                    Conversaciones
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Gestión de mensajes y chats
                </p>

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Buscar conversación..."
                    className="mt-4 w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                    <div className="px-5 py-10 text-center text-sm text-gray-400">
                        No se encontraron conversaciones.
                    </div>
                ) : (
                    filteredConversations.map((conversation) => (
                        <ConversationCard
                            key={conversation._id}
                            conversation={conversation}
                            active={
                                selectedConversation?._id ===
                                conversation._id
                            }
                            onClick={() =>
                                setSelectedConversation(
                                    conversation
                                )
                            }
                        />
                    ))
                )}
            </div>
        </aside>
    );
};
