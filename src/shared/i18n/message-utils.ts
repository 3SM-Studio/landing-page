type IndexedRecord<T> = Record<string, T>;

function byNumericKey([left]: [string, unknown], [right]: [string, unknown]) {
  return Number(left) - Number(right);
}

export function indexedMessagesToArray<T>(value: IndexedRecord<T>): T[] {
  return Object.entries(value)
    .sort(byNumericKey)
    .map(([, item]) => item);
}
