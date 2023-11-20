import * as React from "react";
import { motion } from "framer-motion";
import "./Hamburger.scss"
import { Link } from 'react-router-dom';





const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};




export const MenuItem = ({ id, text, path}) => {

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={path} className="text-placeholder">
        <span className="text">{text}</span>
        <motion.div className="underline" 
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          whileTap={{ 
            background: "linear-gradient(90deg, transparent, #fef6e4, transparent)", 
            transition: { duration: 0.5 }
          }} 
        ></motion.div>
      </Link>
    </motion.li>
  );
};
