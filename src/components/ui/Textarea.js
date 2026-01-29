export default function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-sm text-slate-400">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
      />
    </div>
  );
}