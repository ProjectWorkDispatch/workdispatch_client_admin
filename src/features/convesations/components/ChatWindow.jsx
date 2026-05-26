import { useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export const ChatWindow = ({ conversation, messages, onSendMessage }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!conversation) {
        return (
            <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">
                Selecciona una conversación
            </div>
        );
    }

    const other = conversation.user1Id?.role === 'ADMIN'
        ? conversation.user2Id
        : conversation.user1Id;

    const fullName = `${other?.firstName || ""} ${other?.lastName || ""}`.trim() || "Usuario";

    return (
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <header className="px-6 py-5 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {fullName.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                    <h2 className="font-bold text-[#0F172A]">{fullName}</h2>
                    <p className="text-sm text-gray-400">{other?.email}</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gray-50">
                {messages.length === 0 && (
                    <p className="text-center text-sm text-gray-400 mt-10">
                        No hay mensajes aún. ¡Inicia la conversación!
                    </p>
                )}
                {messages.map((message) => (
                    <MessageBubble
                        key={message._id}
                        message={message}
                        adminId={conversation.user1Id?.role === 'ADMIN'
                            ? conversation.user1Id?._id
                            : conversation.user2Id?._id}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            <MessageInput
                conversationId={conversation._id}
                senderId={
                    conversation.user1Id?.role === 'ADMIN'
                        ? conversation.user1Id?._id
                        : conversation.user2Id?._id
                }
                onSendMessage={onSendMessage}
            />
        </div>
    );
};