export default function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-sm text-slate-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
      />
    </div>
  );
}
