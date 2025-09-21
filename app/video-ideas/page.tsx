"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { ExportButton } from "@/components/export-button"

export default function VideoIdeasPage() {
  const [niche, setNiche] = useState("")
  const [videoType, setVideoType] = useState("")
  const [audience, setAudience] = useState("")
  const [ideas, setIdeas] = useState("")
  const [loading, setLoading] = useState(false)

  const generateIdeas = async () => {
    if (!niche || !videoType) return

    setLoading(true)
    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, videoType, audience }),
      })
      const data = await response.json()
      setIdeas(data.ideas)
    } catch (error) {
      console.error("Error generating ideas:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 xl:px-8 xl:py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl xl:max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-lg accent-gradient flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 xl:w-10 xl:h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-2 text-white">Video Ideas Generator</h1>
            <p className="text-slate-300 text-base xl:text-lg">
              Generate trending video concepts tailored to your niche
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-12">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Content Details</CardTitle>
                <CardDescription className="text-slate-300">Tell us about your content focus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="niche" className="text-slate-200">
                    Content Niche *
                  </Label>
                  <Input
                    id="niche"
                    placeholder="e.g., Tech Reviews, Cooking, Fitness"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <Label htmlFor="videoType" className="text-slate-200">
                    Video Type *
                  </Label>
                  <Select value={videoType} onValueChange={setVideoType}>
                    <SelectTrigger className="mt-2 bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select video type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="short">Short Form (less than 60 seconds)</SelectItem>
                      <SelectItem value="medium">Medium Form (1-10 minutes)</SelectItem>
                      <SelectItem value="long">Long Form (10+ minutes)</SelectItem>
                      <SelectItem value="live">Live Stream</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="audience" className="text-slate-200">
                    Target Audience
                  </Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Young professionals, Students"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <Button
                  onClick={generateIdeas}
                  disabled={!niche || !videoType || loading}
                  className="w-full accent-gradient hover:opacity-90 text-white font-medium"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Ideas
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Generated Ideas</CardTitle>
                    <CardDescription className="text-slate-300">
                      AI-powered video concepts for your content
                    </CardDescription>
                  </div>
                  {ideas && (
                    <ExportButton
                      content={ideas}
                      filename={`video-ideas-${niche.toLowerCase().replace(/\s+/g, "-")}`}
                      title={`Video Ideas for ${niche}`}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {ideas ? (
                  <div className="min-h-[400px] p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <MarkdownRenderer content={ideas} />
                  </div>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center text-slate-400">
                    Fill in the details and click "Generate Ideas" to get started
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
