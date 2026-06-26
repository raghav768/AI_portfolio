import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      role: "user",
      text: input
    };

    setMessages(prev => [
      ...prev,
      userMsg
    ]);

    const res = await axios.post(
      "http://localhost:5000/chat",
      {
        question: input
      }
    );

    const botMsg = {
      role: "bot",
      text: res.data.answer
    };

    setMessages(prev => [
      ...prev,
      botMsg
    ]);

    setInput("");
  };

  return (
    <div className="container">
      <h1>
        Raghavendra AI Assistant
      </h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Ask me anything..."
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;