"use client";

import { useEffect, useState } from "react";
import OrdersChart from "@/components/admin/OrdersChart";
import BestSellers from "@/components/admin/BestSellers";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [bestGames, setBestGames] = useState([]);
  const [bestDevices, setBestDevices] = useState([]);

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setStats(d.data));

    fetch("/api/admin/orders-stats", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setChart(d.data));

    fetch("/api/games/best-sellers?limit=5")
      .then((r) => r.json())
      .then((d) => setBestGames(d.data.games || []));

    fetch("/api/devices/best-sellers?limit=5")
      .then((r) => r.json())
      .then((d) => setBestDevices(d.data.devices || []));
  }, []);

  if (!stats) return <p className="text-slate-400">Loading dashboard...</p>;

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Stat title="Users" value={stats.users} />
        <Stat title="Games" value={stats.games} />
        <Stat title="Devices" value={stats.devices} />
        <Stat title="Orders" value={stats.orders} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <OrdersChart data={chart} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <BestSellers title="Best Selling Games" items={bestGames} />
        <BestSellers title="Best Selling Devices" items={bestDevices} />
      </div>
    </>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
