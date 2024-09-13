import { useState } from "react";

const ChatModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatHistory([...chatHistory, { type: "user", content: message }]);
      // Simulate response
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "bot",
            content: "We are currently offline, please email us at support@resumeoptimizer.com",
          },
        ]);
      }, 1000);
      setMessage("");
    }
  };

  const faqItems = [
    {
      question: "What is this resume optimization site?",
      answer: "Our site helps you improve your resume using AI-powered suggestions and industry best practices.",
    },
    {
      question: "How does the resume optimization process work?",
      answer: "Upload your resume, and our AI analyzes it, providing tailored suggestions for improvements in content, format, and keywords.",
    },
    {
      question: "Is my resume information kept confidential?",
      answer: "Yes, we take privacy seriously. Your resume data is encrypted and never shared with third parties.",
    },
    {
      question: "How long does the optimization process take?",
      answer: "The initial AI analysis takes just a few seconds. You can then make changes based on suggestions at your own pace.",
    },
    {
      question: "Why should I use this resume optimization site?",
      answer: "This site helps you get your resume noticed by employers. It's easy to use and provides personalized suggestions for your resume.",
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
      <div className="bg-[#00Fa9a] text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Resume Help</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ✕
        </button>
      </div>
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 ${activeTab === "chat" ? "bg-gray-100 font-semibold" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === "faq" ? "bg-gray-100 font-semibold" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
      </div>
      {activeTab === "chat" ? (
        <>
          <div className="flex-grow overflow-y-auto p-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.type === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${msg.type === "user" ? "bg-blue-100" : "bg-gray-200"}`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 border text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#00Fa9a]"
              />
              <button
                type="submit"
                className="bg-[#00Fa9a] text-white px-4 py-2 rounded-r-lg hover:bg-[#00Cd7a] focus:outline-none focus:ring-2 focus:ring-[#00Fa9a]"
              >
                Send
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex-grow overflow-y-auto p-4">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-[#00Fa9a]">{item.question}</h3>
              <p className="mt-1 text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatModal;
