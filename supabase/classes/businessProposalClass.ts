class BusinessProposal {
  proposalTitle: string;
  clientName: string;
  clientCompany: string;
  yourName: string;
  yourCompany: string;
  yourEmail: string;
  date: string;
  milestones: string;
  resources: string;
  budget: string;
  latex: string;

  constructor(detail: Array<string>) {
    this.proposalTitle = detail[0];
    this.clientName = detail[1];
    this.clientCompany = detail[2];
    this.yourName = detail[3];
    this.yourCompany = detail[4];
    this.yourEmail = detail[5];
    this.date = detail[6];
    this.milestones = detail[7];
    this.resources = detail[8];
    this.budget = detail[9];

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
    \\fancyhead[R]{Business Proposal}
    \\fancyfoot[L]{\\small Your Company Name}
    \\fancyfoot[C]{\\small \\thepage\\ of \\pageref{LastPage}}
    \\fancyfoot[R]{\\small \\href{mailto:your.email@example.com}{your.email@example.com}}
    
    \\begin{document}
    
    % Title Page
    \\begin{titlepage}
        \\centering
        \\vspace*{4cm}
        {\\Huge\\bfseries Business Proposal\\par}
        \\vspace{1.5cm}
        {\\LARGE\\bfseries ${this.proposalTitle}\\par}
        \\vspace{1.5cm}
        {\\large\\bfseries Prepared for: \\par}
        {\\large ${this.clientName}\\par}
        {\\large ${this.clientCompany}\\par}
        \\vfill
        {\\large\\bfseries Prepared by: \\par}
        {\\large ${this.yourName}\\par}
        {\\large ${this.yourCompany}\\par}
        {\\large ${this.yourEmail}\\par}
        {\\large ${this.date}\\par}
        \\vfill
        \\includegraphics[width=4cm]{your_logo.png}
    \\end{titlepage}
    
    % Table of Contents
    \\tableofcontents
    \\newpage
    
    % Executive Summary
    \\section{Executive Summary}
    \\noindent
    [Provide a brief summary of the proposal, highlighting the key points and objectives.]
    
    % Company Overview
    \\section{Company Overview}
    \\noindent
    [Provide an overview of your company, including its mission, vision, and key achievements.]
    
    % Problem Statement
    \\section{Problem Statement}
    \\noindent
    [Describe the problem or opportunity that your proposal addresses.]
    
    % Proposed Solution
    \\section{Proposed Solution}
    \\noindent
    [Detail your proposed solution, including how it addresses the problem or opportunity.]
    
    % Implementation Plan
    \\section{Implementation Plan}
    \\noindent
    \\subsection{Timeline}
    [Provide a timeline for the implementation of your proposed solution.]
    \\noindent
    \\begin{tabular}{|p{0.3\\textwidth}|p{0.7\\textwidth}|}
        \\hline
        \\textbf{Milestone} & \\textbf{Description} \\\\
        \\hline
        ${this.milestones} \\\\
        \\hline
    \\end{tabular}
    
    \\subsection{Resources}
    [Detail the resources required for the implementation, including personnel, equipment, and budget.]
    
    % Budget
    \\section{Budget}
    \\noindent
    [Provide a detailed budget for the proposed solution.]
    \\noindent
    \\begin{tabular}{|p{0.5\\textwidth}|p{0.5\\textwidth}|}
        \\hline
        \\textbf{Item} & \\textbf{Cost} \\\\
        \\hline
        ${this.budget} \\\\
        \\hline
    \\end{tabular}
    
    % Conclusion
    \\section{Conclusion}
    \\noindent
    [Summarize the key points of the proposal and reiterate the benefits of your proposed solution. Express your eagerness to discuss the proposal further.]
    
    % Contact Information
    \\section{Contact Information}
    \\noindent
    \\begin{tabular}{@{}l@{}}
        ${this.yourName} \\\\
        Your Position \\\\
        ${this.yourCompany} \\\\
        Your Address \\\\
        City, State, ZIP Code \\\\
        Phone: (123) 456-7890 \\\\
        Email: ${this.yourEmail} \\\\
        Website: \\href{https://www.yourwebsite.com}{www.yourwebsite.com} \\\\
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

  generateBusinessProposalHtml() {
    // to be implemented
  }
}

export default BusinessProposal;
