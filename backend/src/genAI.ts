import OpenAI from "openai";

const PROMPT_PREFIX = `Write an article on the topic: `;

async function gpt(apiKey:string, text: string) {
	const openai = new OpenAI({ apiKey: apiKey });
	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: `${PROMPT_PREFIX} ${text}` }],
		model: "gpt-3.5-turbo",
	});
	return chatCompletion.choices[0].message.content;
}

export async function generateArticle(text: string, model = "gpt", apiKey: string) {
	if (model === "gpt") {
		const response = await gpt(apiKey, text);
		return response;
	} else if (model === "gemini") {
        // TODO: GEMINI Implementation goes here
	}
}
