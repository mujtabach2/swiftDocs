import express from "express";
import ResumeOptimizer from "../open-ai";
import {latexToHTML} from "../latex-converter";

const app = express();
app.use(express.json());

const resumeOptimizer = new ResumeOptimizer();

app.post("/optimize-resume", async (req, res) => {
  try {
    const { existingResume, jobListing } = req.body;

    if (!existingResume || !jobListing) {
      return res.status(400).json({ error: "Missing existingResume or jobListing in request body" });
    }

    const optimizedResume = await resumeOptimizer.optimizeResume({
      existingResume,
      jobListing
    });
    // convert the optimized resume to pdf
    const optimizedResumePDF = await latexToHTML(optimizedResume, "optimizedResume.pdf");

    res.json({ optimizedResume });
  } catch (error) {
    console.error("Error optimizing resume:", error);
    res.status(500).json({ error: "An error occurred while optimizing the resume" });
  }
});

export default app;