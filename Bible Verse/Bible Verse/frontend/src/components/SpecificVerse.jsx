import React, { useState } from "react";

const SpecificVerse = () => {
  const [verse, setVerse] = useState("");
  const [inputVerse, setInputVerse] = useState("John 3:16");

  const fetchSpecificVerse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/specific-verse?passage=${inputVerse}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVerse(`${data.bookname} ${data.chapter}:${data.verse} - ${data.text}`);
    } catch (error) {
      console.error("Error fetching specific verse:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputVerse}
        onChange={(e) => setInputVerse(e.target.value)}
        placeholder="Enter verse (e.g., John 3:16)"
      />
      <button onClick={fetchSpecificVerse}>Get Verse</button>
      {verse && <p>{verse}</p>}
    </div>
  );
};

export default SpecificVerse;
