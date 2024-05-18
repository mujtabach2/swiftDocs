const { ChatOpenAI } = require("@langchain/openai");
const {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} = require("@langchain/core/prompts");
const { LLMChain } = require("langchain/chains");
const { OPENAI_API_KEY } = require("./config");

class OpenAi {
  constructor(details, prompt, documentType) {
    this.details = details;
    this.prompt = prompt;
    this.documentType = documentType;
  }

  async run() {
    const model = new ChatOpenAI({
      temperature: 0.9,
      modelName: "gpt-3.5-turbo",
      apiKey: OPENAI_API_KEY,
    });

    simple = `You are supposed to take the template below and fill in the details and make it very professional. 
    Only give me latex code. The document type is a ${this.documentType}. 
    The latex code should be in the following format:`;

    const systemMessage = simple + prompt;

    const prompt = this.details;
    const reportPrompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate("{text}"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);
    const chain = new LLMChain({
      prompt: reportPrompt,
      llm: model,
    });
    const res = chain.call({
      text: systemMessage,
      input: prompt,
    });

    console.log(res);

    return res;
  }
}

module.exports = OpenAi;
