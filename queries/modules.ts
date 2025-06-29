import { Module } from "../model/module-model";
import { Types } from "mongoose";

interface IModuleCreate {
  title: string;
  slug: string;
  course: Types.ObjectId;
  order: number;
}

export async function createModule(module: IModuleCreate) {
  try {
    const newModule = await Module.create(module);
    return JSON.parse(JSON.stringify(newModule));
  } catch (error) {
    throw new Error("Failed to create module");
    console.log(error);
  }
}
