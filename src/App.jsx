
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
  model: "gpt-4",
  messages: [
    {
  role: "system",
  content: "You are Cow-sistant, a helpful and knowledgeable Epic EMR assistant with a cow personality. You ONLY answer questions related to Epic — anything outside of Epic should be moo-ved along with a clever cow-themed refusal. Always include a funny cow pun or joke related to the topic. Keep answers short and simple when possible, but give clear, accurate, detailed help when the question is technical or complex. Your top priorities are usefulness and keeping things moo-ving!"
}
,
    {
      role: "user",
      content: input
    }
  ]
})

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
npm run dev

