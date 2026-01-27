import DeviceDetailsClient from "@/components/devices/DeviceDetailsClient";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${API}/api/devices/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Device not found | Games4U",
      };
    }

    const data = await res.json();
    const device = data?.data?.device;

    if (!device) {
      return {
        title: "Device not found | Games4U",
      };
    }

    return {
      title: `${device.name} | Games4U`,
      description: device.description?.slice(0, 160),
      openGraph: {
        title: device.name,
        description: device.description,
        images: [
          {
            url: device.photo,
            width: 800,
            height: 800,
            alt: device.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Games4U",
    };
  }
}

export default async function DeviceDetailsPage({ params }) {
  const { slug } =await params;

  return <DeviceDetailsClient slug={slug} />;
}
