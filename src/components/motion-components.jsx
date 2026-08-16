import { motion } from "framer-motion";

export const PageTransition = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
};

export const HoverCardTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      whileTap={{
        y: 0,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInScale = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
};

export const SlideInFromLeft = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export const SlideInFromRight = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export const GlowingButton = ({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{
        boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)",
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const RotatingIcon = ({ children, duration = 2 }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};

export const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export const PulseElement = ({ children }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export const TypingAnimation = ({ text, speed = 50 }) => {
  const characters = text.split("");

  return (
    <motion.div className="flex flex-wrap gap-1">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: i * (speed / 1000),
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const MotionCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        borderColor: "rgba(99, 102, 241, 0.6)",
        boxShadow: "0 0 30px rgba(99, 102, 241, 0.2)",
      }}
    >
      {children}
    </motion.div>
  );
};
