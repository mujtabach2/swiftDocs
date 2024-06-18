import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const app = express();
const port = process.env.PORT || 3000;

const execAsync = promisify(exec);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to convert LaTeX to PDF
async function latexToPDF(inputFile: string, outputFile: string): Promise<void> {
    const command = `pdflatex -interaction=nonstopmode -output-directory=${path.dirname(outputFile)} ${inputFile}`;
    await execAsync(command);
}

// Function to convert LaTeX to HTML
async function latexToHTML(inputFile: string, outputFile: string): Promise<void> {
    const command = `pandoc -s ${inputFile} -o ${outputFile}`;
    await execAsync(command);
}

// POST endpoint for LaTeX to PDF conversion
app.post('/convert/pdf', async (req: Request, res: Response) => {
    const { latexContent } = req.body;
    if (!latexContent) {
        return res.status(400).json({ error: 'LaTeX content is required.' });
    }

    const inputFile = path.join(__dirname, 'input.tex');
    const outputFile = path.join(__dirname, 'output.pdf');

    // Write LaTeX content to a file
    fs.writeFileSync(inputFile, latexContent);

    try {
        await latexToPDF(inputFile, outputFile);
        res.download(outputFile, 'output.pdf', () => {
            // Clean up temporary files
            fs.unlinkSync(inputFile);
            fs.unlinkSync(outputFile);
        });
    } catch (error) {
        console.error('PDF conversion failed:', error);
        res.status(500).json({ error: 'PDF conversion failed.' });
    }
});

// POST endpoint for LaTeX to HTML conversion
app.post('/convert/html', async (req: Request, res: Response) => {
    const { latexContent } = req.body;
    if (!latexContent) {
        return res.status(400).json({ error: 'LaTeX content is required.' });
    }

    const inputFile = path.join(__dirname, 'input.tex');
    const outputFile = path.join(__dirname, 'output.html');

    // Write LaTeX content to a file
    fs.writeFileSync(inputFile, latexContent);

    try {
        await latexToHTML(inputFile, outputFile);
        res.download(outputFile, 'output.html', () => {
            // Clean up temporary files
            fs.unlinkSync(inputFile);
            fs.unlinkSync(outputFile);
        });
    } catch (error) {
        console.error('HTML conversion failed:', error);
        res.status(500).json({ error: 'HTML conversion failed.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
