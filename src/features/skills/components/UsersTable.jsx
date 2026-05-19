export const UsersTable = ({ users, onViewUser }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="text-left px-5 py-4">Usuario</th>
                        <th className="text-left px-5 py-4">Rol</th>
                        <th className="text-left px-5 py-4">Estado</th>
                        <th className="text-left px-5 py-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                                        {user.firstName[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{user.firstName} {user.lastName}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                <span className="text-xs font-medium px-2 py-1 rounded-lg bg-gray-100">
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-5 py-4">
                                {user.active ? 
                                    <span className="text-green-600 text-xs font-bold">● Activo</span> : 
                                    <span className="text-red-600 text-xs font-bold">● Inactivo</span>
                                }
                            </td>
                            <td className="px-5 py-4">
                                <button onClick={() => onViewUser(user)} className="p-2 hover:bg-gray-100 rounded-full">
                                    {/* Icono View de tus assets */}
                                    👁️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};