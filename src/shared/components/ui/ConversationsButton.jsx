import { Link, useLocation } from "react-router-dom";

export const ConversationsButton = () => {

    const location = useLocation();

    const isActive =
        location.pathname ===
        "/dashboard/conversaciones";

    return (
        <Link
            to="/dashboard/conversaciones"
            className={`relative text-xl rounded-lg p-1 transition duration-300 ${
                isActive
                    ? "bg-gray-200 text-green-600"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
        >
            💬

            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
        </Link>
    );
};