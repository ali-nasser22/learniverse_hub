import { Button } from "@/components/ui/button";
import { getCourses } from "../../queries/courses";

const courses = await getCourses();
console.log(courses[0]);

export default function Page() {
  return (
    <>
      <Button>Class</Button>
    </>
  );
}
