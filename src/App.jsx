import { useState } from "react";
import "./App.css";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    try {
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `You are a clinical Epic workflow assistant. Answer concisely:\n\n${input}`
      }
    ]
  }),
});






      const data = await res.json();
      const gptReply = data.choices?.[0]?.message?.content;
      setAnswer(gptReply || "No response received.");
    } catch (err) {
      setAnswer("Error fetching response. Check your API key or internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>DAMIEN's EpicCoach Web</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask a workflow question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div className="response">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
export default App;
