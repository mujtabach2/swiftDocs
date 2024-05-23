import express from "express";
import OpenAi from "../open-ai/index";
import Quote from "../../classes/qoute";
import BusinessProposal from "../../classes/businessProposalClass";
import CoverLetter from "../../classes/coverLetterClass";
import ContractAgreement from "../../classes/contractAgreementClass";
import Invoice from "../../classes/invoiceClass";

const app = express();
app.use(express.json());

app.post("/set-document", async (req, res) => {
  try {
    const details = req.body;

    // Extract the document type from the request body
    const documentType = details.documentType;

    // Create a new instance of the appropriate class based on the document type
    let documentInstance;
    switch (documentType) {
      case "quote":
        documentInstance = new Quote(details);
        break;
      case "businessProposal":
        documentInstance = new BusinessProposal(details);
        break;
      case "coverLetter":
        documentInstance = new CoverLetter(details);
        break;
      case "contractAgreement":
        documentInstance = new ContractAgreement(details);
        break;
      case "invoice":
        documentInstance = new Invoice(details);
        break;
      default:
        throw new Error("Invalid document type");
    }
    // Use OpenAI with the document instance
    const openAi = new OpenAi(details, documentInstance.latex, documentType);
    const result = await openAi.run();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
