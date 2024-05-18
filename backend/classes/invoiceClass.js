class Invoice {
  constructor(clientName, invoiceDate, dueDate, items) {
    this.clientName = clientName;
    this.invoiceDate = invoiceDate;
    this.dueDate = dueDate;
    this.items = items;
  }

  latex = `
    \\documentclass[a4paper,10pt]{article}
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
    \\fancyhead[R]{Invoice}
    \\fancyfoot[L]{\\small Your Company Name}
    \\fancyfoot[C]{\\small \\thepage\\ of \\pageref{LastPage}}
    \\fancyfoot[R]{\\small \\href{mailto:your.email@example.com}{your.email@example.com}}
    
    \\begin{document}
    
    % Invoice title and date
    \\begin{center}
        \\LARGE \\textbf{Invoice}
    \\end{center}
    
    \\vspace{0.5cm}
    
    % Sender (Your Company) Information
    \\noindent
    \\begin{tabular}{@{}p{0.5\\textwidth}@{}}
        \\textbf{From:} \\\\
        Your Company Name \\\\
        Your Company Address \\\\
        City, State, ZIP Code \\\\
        Phone: (123) 456-7890 \\\\
        Email: your.email@example.com \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Recipient Information
    \\noindent
    \\begin{tabular}{@{}p{0.5\\textwidth}@{}}
        \\textbf{To:} \\\\
        ${this.clientName} \\\\
        Client's Company \\\\
        Client's Address \\\\
        City, State, ZIP Code \\\\
        Phone: (098) 765-4321 \\\\
        Email: client.email@example.com \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Invoice Information
    \\noindent
    \\begin{tabular}{@{}p{0.5\\textwidth}@{}p{0.5\\textwidth}@{}}
        \\textbf{Invoice Number:} & INV-001 \\\\
        \\textbf{Invoice Date:} & ${this.invoiceDate} \\\\
        \\textbf{Due Date:} & ${this.dueDate} \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Table with Itemized List of Services/Products
    \\begin{tabular}{|p{0.4\\textwidth}|p{0.15\\textwidth}|p{0.15\\textwidth}|p{0.2\\textwidth}|}
        \\hline
        \\textbf{Description} & \\textbf{Quantity} & \\textbf{Unit Price} & \\textbf{Total} \\\\
        \\hline
        ${this.items.map((item) => `${item.description} & ${item.quantity} & \$${item.price.toFixed(2)} & \$${(item.quantity * item.price).toFixed(2)} \\\\ \\hline`).join("\n")}
        \\textbf{Subtotal} & & & \$${this.getTotalAmount().toFixed(2)} \\\\
        \\hline
        \\textbf{Tax (10\\%)} & & & \$${(this.getTotalAmount() * 0.1).toFixed(2)} \\\\
        \\hline
        \\textbf{Total} & & & \$${(this.getTotalAmount() * 1.1).toFixed(2)} \\\\
        \\hline
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Payment Instructions
    \\noindent
    \\textbf{Payment Instructions:} \\\\
    Please make the payment to the following account: \\\\
    Bank: Your Bank Name \\\\
    Account Number: 123456789 \\\\
    Routing Number: 987654321 \\\\
    Or via PayPal to: paypal@example.com
    
    \\vspace{1cm}
    
    % Footer with Additional Notes
    \\noindent
    \\textbf{Additional Notes:} \\\\
    Thank you for your business! If you have any questions about this invoice, please contact us at your.email@example.com.
    
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
    
    \\end{document}
    `;

  getTotalAmount() {
    // Calculate total amount based on items
    let total = 0;
    for (const item of this.items) {
      total += item.quantity * item.price;
    }
    return total;
  }

  generateInvoiceHtml() {
    // to be implemented
  }
}
