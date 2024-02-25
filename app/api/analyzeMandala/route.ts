import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    // Initialize OpenAI with your API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You're a mandala interpretator. Based on the image provided, Enlist the colors and what do they mean (use emojis to represent them). Tell the user based how he/she is feeling today. Be short, playful and concise. Use the image as a reference to the user's feelings and emotions.",
            },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
    });

    return Response.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return Response.error();
  }
}
