import { ChatOpenAI } from "@langchain/openai";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
const { OPENAI_API_KEY } = require("../config/openApi");

interface OpenAiDetails {
  [key: string]: any;
}

class OpenAi {
  private details: OpenAiDetails;
  private prompt: string;
  private documentType: string;
  constructor(details: OpenAiDetails, prompt: string, documentType: string) {
    this.details = details;
    this.prompt = prompt;
    this.documentType = documentType;
  }

  async run(): Promise<any> {
    const model = new ChatOpenAI({
      temperature: 0.9,
      modelName: "gpt-3.5-turbo",
      apiKey: OPENAI_API_KEY,
    });

    const simple = `You are supposed to take the template below and fill in the details and make it very professional. 
    Only give me latex code. The document type is a ${this.documentType}. 
    The latex code should be in the following format:`;

    const systemMessage = simple + this.prompt;

    const reportPrompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate("{text}"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const chain = new LLMChain({
      prompt: reportPrompt,
      llm: model,
    });

    const res = await chain.call({
      text: systemMessage,
      input: this.details,
    });

    console.log(res);

    return res;
  }
}

export default OpenAi;
