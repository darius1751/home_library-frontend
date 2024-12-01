import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
});

const responseGenerate = async (title: string, author: string) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {"role": "system", "content": `You are a assistant that provides book previews given book titles and authors that are no more than a paragraph long. You recognize the language of the ${title} and you return the summary in that language. You first look for the summary in goodreads and then in bookstores that sell the book`},
        {"role": "user", "content": `What is ${title} by ${author} about?`}
      ]
    });
    console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content;
}

export default responseGenerate