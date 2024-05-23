class CoverLetter {
  senderName: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderZIP: string;
  senderPhone: string;
  senderEmail: string;
  recipientName: string;
  recipientPosition: string;
  companyName: string;
  companyAddress1: string;
  companyAddress2: string;
  city: string;
  state: string;
  zip: string;
  jobTitle: string;
  whereFoundJobPosting: string;
  degree: string;
  university: string;
  yearsOfExperience: string;
  previousCompany: string;
  relevantSkills: string;
  specificExample: string;
  companyAttraction: string;
  latex: string;

  constructor(detail: Array<string>) {
    this.senderName = detail[0];
    this.senderAddress = detail[1];
    this.senderCity = detail[2];
    this.senderState = detail[3];
    this.senderZIP = detail[4];
    this.senderPhone = detail[5];
    this.senderEmail = detail[6];
    this.recipientName = detail[7];
    this.recipientPosition = detail[8];
    this.companyName = detail[9];
    this.companyAddress1 = detail[10];
    this.companyAddress2 = detail[11];
    this.city = detail[12];
    this.state = detail[13];
    this.zip = detail[14];
    this.jobTitle = detail[15];
    this.whereFoundJobPosting = detail[16];
    this.degree = detail[17];
    this.university = detail[18];
    this.yearsOfExperience = detail[19];
    this.previousCompany = detail[20];
    this.relevantSkills = detail[21];
    this.specificExample = detail[22];
    this.companyAttraction = detail[23];

    this.latex = `\\documentclass[a4paper,10pt]{article}
    \\usepackage[left=2.5cm,right=2.5cm,top=2.5cm,bottom=2.5cm]{geometry}
    \\usepackage{graphicx}
    \\usepackage{amsmath}
    \\usepackage{setspace}
    \\usepackage{parskip}
    
    \\begin{document}
    
    % Sender's address
    \\noindent
    \\begin{tabular}{@{}l@{}}
        ${this.senderName} \\\\
        ${this.senderAddress} \\\\
        ${this.senderCity}, ${this.senderState}, ${this.senderZIP} \\\\
        Phone: ${this.senderPhone} \\\\
        Email: ${this.senderEmail} \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Date
    \\noindent
    \\today
    
    \\vspace{1cm}
    
    % Recipient's address
    \\noindent
    \\begin{tabular}{@{}l@{}}
        ${this.recipientName} \\\\
        ${this.recipientPosition} \\\\
        ${this.companyName} \\\\
        ${this.companyAddress1} \\\\
        ${this.companyAddress2} \\\\
        ${this.city}, ${this.state}, ${this.zip} \\\\
    \\end{tabular}
    
    \\vspace{1cm}
    
    % Salutation
    \\noindent
    Dear ${this.recipientName},
    
    \\vspace{0.5cm}
    
    % Body of the cover letter
    \\setstretch{1.25}
    
    I am writing to express my interest in the ${this.jobTitle} position at ${this.companyName} as advertised ${this.whereFoundJobPosting}. With my background in ${this.degree} from ${this.university} and ${this.yearsOfExperience} years of experience in ${this.previousCompany}, I am confident in my ability to contribute effectively to your team.
    
    During my time at ${this.previousCompany}, I have developed strong skills in ${this.relevantSkills}, which I believe would be beneficial for this role. For example, ${this.specificExample}.
    
    One of the reasons I am particularly excited about this opportunity is ${this.companyAttraction}. I am impressed by ${this.companyName}'s commitment to [specific aspect of the company], and I am eager to bring my [specific skills or experiences] to your esteemed team.
    
    Enclosed is my resume, which provides additional details about my background and accomplishments. I look forward to the opportunity to discuss how my skills and experiences align with the needs of your team. Thank you for considering my application. I hope to hear from you soon to schedule an interview.
    
    \\vspace{0.5cm}
    
    Sincerely,
    
    \\vspace{0.5cm}
    
    \\noindent
    ${this.senderName}
    
    \\end{document}`;
  }

  generateCoverLetterHtml() {
    // to be implemented
  }
}

export default CoverLetter;
