import { useState } from 'react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const footerSections = [
    {
      title: "Services",
      links: ["Resume Optimization"],
    },
    { title: "Company", links: ["About Us","Contact"] },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
  ];

  const modalContent = {
    "Resume Optimization": (
      <div>
        <p>Our AI-powered Resume Optimization service helps you create a standout resume that catches employers' attention.</p>
        <ul className="list-disc list-inside mt-2">
          <li>AI-driven keyword optimization</li>
          <li>Industry-specific formatting</li>
          <li>Personalized content suggestions</li>
          <li>ATS-friendly templates</li>
        </ul>
      </div>
    ),
    "About Us": (
      <div>
        <p>SwiftDocs is a cutting-edge AI company dedicated to revolutionizing the job application process.</p>
        <p className="mt-2">Founded in 2024, we've helped thousands of job seekers land their dream roles by leveraging the power of artificial intelligence in resume creation and optimization.</p>
      </div>
    ),
    "Contact": (
      <div>
        <p>Get in touch with us:</p>
        <ul className="list-none mt-2">
          <li>Email: support@swiftdocs.ai</li>
        
        </ul>
      </div>
    ),
    "Terms of Service": (
      <div>
        <p>By using SwiftDocs, you agree to our Terms of Service, which include:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Acceptable use of our AI tools</li>
          <li>User account responsibilities</li>
          <li>Intellectual property rights</li>
          <li>Limitation of liability</li>
        </ul>
        <p className="mt-2">For the full Terms of Service, please visit our website.</p>
      </div>
    ),
    "Privacy Policy": (
      <div>
        <p>At SwiftDocs, we take your privacy seriously. Our Privacy Policy covers:</p>
        <ul className="list-disc list-inside mt-2">
          <li>What personal information we collect</li>
          <li>How we use your data</li>
          <li>Data protection measures</li>
          <li>Your rights regarding your personal information</li>
        </ul>
        <p className="mt-2">For the complete Privacy Policy, please visit our website.</p>
      </div>
    ),
    "Cookie Policy": (
      <div>
        <p>Our Cookie Policy explains how we use cookies and similar technologies:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Types of cookies we use</li>
          <li>Purpose of each cookie</li>
          <li>How to manage or disable cookies</li>
          <li>Third-party cookies</li>
        </ul>
        <p className="mt-2">For more details on our Cookie Policy, please visit our website.</p>
      </div>
    ),
  };

  const handleLinkClick = (link) => {
    setActiveModal(link);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  
  return (
    <footer className="w-full p-10 pt-[5vh] bg-gray-300 text-base-content overflow-hidden ressd">
         <style jsx>{`
     
     @media (max-width: 768px) {
         .ressd {
           margin-top: 50vh;
         }
           }


    `}</style>
      
      <div className="flex flex-wrap justify-between items-start max-w-screen-xl mx-auto space-y-6 lg:space-y-0 lg:space-x-8">
        <aside className="flex flex-col items-start w-full lg:w-auto">
          <div className="flex items-center justify-content space-x-2 mb-2">
            <img src="/logo.png" className="h-10"/>
            <span className="text-xl font-bold">SwiftDocs</span>
          </div>
          <p className="text-xl">
            Optimizing resumes with AI since 2024
          </p>
        </aside>
        {footerSections.map((section) => (
          <nav key={section.title} className="w-full lg:w-auto">
            <h6 className="font-semibold text-lg mb-2">{section.title}</h6>
            {section.links.map((link) => (
              <a
                key={link}
                className="block link-hover text-gray-700 cursor-pointer"
                onClick={() => handleLinkClick(link)}
              >
                {link}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" checked={!!activeModal} onChange={closeModal} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{activeModal}</h3>
          <div className="py-4">
            {activeModal && modalContent[activeModal]}
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn" onClick={closeModal}>Close</label>
          </div>
        </div>
      </div>
    </footer>
  );
}