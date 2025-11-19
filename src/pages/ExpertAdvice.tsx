import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ExpertAdvice = () => {
  const experts = [
    {
      name: "Wasim Akram",
      title: "Swing Bowling Legend",
      specialty: "Bowling",
      videoUrl: "https://www.youtube.com/embed/8FhBQzKHvIo",
      tips: [
        "Master the wrist position for in-swing and out-swing",
        "Keep your bowling arm close to your ear during delivery",
        "Practice your run-up to maintain consistent rhythm",
      ],
    },
    {
      name: "Sachin Tendulkar",
      title: "Master Blaster",
      specialty: "Batting",
      videoUrl: "https://www.youtube.com/embed/XH8a6R1AGkc",
      tips: [
        "Watch the ball from the bowler's hand to the bat",
        "Maintain a balanced stance with weight on the balls of your feet",
        "Play late and close to your body for better control",
      ],
    },
    {
      name: "Jonty Rhodes",
      title: "Fielding Maestro",
      specialty: "Throwing",
      videoUrl: "https://www.youtube.com/embed/YqOo1KqGQhc",
      tips: [
        "Always approach the ball at pace to build momentum",
        "Use your entire body for powerful and accurate throws",
        "Practice quick pickups and releases for direct hits",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Analyzer
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learn from the Legends
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch expert cricketers demonstrate perfect technique and share their invaluable insights
          </p>
        </div>
      </section>

      {/* Expert Videos Section */}
      <main className="container mx-auto px-4 pb-16 max-w-6xl">
        <div className="space-y-12">
          {experts.map((expert, index) => (
            <Card key={index} className="overflow-hidden border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl mb-2">
                      {expert.name}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {expert.title}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {expert.specialty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Video */}
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={expert.videoUrl}
                    title={`${expert.name} technique video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    Key Tips from {expert.name}
                  </h3>
                  <ul className="space-y-2">
                    {expert.tips.map((tip, tipIndex) => (
                      <li 
                        key={tipIndex}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExpertAdvice;
