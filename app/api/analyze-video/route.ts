import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDV8S6SkVbkWaSwIQ6tVZ9XoIQ3qcgQ9lk")

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const video = formData.get("video") as File

    if (!video) {
      return Response.json({ error: "No video file provided" }, { status: 400 })
    }

    // Convert video to base64 for analysis
    const bytes = await video.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `Analyze this video for content quality and provide detailed feedback on:

1. Visual Quality: Resolution, lighting, composition, stability
2. Audio Quality: Clarity, background noise, volume levels
3. Pacing & Flow: Rhythm, transitions, engagement level
4. Content Structure: Introduction, main content, conclusion
5. Audience Engagement: Hook effectiveness, retention factors
6. Technical Issues: Any problems detected
7. Improvement Suggestions: Specific actionable recommendations

Provide a comprehensive analysis with scores (1-10) for each category and detailed explanations. Provide the response in plain text format without any markdown formatting, bold text, asterisks, or special characters.`

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: video.type,
        },
      },
    ])

    const analysis = result.response.text()

    return Response.json({ analysis })
  } catch (error) {
    console.error("Error analyzing video:", error)
    return Response.json({ error: "Failed to analyze video" }, { status: 500 })
  }
}
