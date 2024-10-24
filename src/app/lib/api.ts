const API_BASE_URL = 'https://latex-compiler-1067457245892.us-central1.run.app'; // Adjust this to your backend URL

export interface ResumeOptimizationInput {
  existingResume: string | File;
  jobListing: string;
}

export const optimizeResume = async (input: ResumeOptimizationInput): Promise<string> => {
  try {
    let existingResume = input.existingResume;

    // Convert File to base64 if necessary
    if (existingResume instanceof File) {
      existingResume = await fileToBase64(existingResume);
    }

    // Sanitize input to limit data exposure
    const sanitizedInput = {
      jobListing: input.jobListing, // Ensure jobListing is safe
      existingResume, // Ensure existingResume is safe (base64)
    };

    const response = await fetch(`${API_BASE_URL}/optimize-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedInput), // Use sanitized input
    });

    if (!response.ok) {
      let errorMessage = `Failed to optimize resume: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = `Failed to optimize resume: ${errorData.message}`;
        }
      } catch (jsonError) {
        // Response is not JSON
        console.error('Non-JSON error response:', await response.text());
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(data); 
    return data.optimizedResume;
  } catch (error) {
    console.error('Error in optimizeResume:', error);
    throw new Error('An error occurred while optimizing the resume.'); // More generic error message
  }
};

// Helper function to convert File to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export const convertToPDF = async (latexContent: string, userId: string): Promise<{ pdfUrl: string; defaultLatex: string }> => {
  console.log('Sending LaTeX content for user:', userId, latexContent);
  try {
    const response = await fetch(`${API_BASE_URL}/compile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latexContent, userId }),
    });

    if (!response.ok) {
      let errorMessage = `Failed to convert to PDF: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = `Failed to convert to PDF: ${errorData.message}`;
        }
      } catch (jsonError) {
        // Response is not JSON
        console.error('Non-JSON error response:', await response.text());
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in convertToPDF:', error);
    throw new Error('An error occurred while converting to PDF.'); // More generic error message
  }
};
