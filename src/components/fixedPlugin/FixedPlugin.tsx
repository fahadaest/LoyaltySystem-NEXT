'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

export default function FixedPlugin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const [darkmode, setDarkmode] = React.useState(
    typeof window !== 'undefined' && document.body.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    if (darkmode) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
    setDarkmode(!darkmode);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95, rotate: 10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="border-px fixed bottom-[30px] right-[35px] z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandGreen to-brandGreen shadow-lg shadow-green-500/30 transition-shadow duration-300 hover:shadow-xl"
      onClick={toggleDarkMode}
      {...rest}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={darkmode ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          {darkmode ? (
            <RiSunFill className="h-5 w-5" />
          ) : (
            <RiMoonFill className="h-5 w-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
