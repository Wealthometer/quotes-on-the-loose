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
      "Generate original, thought-provoking, and emotionally resonant quotes on [insert topic]. For each idea, create multiple unique versions—at least 5 different ways of expressing it—each with a distinct tone, style, or perspective. Avoid clichés unless you can give them a surprising twist. The quotes should feel fresh, insightful, and something that feels like it could be shared widely, but not like something already existing. Include variations that are short, poetic, motivational, humorous, or philosophical. Output clearly labeled so I can see each version separately. You can also add touches of pidgin once in a while i mean like sweet nigerian pidgin...";
  } else if (type === "rhyme") {
    prompt =
      "Create one short, catchy, and fully original rhyming piece—either a 2-4 line poem or couplet. Make it playful, cheeky, and very Naija/TikTok in vibe, like it could trend in DMs or reels. Use clever wordplay, AM-to-PM energy, slang, or Nigerian expressions naturally. Avoid overused lines, generic rhymes, or predictable phrases. Bonus points for rhythm that hits hard and makes it memorable.";
  } else if (type === "pickup") {
    prompt =
      "Invent one brand-new, funny, clever, and flirty Naija/TikTok-style pick-up line. Make it playful, full of wordplay, cheeky twists, and AM-to-PM or DM vibes. You can sprinkle in short Nigerian slang, pidgin, or casual expressions. Must feel original, AI-generated, and fresh—no recycled lines, clichés, or boring word-for-word pick-ups. It should feel shareable, playful, and uniquely Nigerian. and fresh—no old lines or clichés.";
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
