const API = process.env.NEXT_PUBLIC_API_URL;

export function getImageUrl(photo) {
  if (!photo) return "/images/placeholder.png";

  if (photo.startsWith("http")) return photo;

  return `${API}${photo}`;
}
