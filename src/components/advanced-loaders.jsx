import { motion } from "framer-motion";

export const AdvancedLoader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const dotSize = {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
  };

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    start: {
      y: 0,
      opacity: 1,
    },
    end: {
      y: -24,
      opacity: 0.5,
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-2"
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-primary rounded-full"
          style={{
            width: dotSize[size],
            height: dotSize[size],
          }}
          variants={dotVariants}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </motion.div>
  );
};

export const NeonRingLoader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-10 h-10 border-2",
    md: "w-16 h-16 border-3",
    lg: "w-24 h-24 border-4",
    xl: "w-32 h-32 border-4",
  };

  return (
    <motion.div
      className={`rounded-full border border-primary border-t-transparent ${sizeClasses[size]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export const PulseLoader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-2 border-primary border-opacity-30 absolute`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary/20`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const ScaleLoader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const barVariants = {
    start: {
      scaleY: 0.5,
      opacity: 0.5,
    },
    end: {
      scaleY: 1,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-1"
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary to-primary/50 rounded-full"
          style={{ height: "24px" }}
          variants={barVariants}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </motion.div>
  );
};

export const TextLoader = ({ text = "Loading" }) => {
  const characters = text.split("");

  return (
    <div className="flex items-center justify-center gap-1">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="text-xl font-bold text-primary"
          animate={{
            opacity: [0.4, 1, 0.4],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="text-xl font-bold text-primary"
        animate={{
          opacity: [1, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
      >
        .
      </motion.span>
    </div>
  );
};
