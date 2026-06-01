export function buildBulletList(items: string[], emptyMessage: string): string {
  return items.length > 0 ? items.map((item) => `- ${item}`).join('\n') : `- ${emptyMessage}`;
}
