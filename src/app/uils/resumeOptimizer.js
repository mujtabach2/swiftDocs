import supabase from "../config/supabaseClient";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function optimizeResume(existingResume, jobListing) {
  try {
    // Call the Supabase function
    const { data, error } = await supabase.functions.invoke("set-document", {
      body: JSON.stringify({ existingResume, jobListing }),
      method: "POST",
    });

    if (error) throw error;

    // The optimized resume is returned as HTML
    const optimizedResumeHTML = data.optimizedResume;

    // Convert HTML to PDF (this needs to be implemented)
    const pdfBlob = await htmlToPDF(optimizedResumeHTML);

    return {
      html: optimizedResumeHTML,
      optimized: pdfBlob,
    };
  } catch (error) {
    console.error("Error optimizing resume:", error.message);
    throw error;
  }
}

// This function needs to be implemented
async function htmlToPDF(html) {
  try {
    // Create a temporary container for the HTML content
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    // Use html2canvas to render the HTML content
    const canvas = await html2canvas(container);

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Generate PDF as Blob
    const pdfBlob = pdf.output("blob");

    // Clean up: remove the temporary container
    document.body.removeChild(container);

    return pdfBlob;
  } catch (error) {
    console.error("Error converting HTML to PDF:", error);
    throw error;
  }
}
