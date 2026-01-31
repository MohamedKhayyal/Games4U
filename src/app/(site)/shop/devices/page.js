import DevicesClient from "@/components/devices/DevicesClient";
import DevicesSkeleton from "@/components/skeletons/DevicesSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Devices | Games4U",
  description:
    "Shop gaming devices including consoles, controllers, headsets and accessories at Games4U.",
};

async function getDevices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/devices`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.data?.devices || [];
}

export default async function DevicesPage() {
  const devices = await getDevices();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Devices</h1>

      <Suspense fallback={<DevicesSkeleton />}>
        <DevicesClient initialDevices={devices} />
      </Suspense>
    </div>
  );
}
