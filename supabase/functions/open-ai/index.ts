import { ChatOpenAI } from "@langchain/openai";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
const { OPENAI_API_KEY } = require("../config/openApi");

interface ResumeOptimizationInput {
  existingResume: string;
  jobListing: string;
}

class ResumeOptimizer {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      temperature: 0.7, // Slightly reduced for more consistent output
      modelName: "gpt-3.5-turbo",
      apiKey: OPENAI_API_KEY,
    });
  }

  async optimizeResume(input: ResumeOptimizationInput): Promise<string> {
    const systemPrompt = `
      You are an expert resume optimizer. Your task is to tailor the given resume to perfectly match the provided job listing.
      Follow these guidelines:
      1. Analyze the job listing for key skills, experiences, and qualifications.
      2. Rewrite and restructure the resume to highlight relevant experiences and skills that match the job requirements.
      3. Use industry-specific keywords from the job listing in the resume.
      4. Quantify achievements where possible.
      5. Ensure the resume is concise, professional, and impactful.
      6. Output the result in LaTeX format for easy formatting.
    `;

    const resumePrompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(systemPrompt),
      HumanMessagePromptTemplate.fromTemplate("Existing Resume:\n{existingResume}\n\nJob Listing:\n{jobListing}\n\nOptimized Resume in LaTeX format:"),
    ]);

    const chain = new LLMChain({
      prompt: resumePrompt,
      llm: this.model,
    });

    const result = await chain.call(input);

    return result.text;
  }
}

export default ResumeOptimizer;