import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDV8S6SkVbkWaSwIQ6tVZ9XoIQ3qcgQ9lk")

export async function POST(request: Request) {
  try {
    const { niche, videoType, audience } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `Generate 5 trending video ideas for a ${videoType} content creator in the ${niche} niche${audience ? ` targeting ${audience}` : ""}. 

For each idea, provide:
1. Catchy title
2. Brief description (2-3 sentences)
3. Key talking points
4. Why it's trending/relevant

Provide the response in plain text format without any markdown formatting, bold text, asterisks, or special characters. Use simple numbered lists and clear sections.`

    const result = await model.generateContent(prompt)
    const ideas = result.response.text()

    return Response.json({ ideas })
  } catch (error) {
    console.error("Error generating ideas:", error)
    return Response.json({ error: "Failed to generate ideas" }, { status: 500 })
  }
}
