import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../Store/adminStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ONLY_LETTERS_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜñÑçÇ\s]+$/;

const validate = (formState) => {
  const errors = {};

  if (!formState.firstName.trim()) {
    errors.firstName = "Debe llenar este campo.";
  } else if (!ONLY_LETTERS_REGEX.test(formState.firstName.trim())) {
    errors.firstName = "El nombre solo puede contener letras.";
  }

  if (!formState.lastName.trim()) {
    errors.lastName = "Debe llenar este campo.";
  } else if (!ONLY_LETTERS_REGEX.test(formState.lastName.trim())) {
    errors.lastName = "El apellido solo puede contener letras.";
  }

  if (!formState.email.trim()) {
    errors.email = "Debe llenar este campo.";
  } else if (!EMAIL_REGEX.test(formState.email.trim())) {
    errors.email = "Ingrese un correo electrónico válido.";
  }

  if (!formState.password.trim()) {
    errors.password = "Debe llenar este campo.";
  } else if (formState.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!formState.phone.trim()) {
    errors.phone = "Debe llenar este campo.";
  } else if (formState.phone.length !== 8) {
    errors.phone = "El teléfono debe tener exactamente 8 dígitos.";
  }

  return errors;
};

export const CreateUserModal = ({ open, onClose }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    role: "CLIENT",
    latitude: null,
    longitude: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const addUser = useUserStore((state) => state.addUser);

  useEffect(() => {
    if (open) {
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        description: "",
        role: "CLIENT",
        latitude: null,
        longitude: null,
      });
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Teléfono: solo dígitos y máximo 8
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 8) return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
            <p className="text-sm text-slate-500">Completa todos los campos requeridos.</p>
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
            <InputField
              label="Nombre *"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              label="Apellido *"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            <InputField
              label="Correo electrónico *"
              name="email"
              value={formState.email}
              onChange={handleChange}
              type="email"
              error={errors.email}
            />
            <InputField
              label="Contraseña *"
              name="password"
              value={formState.password}
              onChange={handleChange}
              type="password"
              error={errors.password}
            />
            <InputField
              label="Teléfono"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              inputMode="numeric"
              error={errors.phone}
            />
            <InputField
              label="Dirección"
              name="address"
              value={formState.address}
              onChange={handleChange}
            />
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

const InputField = ({ label, name, value, onChange, type = "text", inputMode, error }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      inputMode={inputMode}
      className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none focus:ring-2 transition ${error
          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
          : "border-gray-200 focus:border-green-400 focus:ring-green-100"
        }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);