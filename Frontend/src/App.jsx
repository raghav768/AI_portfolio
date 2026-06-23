import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await axios.post(
      "http://localhost:5000/chat",
      {
        question
      }
    );

    setMessages([
      ...messages,
      {
        user: question,
        bot: res.data.answer
      }
    ]);

    setQuestion("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Portfolio Assistant</h1>

      <input
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask about Raghavendra..."
      />

      <button onClick={sendMessage}>
        Send
      </button>

      {messages.map((m, i) => (
        <div key={i}>
          <p>
            <b>You:</b> {m.user}
          </p>

          <p>
            <b>AI:</b> {m.bot}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;