class Quote {
  senderInfo: string;
  recipientInfo: string;
  quoteNumber: string;
  quoteDate: string;
  validityDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  latex: string;

  constructor(detail: Array<string>) {
    this.senderInfo = detail[0];
    this.recipientInfo = detail[1];
    this.quoteNumber = detail[2];
    this.quoteDate = detail[3];
    this.validityDate = detail[4];
    this.items = JSON.parse(detail[5]);

    this.latex = `\\documentclass[a4paper,10pt]{article}
    \\usepackage[left=2cm,right=2cm,top=2cm,bottom=2cm]{geometry}
    \\usepackage{graphicx}
    \\usepackage{amsmath}
    \\usepackage{array}
    \\usepackage{fancyhdr}
    \\usepackage{lastpage}
    \\usepackage{hyperref}
    
    % Define the header and footer
    \\pagestyle{fancy}
    \\fancyhf{}
    \\fancyhead[L]{\\includegraphics[width=3cm]{your_logo.png}}
    \\fancyhead[R]{Cover Letter}
    \\fancyfoot[L]{\\small Your Company Name}
    \\fancyfoot[C]{\\small \\thepage\\ of \\pageref{LastPage}}
    \\fancyfoot[R]{\\small \\href{mailto:your.email@example.com}{your.email@example.com}}
    
    \\begin{document}
    
    % Cover Letter title and date
    \\begin{center}
        \\LARGE \\textbf{Cover Letter}
    \\end{center}
    
    \\vspace{0.5cm}
    
    % Sender (Your Company) Information
    \\noindent
    \\begin{tabular}{@{}p{0.5\\textwidth}@{}}
        \\textbf{From:} \\\\
        ${this.senderInfo} \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Recipient Information
    \\noindent
    \\begin{tabular}{@{}p{0.5\\textwidth}@{}}
        \\textbf{To:} \\\\
        ${this.recipientInfo} \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Quote Information
    \\noindent
    \\begin{tabular}{@{}p{0.5\\textwidth}@{}p{0.5\\textwidth}@{}}
        \\textbf{Quote Number:} & ${this.quoteNumber} \\\\
        \\textbf{Quote Date:} & ${this.quoteDate} \\\\
        \\textbf{Valid Until:} & ${this.validityDate} \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Table with Itemized List of Services/Products
    \\begin{tabular}{|p{0.4\\textwidth}|p{0.15\\textwidth}|p{0.15\\textwidth}|p{0.2\\textwidth}|}
        \\hline
        \\textbf{Description} & \\textbf{Quantity} & \\textbf{Unit Price} & \\textbf{Total} \\\\
        \\hline
        ${this.items.map((item) => `${item.description} & ${item.quantity} & ${item.unitPrice} & ${item.total} \\\\ \\hline`).join("\n")}
        \\multicolumn{3}{|l|}{\\textbf{Subtotal}} & ${this.getTotalAmount()} \\\\
        \\hline
        \\multicolumn{3}{|l|}{\\textbf{Tax (10\\%)}} & \\\\
        \\hline
        \\multicolumn{3}{|l|}{\\textbf{Total}} & \\\\
        \\hline
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Terms and Conditions
    \\noindent
    \\textbf{Terms and Conditions:} \\\\
    Please note that this cover letter is provided for informational purposes only. Any contractual agreements should be detailed in a separate document.
    
    \\vspace{1cm}
    
    % Footer with Additional Notes
    \\noindent
    \\textbf{Additional Notes:} \\\\
    Thank you for considering our services! If you have any questions or need further information, please contact us at your.email@example.com.
    
    \\vfill
    
    \\noindent
    \\begin{center}
        \\rule{0.8\\textwidth}{0.4pt} \\\\
        \\small Your Company Name \\\\
        Your Company Address \\\\
        City, State, ZIP Code \\\\
        Phone: (123) 456-7890 \\\\
        Email: your.email@example.com \\\\
        Website: \\href{https://www.yourwebsite.com}{www.yourwebsite.com}
    \\end{center}
    
    \\end{document}`;
  }

  getTotalAmount() {
    return this.items.reduce((total, item) => total + item.total, 0);
  }

  generateQouteHtml() {
    // to be implemented
  }
}

export default Quote;
