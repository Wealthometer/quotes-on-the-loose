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
      `
      Generate As many as you can fully original quotes.

      STRICT RULES:
      - Each quote must feel meaningfully different in tone, angle, or mindset.
      - Mix styles: poetic, savage, funny, motivational, memeable, philosophical, chaotic, calm, reflective.
      - Some quotes should be very short (5–10 words). Some can be longer.
      - At least 30% of the quotes must contain a clear plot twist, reversal, or unexpected ending.
      - Avoid recycled wisdom, common sayings, or motivational clichés.
      - If a quote sounds like it already exists, discard it and create a new one.

      STYLE CONSTRAINTS:
      - Sound modern, Gen Z, internet-aware, and shareable.
      - You may sprinkle in Nigerian pidgin OCCASIONALLY (not every quote).
      - Humor and sarcasm are welcome.
      - Confidence > preachiness.

      BANNED:
      - No “trust the process”, “everything happens for a reason”, “keep going”, “never give up”.
      - No spiritual-poster energy unless flipped creatively.

      OUTPUT FORMAT:
      - only output one at a time
      - Only output the quotes. No explanations.

      `
  } else if (type === "rhyme") {
    prompt =
      `
      Generate ONE original short rhyme or poem.

      STRICT RULES:
      - Must be 4–8 lines.
      - The LAST WORD of each line must RHYME.
      - Must feel playful, bold, and confident.
      - Can include Nigerian slang or light pidgin.
      - Must sound like something a funny, smooth Gen Z guy would say.
      - End with a punchline or clever twist.

      BANNED:
      - No magician, stars, angels, destiny, universe, or disappearing metaphors.
      - No recycled or popular rhymes/poems.
      - No generic compliments.
      - No explanations.

      STYLE:
      - Unexpected wordplay
      - Slightly cheeky, not corny
      - Should make someone laugh or pause, blush

      OUTPUT:
      - Only the rhyme/poem. Nothing else.one at a time 
      - generate as many as you can
      - but only output one at a time
      
      `;
  } else if (type === "pickup") {
    prompt =
      `
      Generate ONE original pickup line.

      STRICT RULES:
      - Must be 2–4 short lines (not one sentence).
      - The LAST WORD of each line must RHYME.
      - Must feel playful, bold, and confident.
      - Can include Nigerian slang or light pidgin.
      - Must sound like something a funny, smooth Gen Z guy would say.
      - End with a punchline or clever twist.
      - and what makes a pick up line very cheezy is when the last words in every line rhymes
      - use my example
      - so from all my example you should have an idea of how i want the pick up lines to be generated ... emphasis on lines rhymes and creativity
      - there is no limit to what you can create ok .... anyword can be created as long as it makes sense
      - i am not sayin use my lines or give the lines as output just use them as idea or refrence

      BANNED:
      - No magician, stars, angels, destiny, universe, or disappearing metaphors.
      - No recycled or popular pickup lines.
      - No generic compliments.
      - No explanations.

      STYLE:
      - Unexpected wordplay
      - Slightly cheeky, not corny
      - Should make someone laugh or pause, blush

      Example:
      1. i am single, ready to mingle, Madam twinkle will you be my jingle 
      2. baby girl even though i am not phillips i am definitely feeling your lips
      3. 'this isn't a pickup line but i am just trying to drop a line ..... : this extension is causing tension and now it has to go on extintion' 
      4. i had to summon courage cos you look really good and quite intimidating so let us leave 'intimi' and focus on 'dating'
      5. I am ready to get Married cos this Nigga Is eager To make your belly bigger
      6. Anyways i like the fact that you are very pretty and i will like to make you my sweetie 😏💕
      7. idk which is hotter you or the sun cos my heart is melting 
      8. you look absolutely beautiful and to let you go is going to be a very huge minstake, so if i am not mistaken, Miss are you taken ? 
      9. you are looking delicioUS, sumptuoUS and fabuloUS and if you are not pompoUS you and i can be US!
      10. you are making me creative and i won't really mind if we both get creative you know? Make adam and create eve
      11. anyways you look absolutely beguiling and so i had to quicken my pace to come fill this space to closely see your beautiful face
      12. Your name has to be Gold cos you will still look this Good when you get old
      13. it's you i crave do you shake? i think it should be asake cos you are work of art 
      14. i am GAY cos i am  G - Greatly A - Attracted to Y - You 
      15. i don't like hide nd seek coz a girl like you is hard to find 
      16. Solomon had 700 wives and 300 concubines cos he never met a masterpeice like you 
      17. are you from Tennessee cos you are the only 10 i see 
      18. your name should be delilah coz it is bcoz of girlz like you sam-sin
      19. i can drive you crazy .... well you may need a license to ride a car but you don't need one to ride me 
      20. you can call me babe and also sit on my face do you shake
      21. you have a very banging body so i hope you don't belong to anybody
      22. Talking to you is already a win 🏆✨ So, can I take this further, my Queen? 👑💖 Can I have your number? 
      23. Honestly, God is my witness 🙏✨ I usually mind my business 🧍‍♂🛑 But girls like you? Yeah, that’s my weakness 😩💘🔥 
      24. You have a very beautiful smile😍✨ but i can make you smile better😏💫 so later join bodies like bread and butter 🥖🧈❤ so let's take this further 🔥😉 so can i have your number 📲 Áwélewá 💌
      25. I’m actually from the UK 🇬🇧 But right now, all I want is U K 😘💖
      26. Is your name Cynthia…? 🤔 ’Cause why is it that among all girls, you look prettier? 😍💖✨
      27. You look stunning no doubt 😍  So I had to come check you out 👀🔥 Can’t help but admire the vibe you’re giving off 💫✨
      28. 💻 I’m a computer programmer… and I know how to code 😉  So should I teach you a bit of HTML? 😏  H – How  T – To  M – Make  L – Love 💋💻❤‍🔥  Let’s just say… I’m fluent in both programming and passion 😈🔥💘
      29. 😌 Honestly, no teasing  👀 I’ve been noticing you  🙋🏽‍♂ So I had to come say hi  😍 'Cause you’re absolutely ravishing — that’s why 💫💖  🔥 You’ve got that kind of fine that’s hard to scroll past 👣✨
      30. bby girl you are sweet like loli-pop and i am single -- a lonely Pop so whats up 
      31. 💔 They broke my heart into pieces... but now that I’ve met you 🥹💕  I finally know what peace is 🕊❤‍🔥
      32.✨ Everything about you is perfect 😍  Have you seen your skin..? 😩🤎  'Cause you are a prize to win 🎯🏆
      33. "Walked past you and noticed you looked nice, so i had to turn back twice
      


      OUTPUT:
      Only the pickup line. Nothing else.
      `
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
