export const ForgotPasswordForm = ({onSwitch}) => {
    return (
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2.5 mb-5 text-sm bg-gray-700 border border-gray-600 text-white 
                    placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 "
                />
                <button
                    type="submit"
                    className="w-full mb-3 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 
                    hover:to-yellow-300 text-gray-900 font-semibold py-2.5 px-4 rounded-lg transition-all 
                    duration-200 text-sm"
                >
                Enviar correo
                </button>
                    <p className="text-center text-sm text-gray-400">
                    ¿Recordaste tu contraseña?{" "}                
                </p>
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-yellow-400 hover:text-yellow-300 hover:underline mx-auto block"
                >
                    Iniciar sesión
                </button>
            </div>
        </form>
    );
};