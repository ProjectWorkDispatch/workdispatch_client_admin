export const MessageBubble = ({
    message
}) => {
    const isMine = message.sender === "me";

    return (
        <div
            className={`flex ${
                isMine
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`max-w-md px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    isMine
                        ? "bg-green-500 text-white rounded-br-md"
                        : "bg-white text-gray-700 rounded-bl-md border border-gray-100"
                }`}
            >
                <p className="leading-relaxed">
                    {message.content}
                </p>

                <span
                    className={`block mt-2 text-[11px] ${
                        isMine
                            ? "text-green-100"
                            : "text-gray-400"
                    }`}
                >
                    {message.createdAt}
                </span>
            </div>
        </div>
    );
};
