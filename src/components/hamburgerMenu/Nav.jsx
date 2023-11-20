import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./Items";


//redux
import { useSelector } from "react-redux";
import { selectIsLoggedIn,} from "../../redux/slice/authSlice";




const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};



const baseItems = [
  { id: "3", text: "فروشگاه", path: "/products" },
];

const loginItems = [
  { id: "1", text: "ورود", path: "/login" },
  { id: "2", text: "ثبت نام", path: "/register" }
];


export const Navigation = () => {
  const userIsLogged = useSelector(selectIsLoggedIn)
  const Items = userIsLogged ? [...baseItems] : [...baseItems, ...loginItems];


  return (
    <motion.ul variants={variants}>
      {Items.map((item) => (
        <MenuItem
          id={item.id}
          key={item.id}
          text={item.text}
          path={item.path}
        />
      ))}
    </motion.ul>
  );
};
