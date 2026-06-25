export function InputBox({ id, label, value, placeholder, onChange }) {
  return (
    <div>
      <label for={id} className="text-bold block text-left pl-3">
        {label[0].toUpperCase() + label.slice(1) + ": "}
      </label>
      <input
        id={id}
        type={id === "password" ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder[0].toUpperCase() + placeholder.slice(1)}
        size={25}
        className="mb-3 border p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      />
    </div>
  );
}
