import React, { useState, useEffect, useRef } from "react";
import "./Doctor.css";

function Doctor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [location, setLocation] = useState(null); // New state for location

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // Get user's current location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          location: location, // Include location data
        }),
      });

      const data = await response.json();

      // Convert markdown-style links into clickable HTML links
      const formattedResponse = data.response.replace(
        /\[([^\]]+)]\((https?:\/\/[^\s]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      setMessages([...newMessages, { text: formattedResponse, sender: "bot", isHTML: true }]);
    } catch (error) {
      setMessages([...newMessages, { text: "⚠️ Error connecting to the server.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="chat-container">
      
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.isHTML ? (
              <p dangerouslySetInnerHTML={{ __html: msg.text }} />
            ) : (
              msg.text.split("\n").map((line, i) => <p key={i}>{line}</p>)
            )}
          </div>
        ))}
        {loading && <p className="bot-typing">🤖 Typing...</p>}
        <div ref={chatEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter symptoms..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={!input.trim() || loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Doctor;
