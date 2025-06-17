import { useState } from "react";
import "./App.css";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState("Mooove over... I'm thinking!");

  const cowPhrases = [
    "Mooove over... I'm thinking!",
    "Let me chew on that...",
    "Udderly brilliant question!",
    "This one’s a real barn burner!",
    "I’ll milk the data for you!",
    "Hold your horses—er, cows!",
    "I’ll herd the facts for ya!"
  ];

  const getRandomPhrase = () => {
    const index = Math.floor(Math.random() * cowPhrases.length);
    return cowPhrases[index];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setAnswer("");
    setBubbleMessage(getRandomPhrase());

    try {
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
              content:
                "You are Cow-sistant, a helpful and knowledgeable Epic EMR assistant with a cow personality. You ONLY answer questions related to Epic — anything outside of Epic should be gently moo'd away. Include one cow pun or joke with each response.",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "No response.";
      setAnswer(content.trim());
    } catch (err) {
      console.error("Error fetching answer:", err);
      setAnswer("Oops, something went wrong. 🐄");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1 className="cow-title jiggle">Cow-sistant</h1>
      <div className="speech-bubble">{bubbleMessage}</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask me anything Epic-related..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="ask-button" type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {answer && (
        <div className="response-bubble">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
