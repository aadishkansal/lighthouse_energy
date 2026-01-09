import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TypingText = () => {
  const line1 = "Say Yes to Solar,";
  const line2 = "Say Goodbye to High Bills.";
  const line3 = "Get benefit by government subsidy and save upto ₹78000*";

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.h2
      className="font-black font-iceland text-white leading-tight"
      variants={sentence}
      initial="hidden"
      animate="visible"
    >
      {/* Line 1: Center by default, Left on Large (lg) */}
      <span className="text-5xl md:text-7xl block text-center lg:text-left">
        {line1.split("").map((char, index) => (
          <motion.span key={`l1-${index}`} variants={letter}>
            {char}
          </motion.span>
        ))}
      </span>

      {/* Line 2: Center by default, Left on Large (lg) */}
      <span className="text-5xl md:text-7xl block text-center lg:text-left">
        {line2.split("").map((char, index) => (
          <motion.span key={`l2-${index}`} variants={letter}>
            {char}
          </motion.span>
        ))}
      </span>

      {/* Line 3: Center by default, Left on Large (lg) */}
      <span className="text-xl md:text-2xl block mt-4 font-sans font-bold text-gray-200 text-center lg:text-left">
        {line3.split("").map((char, index) => (
          <motion.span key={`l3-${index}`} variants={letter}>
            {char}
          </motion.span>
        ))}
      </span>
    </motion.h2>
  );
};

export default TypingText;
