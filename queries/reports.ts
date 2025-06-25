import { Assessment } from "../model/assessment-model";
import { IReport, Report } from "../model/report-model";
import { replaceMongoIdInObject } from "../src/lib/convertData";

type Filter = {
  course: string;
  student: string;
};
export async function getReport(filter: Filter) {
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();
    return replaceMongoIdInObject(report as unknown as IReport);
  } catch (error) {
    console.error(error);
    return null;
  }
}
