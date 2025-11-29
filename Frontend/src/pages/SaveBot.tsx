import { useState } from 'react';
import Navbar from '../components/dashboard/Navbar';

function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! Ask me anything.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };

    // Custom question logic
    let botReplyText = "Sorry, I don't know the answer to that.";
    if (input.toLowerCase().includes('capital of france')) {
      botReplyText = 'The capital of France is Paris.';
    }

    const botMessage = { from: 'bot', text: botReplyText };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <Navbar title="SaveBot" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 dark:bg-gray-600 dark:text-blue-600">
        <div className="w-full max-w-md bg-white rounded shadow-lg p-4 flex flex-col">
          <div className="flex-1 overflow-auto mb-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  m.from === 'bot' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded ${
                    m.from === 'bot'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-green-100 text-green-900'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              className="flex-1 border border-gray-300 dark:border-gray-500 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
            />
            <button
              className="bg-blue text-white px-4 py-2 rounded-r hover:bg-blue-300 dark:bg-blue dark:hover:bg-blue-300"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
