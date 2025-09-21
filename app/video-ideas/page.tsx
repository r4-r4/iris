"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react"

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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-lg accent-gradient flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Video Ideas Generator</h1>
            <p className="text-muted-foreground">Generate trending video concepts tailored to your niche</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>Tell us about your content focus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="niche">Content Niche *</Label>
                  <Input
                    id="niche"
                    placeholder="e.g., Tech Reviews, Cooking, Fitness"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="videoType">Video Type *</Label>
                  <Select value={videoType} onValueChange={setVideoType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select video type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short Form (less than 60 seconds)</SelectItem>
                      <SelectItem value="medium">Medium Form (1-10 minutes)</SelectItem>
                      <SelectItem value="long">Long Form (10+ minutes)</SelectItem>
                      <SelectItem value="live">Live Stream</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Young professionals, Students"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={generateIdeas}
                  disabled={!niche || !videoType || loading}
                  className="w-full accent-gradient hover:opacity-90"
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

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Generated Ideas</CardTitle>
                <CardDescription>AI-powered video concepts for your content</CardDescription>
              </CardHeader>
              <CardContent>
                {ideas ? (
                  <Textarea
                    value={ideas}
                    readOnly
                    className="min-h-[400px] resize-none"
                    placeholder="Your generated video ideas will appear here..."
                  />
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
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
