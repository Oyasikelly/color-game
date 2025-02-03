import { motion } from "framer-motion";
import { useState } from "react";
import { FaTrophy } from "react-icons/fa"; // Trophy icon for high score

export default function ScoreContainer({ colorSets, onClose }) {
  const [highscoreSet, setHighscoreSet] = useState(
    JSON.parse(localStorage.getItem("colorSets")) || colorSets
  );

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-300 to-purple-500 bg-opacity-50 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 w-[80%] lg:w-full max-w-md md:max-w-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">High Scores</h2>
        <div className="grid grid-cols-2 gap-4">
          {highscoreSet.map(({ set, highscore }) => (
            <motion.div
              key={set}
              className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-semibold">{set}</span>
              <div className="flex items-center space-x-2">
                <FaTrophy className="text-yellow-500" />
                <span className="font-bold">{highscore}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="py-4 text-center text-gray-600">
          Press ESC or click below to close
        </p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
