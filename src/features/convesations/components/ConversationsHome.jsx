import { useEffect, useState } from "react";
import { ConversationsSidebar } from "../components/ConversationsSidebar";
import { ChatWindow } from "../components/ChatWindow";
import { useConversationStore } from "../../../features/users/Store/adminStore";

export const ConversationsHome = () => {
    const {
        conversations,
        selectedConversation,
        messages,
        adminMongoId,
        selectConversation,
        sendMessage,
        getConversations
    } = useConversationStore();

    // En móvil controlamos si se ve el sidebar o el chat
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        getConversations();
    }, []);

    const handleSelectConversation = (conversation) => {
        selectConversation(conversation);
        setShowChat(true);
    };

    const handleBack = () => {
        setShowChat(false);
    };

    return (
        <div className="h-[calc(100vh-120px)] flex gap-6">
            {/* Sidebar: visible siempre en desktop, en móvil solo si no hay chat abierto */}
            <div className={`
                ${showChat ? "hidden" : "flex"} md:flex
                w-full md:max-w-sm flex-col
            `}>
                <ConversationsSidebar
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    setSelectedConversation={handleSelectConversation}
                />
            </div>

            {/* Chat: visible siempre en desktop, en móvil solo si hay chat abierto */}
            <div className={`
                ${showChat ? "flex" : "hidden"} md:flex
                flex-1 flex-col
            `}>
                <ChatWindow
                    conversation={selectedConversation}
                    messages={messages}
                    adminMongoId={adminMongoId}
                    onSendMessage={sendMessage}
                    onBack={handleBack}
                />
            </div>
        </div>
    );
};