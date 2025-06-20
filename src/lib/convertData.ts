export interface MongoDocument {
  _id: string | { toString(): string };
  [key: string]: unknown;
}

export const replaceMongoIdInArray = <T extends MongoDocument>(
  array: T[]
): (Omit<T, "_id"> & { id: string })[] => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = <T extends MongoDocument>(
  obj: T
): Omit<T, "_id"> & { id: string } => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};
