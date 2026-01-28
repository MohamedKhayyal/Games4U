import DeviceDetailsClient from "@/components/devices/DeviceDetailsClient";

const API = process.env.API_URL;

async function getDevice(slug) {
  const res = await fetch(`${API}/api/devices/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data?.device;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const device = await getDevice(slug);

  if (!device) {
    return { title: "Device not found | Games4U" };
  }

  return {
    title: `${device.name} | Games4U`,
    description: device.description?.slice(0, 160),
    openGraph: {
      title: device.name,
      description: device.description,
      images: [{ url: device.photo }],
    },
  };
}

export default async function DeviceDetailsPage({ params }) {
  const { slug } = await params;
  const device = await getDevice(slug);

  if (!device) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-white">
        <h1 className="text-3xl font-bold mb-6">Device not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <DeviceDetailsClient device={device} />
    </div>
  );
}
