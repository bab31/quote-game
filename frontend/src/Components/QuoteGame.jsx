import React, { useEffect, useState } from "react";
import axios from "axios";

export default function QuoteGame() {
  const [quote, setQuote] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const fetchQuote = () => {
    axios.get("http://localhost:8000/api/quote/")
      .then((res) => setQuote(res.data))
      .catch((err) => console.error("Error fetching quote:", err));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === quote.author.toLowerCase()) {
      setMessage("🎉 Correct!");
    } else {
      setMessage(`❌ Wrong! Hint: Author initials: ${quote.hint.initials}`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🎯 Guess the Quote Author</h2>
      {quote ? (
        <>
          <blockquote style={{ fontStyle: "italic", fontSize: "1.2rem" }}>
            {quote.text}
          </blockquote>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Who said this?"
            style={{ padding: "0.5rem", marginRight: "1rem" }}
          />
          <button onClick={handleGuess}>Guess</button>
          <p>{message}</p>
          <button onClick={fetchQuote} style={{ marginTop: "1rem" }}>
            🔄 Next Quote
          </button>
        </>
      ) : (
        <p>Loading quote...</p>
      )}
    </div>
  );
}
