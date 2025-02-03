"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRedo, FaTrophy, FaGamepad, FaMedal } from "react-icons/fa";

// component
import HighScore from "./component/HighScore";
const colorSets = [
  {
    set: "set-1",
    range: ["red", "blue", "green", "yellow", "orange", "purple"],
    highscore: 0,
  },
  {
    set: "set-2",
    range: ["pink", "brown", "cyan", "lime", "indigo", "teal"],
    highscore: 0,
  },
  {
    set: "set-3",
    range: ["gold", "silver", "maroon", "navy", "olive", "coral"],
    highscore: 0,
  },
  {
    set: "set-4",
    range: ["skyblue", "violet", "magenta", "beige", "turquoise", "salmon"],
    highscore: 0,
  },
  {
    set: "set-5",
    range: ["crimson", "chartreuse", "khaki", "plum", "orchid", "lavender"],
    highscore: 0,
  },
  {
    set: "set-6",
    range: ["azure", "peachpuff", "wheat", "seagreen", "slateblue", "tan"],
    highscore: 0,
  },
  {
    set: "set-7",
    range: [
      "tomato",
      "honeydew",
      "mistyrose",
      "powderblue",
      "darkcyan",
      "steelblue",
    ],
    highscore: 0,
  },
  {
    set: "set-8",
    range: [
      "firebrick",
      "rosybrown",
      "dodgerblue",
      "lightcoral",
      "mediumaquamarine",
      "peru",
    ],
    highscore: 0,
  },
  {
    set: "set-9",
    range: [
      "mediumseagreen",
      "darkslategray",
      "darkorchid",
      "greenyellow",
      "mediumvioletred",
      "sienna",
    ],
    highscore: 0,
  },
  {
    set: "set-10",
    range: [
      "lightseagreen",
      "forestgreen",
      "darkmagenta",
      "darkgoldenrod",
      "cadetblue",
      "hotpink",
    ],
    highscore: 0,
  },
];

export default function ColorGame() {
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
  const [selected, setSelected] = useState("set-1");

  // Filtering out the selected color set
  const currentSet = colorSets.find((colorSet) => selected === colorSet.set);
  const shuffled = currentSet ? shuffleArray(currentSet.range) : [];

  const [targetColor, setTargetColor] = useState(
    shuffled[Math.floor(Math.random() * shuffled.length)] || ""
  );

  // Update targetColor whenever "selected" changes
  useEffect(() => {
    if (shuffled.length > 0) {
      setTargetColor(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  }, [selected]); // Runs when "selected" changes

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [clickCount, setClickCount] = useState(4);

  const trails = 4;

  function handTrails(color) {
    if (clickCount < trails && clickCount <= 0) {
      setClickCount(0);
      setMessage("You have exausted your trails 😓");
    }

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

    if (
      (clickCount <= 0 && color !== targetColor) ||
      (clickCount <= 0 && color == targetColor)
    ) {
      setMessage("You have exausted your trails 😓");
      setClickCount(0);
      setCorrect(true);
    }
  };

  const resetGame = () => {
    setClickCount(trails);
    setCorrect(false);
    setTargetColor(shuffled[Math.floor(Math.random() * shuffled.length)]);
    setMessage("Guess the correct color!");
  };

  const handleColorSet = (e) => {
    setSelected(e.target.value);
    setCorrect(false);
    setClickCount(trails);
    setScore(0);
    setMessage("Guess the correct color!");
    setTargetColor(
      (c) => shuffled[Math.floor(Math.random() * shuffled.length)]
    );
  };

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
    <>
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
          <FaGamepad className="text-yellow-300 " /> Color Guessing Game
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
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          whileTap={{ scale: 0.9 }}
        >
          <FaMedal className="text-white text-xl" />
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
        <motion.div
          className="w-28 h-28 rounded-lg shadow-lg mb-6 border-4 border-white"
          style={{ backgroundColor: correct ? targetColor : "transparent" }}
          data-testid="colorBox"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        />

        {/* Color Options Grid */}
        <div className="grid grid-cols-3 gap-4">
          {shuffled.map((color) => (
            <motion.button
              key={color}
              className="w-16 h-16 rounded-lg shadow-md border border-white cursor-pointer"
              style={{ backgroundColor: color }}
              data-testid="colorOption"
              onClick={() => handTrails(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Score & Attempts */}
        <div className="flex items-center gap-6 mt-6 text-white text-lg">
          <motion.p
            className="flex items-center gap-2"
            data-testid="score"
            animate={correct ? { scale: [1, 1.2, 1] } : {}}
          >
            <FaTrophy className="text-yellow-300" /> Score: {score}
          </motion.p>
          <p className="text-white" data-testid="score">
            Trials: {clickCount}
          </p>
        </div>

        {/* New Game Button */}
        <motion.button
          className="mt-6 px-6 py-3 flex items-center gap-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-800 transition shadow-lg"
          data-testid="newGameButton"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaRedo /> New Game
        </motion.button>
      </div>
    </>
  );
}
