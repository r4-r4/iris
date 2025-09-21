"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, TrendingUp, Loader2 } from "lucide-react"
import { ExportButton } from "@/components/export-button"

export default function SmartTipsPage() {
  const [challenge, setChallenge] = useState("")
  const [contentType, setContentType] = useState("")
  const [currentMetrics, setCurrentMetrics] = useState("")
  const [tips, setTips] = useState("")
  const [loading, setLoading] = useState(false)

  const generateTips = async () => {
    if (!challenge || !contentType) return

    setLoading(true)
    try {
      const response = await fetch("/api/generate-tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, contentType, currentMetrics }),
      })
      const data = await response.json()
      setTips(data.tips)
    } catch (error) {
      console.error("Error generating tips:", error)
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
              <TrendingUp className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Smart Tips</h1>
            <p className="text-muted-foreground">Get tailored recommendations to boost your content performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Your Challenge</CardTitle>
                <CardDescription>Tell us what you're struggling with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="challenge">Main Challenge *</Label>
                  <Select value={challenge} onValueChange={setChallenge}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your main challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low-engagement">Low Engagement</SelectItem>
                      <SelectItem value="slow-growth">Slow Growth</SelectItem>
                      <SelectItem value="content-ideas">Running Out of Ideas</SelectItem>
                      <SelectItem value="consistency">Posting Consistency</SelectItem>
                      <SelectItem value="monetization">Monetization</SelectItem>
                      <SelectItem value="audience-retention">Audience Retention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="contentType">Content Type *</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube Videos</SelectItem>
                      <SelectItem value="tiktok">TikTok/Shorts</SelectItem>
                      <SelectItem value="instagram">Instagram Posts</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="blog">Blog Content</SelectItem>
                      <SelectItem value="livestream">Live Streaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="metrics">Current Metrics (Optional)</Label>
                  <Textarea
                    id="metrics"
                    placeholder="e.g., 1K subscribers, 5% engagement rate, 30s avg watch time"
                    value={currentMetrics}
                    onChange={(e) => setCurrentMetrics(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={generateTips}
                  disabled={!challenge || !contentType || loading}
                  className="w-full accent-gradient hover:opacity-90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Tips...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Get Smart Tips
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personalized Recommendations</CardTitle>
                    <CardDescription>AI-powered tips to overcome your challenges</CardDescription>
                  </div>
                  {tips && (
                    <ExportButton
                      content={tips}
                      filename={`smart-tips-${challenge}`}
                      title={`Smart Tips for ${challenge}`}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {tips ? (
                  <Textarea
                    value={tips}
                    readOnly
                    className="min-h-[400px] resize-none"
                    placeholder="Your personalized tips will appear here..."
                  />
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                    Select your challenge and content type to get tailored recommendations
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
