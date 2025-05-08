export function camelCaseToSpaces(input: string): string {
  const spaced = input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
