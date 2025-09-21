import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyDV8S6SkVbkWaSwIQ6tVZ9XoIQ3qcgQ9lk")

export async function POST(request: Request) {
  try {
    const { topic, scriptType, duration, tone } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    let prompt = ""

    switch (scriptType) {
      case "video-script":
        prompt = `Write a ${duration || "medium-length"} video script about "${topic}" with a ${tone || "casual"} tone.

Include:
- Compelling hook (first 5 seconds)
- Clear structure with timestamps
- Engaging transitions
- Call-to-action
- SEO-optimized language

Format with [TIMESTAMP] markers and [ACTION] cues for editing. Provide the response in plain text format without any markdown formatting, bold text, asterisks, or special characters.`
        break

      case "caption":
        prompt = `Write an engaging social media caption for "${topic}" with a ${tone || "casual"} tone.

Include:
- Attention-grabbing opening
- Value-driven content
- Relevant hashtags
- Call-to-action
- Emoji usage (if appropriate)

Keep it optimized for maximum engagement and reach. Provide the response in plain text format without any markdown formatting, bold text, asterisks, or special characters.`
        break

      case "description":
        prompt = `Write a comprehensive video description for "${topic}" optimized for SEO and engagement.

Include:
- Compelling summary
- Timestamps (if applicable)
- Relevant keywords
- Links and resources
- Call-to-action
- Social media links section

Make it search-friendly and viewer-focused. Provide the response in plain text format without any markdown formatting, bold text, asterisks, or special characters.`
        break

      case "hook":
        prompt = `Create 5 different opening hooks for content about "${topic}" with a ${tone || "casual"} tone.

Each hook should:
- Grab attention in first 3 seconds
- Create curiosity or urgency
- Be specific to the topic
- Match the tone requested

Provide variety in approach (question, statement, statistic, story, etc.). Provide the response in plain text format without any markdown formatting, bold text, asterisks, or special characters.`
        break

      case "cta":
        prompt = `Create 5 different call-to-action options for content about "${topic}" with a ${tone || "casual"} tone.

Include CTAs for:
- Engagement (likes, comments, shares)
- Subscription/follow
- External links
- Next video/content
- Community building

Make them natural and compelling, not pushy. Provide the response in plain text format without any markdown formatting, bold text, asterisks, or special characters.`
        break
    }

    const result = await model.generateContent(prompt)
    const script = result.response.text()

    return Response.json({ script })
  } catch (error) {
    console.error("Error generating script:", error)
    return Response.json({ error: "Failed to generate script" }, { status: 500 })
  }
}
