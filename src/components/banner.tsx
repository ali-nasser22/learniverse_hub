import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon, LucideIcon } from "lucide-react";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconMap: Record<"warning" | "success", LucideIcon> = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

interface AlertBannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
  className?: string;
}

const AlertBanner = ({ label, variant, className }: AlertBannerProps) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }), className)}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};

export default AlertBanner;
