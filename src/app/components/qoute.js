import React from 'react';

const quotes = [
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The future depends on what you do today. – Mahatma Gandhi",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
  "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. – Roy T. Bennett",
  "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
];

const Quote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <blockquote className="mt-8 italic text-center text-gray-600">
      "{randomQuote}"
    </blockquote>
  );
};

export default Quote;
