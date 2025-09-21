import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDV8S6SkVbkWaSwIQ6tVZ9XoIQ3qcgQ9lk")

export async function POST(request: Request) {
  try {
    const { challenge, contentType, currentMetrics } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `Provide personalized tips for a ${contentType} creator struggling with ${challenge}${currentMetrics ? ` with current metrics: ${currentMetrics}` : ""}.

Structure your response with:

1. **Problem Analysis**: Why this challenge occurs
2. **Immediate Actions**: 3-5 quick wins they can implement today
3. **Long-term Strategy**: Sustainable growth tactics
4. **Content Optimization**: Specific improvements for their content type
5. **Metrics to Track**: Key performance indicators to monitor
6. **Tools & Resources**: Recommended tools or platforms
7. **Timeline**: Realistic expectations for seeing results

Make recommendations specific, actionable, and tailored to their content type and current situation.`

    const result = await model.generateContent(prompt)
    const tips = result.response.text()

    return Response.json({ tips })
  } catch (error) {
    console.error("Error generating tips:", error)
    return Response.json({ error: "Failed to generate tips" }, { status: 500 })
  }
}
