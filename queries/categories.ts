import { Category, ICategory } from "../model/category-model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getCategoryList() {
  const categories = await Category.find({}).lean();
  return replaceMongoIdInArray(categories as ICategory[]);
}
