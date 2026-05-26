import { ConversationCard } from "./ConversationCard";
import { useMemo, useState } from "react";
import { useConversationStore } from "../../users/Store/adminStore";
import * as api from "../../../shared/api/admin";

export const ConversationsSidebar = ({
    conversations,
    selectedConversation,
    setSelectedConversation
}) => {
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userSearch, setUserSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const { createConversation } = useConversationStore();

    const filteredConversations = useMemo(() => {
        const text = search.toLowerCase().trim();
        if (!text) return conversations;
        return conversations.filter((c) => {
            const other = c.user1Id?.role === "ADMIN" ? c.user2Id : c.user1Id;
            return (
                `${other?.firstName} ${other?.lastName}`.toLowerCase().includes(text) ||
                other?.email?.toLowerCase().includes(text) ||
                c.lastMessage?.toLowerCase().includes(text)
            );
        });
    }, [search, conversations]);

    const searchUsers = async (value) => {
        setUserSearch(value);
        if (value.trim().length < 2) { setUsers([]); return; }
        try {
            setLoadingUsers(true);
            const res = await api.getUsers({ search: value });
            const all = res.data?.users || res.data?.data || [];
            setUsers(all.filter((u) => u.role !== "ADMIN"));
        } catch {
            setUsers([]);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleSelectUser = async (user) => {
        await createConversation(null, user._id);
        setShowModal(false);
        setUserSearch("");
        setUsers([]);
    };

    return (
        <>
            <aside className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
                <div className="p-4 md:p-5 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-[#0F172A]">Conversaciones</h1>
                            <p className="text-xs md:text-sm text-gray-500 mt-1">Gestión de mensajes y chats</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-9 h-9 rounded-xl bg-[#0F172A] text-white flex items-center justify-center hover:bg-gray-800 transition text-xl font-light shrink-0"
                            title="Nueva conversación"
                        >
                            +
                        </button>
                    </div>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                                active={selectedConversation?._id === conversation._id}
                                onClick={() => setSelectedConversation(conversation)}
                            />
                        ))
                    )}
                </div>
            </aside>

            {/* Modal nueva conversación */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-[#0F172A]">Nueva conversación</h2>
                            <button
                                onClick={() => { setShowModal(false); setUserSearch(""); setUsers([]); }}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <input
                            type="text"
                            value={userSearch}
                            onChange={(e) => searchUsers(e.target.value)}
                            placeholder="Buscar usuario por nombre o email..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100"
                            autoFocus
                        />

                        <div className="mt-3 max-h-64 overflow-y-auto">
                            {loadingUsers && (
                                <div className="flex justify-center py-4">
                                    <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                            {!loadingUsers && userSearch.length >= 2 && users.length === 0 && (
                                <p className="text-center text-sm text-gray-400 py-4">No se encontraron usuarios</p>
                            )}
                            {users.map((user) => (
                                <button
                                    key={user._id}
                                    onClick={() => handleSelectUser(user)}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition flex items-center gap-3"
                                >
                                    <div className="w-9 h-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                                        {user.firstName?.[0]}{user.lastName?.[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#0F172A]">{user.firstName} {user.lastName}</p>
                                        <p className="text-xs text-gray-400">{user.email} · {user.role}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};