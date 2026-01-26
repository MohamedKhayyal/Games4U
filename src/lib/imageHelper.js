export function getImageUrl(photo) {
    if (!photo) return "/images/user.png";

    if (photo.startsWith("http")) return photo;

    return photo;
}
