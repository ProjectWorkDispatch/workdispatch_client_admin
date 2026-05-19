import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../Store/adminStore";

export const CreateUserModal = ({ open, onClose }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    role: "CLIENT",
  });
  const [submitting, setSubmitting] = useState(false);
  const addUser = useUserStore((state) => state.addUser);

  useEffect(() => {
    if (open) {
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        role: "CLIENT",
      });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        payload.append(key, value ?? "");
      });

      await addUser(payload);
      toast.success("Usuario creado correctamente");
      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Error al crear usuario";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Crear usuario</h2>
            <p className="text-sm text-slate-500">Registra un usuario nuevo para revisar la integración.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nombre" name="firstName" value={formState.firstName} onChange={handleChange} />
            <InputField label="Apellido" name="lastName" value={formState.lastName} onChange={handleChange} />
            <InputField label="Correo electrónico" name="email" value={formState.email} onChange={handleChange} type="email" />
            <InputField label="Teléfono" name="phone" value={formState.phone} onChange={handleChange} />
            <InputField label="Dirección" name="address" value={formState.address} onChange={handleChange} />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Rol</label>
              <select
                name="role"
                value={formState.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              >
                <option value="CLIENT">Cliente</option>
                <option value="WORKER">Trabajador</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              placeholder="Descripción breve del usuario"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-3 rounded-2xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
            >
              {submitting ? "Guardando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
    />
  </div>
);
