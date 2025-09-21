"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Video, Upload, Loader2, Play } from "lucide-react"

export default function QualityAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
      setVideoUrl(URL.createObjectURL(file))
    }
  }

  const analyzeVideo = async () => {
    if (!selectedFile) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("video", selectedFile)

      const response = await fetch("/api/analyze-video", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error("Error analyzing video:", error)
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
              <Video className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Quality Analysis</h1>
            <p className="text-muted-foreground">Upload your video for AI-driven quality assessment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Video Upload</CardTitle>
                <CardDescription>Select a video file for analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    {selectedFile ? selectedFile.name : "Click to upload video"}
                  </p>
                  <p className="text-muted-foreground">Supports MP4, MOV, AVI files up to 100MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {videoUrl && (
                  <div className="space-y-4">
                    <video src={videoUrl} controls className="w-full rounded-lg" style={{ maxHeight: "300px" }} />
                    <Button
                      onClick={analyzeVideo}
                      disabled={!selectedFile || loading}
                      className="w-full accent-gradient hover:opacity-90"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Video...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Analyze Quality
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>AI insights on your video quality</CardDescription>
              </CardHeader>
              <CardContent>
                {analysis ? (
                  <Textarea
                    value={analysis}
                    readOnly
                    className="min-h-[400px] resize-none"
                    placeholder="Analysis results will appear here..."
                  />
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                    Upload a video and click "Analyze Quality" to get detailed insights
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
