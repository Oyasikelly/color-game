"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRedo, FaTrophy, FaGamepad, FaMedal } from "react-icons/fa";

// component
import HighScore from "./component/HighScore";
const colorSets = [
  {
    set: "set-1",
    range: ["red", "firebrick", "crimson", "indianred", "lightcoral", "salmon"],
    highscore: 0,
  },
  {
    set: "set-2",
    range: [
      "blue",
      "mediumblue",
      "royalblue",
      "dodgerblue",
      "cornflowerblue",
      "slateblue",
    ],
    highscore: 0,
  },
  {
    set: "set-3",
    range: [
      "green",
      "darkgreen",
      "forestgreen",
      "seagreen",
      "mediumseagreen",
      "springgreen",
    ],
    highscore: 0,
  },
  {
    set: "set-4",
    range: [
      "yellow",
      "gold",
      "goldenrod",
      "darkkhaki",
      "khaki",
      "palegoldenrod",
    ],
    highscore: 0,
  },
  {
    set: "set-5",
    range: [
      "purple",
      "darkorchid",
      "blueviolet",
      "mediumorchid",
      "plum",
      "orchid",
    ],
    highscore: 0,
  },
  {
    set: "set-6",
    range: [
      "orange",
      "darkorange",
      "tomato",
      "coral",
      "lightsalmon",
      "sandybrown",
    ],
    highscore: 0,
  },
  {
    set: "set-7",
    range: [
      "teal",
      "darkcyan",
      "lightseagreen",
      "mediumaquamarine",
      "cadetblue",
      "darkslategray",
    ],
    highscore: 0,
  },
  {
    set: "set-8",
    range: [
      "pink",
      "lightpink",
      "hotpink",
      "palevioletred",
      "rosybrown",
      "mistyrose",
    ],
    highscore: 0,
  },
  {
    set: "set-9",
    range: ["brown", "saddlebrown", "sienna", "peru", "tan", "rosybrown"],
    highscore: 0,
  },
  {
    set: "set-10",
    range: [
      "gray",
      "dimgray",
      "darkgray",
      "slategray",
      "lightslategray",
      "gainsboro",
    ],
    highscore: 0,
  },
];

export default function ColorGame() {
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  //STATES
  const [selected, setSelected] = useState("set-1");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);

  // Filtering out the selected color set
  const currentSet = colorSets.find((colorSet) => selected === colorSet.set);
  const shuffled = currentSet ? shuffleArray(currentSet.range) : [];

  const [targetColor, setTargetColor] = useState(
    shuffled[Math.floor(Math.random() * shuffled.length)] || ""
  );

  // Handle the guested colors
  const handleGuess = (color, index) => {
    if (color === targetColor) {
      setMessage("Correct! 🎉");
      setScore(score + 1);
      setCorrect(true);
    } else {
      setMessage("Wrong! Try again. ❌");
      setCorrect(false);
    }
  };

  //reset the game
  const resetGame = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    setSelected(`set-${randomNumber}`);
    setScore(0);
    setCorrect(false);
    setTargetColor(shuffled[Math.floor(Math.random() * shuffled.length)]);
    setMessage("Guess the correct color!");
  };

  //Handle the selected option e.g, set-1,set-2,set-3...
  const handleColorSet = (e) => {
    setSelected(e.target.value);
    setCorrect(false);
    setScore(0);
    setMessage("Guess the correct color!");
  };

  // Update targetColor whenever "selected" and "handleGuess" changes
  useEffect(() => {
    if (shuffled.length > 0) {
      setTargetColor(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  }, [selected, handleGuess]); // Runs when "selected" changes

  // Save to localstorage
  useEffect(() => {
    if (score > 0) {
      const storedColorSets =
        JSON.parse(localStorage.getItem("colorSets")) || colorSets;
      const updatedColorSets = storedColorSets.map((colorSet) => {
        if (colorSet.set === selected) {
          return {
            ...colorSet,
            highscore: Math.max(colorSet.highscore, score), // Update only if the new score is higher
          };
        }
        return colorSet;
      });

      localStorage.setItem("colorSets", JSON.stringify(updatedColorSets));
    }
  }, [score, selected]);

  function toggleHighScore() {
    setOpen(!open);
  }
  return (
    <div>
      {open && (
        <HighScore
          score={score}
          selected={selected}
          colorSets={colorSets}
          onClose={toggleHighScore}
        />
      )}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 to-purple-500 p-6">
        {/* Game Title */}

        <motion.h1
          className="text-3xl font-extrabold text-white mb-6 flex flex-col justify-center lg:flex-row items-center gap-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaGamepad className="text-yellow-300 text-5xl " />
          Color Guessing Game
        </motion.h1>

        {/* Color Set Dropdown */}
        <motion.select
          value={selected}
          onChange={handleColorSet}
          className="p-3 rounded-lg bg-white shadow-md mb-6 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          {colorSets.map((colorSet, index) => (
            <option key={index} value={colorSet.set}>
              {colorSet.set}
            </option>
          ))}
        </motion.select>

        {/* Hightscore */}
        <motion.button
          onClick={toggleHighScore}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          whileTap={{ scale: 0.9 }}
        >
          <span>click here to view highscore</span>
          <FaMedal className="text-white text-2xl" />
          {/* HIGHSCORE: {highscore} */}
        </motion.button>

        {/* Game Instructions / Status */}
        <motion.h1
          className={`text-xl font-semibold text-white mb-4`}
          data-testid={correct ? "gameInstructions" : "gameStatus"}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {message}
        </motion.h1>

        {/* Target Color Box */}
        <div data-testid="colorBox">
          <motion.div
            className="w-28 h-28 rounded-lg shadow-lg mb-6 border-4 border-white"
            style={{ backgroundColor: targetColor }}
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Color Options Grid */}
        <div className="grid grid-cols-3 gap-4" data-testid="colorOption">
          {shuffled.map((color, index) => (
            <motion.button
              key={color}
              className="w-16 h-16 rounded-lg shadow-md border border-white cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color, index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Score & Attempts */}
        <div
          className="flex items-center gap-6 mt-6 text-white text-lg"
          data-testid="score"
        >
          <motion.p
            className="flex items-center gap-2"
            animate={correct ? { scale: [1, 1.2, 1] } : {}}
          >
            <FaTrophy className="text-yellow-300" /> Score: {score}
          </motion.p>
        </div>

        {/* New Game Button */}
        <div data-testid="newGameButton">
          <motion.button
            className="mt-6 px-6 py-3 flex items-center gap-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-800 transition shadow-lg"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaRedo /> New Game
          </motion.button>
        </div>
      </div>
    </div>
  );
}
