import { useState } from "react";

export const MessageInput = ({ conversationId, senderId, onSendMessage }) => {
    const [content, setContent] = useState("");

    const handleSend = async () => {
        if (!content.trim() || !conversationId || !senderId) return;
        await onSendMessage(conversationId, senderId, content.trim());
        setContent("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-3 md:p-5 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2 md:gap-3">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-600 placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />
                <button
                    onClick={handleSend}
                    disabled={!content.trim()}
                    className="px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white text-sm font-semibold transition shrink-0"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};