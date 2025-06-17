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
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: input }],
        }),
      });

      const data = await res.json();
      setAnswer(data.choices[0].message.content);
    } catch (err) {
      setAnswer("Oops! Something went wrong. Please try again.");
    }

    setLoading(false);
  };

return (
  <div className="app">
    <h1 className="cow-title">
      Your Friendly Neighborhood<br />Cow-sistant
    </h1>
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
