'use server'
import {INewsLetter, NewsLetter} from "../model/newsletter-subscriptions";
import {revalidatePath} from "next/cache";

export async function getAllSubscriptions() {
    try {
        const subscriptions: INewsLetter[] = await NewsLetter.find({});
        return JSON.parse(JSON.stringify(subscriptions));
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function subscribeToNewsLetterAction(userId: string) {
    try {
        const subscription = await NewsLetter.create({
            userId,
            isSubscribed: true,
        });

        revalidatePath('/');

        return {
            success: true,
            data: JSON.parse(JSON.stringify(subscription))
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to subscribe'
        };
    }
}

export async function isSubscribedToNewsLetter(userId: string) {
    try {
        const subscription = await NewsLetter.findOne({
            userId,
        });
        if (!subscription) {
            return false;
        }
        return JSON.parse(JSON.stringify(subscription));
    } catch (error) {
        console.error(error);
        throw error;
    }
}