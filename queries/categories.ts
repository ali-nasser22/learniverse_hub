import { Category, ICategory } from "../model/category-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";

export async function getCategoryList() {
  const categories = await Category.find({}).lean();
  return replaceMongoIdInArray(categories as unknown as ICategory[]);
}

export async function getCategoryById(id: string) {
  try {
    const category = await Category.findById(id).lean();
    return replaceMongoIdInObject(category as unknown as ICategory);
  } catch (error) {
    console.error(error);
    return null;
  }
}
