import OpenAI from "openai";
import { PROMPT_PREFIX_BLOG_GENERATION, PROMPT_PREFIX_CHAT_COMPLETION } from "./constants";

async function gpt(apiKey:string, text: string) {
	const openai = new OpenAI({ apiKey: apiKey });
	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: `${PROMPT_PREFIX_BLOG_GENERATION} ${text}` }],
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
interface ChatCompletionMessageParam {
	role: 'system' | 'user' | 'assistant';
	content: string;
	name?: string;
}
  
export async function generateChatResponse(apiKey: string, blogContent: string, userQuery: string, chatHistory: ChatCompletionMessageParam[], blogTitle: string) {
	const openai = new OpenAI({ apiKey: apiKey });
  
	const messages: ChatCompletionMessageParam[] = [
	  { role: "system", content: PROMPT_PREFIX_CHAT_COMPLETION },
	  {
		role: "user",
		content: `Title: ${blogTitle}\n\nBlog Content: "${blogContent}"\n\nPrevious Chat History:\n${chatHistory.map((message: ChatCompletionMessageParam) => `${message.role.toUpperCase()}: ${message.content}`).join("\n")}\n\nCurrent Question: ${userQuery}`,
		name: "User"
	  },
	];
  
	const response = await openai.chat.completions.create({
	  model: "gpt-3.5-turbo",
	  messages,
	});
  
	return response.choices[0].message?.content || "Sorry, I couldn't generate a response.";
}
