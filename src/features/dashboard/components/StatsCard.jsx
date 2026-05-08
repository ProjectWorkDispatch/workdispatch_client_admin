import up from "../../../assets/icons/up.svg";
import down from "../../../assets/icons/down.svg";

export const StatsCard = ({ title, value, subtitle, color, img, orientation}) => {
    const colors = {
        green: "bg-green-50 border-green-200 text-green-500",
        blue: "bg-blue-50 border-blue-200 text-blue-500",
        yellow: "bg-yellow-50 border-yellow-200 text-yellow-500",
        red: "bg-red-50 border-red-200 text-red-500"
    };

    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 min-h-40">
            <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center font-bold ${colors[color]}`}>
                    <img src={img} alt={title} className="w-6 h-6" />
                </div>

                <img src={orientation === "up" ? up : down} alt={orientation === "up" ? "Up" : "Down"} className="w-4 h-4"/>
            </div>

            <div className="mt-5">
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-3xl font-bold text-[#0F172A] mt-2">
                    {value}
                </h2>
                <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
            </div>
        </article>
    );
};