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
      "create multiple unique versions—at least 50 different ways of expressing it—each with a distinct tone, style, or perspective. Avoid clichés unless you can give them a surprising twist. The quotes should feel fresh, insightful, and something that feels like it could be shared widely, but not like something already existing. Include variations that are short, poetic, motivational, humorous, funny, memes, or philosophical and so on. Output clearly labeled so I can see each version separately. You can also add touches of pidgin once in a while i mean like sweet nigerian pidgin...";
  } else if (type === "rhyme") {
    prompt =
      "Create one short, catchy, and fully original rhyming piece—either a 2-4 line poem or couplet. Make it playful, cheeky, and very Naija/TikTok in vibe, like it could trend in DMs or reels. Use clever wordplay, AM-to-PM energy, slang, or Nigerian expressions naturally. Avoid overused lines, generic rhymes, or predictable phrases. Bonus points for rhythm that hits hard and makes it memorable.";
  } else if (type === "pickup") {
    prompt =
      "Create one fresh, funny, clever, and flirty Naija/TikTok-style pickup line. Make it playful, cheeky, full of wordplay, AM-to-PM energy, or and what makes a pick up line very cheezy is when the last words in every line rhymes let take this example: i am single, ready to mingle, Madam twinkle will you be my jingle,  ...............or........... baby girl even though i am not phillips i am definitely feeling your lips, ............or........ 'this isn't a pickup line but i am just trying to drop a line ..... : this extension is causing tension and now it has to go on extintion' ...............or.............. i had to summon courage cos you look really good and quite intimidating so let us leave 'intimi' and focus on 'dating' .............or........... I am ready to get Married cos this Nigga Is eager To make your belly bigger ...........or......... Anyways i like the fact that you are very pretty and i will like to make you my sweetie 😏💕 ............or.......... idk which is hotter you or the sun cos my heart is melting ............or........... you look absolutely beautiful and to let you go is going to be a very huge minstake, so if i am not mistaken, Miss are you taken ? .....or........ you are looking delicioUS, sumptuoUS and fabuloUS and if you are not pompoUS you and i can be US! ......or.......... you are making me creative and i won't really mind if we both get creative you know? Make adam and create eve .....or...... anyways you look absolutely beguiling and so i had to quicken my pace to come fill this space to closely see your beautiful face .....or........ Your name has to be Gold cos you will still look this Good when you get old ......or......... it's you i crave do you shake? i think it should be asake cos you are work of art ......or........ i am GAY cos i am  G - Greatly A - Attracted to Y - You .....or..... i don't like hide nd seek coz a girl like you is hard to find ......or...... Solomon had 700 wives and 300 concubines cos he never met a masterpeice like you .....or...... are you from Tennessee cos you are the only 10 i see .....or...... your name should be delilah coz it is bcoz of girlz like you sam-sin .....or....... i can drive you crazy .... well you may need a license to ride a car but you don't need one to ride me .....or...... you can call me babe and also sit on my face do you shake ....or..... you have a very banging body so i hope you don't belong to anybody ....or..... Talking to you is already a win 🏆✨ So, can I take this further, my Queen? 👑💖 Can I have your number? 📱🔥 ......or...... Honestly, God is my witness 🙏✨ I usually mind my business 🧍‍♂🛑 But girls like you? Yeah, that’s my weakness 😩💘🔥 .......or.......You have a very beautiful smile😍✨ but i can make you smile better😏💫 so later join bodies like bread and butter 🥖🧈❤ so let's take this further 🔥😉 so can i have your number 📲 Áwélewá 💌 ......or....... I’m actually from the UK 🇬🇧 But right now, all I want is U K 😘💖 .....or....... Is your name Cynthia…? 🤔 ’Cause why is it that among all girls, you look prettier? 😍💖✨ ......or...... You look stunning no doubt 😍  So I had to come check you out 👀🔥 Can’t help but admire the vibe you’re giving off 💫✨ ....or.... 💻 I’m a computer programmer… and I know how to code 😉  So should I teach you a bit of HTML? 😏  H – How  T – To  M – Make  L – Love 💋💻❤‍🔥  Let’s just say… I’m fluent in both programming and passion 😈🔥💘 ......or...... 😌 Honestly, no teasing  👀 I’ve been noticing you  🙋🏽‍♂ So I had to come say hi  😍 'Cause you’re absolutely ravishing — that’s why 💫💖  🔥 You’ve got that kind of fine that’s hard to scroll past 👣✨ ....or....... bby girl you are sweet like loli-pop and i am single -- a lonely Pop so whats up .....or....... 💔 They broke my heart into pieces... but now that I’ve met you 🥹💕  I finally know what peace is 🕊❤‍🔥 .....or...... ✨ Everything about you is perfect 😍  Have you seen your skin..? 😩🤎  'Cause you are a prize to win 🎯🏆 ....or...... so from all my example you should have an idea of how i want the pick up lines to be generated ... emphasis on lines rhymes and creativity .You can sprinkle in Nigerian slang, casual expressions, or pidgin, but DO NOT focus on food or repeat the same examples. It should feel original, bold, and surprising—something that could make someone laugh, blush, or notice you instantly. Avoid clichés, recycled lines, or predictable patterns. and i different ways not one boring pattern and don't repeat lines";
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
