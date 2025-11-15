import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

interface AnalysisResultProps {
  score: number;
  actionType: string;
  strengths: string[];
  improvements: string[];
}

export const AnalysisResult = ({
  score,
  actionType,
  strengths,
  improvements,
}: AnalysisResultProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-accent";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Display */}
      <Card className="p-8 shadow-card">
        <div className="flex flex-col items-center text-center gap-4">
          <Badge variant="outline" className="text-sm">
            {actionType.toUpperCase()} ANALYSIS
          </Badge>
          
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow">
              <div className="text-center">
                <div className={cn("text-5xl font-bold", getScoreColor(score))}>
                  {score}
                </div>
                <div className="text-sm text-primary-foreground opacity-90">/ 100</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground">
              {getScoreLabel(score)}
            </h3>
            <p className="text-muted-foreground mt-1">
              Your {actionType} technique analysis
            </p>
          </div>

          <Progress value={score} className="w-full max-w-md h-3" />
        </div>
      </Card>

      {/* Strengths */}
      <Card className="p-6 shadow-card animate-scale-in">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-semibold text-foreground">Strengths</h4>
        </div>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-1">✓</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Areas for Improvement */}
      <Card className="p-6 shadow-card animate-scale-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h4 className="text-lg font-semibold text-foreground">Areas to Improve</h4>
        </div>
        <ul className="space-y-3">
          {improvements.map((improvement, index) => (
            <li key={index} className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{improvement}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
