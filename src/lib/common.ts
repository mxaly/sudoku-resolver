export function unique<T>(items: T[]): T[] {
  return items.filter((v, i, a) => a.indexOf(v) === i);
}
