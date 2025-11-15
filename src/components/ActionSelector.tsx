import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface ActionSelectorProps {
  selected: string;
  onSelect: (action: string) => void;
}

const actions = [
  {
    id: "bowling",
    label: "Bowling",
    description: "Analyze your bowling action and technique",
    icon: "🎯",
  },
  {
    id: "batting",
    label: "Batting",
    description: "Review your batting stance and stroke",
    icon: "🏏",
  },
  {
    id: "throwing",
    label: "Throwing",
    description: "Evaluate your throwing accuracy and power",
    icon: "💪",
  },
];

export const ActionSelector = ({ selected, onSelect }: ActionSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Select Action Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Card
            key={action.id}
            onClick={() => onSelect(action.id)}
            className={cn(
              "p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
              selected === action.id
                ? "ring-2 ring-accent shadow-glow bg-accent/5"
                : "hover:shadow-card"
            )}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="text-4xl">{action.icon}</div>
              <div>
                <h4 className="font-semibold text-foreground">{action.label}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
