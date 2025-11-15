import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/UploadZone";
import { ActionSelector } from "@/components/ActionSelector";
import { AnalysisResult } from "@/components/AnalysisResult";
import { Loader2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/cricket-hero.jpg";

const Index = () => {
  const [selectedAction, setSelectedAction] = useState("bowling");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setVideoFile(file);
    toast({
      title: "Video uploaded",
      description: `${file.name} is ready for analysis`,
    });
  };

  const handleAnalyze = async () => {
    if (!videoFile) {
      toast({
        title: "No video selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis (in production, this would call your backend)
    setTimeout(() => {
      const mockResult = {
        score: Math.floor(Math.random() * 30) + 65, // Random score between 65-95
        actionType: selectedAction,
        strengths: getStrengthsForAction(selectedAction),
        improvements: getImprovementsForAction(selectedAction),
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);

      toast({
        title: "Analysis complete!",
        description: `Your ${selectedAction} has been analyzed`,
      });
    }, 3000);
  };

  const handleReset = () => {
    setVideoFile(null);
    setAnalysisResult(null);
    setSelectedAction("bowling");
  };

  const getStrengthsForAction = (action: string) => {
    const strengths = {
      bowling: [
        "Good wrist position at release point",
        "Consistent run-up rhythm and pace",
        "Strong follow-through motion",
      ],
      batting: [
        "Balanced stance with proper weight distribution",
        "Good head position over the ball",
        "Smooth backlift and downswing coordination",
      ],
      throwing: [
        "Excellent arm extension and follow-through",
        "Good shoulder rotation for power generation",
        "Accurate targeting and release timing",
      ],
    };
    return strengths[action as keyof typeof strengths] || [];
  };

  const getImprovementsForAction = (action: string) => {
    const improvements = {
      bowling: [
        "Work on maintaining a more upright body position during delivery stride",
        "Increase hip rotation for better pace generation",
        "Focus on keeping the front arm higher for better balance",
      ],
      batting: [
        "Keep elbow higher during the backlift for better shot control",
        "Transfer weight more smoothly from back foot to front foot",
        "Practice keeping the head still at point of contact",
      ],
      throwing: [
        "Engage core muscles more during the throwing motion",
        "Work on stepping toward the target for improved accuracy",
        "Increase shoulder flexibility for greater range of motion",
      ],
    };
    return improvements[action as keyof typeof improvements] || [];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Cricket field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Cricket Action Analyzer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered analysis for your bowling, batting, and throwing technique
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {!analysisResult ? (
          <div className="space-y-8">
            <ActionSelector
              selected={selectedAction}
              onSelect={setSelectedAction}
            />

            <UploadZone
              onFileSelect={handleFileSelect}
              isAnalyzing={isAnalyzing}
            />

            {videoFile && !isAnalyzing && (
              <div className="flex justify-center animate-scale-in">
                <Button
                  onClick={handleAnalyze}
                  size="lg"
                  className="bg-gradient-accent hover:shadow-glow transition-all text-lg px-8"
                >
                  Analyze My Technique
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                <p className="text-lg text-muted-foreground">
                  Analyzing your {selectedAction} technique...
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <AnalysisResult {...analysisResult} />
            
            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Analyze Another Video
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
