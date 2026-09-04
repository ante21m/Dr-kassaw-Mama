const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export function resolveImage(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads")) return `${API_URL}${path}`;
  return path;
}