const API_BASE_URL = 'http://localhost:3000'; // Adjust this to your backend URL

export interface ResumeOptimizationInput {
  existingResume: string;
  jobListing: string;
}

export const optimizeResume = async (input: ResumeOptimizationInput): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/optimize-resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to optimize resume');
  }

  const data = await response.json();
  return data.optimizedResume;
};

export const convertToPDF = async (latexContent: string): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/convert/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ latexContent }),
  });

  if (!response.ok) {
    throw new Error('Failed to convert to PDF');
  }

  return await response.blob();
};

export const convertToHTML = async (latexContent: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/convert/html`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ latexContent }),
  });

  if (!response.ok) {
    throw new Error('Failed to convert to HTML');
  }

  return await response.text();
};