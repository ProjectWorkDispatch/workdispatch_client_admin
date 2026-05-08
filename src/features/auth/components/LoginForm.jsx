import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import shieldLock from "../../../assets/img/shield_lock.svg";

export const LoginForm = ({ onForgot }) => {

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res?.error || res === false) {
      toast.error(res?.error || "Credenciales inválidas");
      return;
    }

    navigate("/dashboard/dashboard");
    toast.success("!Bienvenido de nuevo!");

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300">
          Correo electrónico
        </label>
        <input
          type="email"
          placeholder="admin@workdispatch.com"
          className="w-full px-3 py-2.5 text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          {...register("email", {
            required: "Este campo es obligatorio"
          })}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">
            {errors.email.message}</p>
        )}
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-300">
          Contraseña
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2.5 pr-10 text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("password", {
              required: "Este campo es obligatorio"
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
      >
        {/*<img src={shieldLock} alt="Acceso restringido" className="w-4 h-4" />
        Ingresar al Dashboard*/}
        {loading ? "Ingresando..." : "Ingresar al Dashboard"}
      </button>
    </form>
  );
};