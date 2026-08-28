import neo4j from "neo4j-driver";

export function toNativeValue(value: unknown): unknown {
  if (neo4j.isInt(value)) {
    return value.inSafeRange() ? value.toNumber() : value.toString();
  }

  if (Array.isArray(value)) {
    return value.map(toNativeValue);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, toNativeValue(entry)]),
    );
  }

  return value;
}

export function asProperties(value: unknown): Record<string, unknown> {
  const converted = toNativeValue(value);

  if (
    converted === null ||
    typeof converted !== "object" ||
    Array.isArray(converted)
  ) {
    return {};
  }

  return converted as Record<string, unknown>;
}

export function asNumber(value: unknown): number {
  const converted = toNativeValue(value);

  if (typeof converted !== "number") {
    throw new TypeError("Expected a numeric database value");
  }

  return converted;
}
