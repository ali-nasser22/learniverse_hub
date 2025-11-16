'use server'
import {ILives, Lives} from "../model/lives-model";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {createScheduleDate} from "@/lib/set-schedule";
import mongoose from "mongoose";
import {revalidatePath} from "next/cache";

interface LivesData {
    title: string;
    description: string;
    date: Date;
    time: string;
    url: string;
}

export async function getAllLivesForUser(instructorId: string) {
    try {
        const lives = await Lives.find({
            instructorId
        }).lean();

        return JSON.parse(JSON.stringify(lives)) as ILives[];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addLiveForUser(formValues: LivesData) {
    try {
        const loggedInUser = await getLoggedInUser();
        const schedule = createScheduleDate(formValues.date, formValues.time);
        const live = await Lives.create({
            title: formValues.title,
            description: formValues.description,
            schedule,
            liveUrl: formValues.url,
            instructorId: new mongoose.Types.ObjectId(loggedInUser?.id)
        })
        return {
            data: live,
            success: true
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getLiveById(id: string) {
    try {
        const live = await Lives.findById(id).lean();
        if (!live) {
            return {
                'message': 'Live not found',
            }
        }
        return JSON.parse(JSON.stringify(live));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateLiveForUser(formValues: LivesData, liveId: string) {
    try {
        const loggedInUser = await getLoggedInUser();
        const schedule = createScheduleDate(formValues.date, formValues.time);
        const live = await Lives.findByIdAndUpdate(
            liveId,
            {
                $set: {
                    title: formValues.title,
                    description: formValues.description,
                    schedule,
                    liveUrl: formValues.url,
                }
            },
            {new: true}
        ).lean();

        if (!live) {
            return {
                message: 'Live not found',
            }
        }

        revalidatePath('/dashboard/lives');

        return {
            success: true
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}