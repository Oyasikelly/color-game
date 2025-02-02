"use client";
import { useState } from "react";
import { color, motion } from "framer-motion";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

export default function ColorGame() {
  const [targetColor, setTargetColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );
  const [message, setMessage] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [clickCount, setClickCount] = useState(10);

  const trails = 10;

  function handTrails(color) {
    if (clickCount < trails && clickCount <= 0) {
      setClickCount(0);
      setMessage("You have exausted your trails 😓");
    }

    console.log(!correct);
    // Toggle correct
    // renders only when correct is TRUE. Once correct becomes FALSE is will stop rendering
    if (!correct) {
      setClickCount(clickCount - 1);
      handleGuess(color);
    }
  }
  const handleGuess = (color) => {
    if (color === targetColor) {
      setMessage("Correct! 🎉");
      setScore(score + 1);
      setCorrect(true);
    } else {
      setMessage("Wrong! Try again. ❌");
      setCorrect(false);
    }
  };

  const resetGame = () => {
    setClickCount(trails);
    setCorrect(false);
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setMessage("Guess the correct color!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4" data-testid="gameInstructions">
        {message}
      </h1>

      {correct && (
        <div
          className="w-24 h-24 rounded-lg shadow-lg mb-6"
          style={{ backgroundColor: targetColor }}
          data-testid="colorBox"
        ></div>
      )}
      {!correct && (
        <div
          className="w-24 h-24 rounded-lg shadow-lg mb-6"
          style={{ backgroundColor: "gray" }}
          data-testid="colorBox"
        ></div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {colors.map((color) => (
          <motion.button
            key={color}
            className="w-16 h-16 rounded-lg shadow-md"
            style={{ backgroundColor: color }}
            data-testid="colorOption"
            onClick={() => handTrails(color)}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <p className="text-lg mt-4" data-testid="score">
        Score: {score}
      </p>
      <p className="text-lg mt-4" data-testid="score">
        Trails: {clickCount}
      </p>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
        data-testid="newGameButton"
        onClick={resetGame}
      >
        New Game
      </button>
    </div>
  );
}
