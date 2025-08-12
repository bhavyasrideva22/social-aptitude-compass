import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export const ProgressBar = ({ value, max, className }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn("w-full bg-muted rounded-full h-3 overflow-hidden", className)}>
      <div 
        className="h-full bg-gradient-primary transition-all duration-500 ease-out rounded-full shadow-glow"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};