const API = process.env.NEXT_PUBLIC_API_URL;

export function getImageUrl(photo) {
  if (!photo) return null;

  if (photo === "default-user.png") return null;

  if (photo.startsWith("blob:")) return photo;

  if (photo.startsWith("http")) return photo;

  return `${API}${photo}`;
}
