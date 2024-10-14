import React, { useState } from 'react';

const RandomVerse = () => {
  const [verse, setVerse] = useState('');

  const fetchRandomVerse = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/random-verse');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVerse(`${data.bookname} ${data.chapter}:${data.verse} - ${data.text}`);
    } catch (error) {
      console.error('Error fetching verse:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchRandomVerse}>Get Random Verse</button>
      {verse && <p>{verse}</p>}
    </div>
  );
};

export default RandomVerse;
