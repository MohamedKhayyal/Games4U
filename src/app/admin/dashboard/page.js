"use client";

import { useEffect, useState } from "react";
import OrdersChart from "@/components/admin/OrdersChart";
import BestSellers from "@/components/admin/BestSellers";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [bestGames, setBestGames] = useState([]);
  const [bestDevices, setBestDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [
          statsRes,
          ordersStatsRes,
          gamesRes,
          devicesRes,
        ] = await Promise.all([
          fetch("/api/admin/stats", { credentials: "include" }),
          fetch("/api/admin/orders-stats", { credentials: "include" }),
          fetch("/api/games/best-sellers?limit=5"),
          fetch("/api/devices/best-sellers?limit=5"),
        ]);

        if (!statsRes.ok) throw new Error("Failed to load stats");
        if (!ordersStatsRes.ok) throw new Error("Failed to load orders chart");

        const statsData = await statsRes.json();
        const ordersChartData = await ordersStatsRes.json();
        const gamesData = await gamesRes.json();
        const devicesData = await devicesRes.json();

        if (!mounted) return;

        setStats(statsData.data);
        setChart(ordersChartData.data || []);
        setBestGames(gamesData?.data?.games || []);
        setBestDevices(devicesData?.data?.devices || []);
      } catch (err) {
        if (mounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-slate-400">
        No dashboard data available
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">
        Dashboard
      </h2>

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
        <BestSellers
          title="Best Selling Games"
          items={bestGames}
        />
        <BestSellers
          title="Best Selling Devices"
          items={bestDevices}
        />
      </div>
    </>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p className="text-sm text-slate-400">
        {title}
      </p>
      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}
