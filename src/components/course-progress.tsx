import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
} as const;

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
} as const;

type Variant = keyof typeof colorByVariant;
type Size = keyof typeof sizeByVariant;

interface CourseProgressProps {
  value: number;
  variant?: Variant;
  size?: Size;
}

export const CourseProgress = ({ 
  value, 
  variant, 
  size 
}: CourseProgressProps) => {
  return (
    <div>
      <Progress
        value={value}
        variant={variant}
        className={cn("h-2", !variant && "text-sky-700")}
      />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};