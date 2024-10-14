import React from 'react';
import RandomVerse from './components/RandomVerse.jsx';
import SpecificVerse from './components/SpecificVerse.jsx';


const App = () => {
  return (
    <div>
      <h1>Bible Verse App</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Get a Random Verse</h2>
        <RandomVerse />
      </div>
      <div>
        <h2>Get a Specific Verse</h2>
        <SpecificVerse />
      </div>
    </div>
  );
};

export default App;
