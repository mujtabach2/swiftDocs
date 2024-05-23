class ContractAgreement {
  clientName: string;
  yourCompanyName: string;
  date: string;
  services: string;
  term: string;
  compensation: string;
  confidentiality: string;
  termination: string;
  governingLaw: string;
  latex: string;

  constructor(detail: Array<string>) {
    this.clientName = detail[0];
    this.yourCompanyName = detail[1];
    this.date = detail[2];
    this.services = detail[3];
    this.term = detail[4];
    this.compensation = detail[5];
    this.confidentiality = detail[6];
    this.termination = detail[7];
    this.governingLaw = detail[8];

    this.latex = `\\documentclass[a4paper,12pt]{article}
    \\usepackage[left=2.5cm,right=2.5cm,top=2.5cm,bottom=2.5cm]{geometry}
    \\usepackage{graphicx}
    \\usepackage{amsmath}
    \\usepackage{parskip}
    \\usepackage{hyperref}
    \\usepackage{fancyhdr}
    
    % Define the header and footer
    \\pagestyle{fancy}
    \\fancyhf{}
    \\fancyhead[L]{\\includegraphics[width=3cm]{your_logo.png}}
    \\fancyhead[R]{Contract Agreement}
    \\fancyfoot[L]{\\small Your Company Name}
    \\fancyfoot[C]{\\small \\thepage\\ of \\pageref{LastPage}}
    \\fancyfoot[R]{\\small \\href{mailto:your.email@example.com}{your.email@example.com}}
    
    \\begin{document}
    
    % Title Page
    \\begin{titlepage}
        \\centering
        \\vspace*{4cm}
        {\\Huge\\bfseries Contract Agreement\\par}
        \\vspace{1.5cm}
        {\\LARGE\\bfseries Between\\par}
        \\vspace{1.5cm}
        {\\large\\bfseries ${this.clientName}\\par}
        \\vspace{0.5cm}
        {\\large and\\par}
        \\vspace{0.5cm}
        {\\large\\bfseries ${this.yourCompanyName}\\par}
        \\vfill
        {\\large\\bfseries Date: \\par}
        {\\large ${this.date}\\par}
        \\vfill
        \\includegraphics[width=4cm]{your_logo.png}
    \\end{titlepage}
    
    % Contract Agreement Text
    \\section{Introduction}
    This Contract Agreement (the "Agreement") is made and entered into as of ${this.date} (the "Effective Date"), by and between ${this.clientName} ("Client"), and ${this.yourCompanyName} ("Service Provider").
    
    \\section{Services}
    \\subsection{Description of Services}
    Service Provider agrees to provide the following services to Client (the "Services"):
    \\begin{itemize}
        ${this.services}
    \\end{itemize}
    
    \\subsection{Scope of Services}
    The scope of the Services will include, but not be limited to, the tasks and deliverables listed above. Any changes to the scope of Services must be agreed upon in writing by both parties.
    
    \\section{Term}
    This Agreement will commence on the Effective Date and will continue in effect until ${this.term}, unless terminated earlier in accordance with the provisions of this Agreement.
    
    \\section{Compensation}
    \\subsection{Fees}
    Client agrees to pay Service Provider ${this.compensation} for the Services provided under this Agreement. Payment will be due [Payment Terms, e.g., upon receipt of invoice, within 30 days].
    
    \\subsection{Expenses}
    Client agrees to reimburse Service Provider for any reasonable and necessary expenses incurred in connection with the performance of the Services, provided that such expenses have been approved in advance by Client.
    
    \\section{Confidentiality}
    \\subsection{Confidential Information}
    Each party agrees to maintain the confidentiality of any proprietary or confidential information disclosed by the other party in connection with this Agreement ("Confidential Information"). Confidential Information shall not include information that is publicly known or becomes publicly known through no fault of the receiving party.
    
    \\subsection{Use of Confidential Information}
    The receiving party agrees to use the Confidential Information solely for the purpose of performing its obligations under this Agreement and shall not disclose the Confidential Information to any third party without the prior written consent of the disclosing party.
    
    \\section{Termination}
    \\subsection{Termination for Convenience}
    Either party may terminate this Agreement for any reason upon [Number of Days] days' written notice to the other party.
    
    \\subsection{Termination for Cause}
    Either party may terminate this Agreement immediately upon written notice if the other party breaches any material provision of this Agreement and fails to cure such breach within [Number of Days] days after receiving written notice of the breach.
    
    \\section{Governing Law}
    This Agreement shall be governed by and construed in accordance with the laws of the State of ${this.governingLaw}, without regard to its conflict of law principles.
    
    \\section{Entire Agreement}
    This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes    all prior and contemporaneous agreements, representations, and understandings of the parties. This Agreement may be amended only by a written agreement signed by both parties.

    \\vfill

    \\noindent
    \\begin{tabular}{p{0.45\\textwidth}p{0.45\\textwidth}}
        \\textbf{Client} & \\textbf{Service Provider} \\\\
        \\\\
        \\rule{0.4\\textwidth}{0.4pt} & \\rule{0.4\\textwidth}{0.4pt} \\\\
        Signature & Signature \\\\
        \\\\
        \\rule{0.4\\textwidth}{0.4pt} & \\rule{0.4\\textwidth}{0.4pt} \\\\
        Name & Name \\\\
        \\\\
        \\rule{0.4\\textwidth}{0.4pt} & \\rule{0.4\\textwidth}{0.4pt} \\\\
        Title & Title \\\\
        \\\\
        Date: \\rule{0.3\\textwidth}{0.4pt} & Date: \\rule{0.3\\textwidth}{0.4pt} \\\\
    \\end{tabular}

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
  generateContractAgreementHtml() {
    // to be implemented
  }
}

export default ContractAgreement;
