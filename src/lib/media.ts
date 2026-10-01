export const MAX_FILE_SIZE = 12 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function validateMediaFile(file: Pick<File, "name" | "size" | "type">): string | null {
  if (!IMAGE_TYPES.has(file.type)) return `"${file.name}" : format non pris en charge (JPG, PNG ou WEBP).`;
  if (file.size === 0) return `"${file.name}" : le fichier est vide.`;
  if (file.size > MAX_FILE_SIZE) return `"${file.name}" dépasse la limite de 12 Mo.`;
  return null;
}

export function moveMediaItem<T extends { id: string }>(items: T[], id: string, direction: -1 | 1): T[] {
  const index = items.findIndex((item) => item.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= items.length) return items;
  const reordered = [...items];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
  return reordered;
}
