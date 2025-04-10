const StaffModal = ({ isEditing, staff, onClose, onSave }: { isEditing: boolean; staff: any; onClose: () => void; onSave: (staff: any) => void; }) => {
  const [form, setForm] = useState(staff || {
    name: "",
    surname: "",
    role: "Manager",  // Default role
    email: "",
    mobile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.surname || !form.role || !form.email) {
      alert("Please complete all required fields.");
      return;
    }
    onSave({ ...form, id: staff?.id || "" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Staff" : "Add New Staff"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Surname"
            className="border rounded p-2"
          />

          {/* Role dropdown select */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="HR">HR</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
          </select>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="border rounded p-2"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 border rounded hover:bg-stone-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            onClick={handleSubmit}
          >
            {isEditing ? "Save Changes" : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
};
