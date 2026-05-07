import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import shieldLock from "../../../assets/img/shield_lockY.svg";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111827] via-[#1E293B] to-[#111827] px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-7">
          <div className="flex justify-center mb-5">
            <img
              src="/src/assets/img/logo_Workdispatch.png"
              alt="WorkDispatch"
              className="h-20 w-auto object-contain"
            />
          </div>

          <h1 className="text-4xl font-black text-white mb-2">
            Work<span className="text-yellow-400">Dispatch</span>
          </h1>

          <p className="text-gray-400 text-base">
            Portal de Administración
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <img src={shieldLock} alt="Acceso restringido" className="w-4 h-4 "/>
          <p className="text-xs text-yellow-400 uppercase tracking-widest font-bold">
            Acceso Restringido — Solo Administradores
          </p>
        </div>

        <div className="bg-gray-800/40 border border-gray-700 rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-white mb-1">
              Acceso Administrativo
            </h2>

            <p className="text-gray-400 text-base leading-relaxed">
              Ingresa tus credenciales para acceder al panel de control"
            </p>
          </div>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          © 2026 WorkDispatch · Todos los derechos reservados
        </p>
      </div>
    </div>
  );
};

export { AuthPage };