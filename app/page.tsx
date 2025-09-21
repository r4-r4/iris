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
      <div className="container mx-auto px-4 py-12 xl:px-8 xl:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            IRIS
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-cyan-200 mb-2">AI Content Creator Assistant</p>
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-slate-300 max-w-2xl xl:max-w-4xl mx-auto">
            Empower your content creation with AI-driven insights, trending ideas, and optimization tools
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 md:gap-8 xl:gap-12 max-w-4xl xl:max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:scale-105 transition-all duration-300 border-slate-700/50 bg-slate-800/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-16 h-16 xl:w-20 xl:h-20 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-lg xl:text-xl text-white">{feature.title}</CardTitle>
                <CardDescription className="text-slate-300 text-sm xl:text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={feature.href}>
                  <Button className="w-full accent-gradient hover:opacity-90 transition-opacity text-white font-medium">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-400">
          <p className="text-sm xl:text-base">Powered by Google Gemini AI • Built for Content Creators</p>
        </div>
      </div>
    </div>
  )
}
