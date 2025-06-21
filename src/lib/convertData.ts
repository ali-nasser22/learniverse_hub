// For single objects
export const replaceMongoIdInObject = <T extends { _id: unknown }>(
  obj: T | null | undefined
): (Omit<T, "_id"> & { id: string }) | null => {
  if (!obj || typeof obj !== "object") {
    return null;
  }

  try {
    const { _id, ...rest } = obj;
    return {
      ...rest,
      id: _id?.toString() || "",
    };
  } catch (error) {
    console.error("replaceMongoIdInObject: Error processing object:", error);
    return null;
  }
};

// For arrays
export const replaceMongoIdInArray = <T extends { _id: unknown }>(
  array: T[] | null | undefined
): (Omit<T, "_id"> & { id: string })[] => {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  try {
    return array.map((item) => {
      if (!item || typeof item !== "object") {
        console.warn("replaceMongoIdInArray: Invalid item in array:", item);
        return { id: "" } as unknown as Omit<T, "_id"> & { id: string };
      }

      const { _id, ...rest } = item;
      return {
        ...rest,
        id: _id?.toString() || "",
      };
    });
  } catch (error) {
    console.error("replaceMongoIdInArray: Error processing array:", error);
    return [];
  }
};

// Helper function to handle both single objects and arrays
export const replaceMongoId = <T extends { _id: unknown }>(
  data: T | T[] | null | undefined
): unknown => {
  if (Array.isArray(data)) {
    return replaceMongoIdInArray(data);
  } else {
    return replaceMongoIdInObject(data);
  }
};
