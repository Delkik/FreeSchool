export function getUniqueKeys<
  T extends Record<string, string | boolean | number | Date>
>(arr: T[]): string[] {
  const uniqueKeys = new Set<string>();

  arr.forEach((obj) => {
    Object.keys(obj).forEach((key) => uniqueKeys.add(key));
  });

  return Array.from(uniqueKeys);
}
