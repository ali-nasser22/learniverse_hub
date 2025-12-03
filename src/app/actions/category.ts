'use server'

import {Category} from "../../../model/category-model";

export async function createNewCategory(title: string, imageUrl: string) {
    try {
        const category = await Category.create({
            title: title,
            thumbnail: imageUrl,
        });
        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        console.error(error);
        throw error;
    }
}