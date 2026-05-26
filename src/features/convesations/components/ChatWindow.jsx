import { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export const ChatWindow = ({ conversation, messages, adminMongoId, onSendMessage, onBack }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!conversation) {
        return (
            <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm items-center justify-center text-gray-400 hidden md:flex">
                Selecciona una conversación
            </div>
        );
    }

    const user1 = conversation.user1Id;
    const user2 = conversation.user2Id;
    const other = user1?.role === "ADMIN" ? user2 : user1;
    const adminId = adminMongoId || (user1?.role === "ADMIN" ? user1?._id : user2?._id);
    const fullName = `${other?.firstName || ""} ${other?.lastName || ""}`.trim() || "Usuario";

    return (
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <header className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-100 flex items-center gap-3 md:gap-4">
                {/* Botón volver — solo visible en móvil */}
                <button
                    onClick={onBack}
                    className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition shrink-0"
                    title="Volver"
                >
                    ←
                </button>

                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {fullName.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                    <h2 className="font-bold text-[#0F172A] truncate">{fullName}</h2>
                    <p className="text-xs md:text-sm text-gray-400 truncate">{other?.email}</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-5 space-y-4 bg-gray-50">
                {messages.length === 0 && (
                    <p className="text-center text-sm text-gray-400 mt-10">
                        No hay mensajes aún. ¡Inicia la conversación!
                    </p>
                )}
                {messages.map((message) => (
                    <MessageBubble
                        key={message._id}
                        message={message}
                        adminId={adminId}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            <MessageInput
                conversationId={conversation._id}
                senderId={adminId}
                onSendMessage={onSendMessage}
            />
        </div>
    );
};