"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, FileText, Loader2 } from "lucide-react"

export default function ScriptWriterPage() {
  const [topic, setTopic] = useState("")
  const [scriptType, setScriptType] = useState("")
  const [duration, setDuration] = useState("")
  const [tone, setTone] = useState("")
  const [script, setScript] = useState("")
  const [loading, setLoading] = useState(false)

  const generateScript = async () => {
    if (!topic || !scriptType) return

    setLoading(true)
    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, scriptType, duration, tone }),
      })
      const data = await response.json()
      setScript(data.script)
    } catch (error) {
      console.error("Error generating script:", error)
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
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Script Writer</h1>
            <p className="text-muted-foreground">Create optimized scripts, captions, and descriptions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Script Details</CardTitle>
                <CardDescription>Specify what you want to create</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="topic">Topic/Subject *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., iPhone 15 Review, Morning Routine"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="scriptType">Script Type *</Label>
                  <Select value={scriptType} onValueChange={setScriptType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select script type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video-script">Video Script</SelectItem>
                      <SelectItem value="caption">Social Media Caption</SelectItem>
                      <SelectItem value="description">Video Description</SelectItem>
                      <SelectItem value="hook">Opening Hook</SelectItem>
                      <SelectItem value="cta">Call-to-Action</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration/Length</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15s">15 seconds</SelectItem>
                      <SelectItem value="30s">30 seconds</SelectItem>
                      <SelectItem value="1min">1 minute</SelectItem>
                      <SelectItem value="3min">3 minutes</SelectItem>
                      <SelectItem value="5min">5 minutes</SelectItem>
                      <SelectItem value="10min">10+ minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tone">Tone & Style</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="energetic">Energetic & Exciting</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateScript}
                  disabled={!topic || !scriptType || loading}
                  className="w-full accent-gradient hover:opacity-90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Writing Script...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Script
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Generated Script</CardTitle>
                <CardDescription>Your AI-optimized content</CardDescription>
              </CardHeader>
              <CardContent>
                {script ? (
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="min-h-[400px] resize-none"
                    placeholder="Your generated script will appear here..."
                  />
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                    Fill in the details and click "Generate Script" to create optimized content
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
