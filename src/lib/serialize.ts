// lib/serialization.ts

/**
 * Comprehensive serialization function for MongoDB documents and complex objects
 * Handles ObjectId, Date, Buffer, and other MongoDB types
 * Safe for use with Next.js Server Components -> Client Components
 */

export type SerializableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SerializableObject
  | SerializableArray;

export interface SerializableObject {
  [key: string]: SerializableValue;
}

export interface SerializableArray extends Array<SerializableValue> {}

/**
 * Main serialization function - converts any value to a serializable format
 */
export function serialize<T>(value: T): SerializableValue {
  if (value === null || value === undefined) {
    return value;
  }

  // Handle primitive types
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  // Handle Date objects
  if (value instanceof Date) {
    return value.toISOString();
  }

  // Handle MongoDB ObjectId
  if (
    value &&
    typeof value === "object" &&
    "toString" in value &&
    "_bsontype" in value
  ) {
    if ((value as any)._bsontype === "ObjectId") {
      return (value as any).toString();
    }
    if ((value as any)._bsontype === "Date") {
      return new Date(value as any).toISOString();
    }
    if ((value as any)._bsontype === "Binary") {
      return (value as any).toString("base64");
    }
    // Handle other BSON types
    return (value as any).toString();
  }

  // Handle Buffer objects
  if (
    value &&
    typeof value === "object" &&
    "buffer" in value &&
    "toString" in value
  ) {
    return (value as any).toString("base64");
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    return value.map((item) => serialize(item)) as SerializableArray;
  }

  // Handle Objects
  if (typeof value === "object") {
    const serialized: SerializableObject = {};

    for (const [key, val] of Object.entries(value as Record<string, any>)) {
      // Skip functions and symbols
      if (typeof val === "function" || typeof val === "symbol") {
        continue;
      }

      // Convert _id to id if it exists
      if (key === "_id") {
        serialized.id = serialize(val);
      } else {
        serialized[key] = serialize(val);
      }
    }

    return serialized;
  }

  // Fallback for unknown types
  return String(value);
}

/**
 * Serialize a single MongoDB document
 */
export function serializeDocument<T extends Record<string, any>>(
  document: T
): SerializableObject {
  if (!document || typeof document !== "object") {
    return {};
  }

  return serialize(document) as SerializableObject;
}

/**
 * Serialize an array of MongoDB documents
 */
export function serializeDocuments<T extends Record<string, any>>(
  documents: T[]
): SerializableObject[] {
  if (!Array.isArray(documents)) {
    return [];
  }

  return documents.map((doc) => serializeDocument(doc));
}

/**
 * Deep serialization using JSON.parse/stringify (faster but less control)
 * Good for simple cases where you don't need custom handling
 */
export function deepSerialize<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (key, val) => {
      // Handle MongoDB ObjectId
      if (val && typeof val === "object" && val._bsontype === "ObjectId") {
        return val.toString();
      }

      // Handle MongoDB Date
      if (val && typeof val === "object" && val._bsontype === "Date") {
        return new Date(val).toISOString();
      }

      // Handle MongoDB Binary/Buffer
      if (val && typeof val === "object" && val._bsontype === "Binary") {
        return val.toString("base64");
      }

      // Handle regular Date objects
      if (val instanceof Date) {
        return val.toISOString();
      }

      // Handle Buffer objects
      if (
        val &&
        typeof val === "object" &&
        val.type === "Buffer" &&
        Array.isArray(val.data)
      ) {
        return Buffer.from(val.data).toString("base64");
      }

      return val;
    })
  );
}

/**
 * Utility function to check if an object needs serialization
 */
export function needsSerialization(value: any): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  // Check for MongoDB types
  if (value._bsontype) {
    return true;
  }

  // Check for Buffer
  if (value.buffer || (value.type === "Buffer" && Array.isArray(value.data))) {
    return true;
  }

  // Check for Date
  if (value instanceof Date) {
    return true;
  }

  // Check nested objects/arrays
  if (Array.isArray(value)) {
    return value.some((item) => needsSerialization(item));
  }

  // Check object properties
  for (const val of Object.values(value)) {
    if (needsSerialization(val)) {
      return true;
    }
  }

  return false;
}

/**
 * Serialize only if needed (performance optimization)
 */
export function conditionalSerialize<T>(value: T): T | SerializableValue {
  return needsSerialization(value) ? serialize(value) : value;
}

/**
 * Helper function specifically for Next.js Server Components
 * Ensures data is safe to pass to Client Components
 */
export function prepareForClient<T>(data: T): SerializableValue {
  try {
    return serialize(data);
  } catch (error) {
    console.error("Serialization error:", error);
    // Fallback to deep serialization
    return deepSerialize(data);
  }
}

// Export type for better TypeScript support
export type Serialized<T> = T extends Date
  ? string
  : T extends Array<infer U>
    ? Array<Serialized<U>>
    : T extends object
      ? { [K in keyof T]: Serialized<T[K]> }
      : T;
