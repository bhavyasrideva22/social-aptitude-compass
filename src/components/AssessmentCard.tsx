import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "highlight";
}

export const AssessmentCard = ({ children, className, variant = "default" }: AssessmentCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-300",
        {
          "bg-gradient-card shadow-card hover:shadow-glow hover:scale-105": variant === "default",
          "bg-gradient-primary shadow-primary text-primary-foreground": variant === "highlight",
          "bg-gradient-card shadow-card hover:shadow-glow hover:scale-105 border-primary/20": variant === "elevated"
        },
        className
      )}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};