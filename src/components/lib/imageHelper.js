// lib/getImageUrl.js
export const getImageUrl = (path) => {
    if (!path) return "/images/placeholder.png";
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};
