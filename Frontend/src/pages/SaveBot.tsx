import React, { useState } from "react";

// Local fallback Navbar component to avoid import path issues.
// If you have a real Navbar component in your project, remove this
// and restore the original import: `import Navbar from "../components/dashboard/Navbar";`
import Navbar from "../components/dashboard/Navbar";

/*const Navbar: React.FC<NavbarProps> = ({ title = "App" }) => {
  return (
    <header className="w-full bg-transparent px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-6 h-6 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 01.75.75v3.75h3.75a.75.75 0 010 1.5H12.75v3.75a.75.75 0 01-1.5 0V12.75H7.5a.75.75 0 010-1.5h3.75V7.5a.75.75 0 01.75-.75z"
            />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>
      </div>

      <button className="px-3 py-1 bg-white/80 dark:bg-gray-700 rounded-full border border-gray-200 text-sm shadow-sm">
        Quick topics
      </button>
    </header>
  );
};*/

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi Jolly, I am SaveBot - your AI saving assistant. Ask me anything about SaveFi! Use the quick topics option for appropriate responses.",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: "user", text: input };

    let botReplyText = "Sorry, I don't know the answer to that.";
    if (input.toLowerCase().includes("capital of france")) {
      botReplyText = "The capital of France is Paris.";
    }

    const botMessage: Message = { from: "bot", text: botReplyText };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white">
      <Navbar title="SaveBot" />

      <main className="flex flex-col items-center justify-start pt-6">
        <div className="w-full ">
          <div className="flex flex-col items-center text-center mb-6">
            <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300 mx-auto">
              Hi Jolly, I am SaveBot – your AI saving assistant. Ask me anything
              about SaveFi! Use the quick topic option for appropriate
              responses.
            </p>
          </div>

          <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex flex-col">
            <div className="flex-1 overflow-auto mb-4 min-h-[220px]">
              {messages.length === 1 && (
                <div className="text-center text-gray-400 text-sm py-10">
                  No Chats yet
                  <div className="text-xs">
                    Use the Quick Topics tab for appropriate responses.
                  </div>
                </div>
              )}

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${
                    m.from === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg text-sm max-w-[80%] break-words ${
                      m.from === "bot"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-green-100 text-green-900"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full border-t border-gray-200 dark:border-gray-600 pt-2">
              <input
                className="flex-1 border border-gray-300 dark:border-gray-500 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:text-white"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask SaveBot anything"
                aria-label="Chat input"
              />
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded-r-lg text-sm hover:bg-blue-600"
                onClick={handleSend}
                aria-label="Send message"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
