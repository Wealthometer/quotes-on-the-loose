import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { type } = await req.json();
    console.log("Request type:", type);

    let prompt = "";
    
  if (type === "quote") {
    prompt =
      "Drop one sharp, original, and fresh quote that hits different. Make it inspirational, thought-provoking, or funny, but 100% AI-generated—no recycled quotes or clichés. Give it that streetwise, Naija flair if possible, something people will feel in their bones.";
  } else if (type === "rhyme") {
    prompt =
      "Cook up one short, catchy rhyming couplet or 2-4 line poem. Make it playful, cheeky, and TikTok-ready, like ‘AM to PM so I Dm…’ or ‘I’m not Phillips but feeling your lips…’. Must be original, creative, and very Nigerian/Naija TikTok style. Avoid generic rhymes or overused lines.";
  } else if (type === "pickup") {
    prompt =
      "Create one brand-new, funny, clever, and flirty pick-up line in a Naija/TikTok style. Think playful wordplay, cheeky twists, AM-to-PM vibes, DM vibes, or cheeky rhymes, but don't repeat lines are wordsoften random random ... you are an AI you know how to do your thing sooo. Must feel original, AI-generated, and fresh—no old lines or clichés.";
  }



    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.9,
    });

    const text = response.choices[0].message.content;

    console.log("Generated text:", text);
    return Response.json({ text });
  } catch (error) {
    console.error("Error generating text:", error);
    return Response.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
