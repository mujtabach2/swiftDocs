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
            content: "Thanks for your message! We'll get back to you soon.",
          },
        ]);
      }, 1000);
      setMessage("");
    }
  };

  const faqItems = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-5 business days within the continental US.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to select countries. Please check our shipping page for details.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You'll receive a tracking number via email once your order ships.",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Support</h2>
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
                className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <h3 className="font-semibold text-blue-600">{item.question}</h3>
              <p className="mt-1 text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatModal;
