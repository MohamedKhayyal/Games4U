"use client";

import { useEffect, useRef, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([]);
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const fetchLogs = async (t = type, silent = false) => {
    if (!silent) setLoading(true);

    const res = await fetch(`/api/logs?type=${t}&limit=200`, {
      credentials: "include",
    });

    const data = await res.json();
    setLogs(data.data.logs || []);
    setLoading(false);
  };

  // Auto refresh كل 5 ثواني
  useEffect(() => {
    fetchLogs();

    intervalRef.current = setInterval(() => {
      fetchLogs(type, true);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [type]);

  const downloadLog = () => {
    window.open(`/api/logs/download?type=${type}`, "_blank");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Logs</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        {["error", "warn", "info", "debug"].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              type === t
                ? "bg-sky-500 text-black"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}

        <button
          onClick={() => fetchLogs(type)}
          className="ml-auto flex items-center gap-2 px-3 py-2 bg-slate-800 rounded text-sm hover:bg-slate-700"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>

        <button
          onClick={downloadLog}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded text-sm hover:bg-slate-700"
        >
          <Download size={16} />
          Download
        </button>
      </div>

      {/* Logs terminal */}
      <div className="bg-black rounded-xl border border-slate-800 p-4 max-h-[70vh] overflow-y-auto font-mono text-sm">
        {loading ? (
          <p className="text-slate-400">Loading logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-slate-400">No logs found.</p>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={`mb-2 ${
                log.includes("ERROR")
                  ? "text-red-400"
                  : log.includes("WARN")
                  ? "text-yellow-400"
                  : "text-slate-300"
              }`}
            >
              {log}
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Auto refresh every 5 seconds
      </p>
    </div>
  );
}
