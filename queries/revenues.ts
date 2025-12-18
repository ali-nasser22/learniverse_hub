import {Enrollment, IEnrollment} from "../model/enrollment-model";
import {Course} from "../model/course-model";

export async function getTotalRevenue() {
    try {
        const allEnrollments = await Enrollment.find({}).populate({
            path: 'course',
            model: Course
        }).lean() as unknown as IEnrollment[];

        const revenue = allEnrollments.map((en) => {
            return en?.course?.price;
        }).reduce((price, acc) => {
            return price + acc;
        }, 0)

        return {
            instructors: (revenue * 0.9)?.toFixed(2),
            platform: (revenue * 0.1)?.toFixed(2)
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
