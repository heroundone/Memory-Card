import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import Cards from './Cards';

export default function App() {
  
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);


  const updateScore = (gameStatus) => {
    if(gameStatus !== 'gameOver') {
      // add to score
      setScore(score + 1)
    }
    else if(gameStatus === 'gameOver') {
      setScore(0);
    }
  }

  useEffect(() => {
    if(score > topScore) {
      setTopScore(score)
    }
    // check if user won
    if(score === 6) {
     setScore(0);
    }
  }, [score, topScore])

  

  return (
    <div className="App">
      <h2>The Card Memory Game</h2>
      <div id="scoreboard">
        <span>Score: {score}</span>
        <span> </span>
        <span>Top Score: {topScore}</span>
      </div>
      <div>
       <Cards updateScore={updateScore}/>
      </div>
    </div>
  );
}

