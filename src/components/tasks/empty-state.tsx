import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

const EmptyState = ({
  title,
  description,
  className,
  action,
}: EmptyStateProps) => {
  return (
    <div className={cn("text-center p-8", className)}>
      <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
      {action && (
        <Button className="mt-6" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
