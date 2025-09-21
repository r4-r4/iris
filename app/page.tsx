import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Video, TrendingUp, FileText } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      title: "Video Ideas Generator",
      description: "Generate trending video concepts based on your niche and content type",
      icon: <Sparkles className="w-8 h-8" />,
      href: "/video-ideas",
      color: "from-primary to-accent",
    },
    {
      title: "Quality Analysis",
      description: "Upload videos for AI-driven analysis on pacing, clarity, and engagement",
      icon: <Video className="w-8 h-8" />,
      href: "/quality-analysis",
      color: "from-accent to-primary",
    },
    {
      title: "Smart Tips",
      description: "Get tailored recommendations to improve your content performance",
      icon: <TrendingUp className="w-8 h-8" />,
      href: "/smart-tips",
      color: "from-primary/80 to-accent/80",
    },
    {
      title: "Script Writer",
      description: "Create optimized scripts, captions, and descriptions for maximum reach",
      icon: <FileText className="w-8 h-8" />,
      href: "/script-writer",
      color: "from-accent/80 to-primary/80",
    },
  ]

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            IRIS
          </h1>
          <p className="text-xl text-muted-foreground mb-2">AI Content Creator Assistant</p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Empower your content creation with AI-driven insights, trending ideas, and optimization tools
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:scale-105 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={feature.href}>
                  <Button className="w-full accent-gradient hover:opacity-90 transition-opacity">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          <p>Powered by Google Gemini AI • Built for Content Creators</p>
        </div>
      </div>
    </div>
  )
}
