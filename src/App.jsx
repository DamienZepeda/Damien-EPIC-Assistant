import { useState, useEffect } from "react";
import "./App.css";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [bubbleText, setBubbleText] = useState("");

  const greetings = [
    "Howdy human! I'm here to steer you through any Epic workflow.",
    "Moo there! Got a workflow problem? Let’s milk it for answers.",
    "Epic questions? I herd you. Let’s solve it together.",
    "You’ve got the question, I’ve got the moo-ves."
  ];

  const thinkingPhrases = [
    "Milking the data...",
    "Churning through charts...",
    "Gathering workflow hay...",
    "Grazing on Epic logs...",
    "Cooking up a mooo-velous answer..."
  ];

  useEffect(() => {
    // Set a random welcome message on load
    setBubbleText(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    const phrase = thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)];
    setBubbleText(phrase);

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
                "You are Cow-sistant, a helpful and knowledgeable Epic EMR assistant with a cow personality. You ONLY answer questions related to Epic — anything outside of Epic should be moo-ved along with a clever cow-themed refusal. Always include a funny cow pun or joke related to the topic. Keep answers short and simple when possible, but give clear, accurate, detailed help when the question is technical or complex. Your top priorities are usefulness and keeping things moo-ving!",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await res.json();
      const gptReply = data.choices?.[0]?.message?.content;
      setAnswer(gptReply || "No response received.");
      setBubbleText(greetings[Math.floor(Math.random() * greetings.length)]);
    } catch (err) {
      setAnswer("Moo-d alert! Something went wrong. Check your internet or API key.");
      setBubbleText("Whoops! I lost my herd... try again soon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="speech-bubble">{bubbleText}</div>

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
        <button type="submit" className="ask-button" disabled={loading}>
          {loading ? "Moo-deling..." : "Ask"}
        </button>
      </form>

      {answer && (
        <div className="response-bubble">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
